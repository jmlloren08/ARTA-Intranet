<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrientationOverall extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'orientation_date',
        'agency_lgu',
        'office',
        'city_municipality',
        'province',
        'region',
        'is_ra_11032',
        'is_cart',
        'is_programs_and_services',
        'is_cc_orientation',
        'is_cc_workshop',
        'is_bpm_workshop',
        'is_ria',
        'is_eboss',
        'is_csm',
        'is_reeng'
    ];
}
