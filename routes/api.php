<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('tickets', 'TicketController@index');
Route::get('products', 'ProductsController@index');

Route::get('profil/{username}', 'UserController@show');
Route::get('tickets/{ticketId}', 'TicketController@show')
    ->where('ticketId', '[0-9]+');
Route::get('tickets/{userName}', 'TicketController@current');

Route::post('carbsLine/{ticketId}', 'CarbsLineController@create');
Route::post('product/{ticketId}', 'ProductsController@update');

Route::get('carbsLine/increment/{id}', 'CarbsLineController@increment');
Route::get('carbsLine/delete/{id}', 'CarbsLineController@delete');
Route::get('products/delete/{id}', 'ProductsController@delete');
