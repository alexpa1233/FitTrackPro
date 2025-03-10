import axios from "axios";
import { getToken } from "./pageauth/AuthUser";

const baseUrl = 'http://localhost:8000/api/v1';



const getAuthHeader = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export default {
    //Publicos
    getRegister: (data) => axios.post(`${baseUrl}/auth/register`, data),
    getLogin: (data) => axios.post(`${baseUrl}/auth/login`, data),

    //Privados

    //Auth
    getLogout: () => axios.get(`${baseUrl}/auth/logout`,{
        headers: getAuthHeader()
    }),

    //User
    getUserById: (userId) => axios.get(`${baseUrl}/user/${userId}`, {
        headers: getAuthHeader()
    }),
    updateUser: (userId) => axios.put(`${baseUrl}/user/${userId}`, {
        headers: getAuthHeader()
    }),
    getUserAll: () => axios.get(`${baseUrl}/user/client`, {
        headers: getAuthHeader()
    }),
    deleteUser: (userId) => axios.delete(`${baseUrl}/user/${userId}`, {
        headers: getAuthHeader()
    }),
    getCountUser: () => axios.get(`${baseUrl}/user/client/count`, {
        headers: getAuthHeader()
    }),
    


    //Routine
    getRoutinesAll: () => axios.get(`${baseUrl}/routines`, {
        headers: getAuthHeader()
    }),

    createRoutines: (data) => axios.post(`${baseUrl}/routines`, data, {
        headers: getAuthHeader()
    }),

    getCountRoutine: () => axios.get(`${baseUrl}/routines/count`, {
        headers: getAuthHeader()
    }),

    getRoutineAllDefault: () => axios.get(`${baseUrl}/routines/default`, {
        headers: getAuthHeader()
    }),

    getRoutineByUserId:(userId) => axios.get(`${baseUrl}/routines/user/${userId}`,{
        headers: getAuthHeader()
    }),

    getRoutineById:(routineId) => axios.get(`${baseUrl}/routines/${routineId}`,{
        headers: getAuthHeader()
    }),

    updateRoutine:(routineId) => axios.put(`${baseUrl}/routines/${routineId}`,{
        headers: getAuthHeader()
    }),

    deleteRoutine:() => axios.delete(`${baseUrl}/routines/${routineid}`,{
        headers: getAuthHeader()
    }),

    //Active routine
    activeRoutine: () => axios.post(`${baseUrl}/routine/active`, {
        headers: getAuthHeader()
    }),

    getRoutineActiveByUserId: (userId) => axios.get(`${baseUrl}/routine/active/user/${userId}`, {
        headers: getAuthHeader()
    }),

    deleteRoutineActiveByUserId:(userId) => axios.delete(`${baseUrl}/routine/active/user/${userId}`, {
        headers: getAuthHeader()
    }),



    



    //Workout
    getWorkouts: () => axios.get(`${baseUrl}/workouts`, {
        headers: getAuthHeader()
    }),
    
    createWorkout: (data) => axios.post(`${baseUrl}/workouts`, data, {
        headers: getAuthHeader()
    }),
    
    getWorkoutByRoutineId: (routineId) => axios.get(`${baseUrl}/workouts/routine/${routineId}`, {
        headers: getAuthHeader()
    }),
    
    getWorkout: (workoutId) => axios.get(`${baseUrl}/workouts/${workoutId}`, {
        headers: getAuthHeader()
    }),
    
    updateWorkout: (workoutId, data) => axios.put(`${baseUrl}/workouts/${workoutId}`, data, {
        headers: getAuthHeader()
    }),
    
    deleteWorkout: (workoutId) => axios.delete(`${baseUrl}/workouts/${workoutId}`, {
        headers: getAuthHeader()
    }),


    //workout-exercise
    getWorkoutExercises: () => axios.get(`${baseUrl}/workout-exercises`, {
        headers: getAuthHeader()
    }),
    
    createWorkoutExercise: (data) => axios.post(`${baseUrl}/workout-exercises`, data, {
        headers: getAuthHeader()
    }),
    
    getWorkoutExercise: (workoutExerciseId) => axios.get(`${baseUrl}/workout-exercises/${workoutExerciseId}`, {
        headers: getAuthHeader()
    }),
    
    updateWorkoutExercise: (workoutExerciseId, data) => axios.put(`${baseUrl}/workout-exercises/${workoutExerciseId}`, data, {
        headers: getAuthHeader()
    }),
    
    deleteWorkoutExercise: (workoutExerciseId) => axios.delete(`${baseUrl}/workout-exercises/${workoutExerciseId}`, {
        headers: getAuthHeader()
    }),
    




    //Exercise
    createExercise: (data) => axios.post(`${baseUrl}/exercises`,data, {
        headers: getAuthHeader()
    }),

    getExerciseAll: () => axios.get(`${baseUrl}/exercises`,{
        headers: getAuthHeader()
    }),

    getCountExercise: () => axios.get(`${baseUrl}/exercises/count`, {
        headers: getAuthHeader()
    }),

    getExerciseAllDefault: () => axios.get(`${baseUrl}/exercises/default`, {
        headers: getAuthHeader()
    }),

    getExerciseFilter: (typeId) => axios.get(`${baseUrl}/exercises/filter/${typeId}`, {
        headers: getAuthHeader()
    }),

    getExerciseByUserId:(userId) => axios.get(`${baseUrl}/exercises/user/${userId}`,{
        headers: getAuthHeader()
    }),

    getExerciseCountByUserId:(userId) => axios.get(`${baseUrl}/exercises/user/${userId}/count`,{
        headers: getAuthHeader()
    }),

    getExerciseById:(exerciseId) => axios.get(`${baseUrl}/exercises/${exerciseId}`,{
        headers: getAuthHeader()
    }),
    
    updateExercise: (exerciseId, data) => axios.put(`${baseUrl}/exercises/${exerciseId}`, data, {
        headers: getAuthHeader()
    }),

    deleteExercise: (exerciseId) => axios.delete(`${baseUrl}/exercises/${exerciseId}`, {
        headers: getAuthHeader()
    }),

    //Type
    getTypeAll: () => axios.get(`${baseUrl}/types`, {
        headers: getAuthHeader()
    }),

    createType: (name) => axios.post(`${baseUrl}/types`,{name:name}, {
        headers: getAuthHeader()
    }),

    deleteType: (typeId) => axios.delete(`${baseUrl}/types/${typeId}`, {
        headers: getAuthHeader()
    }),

    //exercise-statics
    getExerciseStatisticsAll: () => axios.get(`${baseUrl}/api/v1/exercise-statistics`, {
        headers: getAuthHeader()
    }),

    createExerciseStatistic: (data) => axios.post(`${baseUrl}/api/v1/exercise-statistics`, data, {
        headers: getAuthHeader()
    }),

    getExerciseStatisticByExercise: (exerciseId) => axios.get(`${baseUrl}/api/v1/exercise-statistics/exercise/${exerciseId}`, {
        headers: getAuthHeader()
    }),

    getExerciseStatisticByWorkoutExercise: (workoutExerciseId) => axios.get(`${baseUrl}/api/v1/exercise-statistics/workout/${workoutExerciseId}`, {
        headers: getAuthHeader()
    }),

    getExerciseStatistic: (exerciseStatisticId) => axios.get(`${baseUrl}/api/v1/exercise-statistics/${exerciseStatisticId}`, {
        headers: getAuthHeader()
    }),

    updateExerciseStatistic: (exerciseStatisticId, data) => axios.put(`${baseUrl}/api/v1/exercise-statistics/${exerciseStatisticId}`, data, {
        headers: getAuthHeader()
    }),

    deleteExerciseStatistic: (exerciseStatisticId) => axios.delete(`${baseUrl}/api/v1/exercise-statistics/${exerciseStatisticId}`, {
        headers: getAuthHeader()
    }),
};
