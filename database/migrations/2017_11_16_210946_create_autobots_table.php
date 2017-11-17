<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAutobotsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('autobots', function (Blueprint $table) {
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
    //'name', 'strength', 'intelligence', 'speed', 'endurance', 'rank', 'courage', 'firepower', 'skill',

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('autobots');
    }
}
