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
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('document_id');
            $table->unsignedBigInteger('performed_by_user_id');
            $table->foreign('document_id')->references('id')->on('documents')->onDelete('cascade');
            $table->foreign('performed_by_user_id')->references('id')->on('users');
            $table->enum('action', ['Created', 'Edited', 'Modified', 'Routed', 'Returned', 'Received', 'Reviewed', 'Viewed', 'Approved', 'Rejected'])->nullable();
            $table->text('details')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
    }
};
