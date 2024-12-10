<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\DepartmentAgenciesController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OperationsController;
use App\Http\Controllers\ProfileController;
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
    Route::get('/document-new', function () {
        return Inertia::render(component: 'DMS/Document/NewDocument');
    })->name('document-new');
    Route::get('/my-documents', function () {
        return Inertia::render(component: 'DMS/Document/MyDocuments');
    })->name('my-documents');
    Route::get('/all-documents', function () {
        return Inertia::render(component: 'DMS/Document/AllDocuments');
    })->name('all-documents');
    Route::get('/documents-templates', function () {
        return Inertia::render(component: 'DMS/Document/Templates');
    })->name('documents-templates');
    Route::get('/document-in-progress', function () {
        return Inertia::render(component: 'DMS/Workflow/InProgress');
    })->name('document-in-progress');
    Route::get('/document-under-review', function () {
        return Inertia::render(component: 'DMS/Workflow/UnderReview');
    })->name('document-under-review');
    Route::get('/document-approved', function () {
        return Inertia::render(component: 'DMS/Workflow/Approved');
    })->name('document-approved');
    Route::get('/document-rejected', function () {
        return Inertia::render(component: 'DMS/Workflow/Rejected');
    })->name('document-rejected');
    Route::get('/document-version-history', function () {
        return Inertia::render(component: 'DMS/Workflow/VersionHistory');
    })->name('document-version-history');


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
    Route::get('/activity-tracker-dashboard/calendar-of-activities', function () {
        return Inertia::render('AT/Calendar');
    })->name('calendar-of-activities');

    // custom / at
    Route::post('/add-new-work-items', [ActivityController::class, 'store']);
    Route::patch('/update-work-items/{id}', [ActivityController::class, 'update']);
    Route::get('/get-all-activities', [ActivityController::class, 'getAllActivities']);
    Route::get('/get-count-activities', [ActivityController::class, 'getCountActivities']);
    Route::get('/get-distinct-offices', [UserController::class, 'getDistinctOffices']);
    Route::get('/get-names', [UserController::class, 'getNames']);
    Route::get('/get-activities-where-status', [ActivityController::class, 'getActivitiesWhereStatus']);
    Route::get('/get-key-stakeholders', [DepartmentAgenciesController::class, 'getDepartmentAgencies']);

    // custom / operations
    Route::get('/get-count-operations', [OperationsController::class, 'getCountOperations']);
    Route::get('/get-regions', [OperationsController::class, 'getRegions']);
    Route::get('/get-provinces-by-region', [OperationsController::class, 'getProvincesByRegion']);
    Route::get('/get-cities-municipalities-by-province', [OperationsController::class, 'getCitiesMunicipalitiesByProvince']);

    // notifications
    Route::get('/get-notifications', [NotificationController::class, 'getNotifications']);
    Route::post('/notifications/{id}/mark-as-read', [NotificationController::class, 'markNotificationAsRead']);
    Route::post('/notifications/mark-all-as-read', [NotificationController::class, 'markAllAsRead']);

    // custom / dms
    Route::get('/google/auth', [GoogleController::class, 'authenticate'])->name('google.auth');
    Route::get('/google/callback', [GoogleController::class, 'callback'])->name('google.callback');
    Route::post('/google/docs/create', [GoogleController::class, 'createDocument'])->name('google.docs.create');
    Route::patch('/google/docs/update-document-title/{document_id}', [GoogleController::class, 'updateDocumentTitle'])->name('google.docs.update');
    Route::get('/list-my-documents', [DocumentController::class, 'getMyDocuments']);
    Route::get('/list-all-documents', [DocumentController::class, 'getAllDocuments']);
    Route::get('/list-in-progress-documents', [DocumentController::class, 'getInProgressDocuments']);
    Route::post('/create-new-document', [DocumentController::class, 'store']);
    Route::put('/update-document/{id}', [DocumentController::class, 'update']);
    Route::patch('/update-document-metadata/{id}', [DocumentController::class, 'updateDocumentMetadata']);

    // profile & settings
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile-update-information', [ProfileController::class, 'updateProfileInformation'])->name('profile.update.information');
    Route::post('/profile-update-photo', [ProfileController::class, 'updatePhoto'])->name('profile.update.photo');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/settings', function () {
        return Inertia::render(component: 'Settings');
    })->name('settings');
});

Route::permanentRedirect('/404', '/register');
Route::permanentRedirect('/404', '/password/reset');

require __DIR__ . '/auth.php';
