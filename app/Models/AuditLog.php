<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'document_id',
        'performed_by_user_id',
        'action',
        'details'
    ];
    // A document audit log belongs to one document
    public function document()
    {
        return $this->belongsTo(Document::class);
    }
    // A document audit log belongs to one user
    public function user()
    {
        return $this->belongsTo(User::class, 'performed_by_user_id');
    }
}
