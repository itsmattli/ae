<?php

namespace App\Http\Controllers;

use App\Decepticon;
use Illuminate\Http\Request;

class DecepticonsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $decepticons = Decepticon::all();
        return response()->json($decepticons, 200);
    }


    /**
     * Creates a new Decepticon
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        Decepticon::create($data);
        $message = array("success" => "decepticon deleted");

        return response()->json($message, 200);
    }

    /**
     * Returns Decepticon as JSON
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $decepticon = Decepticon::find($id);
        return response()->json($decepticon, 200);
    }

    /**
     * Update the specified resource in storage.
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
        $decepticon = Decepticon::find($id);
        $decepticon->delete();
        return response('Decepticon deleted', 204);
    }
}
