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
    // A document can have many users (through users_documents)
    public function users()
    {
        return $this->belongsToMany(User::class, 'users_documents', 'document_id', 'user_id');
    }
    // A document can have many routing actions (through document_routing)
    public function routings()
    {
        return $this->hasMany(DocumentRouting::class);
    }
    // A document can have many audit logs (through audit_logs)
    public function auditLogs()
    {
        return $this->hasMany(AuditLog::class);
    }
    // A document can have many versions (through document_versions)
    public function versions()
    {
        return $this->hasMany(DocumentVersion::class);
    }
}
