<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CastlesController extends Controller
{
    protected $castleCount = array();
    protected $landscape = array();

    public function calculate(Request $req)
    {
        $landscape = $this->validateInput($req->landscape);
        $castleCount = $this->calculateCastles($landscape);
        return view('castles', compact('castleCount'));
    }

    public function validateInput($input)
    {
        $delimiter = ",";
        $landscape = str_getcsv($input, $delimiter);

        foreach ($landscape as $elevation) {
            if(!is_numeric($elevation)){
                return redirect()->back()->with("error", "Sorry, only integer values are allowed");
            }
        }
        return $landscape;
    }

    public function calculateCastles($landscape)
    {
        $castleCount = 0;
        for($i = 1; $i < count($landscape) - 1;) {
            $index = $i;
            //peak check
            if($landscape[$i] > $landscape[$i - 1]) {
                //check for extended peak
                while($index < count($landscape) && $landscape[$i] == $landscape[$index]){
                   $index++;
                }
                //make sure next value is lower
                if($landscape[$index] < $landscape[$i]) {
                    $castleCount++;
                }
                $i = $index;
            } else if ($landscape[$i] < $landscape[$i - 1]) {
                //valley check
                //check for extended valley
                while($index < count($landscape) && $landscape[$i] == $landscape[$index]){
                    $index++;
                }
                //make sure next value is higher
                if($landscape[$index] > $landscape[$i]) {
                    $castleCount++;
                }
                $i = $index;
            } else {
                $i++;
            }
        }
        return $castleCount;
    }
}
