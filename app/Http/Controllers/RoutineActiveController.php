<?php

namespace App\Http\Controllers;

use App\Models\RoutineActive;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RoutineActiveController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    //No necesito funciones como index o update

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        Log::alert($request);

        $request->validate([
            'routine_id' => 'required|exists:routines,id',
            'user_id' => 'required|exists:users,id',
        ]);

        
        $existingRoutineActive = RoutineActive::where('user_id', $request->user_id)->first();
        //Si existe lo borramos (solucion de errores)
        if ($existingRoutineActive) {
            $existingRoutineActive->delete();
        }
        $routineActive = RoutineActive::create([
            'routine_id' => $request->routine_id,
            'user_id' => $request->user_id,
        ]);
        return response(
            [
                'status' => 'create',
                'data' => $routineActive,
                'code' => 201
            ]
        );
    }

    /**
     * Display the specified resource.
     */
    public function show($userId)
    {
        //
        $routineActive = RoutineActive::where('user_id',$userId)->first();

        if(!$routineActive){
            return response(
                [
                    'code' => 404,
                ]
            );
        }

        $routine = $routineActive->routine;
        return response(
            [
                'status' => 'success',
                'data' => $routine,
                'code' => 200
            ]
        );

    }

    /**
     * Update the specified resource in storage.
     */
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RoutineActive $routineActive)
    {
        $routineActive->delete();
        //
        return response(
            [
                'status' => 'success',
                'message' => 'Routine actived deleted successfully',
                'code' => 204
            ]
        );
    }
}
