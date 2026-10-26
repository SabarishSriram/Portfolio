export interface ActivityStats {
  githubCommits?: number;
  githubRepos?: number;
  githubFollowers?: number;
  githubStars?: number;
  leetcodeSolved?: number;
  leetcodeEasySolved?: number;
  leetcodeMediumSolved?: number;
  leetcodeHardSolved?: number;
  leetcodeTotalQuestions?: number;
}

const GITHUB_USER = "sabarishsriram";
const LEETCODE_USER = "sabarishsriram";

export async function fetchActivityStats(): Promise<ActivityStats> {
  const stats: ActivityStats = {};

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}`, {
      // Ensure this runs on the server and is cache-friendly
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (res.ok) {
      const data = (await res.json()) as {
        public_repos?: number;
        followers?: number;
      };
      if (typeof data.public_repos === "number") {
        stats.githubRepos = data.public_repos;
      }
      if (typeof data.followers === "number") {
        stats.githubFollowers = data.followers;
      }
    }
  } catch {
    // ignore – stats stay partial
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&type=owner`,
      {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github+json" },
      },
    );

    if (res.ok) {
      const repos = (await res.json()) as { stargazers_count?: number }[];
      stats.githubStars = repos.reduce(
        (sum, repo) => sum + (repo.stargazers_count ?? 0),
        0,
      );
    }
  } catch {
    // ignore – stats stay partial
  }

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      next: { revalidate: 3600 },
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query: `query ($username: String!) {
          matchedUser(username: $username) {
            submitStatsGlobal { acSubmissionNum { difficulty count } }
          }
          allQuestionsCount { difficulty count }
        }`,
        variables: { username: LEETCODE_USER },
      }),
    });

    if (res.ok) {
      type Count = { difficulty: string; count: number };
      const json = (await res.json()) as {
        data?: {
          matchedUser?: {
            submitStatsGlobal?: { acSubmissionNum?: Count[] };
          } | null;
          allQuestionsCount?: Count[];
        };
      };

      const solved = json.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
      const pick = (list: Count[] | undefined, difficulty: string) =>
        list?.find((c) => c.difficulty === difficulty)?.count;

      stats.leetcodeSolved = pick(solved, "All");
      stats.leetcodeEasySolved = pick(solved, "Easy");
      stats.leetcodeMediumSolved = pick(solved, "Medium");
      stats.leetcodeHardSolved = pick(solved, "Hard");
      stats.leetcodeTotalQuestions = pick(json.data?.allQuestionsCount, "All");
    }
  } catch {
    // ignore – stats stay partial
  }

  return stats;
}
