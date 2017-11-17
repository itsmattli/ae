<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDecepticonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('decepticons', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('faction');
            $table->integer('strength');
            $table->integer('intelligence');
            $table->integer('speed');
            $table->integer('endurance');
            $table->integer('rank');
            $table->integer('courage');
            $table->integer('firepower');
            $table->integer('skill');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('decepticons');
    }
}
