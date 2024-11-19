<?php

namespace App\Http\Controllers;

use App\Models\DepartmentAgencies;
use Illuminate\Support\Facades\Log;

class DepartmentAgenciesController extends Controller
{
    public function getDepartmentAgencies()
    {
        try {

            $department_names = DepartmentAgencies::select('department_name')->get();

            return response()->json($department_names);
        } catch (\Exception $e) {

            Log::error("Error fetching data: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
}
