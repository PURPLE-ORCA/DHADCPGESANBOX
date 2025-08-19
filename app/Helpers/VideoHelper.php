<?php

namespace App\Helpers;

class VideoHelper
{
    /**
     * Generate a signed URL for Bunny.net video
     *
     * @param string $videoId
     * @return string
     */
    public static function generateSignedUrl(string $videoId): string
    {
        // For now, return a placeholder URL
        // In production, this would integrate with Bunny.net API to generate actual signed URLs
        return "https://bunny.net/signed-url-placeholder/{$videoId}";
    }
}