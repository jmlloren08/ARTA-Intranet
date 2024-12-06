<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrientationInspectedAgencies extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'agency_lgu',
        'date_of_inspection',
        'office',
        'city_municipality',
        'province',
        'region',
        'action_plan_and_inspection_report_date_sent_to_cmeo',
        'feedback_date_sent_to_oddgo',
        'official_report_date_sent_to_oddgo',
        'feedback_date_received_from_oddgo',
        'official_report_date_received_from_oddgo',
        'feedback_date_sent_to_agencies_lgus',
        'official_report_date_sent_to_agencies_lgus',
        'orientation',
        'setup',
        'resource_speakers',
        'bpm_workshop',
        're_engineering',
        'cc_workshop'
    ];
}
