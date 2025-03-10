<?php

namespace Database\Seeders;

use App\Models\Type;
use App\Models\Exercise;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ExerciseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $exercises = [
            ['name' => 'Crunches', 'description' => 'Abdominal exercise for core strengthening', 'type' => 'Abs'],
            ['name' => 'Pull-ups', 'description' => 'Upper body exercise for back and arms', 'type' => 'Back'],
            ['name' => 'Bicep Curls', 'description' => 'Strength exercise for biceps using dumbbells', 'type' => 'Biceps'],
            ['name' => 'Treadmill Running', 'description' => 'Cardio exercise for endurance and fat burning', 'type' => 'Cardio'],
            ['name' => 'Bench Press', 'description' => 'Strength exercise for chest using a barbell', 'type' => 'Chest'],
            ['name' => 'Wrist Curls', 'description' => 'Forearm exercise using dumbbells or barbell', 'type' => 'Forearms'],
            ['name' => 'Glute Bridges', 'description' => 'Exercise to strengthen glutes and hamstrings', 'type' => 'Glutes'],
            ['name' => 'Shoulder Press', 'description' => 'Overhead pressing exercise for shoulders', 'type' => 'Shoulders'],
            ['name' => 'Triceps Dips', 'description' => 'Bodyweight exercise for triceps strength', 'type' => 'Triceps'],
            ['name' => 'Squats', 'description' => 'Lower body exercise for quads and hamstrings', 'type' => 'Upper Legs'],
            ['name' => 'Calf Raises', 'description' => 'Exercise to strengthen lower legs and calves', 'type' => 'Lowe Legs'],
        ];

        foreach ($exercises as $exercise) {
            $type = Type::where('name', $exercise['type'])->first();

            if ($type) {
                Exercise::create([
                    'user_id' => 1,
                    'type_id' => $type->id,
                    'name' => $exercise['name'],
                    'description' => $exercise['description'],
                ]);
            }
        }
    }
}
