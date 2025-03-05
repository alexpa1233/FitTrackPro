<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $exercises = Exercise::where('user_id', 0)->get();

        return response(
            [
                'status' => 'success',
                'data' => $exercises,
                'code' => 200
            ]
        );
    }

    public function countExercises()
    {
        $count = Exercise::where('user_id', 0)->count();

        return response(
            [
                'status' => 'success',
                'data' => $count,
                'code' => 200
            ]
        );
    }


    public function getUserExercises(Request $request)
    {
        $exercises = Exercise::where('user_id', $request->user()->id)->get();
        

        return response(
            [
                'status' => 'success',
                'data' => $exercises,
                'code' => 200
            ]
        );
    }

    public function getUserExercisesByType(Request $request, $typeId)
    {
        $exercises = Exercise::where('user_id', $request->user()->id)
            ->where('type_id', $typeId)
            ->get();

        return response(
            [
                'status' => 'success',
                'data' => $exercises,
                'code' => 200
            ]   
        );
    }

    public function countUserExercises(Request $request)
    {
        $count = Exercise::where('user_id', $request->user()->id)->count();

        return response(   
            [
                'status' => 'success',
                'data' => $count,
                'code' => 200
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate(
            [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'user_id' => 'required|integer|exists:users,id',
                'type_id' => 'required|integer|exists:types,id',
            ]
        );

        $exercise = Exercise::create(
            [
                'name' => $request->name,
                'description' => $request->description,
                'user_id' => $request->user_id,
                'type_id' => $request->type_id,
            ]
        );

        return response(
            [
                'status' => 'success',
                'data' => $exercise,
                'code' => 201
            ]
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Exercise $exercise)
    {
        
        return response(
            [
                'status' => 'success',
                'data' => $exercise,
                'code' => 200
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Exercise $exercise)
    {
        $request->validate(
            [
                'name' => 'sometimes|string|max:255',
                'description' => 'nullable|string',
                'type_id' => 'sometimes|integer|exists:types,id',
            ]
        );

        if ($request->has('name')) {
            $exercise->name = $request->name;
        }
        if ($request->has('description')) {
            $exercise->description = $request->description;
        }
        if ($request->has('type_id')) {
            $exercise->type_id = $request->type_id;
        }

        $exercise->save();

        return response(
            [
                'status' => 'success',
                'data' => $exercise,
                'code' => 200
            ]
        );
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exercise $exercise)
    {
        $exercise->delete();

        return response(
            [
                'status' => 'success',
                'message' => 'Exercise deleted successfully',
                'code' => 204
            ]
        );
    }
}
