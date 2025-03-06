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
use App\Http\Controllers\LoginLogController;
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
    
    //public Auth
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    Route::middleware(['auth:sanctum'])->group(function () {
        //Auth
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        //User
        Route::get('/user/client', [UserController::class, 'getUserWithClientRole']);
        Route::get('/user/client/count', [UserController::class, 'countClientUsers']);
        Route::apiResource('/user', UserController::class);
       

       //exercise
        Route::get('/exercises/user/{userId}', [ExerciseController::class, 'index']);
        Route::get('/exercises', [ExerciseController::class, 'defaultExercises']);
        Route::get('/exercises/count', [ExerciseController::class, 'countExercises']);
        Route::get('/exercises/user/{userId}/count', [ExerciseController::class, 'countUserExercises']);
        Route::apiResource('/exercises', ExerciseController::class)->except(['index']);

        
        Route::get('/exercise-statistics', [ExerciseStatisticController::class, 'index']);
        Route::get('/exercise-statistics/workout/{workoutExerciseId}', [ExerciseStatisticController::class, 'getByWorkoutExercise']);
        Route::get('/exercise-statistics/exercise/{exerciseId}', [ExerciseStatisticController::class, 'getByUserAndExercise']);
        Route::apiResource('/exercise-statistics', ExerciseStatisticController::class)->except(['index']);

        
        Route::get('/routines/count', [RoutineController::class, 'countRoutines']);
        Route::apiResource('/routines', RoutineController::class);

        
        Route::apiResource('/types', TypeController::class);

        
        Route::apiResource('/workouts', WorkoutController::class);

        
        Route::apiResource('/workout-exercises', WorkoutExerciseController::class);


        Route::get('/month-activity', [LoginLogController::class, 'getMonthlyLoginActivity']);
    });
});




//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});
