<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Routine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class RoutineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $routines = Routine::all();

        return response([
            'status' => 'success',
            'data' => $routines,
            'code' => 200
        ]);

    }

    public function defaultRoutine()
    {
        $adminId = User::whereHas('roles', function ($query) {
            $query->where('name', 'admin');
        })->pluck('id');
        if(count($adminId) > 1){
            $routines = Routine::whereIn('user_id', $adminId)->get();
        }else{
            $routines = Routine::where('user_id', $adminId)->get();
        }
        
        

        return response([
            'status' => 'success',
            'data' => $routines,
            'code' => 200
        ]);

    }

    public function getRoutinesByUserId($userId)
    {
        
        $routines = Routine::where('user_id', $userId)->get();

        return response([
            'status' => 'success',
            'data' => $routines,
            'code' => 200
        ]);

    }

    public function countRoutines()
    {
        $adminId = User::whereHas('roles', function ($query) {
            $query->where('name', 'admin');
        })->pluck('id');

        if(count($adminId) > 1){
            $count = Routine::whereIn('user_id', $adminId)->count();
        }else{
            $count = Routine::where('user_id', $adminId)->count();
        }

        

        return response([
            'status' => 'success',
            'data' => $count,
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
            'description' => 'string',
            'user_id' => 'required|integer|exists:users,id'
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
        Log::alert($routine);
        $request->validate([
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'user_id' => 'integer|exists:users,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);


    

        if ($request->has('name')) {
            $routine->name = $request->name;
        }
        if ($request->has('description')) {
            $routine->description = $request->description;
        }
        if (!$routine->user_id) {
        
            $routine->user_id = $request->user_id; 
        }

        if ($request->hasFile('image')) {
            if ($routine->image) {
                Storage::delete(str_replace('/storage', 'public', $routine->image));
            }
            //Modificar nombre de la imagen a id del routine.
            $imageExtension = $request->file('image')->getClientOriginalExtension();
            $newImageName = 'routine_' . $routine->id . '.' . $imageExtension;
            //Subir imagen
            $imagePath = $request->file('image')->storeAs('public/routine_images', $newImageName);
            $imageUrl = Storage::url($imagePath);
            $routine->image = $imageUrl;
        }
        


        $routine->save();

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
