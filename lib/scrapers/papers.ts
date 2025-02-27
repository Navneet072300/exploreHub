import puppeteer from "puppeteer";

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  year: string;
  journal: string;
  url: string;
}

export async function fetchPapersResults(
  query: string,
  limit: number = 5
): Promise<ResearchPaper[]> {
  try {
    const browser = await puppeteer.launch({
      headless: "shell",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    // Navigate to Google Scholar search results
    await page.goto(
      `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`,
      {
        waitUntil: "networkidle2",
      }
    );

    // Extract paper information
    const papers = await page.evaluate((limit) => {
      const paperElements = Array.from(
        document.querySelectorAll(".gs_r.gs_or.gs_scl")
      );
      return paperElements.slice(0, limit).map((paperElement, index) => {
        const titleElement = paperElement.querySelector(".gs_rt");
        const authorElement = paperElement.querySelector(".gs_a");
        const abstractElement = paperElement.querySelector(".gs_rs");
        const linkElement = titleElement?.querySelector("a");

        // Parse author text to extract year and journal
        const authorText = authorElement?.textContent || "";
        const yearMatch = authorText.match(/\d{4}/);
        const year = yearMatch ? yearMatch[0] : "Unknown";

        // Try to extract journal name (simplistic approach)
        const journalMatch = authorText.split("-");
        const journal =
          journalMatch.length > 1 ? journalMatch[1].trim() : "Unknown Journal";

        // Parse authors
        const authorsText = authorText.split("-")[0] || "";
        const authors = authorsText
          .split(",")
          .map((a) => a.trim())
          .filter((a) => a);

        return {
          id: `paper-${index}`,
          title:
            titleElement?.textContent
              ?.replace("[HTML]", "")
              .replace("[PDF]", "")
              .trim() || "Unknown Title",
          authors: authors.length ? authors : ["Unknown Author"],
          abstract:
            abstractElement?.textContent?.trim() || "No abstract available",
          year,
          journal,
          url: linkElement?.href || "#",
        };
      });
    }, limit);

    await browser.close();
    return papers;
  } catch (error) {
    console.error("Error fetching papers results:", error);
    return [];
  }
}
