<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\VideoLog;
use App\Helpers\VideoHelper;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class VideoController extends Controller
{
    /**
     * Get a signed URL for a course video
     *
     * @param int $courseId
     * @return JsonResponse
     */
    public function getSignedUrl(int $courseId): JsonResponse
    {
        $course = Course::find($courseId);
        
        if (!$course) {
            return response()->json([
                'error' => 'Course not found'
            ], 404);
        }
        
        // Log video access
        try {
            VideoLog::create([
                'course_id' => $courseId,
                'user_id' => Auth::id(),
                'accessed_at' => now()
            ]);
        } catch (\Exception $e) {
            // Log the error but don't prevent the video from being served
            Log::error('Failed to log video access', [
                'course_id' => $courseId,
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);
        }
        
        $signedUrl = VideoHelper::generateSignedUrl($course->video_id);
        
        return response()->json([
            'url' => $signedUrl
        ]);
    }
}