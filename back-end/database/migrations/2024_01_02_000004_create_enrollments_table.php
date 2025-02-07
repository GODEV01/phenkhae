<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('enrollments', function (Blueprint $table) {
            $table->unsignedBigInteger("course_group_id");
            $table->unsignedBigInteger("student_id");
            $table->tinyInteger("activity_case_status");
            $table->dateTime("enrollment_date");
            $table->dateTime("date_start");
            $table->dateTime("date_end");
            $table->foreignId("course_price_id")->constrained('course_prices', 'id');
            $table->primary(["course_group_id", "student_id"]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enrollments');
    }
};
