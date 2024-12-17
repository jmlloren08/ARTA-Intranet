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
            $table->id()->startingValue(999999);
            $table->string('document_id')->unique()->nullable();
            $table->string('document_number')->unique();
            $table->string('title');
            $table->string('description', 1000);
            $table->string('category');
            $table->string('complexity');
            $table->string('status')->default('Draft');
            $table->date('due_date');
            $table->string('created_by');
            $table->string('updated_by')->nullable();
            $table->string('scanned_file_path')->nullable();
            $table->string('document_url')->nullable();
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
