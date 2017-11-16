<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{
    public function castles() {
        return view('castles');
    }

    public function transformers() {
        return view('transformers');
    }
}
