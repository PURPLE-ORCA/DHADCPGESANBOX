<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = [
            [
                'title' => 'Math 101',
                'description' => 'Introduction to Mathematics',
                'video_id' => 'bunny_math_101',
            ],
            [
                'title' => 'Physics Intro',
                'description' => 'Basic Physics Concepts',
                'video_id' => 'bunny_physics_intro',
            ],
            [
                'title' => 'Chemistry Basics',
                'description' => 'Fundamental Chemistry Principles',
                'video_id' => 'bunny_chem_basics',
            ],
        ];

        foreach ($courses as $course) {
            Course::create($course);
        }
    }
}