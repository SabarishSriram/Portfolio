export interface ActivityStats {
  githubCommits?: number;
  githubRepos?: number;
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
      const data = (await res.json()) as { public_repos?: number };
      if (typeof data.public_repos === "number") {
        stats.githubRepos = data.public_repos;
      }
    }
  } catch {
    // ignore – stats stay partial
  }

  try {
    const res = await fetch(
      `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USER}`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (res.ok) {
      const data = (await res.json()) as {
        totalSolved?: number;
        totalQuestions?: number;
        easySolved?: number;
        mediumSolved?: number;
        hardSolved?: number;
      };

      if (typeof data.totalSolved === "number") {
        stats.leetcodeSolved = data.totalSolved;
      }
      if (typeof data.totalQuestions === "number") {
        stats.leetcodeTotalQuestions = data.totalQuestions;
      }
      if (typeof data.easySolved === "number") {
        stats.leetcodeEasySolved = data.easySolved;
      }
      if (typeof data.mediumSolved === "number") {
        stats.leetcodeMediumSolved = data.mediumSolved;
      }
      if (typeof data.hardSolved === "number") {
        stats.leetcodeHardSolved = data.hardSolved;
      }
    }
  } catch {
    // ignore – stats stay partial
  }

  return stats;
}
