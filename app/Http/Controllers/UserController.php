<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function getUserWithClientRole()
    {
        $users = User::whereHas('roles', function ($query) {
            $query->where('name', 'client');
        })->get();
        
        return response(
            [
                'status' => 'success',
                'data' => $users,
                'code' => 200
            ]
        );
    }

    public function countClientUsers()
{
    $count = User::whereHas('roles', function ($query) {
        $query->where('name', 'client');
    })->count();

    return response(
        [
            'status' => 'success',
            'data' => $count,
            'code' => 200
        ]
    );
}



    public function index()
    {
        $users = User::all();

        return response(
            [
                'status' => 'success',
                'data' => $users,
                'code' => 200
            ]
        );
    }

    public function store(Request $request){

    }

   

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response(
            [
                'status' => 'success',
                'data' => $user,
                'code' => 200
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'sometimes|string|min:8|confirmed',
        ]);

        if ($request->has('name')) {
            $user->name = $request->name;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->has('password')) {
            $user->password = bcrypt($request->password);
        }

        $user->save();

        return response(
            [
                'status' => 'success',
                'data' => $user,
                'code' => 200
            ]
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(null, 204);
    }
}
