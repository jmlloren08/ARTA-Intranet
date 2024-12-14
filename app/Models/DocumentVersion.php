<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentVersion extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'document_id',
        'version_number',
        'google_doc_version_id'
    ];
    // A document version belongs to one document
    public function document()
    {
        return $this->belongsTo(Document::class);
    }
}
