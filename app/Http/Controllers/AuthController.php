<?php

namespace App\Http\Controllers;

use App\Models\LoginLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $user->assignRole('client');
        $token = $user->createToken('auth_token')->plainTextToken;
       return response(
            [
                'status' => 'created',
                'token' => $token,
                'user'=>$user->load('roles'),
                'code' => 201
            ]
            
       );
    }




    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if(!Auth::attempt($request->only('email', 'password'))){
            return response([
                'status' => 'error',
                'message' => 'Unauthorized',
                'code' => 401
            ]);
        }

        
       $user = Auth::user()->load('roles');
       
       if ($user->roles->contains('name', 'client')) {
        LoginLog::create([
            'user_id' => $user->id
        ]);
    }
    


       $token = $user->createToken('auth_token')->plainTextToken;
       return response(
            [
                'status' => 'success',
                'token' => $token,
                'user'=>$user->load('roles'),
                'code' => 200
            ]
            
       );
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response(
            [
                'status' => 'success',
                'message' => 'Session deleted',
                'code' => 200
            ]
        );
    }
}
