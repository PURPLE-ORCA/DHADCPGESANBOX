import { Head, Link } from '@inertiajs/react';
import { Course } from '@/types';
import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface Props {
  course: Course;
}

export default function Show({ course }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
          src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          type: 'video/mp4'
        }]
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, []);

  return (
    <>
      <Head title={course.title} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/courses"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <svg
              className="mr-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Courses
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-6">{course.description}</p>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Course Video</h2>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  className="video-js vjs-default-skin vjs-big-play-centered"
                  controls
                  preload="auto"
                  data-setup="{}"
                >
                  <source 
                    src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" 
                    type="video/mp4" 
                  />
                  <p className="vjs-no-js">
                    To view this video please enable JavaScript, and consider upgrading to a
                    web browser that
                    <a href="https://videojs.com/html5-video-support/" target="_blank">
                      supports HTML5 video
                    </a>
                  </p>
                </video>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Course ID:</span>
                  <span className="ml-2 text-gray-600">{course.id}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Video ID:</span>
                  <span className="ml-2 text-gray-600">{course.bunny_video_id}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Created:</span>
                  <span className="ml-2 text-gray-600">
                    {new Date(course.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Last Updated:</span>
                  <span className="ml-2 text-gray-600">
                    {new Date(course.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}