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
        Schema::create('regional_field_office', function (Blueprint $table) {
            $table->id();
            $table->string('rfo');
            $table->string('user_id');
            $table->string('position');
            $table->integer('contact_number');
            $table->string('reg_code');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('regional_field_office');
    }
};
