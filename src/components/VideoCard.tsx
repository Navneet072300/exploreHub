import { VideoResult } from "@/lib/types";
import Image from "next/image";

export default function VideoCard({ video }: { video: VideoResult }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="flex p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 transform hover:translate-x-2">
        <div className="flex-shrink-0 w-32 h-20 relative overflow-hidden rounded">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="ml-4">
          <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
            {video.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {video.channel}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {video.views} • {video.published}
          </p>
        </div>
      </div>
    </a>
  );
}
