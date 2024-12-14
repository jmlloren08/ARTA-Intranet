<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentRouting extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'document_id',
        'from_user_id',
        'to_user_id',
        'action',
        'remarks_instructions'
    ];
    // A document routing belongs to one document
    public function document()
    {
        return $this->belongsTo(Document::class);
    }
    // A document routing belongs to one user (from_user_id)
    public function fromUser()
    {
        return $this->belongsTo(User::class, 'from_user_id');
    }
    // A document routing belongs to one user (to_user_id)
    public function toUser()
    {
        return $this->belongsTo(User::class, 'to_user_id');
    }
}
