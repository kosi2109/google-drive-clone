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
        Schema::create('folders', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignId('owner_id');

            $table->foreignUuid('parent_folder_id')->nullable();

            $table->string('name');

            $table->integer('access')->default(2);

            $table->string('folder_path');

            $table->softDeletes();

            $table->timestamps();

            $table->index(['owner_id', 'parent_folder_id', 'name']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('folders');
    }
};
