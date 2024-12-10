<?php

namespace App\Http\Controllers;

use Google\Client;
use Google\Service\Drive;
use Google\Service\Docs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class GoogleController extends Controller
{
    public function authenticate()
    {
        try {
            $client = $this->getGoogleClient();
            $authUrl = $client->createAuthUrl();
            return redirect($authUrl);
        } catch (\Exception $e) {

            Log::error("Error authenticating: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function callback()
    {
        try {
            $client = $this->getGoogleClient();
            $accessToken = $client->fetchAccessTokenWithAuthCode(request('code'));

            session(['google_token' => $accessToken]);
            session(['google_refresh_token' => $client->getRefreshToken()]);

            return redirect()->route('my-documents');
        } catch (\Exception $e) {

            Log::error("Error calling callback: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function createDocument(Request $request)
    {
        try {

            $title = $request->title;
            $client = $this->getGoogleClient();

            if (!$client->getAccessToken()) {
                return response()->json(['message' => 'User is not authenticated'], 401);
            }

            $docsService = new Docs($client);
            $document = new \Google\Service\Docs\Document([
                'title' => $title
            ]);

            $createdDocument = $docsService->documents->create($document);
            $document_id = $createdDocument->getDocumentId();

            $driveService = new Drive($client);
            // dms/operations
            $folderId = '1uyLvzcuJUeoEFd_h18hPPcl66lQxZHMN';

            $fileMetaData = new \Google\Service\Drive\DriveFile();

            $driveService->files->update(
                $document_id,
                $fileMetaData,
                [
                    'addParents' => $folderId,
                    'removeParents' => 'root'
                ]
            );

            $document_url = "https://docs.google.com/document/d/$document_id";

            return response()->json([
                'document_url' => $document_url,
                'document_id' => $document_id
            ]);
        } catch (\Exception $e) {

            Log::error("Error creating document: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function updateDocumentTitle(Request $request, $document_id)
    {
        try {
            $newTitle = $request->title;
            $client = $this->getGoogleClient();

            if (!$client->getAccessToken()) {
                return response()->json(['message' => 'User is not authenticated'], 401);
            }

            $driveService = new Drive($client);

            $fileMetadata = new \Google\Service\Drive\DriveFile([
                'name' => $newTitle
            ]);

            $driveService->files->update($document_id, $fileMetadata);

            return response()->json(['message' => 'Document title updated successfully!']);
        } catch (\Exception $e) {

            Log::error("Error updating document title: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    private function getGoogleClient()
    {
        try {
            $filePath = storage_path('client_secret.json');

            $client = new Client();
            $client->setAuthConfig($filePath);

            $accessToken = session('google_token');
            $refreshToken = session('google_refresh_token');

            if ($accessToken) {
                $client->setAccessToken($accessToken);

                if ($client->isAccessTokenExpired() && $refreshToken) {
                    $client->fetchAccessTokenWithRefreshToken($refreshToken);
                    session(['google_token' => $client->getAccessToken()]);
                }
            } else {
                Log::error("Google access token not found in session");
            }

            $client->addScope([Docs::DOCUMENTS, Drive::DRIVE]);
            $client->setRedirectUri(route('google.callback'));

            return $client;
        } catch (\Exception $e) {

            Log::error("Error getting google client: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
}