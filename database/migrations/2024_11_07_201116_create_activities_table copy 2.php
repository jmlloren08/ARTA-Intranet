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
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->string('work_id');
            $table->string('work_item');
            $table->string('description', 1000);
            $table->string('category');
            $table->string('progress');
            $table->string('complexity');
            $table->date('start_date');
            $table->date('due_date');
            $table->string('assigned_to')->nullable();
            $table->string('key_stakeholders')->nullable();
            $table->string('remarks', 1000)->nullable();
            $table->string('created_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
