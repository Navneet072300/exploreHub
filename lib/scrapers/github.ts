import axios from "axios";

export interface GitHubRepo {
  id: string;
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  topics: string[];
}

export async function fetchGitHubResults(
  query: string,
  limit: number = 5
): Promise<GitHubRepo[]> {
  try {
    const response = await axios.get(
      `https://api.github.com/search/repositories`,
      {
        params: {
          q: query,
          sort: "stars",
          order: "desc",
          per_page: limit,
        },
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: process.env.GITHUB_TOKEN
            ? `token ${process.env.GITHUB_TOKEN}`
            : "",
        },
      }
    );

    return response.data.items.map((repo: any) => ({
      id: repo.id.toString(),
      name: repo.full_name,
      description: repo.description || "No description provided",
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      topics: repo.topics || [],
    }));
  } catch (error: any) {
    console.error(
      "Error fetching GitHub results:",
      error.response?.data || error.message
    );
    return [];
  }
}
