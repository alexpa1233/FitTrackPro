<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoutineController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\LoginLogController;
use App\Http\Controllers\RoutineActiveController;
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
       Route::get('/exercises/filter/{typeId}', [ExerciseController::class, 'filterByType']);
        Route::get('/exercises/default', [ExerciseController::class, 'defaultExercise']);
        Route::get('/exercises/count', [ExerciseController::class, 'countExercises']);
        Route::get('/exercises/user/{userId}/count', [ExerciseController::class, 'countUserExercises']);
        Route::get('/exercises/user/{userId}', [ExerciseController::class, 'getUserExercises']);
        Route::apiResource('/exercises', ExerciseController::class);

        //exercise statics
        Route::get('/exercise-statistics', [ExerciseStatisticController::class, 'index']);
        Route::get('/exercise-statistics/workout/{workoutExerciseId}', [ExerciseStatisticController::class, 'getByWorkoutExercise']);
        Route::get('/exercise-statistics/exercise/{exerciseId}', [ExerciseStatisticController::class, 'getByUserAndExercise']);
        Route::apiResource('/exercise-statistics', ExerciseStatisticController::class)->except(['index']);

        //routines
        Route::get('/routines/default', [RoutineController::class, 'defaultRoutine']);
        Route::get('/routines/user/{userId}', [RoutineController::class, 'getRoutinesByUserId']);
        Route::get('/routines/count', [RoutineController::class, 'countRoutines']);
        Route::apiResource('/routines', RoutineController::class);

        //RoutineActive
        Route::post('/routine/activate', [RoutineActiveController::class, 'store']);
        Route::get('/routine/active/user/{userId}', [RoutineActiveController::class, 'showActiveRoutine']);
        Route::delete('/routine/user/{user_id}', [RoutineActiveController::class, 'destroy']);

        //type
        Route::apiResource('/types', TypeController::class);

        //Workout
        Route::get('/workouts/routine/{routineId}', [ExerciseController::class, 'getWorkoutByRoutineId']);
        Route::apiResource('/workouts', WorkoutController::class);

        //Workout-exercise
        Route::apiResource('/workout-exercises', WorkoutExerciseController::class);

        //Activity
        Route::get('/month-activity', [LoginLogController::class, 'getMonthlyLoginActivity']);
    });
});