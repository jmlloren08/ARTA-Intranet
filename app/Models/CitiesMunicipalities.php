<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CitiesMunicipalities extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'psgc_code',
        'citymun_desc',
        'reg_code',
        'prov_code',
        'citymun_code'
    ];

    public function region()
    {
        return $this->belongsTo(Region::class);
    }
    public function province()
    {
        return $this->belongsTo(Province::class);
    }
}
