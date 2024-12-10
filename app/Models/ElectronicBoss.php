<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ElectronicBoss extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'date_of_inspection',
        'city_municipality',
        'province',
        'region',
        'eboss_submission',
        'type_of_boss',
        'deadline_of_action_plan',
        'submission_of_action_plan',
        'remarks',
        'bplo_head',
        'contact_no'
    ];
}
