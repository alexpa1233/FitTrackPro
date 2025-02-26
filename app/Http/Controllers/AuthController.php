<?php

namespace App\Http\Controllers;

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
                'data' => $token,
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

        

        
        if(auth()->attempt(['email' => $request->email, 'password' => $request->password])){

            $user = auth()->user();

            $user->hasRole('client');
            $token = $user->createToken('auth_token')->plainTextToken;
        }else{
            return response(
                [
                    'status' => 'error',
                    'message' => 'Unauthorized',
                    'code' => 401
                ]
            );
        }
        return response(
            [
                'status' => 'success',
                'data' => [$token,$user],
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
