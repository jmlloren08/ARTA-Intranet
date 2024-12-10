<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'document_id',
        'document_number',
        'title',
        'description',
        'category',
        'status',
        'due_date',
        'assigned_to',
        'created_by',
        'updated_by',
        'scanned_file_path',
        'document_url'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'users_documents', 'document_id', 'user_id');
    }
}
