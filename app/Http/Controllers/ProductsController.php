<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Product[]|Collection
     */
    public function index()
    {
        return Product::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  int  $id
     * @return Product
     */
    public function update(Request $request, $id)
    {
        $productName = $request->get('product');
        $carbsPerHundred = intval($request->get('carbsPerHundred'));
        $gramsPerPortion = intval($request->get('gramsPerPortion'));
        $carbsPerPortion = intval($request->get('carbsPerPortion'));

        /** @var Product $product */
        $product = Product::findOrFail($id);
        $product->name = $productName;
        $product->carbsPerHundred = $carbsPerHundred;
        $product->gramsPerPortion = $gramsPerPortion;
        $product->carbsPerPortion = $carbsPerPortion;

        if ($carbsPerPortion != $carbsPerHundred / 100 * $gramsPerPortion) {
            $product->carbsPerHundred = $carbsPerPortion;
            $product->gramsPerPortion = 100;
        }

        $product->save();

        return $product;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Product
     */
    public function delete($id)
    {
        return Product::find($id)->forceDelete();
    }
}
