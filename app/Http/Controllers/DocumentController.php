<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Str;

class DocumentController extends Controller
{
    public function store(Request $request)
    {
        try {

            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string|max:1000',
                'category' => 'required|string',
                'due_date' => 'required|date|after_or_equal:today',
                'assigned_to' => 'required|array',
                'assigned_to.*' => 'required|integer|exists:users,id',
            ]);

            $document_number = 'ARTA' . '-' . auth()->user()->office . '-' . today()->format('Y-m-d') . '-' . Str::random(6);

            $document = Document::create([
                'document_number' => $document_number,
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
                'category' => $validatedData['category'],
                'status' => 'Draft',
                'due_date' => $validatedData['due_date'],
                'created_by' => auth()->user()->id
            ]);

            $document->users()->attach($validatedData['assigned_to']);

            return response()->json([
                'document' => $document,
                'message' => 'Document created successfully!'

            ]);
        } catch (\Exception $e) {
            Log::error("Error storing document metadata: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function updateDocumentMetadata(Request $request, $id)
    {
        try {

            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string|max:1000',
                'category' => 'required|string',
                'due_date' => 'required|date|after_or_equal:today',
                'assigned_to' => 'required|array',
                'assigned_to.*' => 'required|integer|exists:users,id',
            ]);

            $document = Document::findOrFail($id);

            // Save current version
            // $document->versions()->create([
            //     'document_id' => $document->document_id,
            //     'version_number' => $document->versions()->count() + 1,
            //     'google_doc_version_id' => $document->google_doc_version_id
            // ]);

            $document->update([
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
                'category' => $validatedData['category'],
                'due_date' => $validatedData['due_date'],
                'updated_by' => auth()->user()->id
            ]);

            $document->users()->sync($validatedData['assigned_to']);

            return response()->json(['message' => 'Document metadata updated successfully!']);
        } catch (\Exception $e) {
            Log::error("Error updating document metadata: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function update(Request $request, $id)
    {
        try {

            $validatedData = $request->validate([
                'document_id' => 'required|string|unique:documents,document_id',
                'document_url' => 'required|string|url'
            ]);

            $document = Document::findOrFail($id);

            $document->update([
                'document_id' => $validatedData['document_id'],
                'document_url' => $validatedData['document_url']
            ]);

            return response()->json(['message' => 'Document created successfully!']);
        } catch (\Exception $e) {
            Log::error("Error updating document: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function routeDocument(Request $request, $id)
    {
        try {

            $validatedData = $request->validate([
                'remarks_instructions' => 'required|string|max:1000'
            ]);

            $document = Document::findOrFail($id);
            $assignedUsers = $document->users()->get();

            if ($assignedUsers->isEmpty()) {
                return response()->json(['message' => 'No assigned users found for this document.'], 400);
            }

            foreach ($assignedUsers as $assignedUser) {
                $document->routings()->create([
                    'from_user_id' => auth()->user()->id,
                    'to_user_id' => $assignedUser->id,
                    'action' => 'Route',
                    'remarks_instructions' => $validatedData['remarks_instructions']
                ]);
            }

            $document->update([
                'status' => 'Routed',
                'updated_by' => auth()->user()->id
            ]);

            $this->logAction($document, 'Routed', auth()->user()->name . ' routed the document.');

            return response()->json(['message' => 'Document routed successfully!']);
        } catch (\Exception $e) {
            Log::error("Error routing document: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function getMyDocuments()
    {
        try {

            $user = auth()->user();

            $documents = Document::where('created_by', $user->id)
                ->whereNotNull('document_id')
                ->whereNotNull('document_url')
                ->select('id', 'title', 'document_id', 'document_number', 'description', 'category', 'status', 'due_date', 'assigned_to', 'created_by', 'document_url')
                ->orderBy('updated_at', 'desc')
                ->get();

            $formattedDocuments = $documents->map(function ($document) {
                $document->assigned_to = $document->users->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name
                    ];
                });
                return $document;
            });

            return response()->json($formattedDocuments);
        } catch (\Exception $e) {
            Log::error("Error fetching my documents: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function getDocumentsToReceive()
    {
        try {

            $user = auth()->user();

            $user->user_role === 'Administrator' ?
                $documents = Document::with('users:id,name')
                ->whereNotNull('document_id')
                ->whereNotNull('document_url')
                ->select('id', 'document_id', 'document_number', 'title', 'description', 'category', 'status', 'due_date', 'assigned_to', 'created_by', 'document_url')
                ->orderBy('updated_at', 'desc')
                ->get()
                :
                $documents = Document::with('users:id,name')
                ->whereNotNull('document_id')
                ->whereNotNull('document_url')
                ->whereHas('users', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->where('status', 'Routed')
                ->select('id', 'title', 'document_id', 'document_number', 'description', 'category', 'status', 'due_date', 'assigned_to', 'created_by', 'document_url')
                ->orderBy('updated_at', 'desc')
                ->get();

            $formattedDocuments = $documents->map(function ($document) {
                $document->assigned_to = $document->users->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name
                    ];
                });
                return $document;
            });

            return response()->json($formattedDocuments);
        } catch (\Exception $e) {
            Log::error("Error fetching document metadata: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function getInProgressDocuments()
    {
        try {

            $documents = Document::where('status', 'In Progress')
                ->whereNotNull('document_id')
                ->whereNotNull('document_url')
                ->select('id', 'document_id', 'document_number', 'title', 'description', 'category', 'status', 'due_date', 'assigned_to', 'document_url')
                ->orderBy('updated_at', 'desc')
                ->get();

            $formattedDocuments = $documents->map(function ($document) {
                $document->assigned_to = $document->users->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name
                    ];
                });
                return $document;
            });

            return response()->json($formattedDocuments);
        } catch (\Exception $e) {
            Log::error("Error fetching In Progress document: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    // public function getAuditLogs($id)
    // {
    //     try {

    //         $document = Document::with('auditLogs.user:id,name')->findOrFail($id);

    //         return response()->json($document->auditLogs);
    //     } catch (\Exception $e) {
    //         Log::error("Error fetching audit logs: " . $e->getMessage());
    //         return response()->json(['message' => 'Internal server error'], 500);
    //     }
    // }
    // public function getVersions($id)
    // {
    //     try {

    //         $document = Document::with('versions')->findOrFail($id);

    //         return response()->json($document->versions);
    //     } catch (\Exception $e) {
    //         Log::error("Error fetching versions: " . $e->getMessage());
    //         return response()->json(['message' => 'Internal server error'], 500);
    //     }
    // }
    protected function logAction($document, $action, $details = null)
    {
        try {
            $document->auditLogs()->create([
                'document_id' => $document->id,
                'performed_by_user_id' => auth()->user()->id,
                'action' => $action,
                'details' => $details
            ]);
        } catch (\Exception $e) {
            Log::error("Error logging action: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
}
