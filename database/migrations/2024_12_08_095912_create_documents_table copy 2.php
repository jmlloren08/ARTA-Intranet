<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string('document_id')->unique();
            $table->string('document_number')->unique();
            $table->string('title');
            $table->string('description');
            $table->string('category');
            $table->string('status')->default('Draft');
            $table->date('due_date');
            $table->string('assigned_to')->nullable();
            $table->string('created_by');
            $table->string('updated_by')->nullable();
            $table->string('scanned_file_path')->nullable();
            $table->string('document_url');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
