<?php

namespace App\Http\Controllers;

use App\Models\ExerciseStatistic;
use Illuminate\Http\Request;

class ExerciseStatisticController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $userId = $request->user()->id;
        $exerciseStatistics = ExerciseStatistic::where('user_id', $userId)->get();

        return response(
            [
                'status' => 'success',
                'data' => $exerciseStatistics,
                'code' => 200
            ]
        );
    }

    public function getByWorkoutExercise(Request $request, $workoutExerciseId)
    {
        $userId = $request->user()->id;
        $exerciseStatistics = ExerciseStatistic::where('user_id', $userId)
            ->where('workout_exercise_id', $workoutExerciseId)
            ->get();

        return response([
            'status' => 'success',
            'data' => $exerciseStatistics,
            'code' => 200
        ]);
    }

    public function getByUserAndExercise(Request $request, $exerciseId)
    {
        $userId = $request->user()->id;
        $exerciseStatistics = ExerciseStatistic::where('user_id', $userId)
            ->whereHas('workoutExercise', function ($query) use ($exerciseId) {
                $query->where('exercise_id', $exerciseId);
            })
            ->get();

        return response([
            'status' => 'success',
            'data' => $exerciseStatistics,
            'code' => 200
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'workout_exercise_id' => 'required|integer|exists:workout_exercises,id',
            'sets' => 'nullable|integer',
            'reps' => 'nullable|integer',
            'weight' => 'nullable|numeric',
            'duration' => 'nullable|integer',
            'date' => 'required|date',
        ]);

        $exerciseStatistic = ExerciseStatistic::create([
            'user_id' => $request->user()->id,
            'workout_exercise_id' => $request->workout_exercise_id,
            'sets' => $request->sets,
            'reps' => $request->reps,
            'weight' => $request->weight,
            'duration' => $request->duration,
            'date' => $request->date,
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $exerciseStatistic,
            'code' => 201
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function show(ExerciseStatistic $exerciseStatistic)
    {
        return response([
            'status' => 'success',
            'data' => $exerciseStatistic,
            'code' => 200
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ExerciseStatistic $exerciseStatistic)
    {
        $request->validate([
            'sets' => 'nullable|integer',
            'reps' => 'nullable|integer',
            'weight' => 'nullable|numeric',
            'duration' => 'nullable|integer',
            'date' => 'required|date',
        ]);

        $exerciseStatistic->update([
            'sets' => $request->sets,
            'reps' => $request->reps,
            'weight' => $request->weight,
            'duration' => $request->duration,
            'date' => $request->date,
        ]);

        return response([
            'status' => 'success',
            'data' => $exerciseStatistic,
            'code' => 200
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExerciseStatistic $exerciseStatistic)
    {
        $exerciseStatistic->delete();

        return response([
            'status' => 'success',
            'message' => 'Exercise statistic deleted successfully',
            'code' => 200
        ]);
    }
}
