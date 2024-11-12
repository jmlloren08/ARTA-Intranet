<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/', function () {
        return Inertia::render('AT/Dashboard');
    })->name('/');

    // DMS
    Route::get('/document-dashboard', function () {
        return Inertia::render(component: 'DMS/Dashboard');
    })->name('document-dashboard');
    Route::get('/document-draft', function () {
        return Inertia::render(component: 'DMS/Draft');
    })->name('document-draft');
    Route::get('/document-for-approval', function () {
        return Inertia::render(component: 'DMS/ForApproval');
    })->name('document-for-approval');
    Route::get('/document-sent', function () {
        return Inertia::render(component: 'DMS/Sent');
    })->name('document-sent');
    Route::get('/document-viewed', function () {
        return Inertia::render(component: 'DMS/Viewed');
    })->name('document-viewed');
    Route::get('/document-expired', function () {
        return Inertia::render(component: 'DMS/Expired');
    })->name('document-expired');

    // operations
    Route::get('/operations-dashboard', function () {
        return Inertia::render('Operations/Dashboard');
    })->name('operations-dashboard');
    Route::get('/operations-eboss-inspection', function () {
        return Inertia::render(component: 'Operations/eBOSSInspection');
    })->name('operations-eboss-inspection');
    Route::get('/operations-commendation', function () {
        return Inertia::render(component: 'Operations/Commendation');
    })->name('operations-commendation');
    Route::get('/operations-orientation', function () {
        return Inertia::render(component: 'Operations/Orientation');
    })->name('operations-orientation');
    Route::get('/operations-cc-inspection', function () {
        return Inertia::render(component: 'Operations/CCInspection');
    })->name('operations-cc-inspection');

    // activity tracker
    Route::get('/activity-tracker-dashboard', function () {
        return Inertia::render('AT/Dashboard');
    })->name('activity-tracker-dashboard');
    Route::get('/activity-tracker-dashboard/activity-tracker-list', function () {
        return Inertia::render('AT/DetailedList');
    })->name('activity-tracker-list');
    Route::get('/activity-tracker-dashboard/list-of-activities-where-status', function (Request $request) {
        return Inertia::render('AT/ListByStatus', ['selectedStatus' => $request->status]);
    })->name('list-of-activities-where-status');

    // custom
    Route::post('/add-new-work-items', [ActivityController::class, 'store']);
    Route::patch('/update-work-items/{id}', [ActivityController::class, 'update']);
    Route::get('/get-all-activities', [ActivityController::class, 'getAllActivities']);
    Route::get('/get-count-activities', [ActivityController::class, 'getCountActivities']);
    Route::get('/get-distinct-offices', [UserController::class, 'getDistinctOffices']);
    Route::get('/get-names', [UserController::class, 'getNames']);
    Route::get('/get-activities-where-status', [ActivityController::class, 'getActivitiesWhereStatus']);

    // profile & settings
    Route::get('/profile', function () {
        return Inertia::render('Profile');
    })->name('profile');
    Route::get('/settings', function () {
        return Inertia::render(component: 'Settings');
    })->name('settings');
});

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

Route::permanentRedirect('/404', '/register');
Route::permanentRedirect('/404', '/password/reset');

require __DIR__ . '/auth.php';
