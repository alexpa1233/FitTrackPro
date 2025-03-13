<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Exercise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ExerciseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $exercises = Exercise::all();

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
        $adminId = User::whereHas('roles', function ($query) {
                    $query->where('name', 'admin');
                })->pluck('id');

        $count = Exercise::whereIn('user_id', $adminId)->count();

        return response(
            [
                'status' => 'success',
                'data' => $count,
                'code' => 200
            ]
        );
    }


    public function defaultExercise()
    {
        $adminId = User::whereHas('roles', function ($query) {
            $query->where('name', 'admin');
        })->pluck('id');

        $exercises = Exercise::whereIn('user_id', $adminId)->with('type')->get();

        return response(
            [
                'status' => 'success',
                'data' => $exercises,
                'code' => 200
            ]
        );
    }


    public function getUserExercises($userId)
    {
        $exercises = Exercise::with('type')->where('user_id',$userId)->get();
        

        return response(
            [
                'status' => 'success',
                'data' => $exercises,
                'code' => 200
            ]
        );
    }

    public function filterByType($typeId)
    {
        $exercises = Exercise::where('type_id', $typeId)->get();

        return response(
            [
                'status' => 'success',
                'data' => $exercises,
                'code' => 200
            ]   
        );
    }

    public function countUserExercises($userId)
    {
        $count = Exercise::where('user_id', $userId)->count();

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
    $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'user_id' => 'required|integer|exists:users,id',
        'type_id' => 'required|integer|exists:types,id',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

   
    $exercise = Exercise::create([
        'name' => $request->name,
        'description' => $request->description,
        'user_id' => $request->user_id,
        'type_id' => $request->type_id,
        'image' => null,  // Inicialmente nulo
    ]);

    
    if ($request->hasFile('image')) {
        //Modificar nombre de la imagen a id del ejercicio.
        $imageExtension = $request->file('image')->getClientOriginalExtension();
        $newImageName = 'exercise_' . $exercise->id . '.' . $imageExtension;
        //Subir imagen
        $imagePath = $request->file('image')->storeAs('public/exercise_images', $newImageName);
        $imageUrl = Storage::url($imagePath);
        $exercise->update(['image' => $imageUrl]);
    }

    return response([
        'status' => 'success',
        'data' => $exercise,
        'code' => 201
    ]);
}

    /**
     * Display the specified resource.
     */
    public function show(Exercise $exercise)
    {   
        $exercise->load('type');
        
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
        Log::alert($request);
        $request->validate([
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'user_id' => 'integer|exists:users,id',
            'type_id' => 'integer|exists:types,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        

        if ($request->has('name')) {
            $exercise->name = $request->name;
        }
        if ($request->has('description')) {
            $exercise->description = $request->description;
        }
        if ($request->has('type_id')) {
            $exercise->type_id = $request->type_id;
        }

        
        if ($request->hasFile('image')) {
            if ($exercise->image) {
                Storage::delete(str_replace('/storage', 'public', $exercise->image));
            }
            //Modificar nombre de la imagen a id del ejercicio.
            $imageExtension = $request->file('image')->getClientOriginalExtension();
            $newImageName = 'exercise_' . $exercise->id . '.' . $imageExtension;
            //Subir imagen
            $imagePath = $request->file('image')->storeAs('public/exercise_images', $newImageName);
            $imageUrl = Storage::url($imagePath);
            $exercise->image = $imageUrl;
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
