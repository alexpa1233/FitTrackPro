<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\RoutineController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\WorkoutExerciseController;
use App\Http\Controllers\ExerciseStatisticController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('v1')->group(function(){
    

    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    Route::group(['middleware' => 'auth:sanctum'], function(){
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        Route::apiResource('/user', UserController::class);

       
        Route::get('/exercises', [ExerciseController::class, 'index']);
        Route::get('/exercises/user/{userId}', [ExerciseController::class, 'getUserExercises']);
        Route::get('/exercises/user/{userId}/count', [ExerciseController::class, 'countUserExercises']);
        Route::apiResource('/exercises', ExerciseController::class)->except(['index']);

        Route::get('/exercise-statistics', [ExerciseStatisticController::class, 'index']);
        Route::get('/exercise-statistics/workout/{workoutExerciseId}', [ExerciseStatisticController::class, 'getByWorkoutExercise']);
        Route::get('/exercise-statistics/exercise/{exerciseId}', [ExerciseStatisticController::class, 'getByUserAndExercise']);
        Route::apiResource('/exercise-statistics', ExerciseStatisticController::class)->except(['index']);

        
        Route::apiResource('/routines', RoutineController::class);

        
        Route::apiResource('/types', TypeController::class);

        
        Route::apiResource('/workouts', WorkoutController::class);

        
        Route::apiResource('/workout-exercises', WorkoutExerciseController::class);
    });
});




Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
