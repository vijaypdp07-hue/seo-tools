import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { YoutubeTranscript } from "youtube-transcript";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/youtube-summarizer", async (req, res) => {
      const { url } = req.body;
      if (!url) {
          return res.status(400).json({ error: "YouTube URL is required" });
      }

      try {
          let transcriptObj;
          try {
              transcriptObj = await YoutubeTranscript.fetchTranscript(url);
          } catch (err: any) {
              return res.status(400).json({ error: "Could not fetch transcript. The video might not have captions or is restricted." });
          }

          const transcriptText = transcriptObj.map(t => t.text).join(" ");
          
          if (!process.env.GEMINI_API_KEY) {
              return res.json({
                  summary: "Mocked Summary: The video is about web development and AI.",
                  blogPost: "Mocked Blog Post:\n\n# Web Dev and AI\n\nThis video talks about the future of web dev...",
                  mocked: true
              });
          }

          const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
          
          const summaryResponse = await ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: `Please provide a detailed summary and key takeaways for the following YouTube video transcript:\n\n${transcriptText.slice(0, 50000)}`
          });
          
          const blogResponse = await ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: `Turn the following YouTube video transcript into a well-formatted, engaging blog post. Use markdown formatting, headings, and bullet points where appropriate:\n\n${transcriptText.slice(0, 50000)}`
          });

          res.json({
              summary: summaryResponse.text,
              blogPost: blogResponse.text
          });
      } catch (err: any) {
          console.error("Youtube summarizer failed:", err);
          res.status(500).json({ error: "Failed to process video: " + err.message });
      }
  });

  app.get("/sitemap.xml", (req, res) => {
    const baseUrl = "https://example.com";
    const urls = [
      "", "/tools", "/tools/ai/youtube-summarizer", "/tools/image/background-remover"
    ];
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    urls.forEach(url => {
      xml += `\n  <url>\n    <loc>${baseUrl}${url}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${url === "" ? "1.0" : "0.8"}</priority>\n  </url>`;
    });
    xml += `\n</urlset>`;
    
    res.header("Content-Type", "application/xml");
    res.send(xml);
  });

  // COEP/COOP headers for SharedArrayBuffer support in production (FFmpeg, WebAssembly etc.)
  app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
