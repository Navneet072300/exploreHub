import puppeteer from "puppeteer";

export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  channelName: string;
  duration: string;
}

export async function fetchYouTubeResults(
  query: string,
  limit: number = 6
): Promise<YouTubeVideo[]> {
  try {
    const browser = await puppeteer.launch({
      headless: "shell",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        query
      )}`,
      {
        waitUntil: "networkidle2",
      }
    );

    try {
      const acceptButton = await page.$('button[aria-label="Accept all"]');
      if (acceptButton) {
        await acceptButton.click();
        await page.waitForNavigation({ waitUntil: "networkidle2" });
      }
    } catch (error) {
      console.log("No cookie dialog or error handling it");
    }

    const videos = await page.evaluate((limit) => {
      const videoElements = Array.from(
        document.querySelectorAll("ytd-video-renderer")
      );
      return videoElements.slice(0, limit).map((videoElement) => {
        const titleElement = videoElement.querySelector("#video-title");
        const thumbnailElement = videoElement.querySelector("#thumbnail img");
        const channelElement = videoElement.querySelector(
          "#channel-info #text-container"
        );
        const durationElement = videoElement.querySelector("#overlays #text");

        const videoId =
          titleElement?.getAttribute("href")?.split("v=")[1]?.split("&")[0] ||
          "";

        return {
          id: videoId,
          title: titleElement?.textContent?.trim() || "Unknown Title",
          url: `https://www.youtube.com/watch?v=${videoId}`,
          thumbnail:
            thumbnailElement?.getAttribute("src") ||
            `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          channelName: channelElement?.textContent?.trim() || "Unknown Channel",
          duration: durationElement?.textContent?.trim() || "Unknown Duration",
        };
      });
    }, limit);

    await browser.close();
    return videos;
  } catch (error) {
    console.error("Error fetching YouTube results:", error);
    return [];
  }
}
