import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { YoutubeSummarizerPage } from './pages/tools/YoutubeSummarizer.page';
import { BackgroundRemoverPage } from './pages/tools/BackgroundRemover.page';

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<div className="p-8"><h1 className="text-3xl font-bold">Web Tools</h1><ul><li><a href="/tools/ai/youtube-summarizer" className="text-primary hover:underline">YouTube Summarizer</a></li><li><a href="/tools/image/background-remover" className="text-primary hover:underline">Background Remover</a></li></ul></div>} />
          <Route path="/tools/ai/youtube-summarizer" element={<YoutubeSummarizerPage />} />
          <Route path="/tools/image/background-remover" element={<BackgroundRemoverPage />} />
          <Route path="*" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">404 - Not Found</h2></div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
