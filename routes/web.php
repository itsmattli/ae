<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'PagesController@index');

Route::get('/castles', 'PagesController@castles');
Route::get('/transformers', 'PagesController@transformers');
Route::post('/castles/calculate', 'CastlesController@calculate');

/*Route::post('/decepticons/{id}', 'DecepticonsController@destroy');
Route::post('/autobots/{id}', 'AutobotsController@destroy');*/
