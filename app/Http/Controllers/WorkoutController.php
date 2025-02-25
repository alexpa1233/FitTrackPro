<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use Illuminate\Http\Request;

class WorkoutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
       $routineId = $request->routine_id;
       $workouts = Workout::where('routine_id', $routineId)->get();
       return response([
           'status' => 'success',
           'data' => $workouts,
           'code' => 200
       ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'routine_id' => 'required|integer|exists:routines,id',
            'name' => 'required|string|max:255',
        ]);

        $workout = Workout::create([
            'routine_id' => $request->routine_id,
            'name' => $request->name,
        ]);

        return response([
            'status' => 'success',
            'data' => $workout,
            'code' => 201
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Workout $workout)
    {
        return response([
            'status' => 'success',
            'data' => $workout,
            'code' => 200
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Workout $workout)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $workout->update([
            'name' => $request->name,
        ]);

        return response([
            'status' => 'success',
            'data' => $workout,
            'code' => 200
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Workout $workout)
    {
        $workout->delete();
        return response([
            'status' => 'success',
            'data' => null,
            'code' => 204
        ]);
    }
}
