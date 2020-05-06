<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakePortionColumnFloatOnCarbslinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('carbs_lines', function (Blueprint $table) {
            $table->float('portions')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('carbs_lines', function (Blueprint $table) {
            $table->integer('portions')->change();
        });
    }
}
