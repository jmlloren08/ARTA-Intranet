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
        Schema::create('orientation_o', function (Blueprint $table) {
            $table->id();
            $table->string('orientation_date');
            $table->string('agency_lgu');
            $table->string('office');
            $table->string('city_municipality');
            $table->string('province');
            $table->string('region');
            $table->string('is_ra_11032')->nullable();
            $table->string('is_cart')->nullable();
            $table->string('is_programs_and_services')->nullable();
            $table->string('is_cc_orientation')->nullable();
            $table->string('is_cc_workshop')->nullable();
            $table->string('is_bpm_workshop')->nullable();
            $table->string('is_ria')->nullable();
            $table->string('is_eboss')->nullable();
            $table->string('is_csm')->nullable();
            $table->string('is_reeng')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orientation_o');
    }
};
