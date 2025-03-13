<?php

namespace App\Http\Controllers;

use App\Models\Type;
use Illuminate\Http\Request;

class TypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $types = Type::all();

        return response([
            'status' => 'success',
            'data' => $types,
            'code' => 200
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $type = Type::create([
            'name' => $request->name,
        ]);
        return response([
            'status' => 'success',
            'data' => $type,
            'code' => 201
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Type $type)
    {
        return response([
            'status' => 'success',
            'data' => $type,
            'code' => 200
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Type $type)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
        ]);

        if ($request->has('name')) {
            $type->name = $request->name;
        }

        $type->save();

        return response([
            'status' => 'success',
            'data' => $type,
            'code' => 200
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Type $type)
    {
        $type->delete();

        return response([
            'status' => 'success',
            'message' => 'Routine deleted successfully',
            'code' => 204
        ]);
    }
}
