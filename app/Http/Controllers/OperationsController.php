<?php

namespace App\Http\Controllers;

use App\Models\CitiesMunicipalities;
use App\Models\Commendation;
use App\Models\ElectronicBoss;
use App\Models\OrientationInspectedAgencies;
use App\Models\OrientationOverall;
use App\Models\Province;
use App\Models\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OperationsController extends Controller
{
    public function getCountOperations()
    {
        try {

            $ebossInspection = ElectronicBoss::selectRaw('EXTRACT(MONTH FROM date_of_inspection) as month, COUNT(*) as count')
                ->groupBy('month')
                ->orderBy('month')
                ->get()
                ->keyBy('month')
                ->map(fn($row) => $row->count);

            $commendation = Commendation::selectRaw('EXTRACT(MONTH FROM date_of_commendation) as month, COUNT(*) as count')
                ->groupBy('month')
                ->orderBy('month')
                ->get()
                ->keyBy('month')
                ->map(fn($row) => $row->count);

            $orientationIA = OrientationInspectedAgencies::selectRaw('EXTRACT(MONTH FROM date_of_inspection) as month, COUNT(*) as count')
                ->groupBy('month')
                ->orderBy('month')
                ->get()
                ->keyBy('month')
                ->map(fn($row) => $row->count);

            $orientation = OrientationInspectedAgencies::count() + OrientationOverall::count();

            $ccInspection = 0;

            return response()->json([
                'totals' => [
                    'ebossInspection' => $ebossInspection->sum(),
                    'commendation' => $commendation->sum(),
                    'orientation' => $orientation,
                    'ccInspection' => $ccInspection
                ],
                'monthly' => [
                    'ebossInspection' => $ebossInspection,
                    'commendation' => $commendation,
                    'orientation' => $orientationIA,
                    'ccInspection' => $ccInspection
                ]
            ]);
        } catch (\Exception $e) {

            Log::error("Error fetching data: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function getRegions()
    {
        try {

            $regions = Region::select('reg_desc', 'reg_code')->get();

            return response()->json($regions);
        } catch (\Exception $e) {

            Log::error("Error fetching data: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function getProvincesByRegion(Request $request)
    {
        try {
            $reg_code = $request->reg_code;
            $provinces = Province::select('prov_desc', 'prov_code')->where('reg_code', $reg_code)->get();
            return response()->json($provinces);
        } catch (\Exception $e) {

            Log::error("Error fetching data: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function getCitiesMunicipalitiesByProvince(Request $request)
    {
        try {
            $prov_code = $request->prov_code;
            $cities_municipalities = CitiesMunicipalities::select('citymun_desc', 'citymun_code')->where('prov_code', $prov_code)->get();
            return response()->json($cities_municipalities);
        } catch (\Exception $e) {

            Log::error("Error fetching data: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
}
