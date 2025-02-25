<?php

namespace App\Http\Controllers;

use App\Models\Routine;
use Illuminate\Http\Request;

class RoutineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = $request->user()->id;
        $routines = Routine::where('user_id', $userId)->get();

        return response([
            'status' => 'success',
            'data' => $routines,
            'code' => 200
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'user_id' => 'required|integer'
        ]);

        $routine = Routine::create($request->all());

        return response([
            'status' => 'success',
            'data' => $routine,
            'code' => 201
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Routine $routine)
    {
        
        return response([
            'status' => 'success',
            'data' => $routine,
            'code' => 200
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Routine $routine)
    {
        $request->validate([
            'name' => 'string',
            'description' => 'string'
        ]);

        $routine->update($request->all());

        return response([
            'status' => 'success',
            'data' => $routine,
            'code' => 200
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Routine $routine)
    {
        $routine->delete();

        return response([
            'status' => 'success',
            'message' => 'Routine deleted successfully',
            'code' => 204
        ]);
    }
}
