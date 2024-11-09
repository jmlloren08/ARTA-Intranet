<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activities extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'work_id',
        'work_item',
        'description',
        'category',
        'progress',
        'complexity',
        'start_date',
        'due_date',
        'assigned_to',
        'key_stakeholders',
        'remarks',
        'created_by'
    ];
}
