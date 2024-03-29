<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('logs', function (Blueprint $table) {
            $table->id();

            $table->string('process_name');

            $table->foreignUuid('process_id');

            $table->integer('process_type');

            $table->foreignId('process_by');

            $table->softDeletes();

            $table->timestamps();

            $table->index(['process_name', 'process_id', 'process_type', 'process_by']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('logs');
    }
};
