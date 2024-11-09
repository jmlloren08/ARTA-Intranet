<?php

namespace App\Http\Controllers;

use App\Models\Activities;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ActivityController extends Controller
{
    public function store(Request $request)
    {
        try {

            $validatedData = $request->validate([
                'work_item' => 'required|string|max:255',
                'description' => 'required|string|max:1000',
                'category' => 'required|string',
                'progress' => 'required|string',
                'complexity' => 'required|string',
                'start_date' => 'required|date',
                'due_date' => 'required|date|after_or_equal:start_date',
                'assigned_to' => 'nullable|array',
                'assigned_to.*' => 'nullable|string',
                'key_stakeholders' => 'nullable|string',
                'remarks' => 'nullable|string'
            ]);

            if (isset($validatedData['assigned_to']) && is_array($validatedData['assigned_to'])) {
                $validatedData['assigned_to'] = implode(',', $validatedData['assigned_to']);
            }

            $work_id = Str::random(24);

            Activities::create([
                'work_id' => $work_id,
                'work_item' => $validatedData['work_item'],
                'description' => $validatedData['description'],
                'category' => $validatedData['category'],
                'progress' => $validatedData['progress'],
                'complexity' => $validatedData['complexity'],
                'start_date' => $validatedData['start_date'],
                'due_date' => $validatedData['due_date'],
                'assigned_to' => $validatedData['assigned_to'],  // Save as comma-separated string
                'key_stakeholders' => $validatedData['key_stakeholders'],
                'remarks' => $validatedData['remarks'],
                'created_by' => auth()->user()->name
            ]);

            return response()->json(['message' => 'Work item added successfully.']);
        } catch (\Exception $e) {

            Log::error("Error storing work item: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function update(Request $request, $id)
    {
        try {

            $validatedData = $request->validate([
                'work_item' => 'required|string|max:255',
                'description' => 'required|string|max:1000',
                'category' => 'required|string',
                'progress' => 'required|string',
                'complexity' => 'required|string',
                'start_date' => 'required|date',
                'due_date' => 'required|date|after_or_equal:start_date',
                'assigned_to' => 'nullable|array',
                'assigned_to.*' => 'nullable|string',
                'key_stakeholders' => 'nullable|string',
                'remarks' => 'nullable|string'
            ]);

            if (isset($validatedData['assigned_to']) && is_array($validatedData['assigned_to'])) {
                $validatedData['assigned_to'] = implode(',', $validatedData['assigned_to']);
            }

            $activitiesData = Activities::findOrFail($id);

            $activitiesData->update($validatedData);

            return response()->json(['message' => 'Work item updated successfully.']);
        } catch (\Exception $e) {

            Log::error("Error updating work item: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function getAllActivities()
    {
        try {

            $activities = Activities::select('id', 'work_item', 'description', 'category', 'progress', 'complexity', 'start_date', 'due_date', 'assigned_to', 'key_stakeholders', 'remarks')
                ->orderBy('updated_at', 'desc')
                ->get();

            return response()->json($activities);
        } catch (\Exception $e) {

            Log::error("Error fetching data: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }

    public function getCountActivities()
    {
        try {
            $all = Activities::count();
            $completed = Activities::where('progress', 'Completed')->count();
            $inProgress = Activities::where('progress', 'In progress')->count();
            $notStarted = Activities::where('progress', 'Not started')->count();
            $blocked = Activities::where('progress', 'Blocked')->count();

            return response()->json([
                'all' => $all,
                'completed' => $completed,
                'inProgress' => $inProgress,
                'notStarted' => $notStarted,
                'blocked' => $blocked
            ]);
        } catch (\Exception $e) {

            Log::error("Error fetching data: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
}
