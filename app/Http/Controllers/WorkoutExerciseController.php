<?php

namespace App\Http\Controllers;

use App\Models\WorkoutExercise;
use Illuminate\Http\Request;

class WorkoutExerciseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $workoutExercises = WorkoutExercise::all();
        return response([
            'status' => 'success',
            'data' => $workoutExercises,
            'code' => 200
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'workout_id' => 'required|integer|exists:workouts,id',
            'exercise_id' => 'required|integer|exists:exercises,id',
            'sets' => 'required|integer'
        ]);

        $workoutExercise = WorkoutExercise::create([
            'workout_id' => $request->workout_id,
            'exercise_id' => $request->exercise_id,
            'sets' => $request->sets
        ]);

        return response([
            'status' => 'success',
            'data' => $workoutExercise,
            'code' => 201
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(WorkoutExercise $workoutExercise)
    {
        return response([
            'status' => 'success',
            'data' => $workoutExercise,
            'code' => 200
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WorkoutExercise $workoutExercise)
    {
        $request->validate([
            'sets' => 'sometimes|integer'
        ]);

        if ($request->has('sets')) {
            $workoutExercise->sets = $request->sets;
        }

        $workoutExercise->save();

        return response([
            'status' => 'success',
            'data' => $workoutExercise,
            'code' => 200
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WorkoutExercise $workoutExercise)
    {
        $workoutExercise->delete();
        return response([
            'status' => 'success',
            'code' => 204
        ]);
    }
}
