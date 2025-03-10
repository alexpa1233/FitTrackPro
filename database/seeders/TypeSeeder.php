<?php

namespace Database\Seeders;

use App\Models\Type;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $types = [
            ['name' => 'Abs'],
            ['name' => 'Back'],
            ['name' => 'Biceps'],
            ['name' => 'Cardio'],
            ['name' => 'Chest'],
            ['name' => 'Forearms'],
            ['name' => 'Glutes'],
            ['name' => 'Shoulders'],
            ['name' => 'Triceps'],
            ['name' => 'Upper Legs'],
            ['name' => 'Lower Legs'],
        ];

        foreach ($types as $type) {
            Type::create($type);
        }
    }
}
