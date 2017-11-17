<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Autobot;

class AutobotsController extends Controller
{
    /**
     * Returns all autobots in JSON
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $autobots = Autobot::all();
        return response()->json($autobots, 200);
    }


    /**
     * Creates a new Autobot
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $autobot = Autobot::create($data);
        $message = array("success" => "autobot deleted");

        return response()->json($message, 200);
    }

    /**
     * Returns json for one Autobot
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $autobot = Autobot::find($id);
        return response()->json($autobot, 200);
    }


    /**
     * Updates the specified resource
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $autobot = Autobot::find($id);
        $autobot->delete();
        $message = array("success" => "autobot deleted");
        return response()->json($message, 200);
    }
}
