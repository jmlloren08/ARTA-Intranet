<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Commendation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'date_of_commendation',
        'city_municipality',
        'province',
        'region',
        'date_of_inspection',
        'service_provider',
        'first_validation',
        'remarks_1',
        'second_validation',
        'remarks_2',
        'other_activity',
        'number_of_brgys'
    ];
}
