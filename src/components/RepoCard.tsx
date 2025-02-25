import { RepoResult } from "@/lib/types";

export default function RepoCard({ repo }: { repo: RepoResult }) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 transform hover:translate-x-2">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
            {repo.name}
          </h3>
          <div className="flex space-x-3 text-sm">
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500">★</span>
              <span className="text-gray-600 dark:text-gray-400">
                {formatNumber(repo.stars)}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-gray-500">⑂</span>
              <span className="text-gray-600 dark:text-gray-400">
                {formatNumber(repo.forks)}
              </span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {repo.author} • {repo.language || "Various"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 line-clamp-2">
            {repo.description || "No description available"}
          </p>
        </div>
      </div>
    </a>
  );
}
