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
        Schema::create('orientation_ia', function (Blueprint $table) {
            $table->id();
            $table->string('agency_lgu');
            $table->date('date_of_inspection');
            $table->string('office');
            $table->string('city_municipality');
            $table->string('province');
            $table->string('region');
            $table->date('action_plan_and_inspection_report_date_sent_to_cmeo')->nullable();
            $table->date('feedback_date_sent_to_oddgo')->nullable();
            $table->date('official_report_date_sent_to_oddgo')->nullable();
            $table->date('feedback_date_received_from_oddgo')->nullable();
            $table->date('official_report_date_received_from_oddgo')->nullable();
            $table->date('feedback_date_sent_to_agencies_lgus')->nullable();
            $table->date('official_report_date_sent_to_agencies_lgus')->nullable();
            $table->string('orientation')->nullable();
            $table->string('setup')->nullable();
            $table->string('resource_speakers')->nullable();
            $table->string('bpm_workshop')->nullable();
            $table->string('re_engineering')->nullable();
            $table->string('cc_workshop')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orientation_ia');
    }
};
