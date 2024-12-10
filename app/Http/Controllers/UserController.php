<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function getDistinctOffices()
    {
        try {

            $offices = User::select('office')
                ->distinct()
                ->whereNotNull('office')
                ->get();

            return response()->json($offices);
        } catch (\Exception $e) {

            Log::error("Error fetching data: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function getNames()
    {
        try {

            $names = User::select('id', 'name')->get();
            return response()->json($names);
        } catch (\Exception $e) {

            Log::error("Error fetching data: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
}
