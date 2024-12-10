<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'psgc_code',
        'prov_desc',
        'reg_code',
        'prov_code'
    ];

    public function region()
    {
        return $this->belongsTo(Region::class);
    }
}
