/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { AppLayout } from "./components/layout/AppLayout";

const HomePage = React.lazy(() => import("./pages/Home.page").then(m => ({ default: m.HomePage })));
const LoginPage = React.lazy(() => import("./pages/auth/Login.page").then(m => ({ default: m.LoginPage })));
const RegisterPage = React.lazy(() => import("./pages/auth/Register.page").then(m => ({ default: m.RegisterPage })));
const DashboardPage = React.lazy(() => import("./pages/dashboard/Dashboard.page").then(m => ({ default: m.DashboardPage })));
const HistoryPage = React.lazy(() => import("./pages/dashboard/History.page").then(m => ({ default: m.HistoryPage })));
const SavedPage = React.lazy(() => import("./pages/dashboard/Saved.page").then(m => ({ default: m.SavedPage })));

// Text Tools
const TextToolsPage = React.lazy(() => import("./pages/tools/TextTools.page").then(m => ({ default: m.TextToolsPage })));
const WordCounterPage = React.lazy(() => import("./pages/tools/WordCounter.page").then(m => ({ default: m.WordCounterPage })));
const CaseConverterPage = React.lazy(() => import("./pages/tools/CaseConverter.page").then(m => ({ default: m.CaseConverterPage })));
const WordCombinerPage = React.lazy(() => import("./pages/tools/WordCombiner.page").then(m => ({ default: m.WordCombinerPage })));
const ReverseTextPage = React.lazy(() => import("./pages/tools/ReverseText.page").then(m => ({ default: m.ReverseTextPage })));
const OnlineNotepadPage = React.lazy(() => import("./pages/tools/OnlineNotepad.page").then(m => ({ default: m.OnlineNotepadPage })));
const MorseCodeTranslatorPage = React.lazy(() => import("./pages/tools/MorseCodeTranslator.page").then(m => ({ default: m.MorseCodeTranslatorPage })));
const TextToImagePage = React.lazy(() => import("./pages/tools/TextToImage.page").then(m => ({ default: m.TextToImagePage })));
const SmallTextGeneratorPage = React.lazy(() => import("./pages/tools/SmallTextGenerator.page").then(m => ({ default: m.SmallTextGeneratorPage })));
const BoldTextGeneratorPage = React.lazy(() => import("./pages/tools/BoldTextGenerator.page").then(m => ({ default: m.BoldTextGeneratorPage })));
const UpsideDownTextGeneratorPage = React.lazy(() => import("./pages/tools/UpsideDownTextGenerator.page").then(m => ({ default: m.UpsideDownTextGeneratorPage })));
const InvisibleCharacterPage = React.lazy(() => import("./pages/tools/InvisibleCharacter.page").then(m => ({ default: m.InvisibleCharacterPage })));
const SmallCapsGeneratorPage = React.lazy(() => import("./pages/tools/SmallCapsGenerator.page").then(m => ({ default: m.SmallCapsGeneratorPage })));
const OnlineTextEditorPage = React.lazy(() => import("./pages/tools/OnlineTextEditor.page").then(m => ({ default: m.OnlineTextEditorPage })));
const OcrPage = React.lazy(() => import("./pages/tools/Ocr.page").then(m => ({ default: m.OcrPage })));
const SpeechToTextPage = React.lazy(() => import("./pages/tools/SpeechToText.page").then(m => ({ default: m.SpeechToTextPage })));

// Image Tools
const ImageToolsPage = React.lazy(() => import("./pages/tools/ImageTools.page").then(m => ({ default: m.ImageToolsPage })));
const ImageCompressorPage = React.lazy(() => import("./pages/tools/ImageCompressor.page").then(m => ({ default: m.ImageCompressorPage })));
const ConvertToJpgPage = React.lazy(() => import("./pages/tools/ConvertToJpg.page").then(m => ({ default: m.ConvertToJpgPage })));
const FaviconGeneratorPage = React.lazy(() => import("./pages/tools/FaviconGenerator.page").then(m => ({ default: m.FaviconGeneratorPage })));
const TargetSizeCompressorPage = React.lazy(() => import("./pages/tools/TargetSizeCompressor.page").then(m => ({ default: m.TargetSizeCompressorPage })));
const RgbToHexPage = React.lazy(() => import("./pages/tools/RgbToHex.page").then(m => ({ default: m.RgbToHexPage })));
const MbToKbConverterPage = React.lazy(() => import("./pages/tools/MbToKbConverter.page").then(m => ({ default: m.MbToKbConverterPage })));
const FormatConverterPage = React.lazy(() => import("./pages/tools/FormatConverter.page").then(m => ({ default: m.FormatConverterPage })));
const HeicConverterPage = React.lazy(() => import("./pages/tools/HeicConverter.page").then(m => ({ default: m.HeicConverterPage })));
const CropImagePage = React.lazy(() => import("./pages/tools/CropImage.page").then(m => ({ default: m.CropImagePage })));
const MemeGeneratorPage = React.lazy(() => import("./pages/tools/MemeGenerator.page").then(m => ({ default: m.MemeGeneratorPage })));
const ImageToSvgPage = React.lazy(() => import("./pages/tools/ImageToSvg.page").then(m => ({ default: m.ImageToSvgPage })));
const VideoToGifPage = React.lazy(() => import("./pages/tools/VideoToGif.page").then(m => ({ default: m.VideoToGifPage })));

// PDF Tools
const PdfToolsPage = React.lazy(() => import("./pages/tools/PdfTools.page").then(m => ({ default: m.PdfToolsPage })));
const MergePdfPage = React.lazy(() => import("./pages/tools/MergePdf.page").then(m => ({ default: m.MergePdfPage })));
const RotatePdfPage = React.lazy(() => import("./pages/tools/RotatePdf.page").then(m => ({ default: m.RotatePdfPage })));
const LockPdfPage = React.lazy(() => import("./pages/tools/LockPdf.page").then(m => ({ default: m.LockPdfPage })));
const SplitPdfPage = React.lazy(() => import("./pages/tools/SplitPdf.page").then(m => ({ default: m.SplitPdfPage })));
const PdfToJpgPage = React.lazy(() => import("./pages/tools/PdfToJpg.page").then(m => ({ default: m.PdfToJpgPage })));
const CompressPdfPage = React.lazy(() => import("./pages/tools/CompressPdf.page").then(m => ({ default: m.CompressPdfPage })));
const WordToPdfPage = React.lazy(() => import("./pages/tools/WordToPdf.page").then(m => ({ default: m.WordToPdfPage })));
const PdfToWordPage = React.lazy(() => import("./pages/tools/PdfToWord.page").then(m => ({ default: m.PdfToWordPage })));

// Calculators
const CalculatorsPage = React.lazy(() => import("./pages/tools/Calculators.page").then(m => ({ default: m.CalculatorsPage })));
const AgeCalculatorPage = React.lazy(() => import("./pages/tools/AgeCalculator.page").then(m => ({ default: m.AgeCalculatorPage })));
const ChronologicalAgeCalculatorPage = React.lazy(() => import("./pages/tools/ChronologicalAgeCalculator.page").then(m => ({ default: m.ChronologicalAgeCalculatorPage })));

// Dev Tools
const DevToolsPage = React.lazy(() => import("./pages/tools/DevTools.page").then(m => ({ default: m.DevToolsPage })));
const JsonViewerPage = React.lazy(() => import("./pages/tools/JsonViewer.page").then(m => ({ default: m.JsonViewerPage })));
const BinaryTextConverterPage = React.lazy(() => import("./pages/tools/BinaryTextConverter.page").then(m => ({ default: m.BinaryTextConverterPage })));
const PhpFormatterPage = React.lazy(() => import("./pages/tools/PhpFormatter.page").then(m => ({ default: m.PhpFormatterPage })));

// Website Tools
const WebsiteToolsPage = React.lazy(() => import("./pages/tools/WebsiteTools.page").then(m => ({ default: m.WebsiteToolsPage })));
const MetaTagGeneratorPage = React.lazy(() => import("./pages/tools/MetaTagGenerator.page").then(m => ({ default: m.MetaTagGeneratorPage })));
const OpenGraphGeneratorPage = React.lazy(() => import("./pages/tools/OpenGraphGenerator.page").then(m => ({ default: m.OpenGraphGeneratorPage })));
const RobotsTxtGeneratorPage = React.lazy(() => import("./pages/tools/RobotsTxtGenerator.page").then(m => ({ default: m.RobotsTxtGeneratorPage })));
const TwitterCardGeneratorPage = React.lazy(() => import("./pages/tools/TwitterCardGenerator.page").then(m => ({ default: m.TwitterCardGeneratorPage })));
const XmlSitemapGeneratorPage = React.lazy(() => import("./pages/tools/XmlSitemapGenerator.page").then(m => ({ default: m.XmlSitemapGeneratorPage })));
const HtmlViewerPage = React.lazy(() => import("./pages/tools/HtmlViewer.page").then(m => ({ default: m.HtmlViewerPage })));
const UrlOpenerPage = React.lazy(() => import("./pages/tools/UrlOpener.page").then(m => ({ default: m.UrlOpenerPage })));
const AdsenseCalculatorPage = React.lazy(() => import("./pages/tools/AdsenseCalculator.page").then(m => ({ default: m.AdsenseCalculatorPage })));
const UrlShortenerPage = React.lazy(() => import("./pages/tools/UrlShortener.page").then(m => ({ default: m.UrlShortenerPage })));
const CheckServerStatusPage = React.lazy(() => import("./pages/tools/CheckServerStatus.page").then(m => ({ default: m.CheckServerStatusPage })));
const WhatIsMyBrowserPage = React.lazy(() => import("./pages/tools/WhatIsMyBrowser.page").then(m => ({ default: m.WhatIsMyBrowserPage })));
const IsItDownPage = React.lazy(() => import("./pages/tools/IsItDown.page").then(m => ({ default: m.IsItDownPage })));
const MobileFriendlyTestPage = React.lazy(() => import("./pages/tools/MobileFriendlyTest.page").then(m => ({ default: m.MobileFriendlyTestPage })));
const PageAuthorityCheckerPage = React.lazy(() => import("./pages/tools/PageAuthorityChecker.page").then(m => ({ default: m.PageAuthorityCheckerPage })));
const SpamScoreCheckerPage = React.lazy(() => import("./pages/tools/SpamScoreChecker.page").then(m => ({ default: m.SpamScoreCheckerPage })));
const GoogleIndexCheckerPage = React.lazy(() => import("./pages/tools/GoogleIndexChecker.page").then(m => ({ default: m.GoogleIndexCheckerPage })));
const IndexPagesCheckerPage = React.lazy(() => import("./pages/tools/IndexPagesChecker.page").then(m => ({ default: m.IndexPagesCheckerPage })));
const PageSpeedTestPage = React.lazy(() => import("./pages/tools/PageSpeedTest.page").then(m => ({ default: m.PageSpeedTestPage })));
const GeoIpLocatorPage = React.lazy(() => import("./pages/tools/GeoIpLocator.page").then(m => ({ default: m.GeoIpLocatorPage })));
const DomainHostingCheckerPage = React.lazy(() => import("./pages/tools/DomainHostingChecker.page").then(m => ({ default: m.DomainHostingCheckerPage })));
const WebsitePageSnooperPage = React.lazy(() => import("./pages/tools/WebsitePageSnooper.page").then(m => ({ default: m.WebsitePageSnooperPage })));
const WebsitePageSizeCheckerPage = React.lazy(() => import("./pages/tools/WebsitePageSizeChecker.page").then(m => ({ default: m.WebsitePageSizeCheckerPage })));
const MetaTagsAnalyzerPage = React.lazy(() => import("./pages/tools/MetaTagsAnalyzer.page").then(m => ({ default: m.MetaTagsAnalyzerPage })));
const DomainAgeCheckerPage = React.lazy(() => import("./pages/tools/DomainAgeChecker.page").then(m => ({ default: m.DomainAgeCheckerPage })));

const DomainToolsPage = React.lazy(() => import("./pages/tools/DomainTools.page").then(m => ({ default: m.DomainToolsPage })));

const RedirectCheckerPage = React.lazy(() => import("./pages/tools/RedirectChecker.page").then(m => ({ default: m.RedirectCheckerPage })));
const PageComparisonPage = React.lazy(() => import("./pages/tools/PageComparison.page").then(m => ({ default: m.PageComparisonPage })));
const OpenGraphCheckerPage = React.lazy(() => import("./pages/tools/OpenGraphChecker.page").then(m => ({ default: m.OpenGraphCheckerPage })));
const CloakingCheckerPage = React.lazy(() => import("./pages/tools/CloakingChecker.page").then(m => ({ default: m.CloakingCheckerPage })));
const GoogleCacheCheckerPage = React.lazy(() => import("./pages/tools/GoogleCacheChecker.page").then(m => ({ default: m.GoogleCacheCheckerPage })));
const ReverseImageSearchPage = React.lazy(() => import("./pages/tools/ReverseImageSearch.page").then(m => ({ default: m.ReverseImageSearchPage })));
const ComingSoonPage = React.lazy(() => import("./pages/tools/ComingSoon.page").then(m => ({ default: m.ComingSoonPage })));

const OtherToolsPage = React.lazy(() => import("./pages/tools/OtherTools.page").then(m => ({ default: m.OtherToolsPage })));
const FakeNameGeneratorPage = React.lazy(() => import("./pages/tools/FakeNameGenerator.page").then(m => ({ default: m.FakeNameGeneratorPage })));
const CreditCardGeneratorPage = React.lazy(() => import("./pages/tools/CreditCardGenerator.page").then(m => ({ default: m.CreditCardGeneratorPage })));
const EmojisPage = React.lazy(() => import("./pages/tools/Emojis.page").then(m => ({ default: m.EmojisPage })));
const PasswordGeneratorPage = React.lazy(() => import("./pages/tools/PasswordGenerator.page").then(m => ({ default: m.PasswordGeneratorPage })));
const QrCodeGeneratorPage = React.lazy(() => import("./pages/tools/QrCodeGenerator.page").then(m => ({ default: m.QrCodeGeneratorPage })));
const KeywordsDensityCheckerPage = React.lazy(() => import("./pages/tools/KeywordsDensityChecker.page").then(m => ({ default: m.KeywordsDensityCheckerPage })));

// Calculators
const HoursCalculatorPage = React.lazy(() => import("./pages/tools/HoursCalculator.page").then(m => ({ default: m.HoursCalculatorPage })));

const ContactPage = React.lazy(() => import("./pages/Contact.page").then(m => ({ default: m.ContactPage })));
const DesignStudioPage = React.lazy(() => import("./pages/tools/DesignStudio.page").then(m => ({ default: m.DesignStudioPage })));
const AIToolsPage = React.lazy(() => import("./pages/tools/AITools.page").then(m => ({ default: m.AIToolsPage })));
const GenericAIToolPage = React.lazy(() => import("./pages/tools/GenericAITool.page").then(m => ({ default: m.GenericAIToolPage })));
const ToolsIndexPage = React.lazy(() => import("./pages/ToolsIndex.page").then(m => ({ default: m.ToolsIndexPage })));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-8 text-center">Loading tool...</div>}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="dashboard/history" element={<HistoryPage />} />
          <Route path="dashboard/saved" element={<SavedPage />} />
          <Route path="tools" element={<ToolsIndexPage />} />
          
          <Route path="tools/text" element={<TextToolsPage />} />
          <Route path="tools/text/word-counter" element={<WordCounterPage />} />
          <Route path="tools/text/case-converter" element={<CaseConverterPage />} />
          <Route path="tools/text/word-combiner" element={<WordCombinerPage />} />
          <Route path="tools/text/reverse-text" element={<ReverseTextPage />} />
          <Route path="tools/text/online-notepad" element={<OnlineNotepadPage />} />
          <Route path="tools/text/morse-code-translator" element={<MorseCodeTranslatorPage />} />
          <Route path="tools/text/text-to-image" element={<TextToImagePage />} />
          <Route path="tools/text/small-text-generator" element={<SmallTextGeneratorPage />} />
          <Route path="tools/text/bold-text-generator" element={<BoldTextGeneratorPage />} />
          <Route path="tools/text/upside-down-text-generator" element={<UpsideDownTextGeneratorPage />} />
          <Route path="tools/text/invisible-character" element={<InvisibleCharacterPage />} />
          <Route path="tools/text/small-caps-generator" element={<SmallCapsGeneratorPage />} />
          <Route path="tools/text/online-text-editor" element={<OnlineTextEditorPage />} />
          <Route path="tools/text/ocr" element={<OcrPage title="OCR" categoryPath="/tools/text" categoryName="Text Tools" />} />
          <Route path="tools/text/speech-to-text" element={<SpeechToTextPage />} />

          <Route path="tools/image" element={<ImageToolsPage />} />
          <Route path="tools/image/image-to-text" element={<OcrPage title="Image To Text Converter" categoryPath="/tools/image" categoryName="Image Tools" />} />
          <Route path="tools/image/image-compressor" element={<ImageCompressorPage />} />
          <Route path="tools/image/compress-jpg" element={<ImageCompressorPage />} />
          <Route path="tools/image/compress-png" element={<ImageCompressorPage />} />
          <Route path="tools/image/jpeg-optimizer" element={<ImageCompressorPage />} />
          <Route path="tools/image/convert-to-jpg" element={<ConvertToJpgPage />} />
          <Route path="tools/image/favicon-generator" element={<FaviconGeneratorPage />} />

          <Route path="tools/image/photo-resizer-in-kb" element={<TargetSizeCompressorPage defaultTargetKB={100} fixedTarget={false} title="Photo Resizer In KB" slug="photo-resizer-in-kb" />} />
          <Route path="tools/image/compress-image-to-10kb" element={<TargetSizeCompressorPage defaultTargetKB={10} fixedTarget={true} title="Compress Image to 10KB" slug="compress-image-to-10kb" />} />
          <Route path="tools/image/compress-image-to-20kb" element={<TargetSizeCompressorPage defaultTargetKB={20} fixedTarget={true} title="Compress Image to 20KB" slug="compress-image-to-20kb" />} />
          <Route path="tools/image/compress-jpeg-to-30kb" element={<TargetSizeCompressorPage defaultTargetKB={30} fixedTarget={true} title="Compress JPEG to 30KB" slug="compress-jpeg-to-30kb" />} />
          <Route path="tools/image/compress-image-to-50kb" element={<TargetSizeCompressorPage defaultTargetKB={50} fixedTarget={true} title="Compress Image to 50KB" slug="compress-image-to-50kb" />} />
          <Route path="tools/image/compress-jpeg-to-100kb" element={<TargetSizeCompressorPage defaultTargetKB={100} fixedTarget={true} title="Compress JPEG to 100KB" slug="compress-jpeg-to-100kb" />} />
          <Route path="tools/image/compress-jpeg-to-200kb" element={<TargetSizeCompressorPage defaultTargetKB={200} fixedTarget={true} title="Compress JPEG to 200KB" slug="compress-jpeg-to-200kb" />} />
          <Route path="tools/image/compress-image-to-1mb" element={<TargetSizeCompressorPage defaultTargetKB={1024} fixedTarget={true} title="Compress Image to 1MB" slug="compress-image-to-1mb" />} />
          <Route path="tools/image/resize-image-to-20kb" element={<TargetSizeCompressorPage defaultTargetKB={20} fixedTarget={true} title="Resize Image to 20KB" slug="resize-image-to-20kb" />} />
          <Route path="tools/image/resize-image-to-50kb" element={<TargetSizeCompressorPage defaultTargetKB={50} fixedTarget={true} title="Resize Image to 50KB" slug="resize-image-to-50kb" />} />
          <Route path="tools/image/resize-image-to-100kb" element={<TargetSizeCompressorPage defaultTargetKB={100} fixedTarget={true} title="Resize Image to 100KB" slug="resize-image-to-100kb" />} />
          <Route path="tools/image/reduce-image-size-kb" element={<TargetSizeCompressorPage defaultTargetKB={500} fixedTarget={false} title="Reduce Image Size in KB" slug="reduce-image-size-kb" />} />
          <Route path="tools/image/rgb-to-hex" element={<RgbToHexPage />} />
          <Route path="tools/image/mb-to-kb-converter" element={<MbToKbConverterPage />} />
          
          <Route path="tools/image/png-to-jpg" element={<FormatConverterPage title="PNG to JPG" description="Convert PNG images to JPG format" slug="png-to-jpg" acceptedFormats={{'image/png': ['.png']}} targetMimeType="image/jpeg" targetExtension=".jpg" />} />
          <Route path="tools/image/jpg-to-png" element={<FormatConverterPage title="JPG to PNG" description="Convert JPG images to PNG format" slug="jpg-to-png" acceptedFormats={{'image/jpeg': ['.jpg', '.jpeg']}} targetMimeType="image/png" targetExtension=".png" />} />
          <Route path="tools/image/webp-to-png" element={<FormatConverterPage title="WEBP to PNG" description="Convert WebP images to PNG format" slug="webp-to-png" acceptedFormats={{'image/webp': ['.webp']}} targetMimeType="image/png" targetExtension=".png" />} />
          <Route path="tools/image/svg-to-png" element={<FormatConverterPage title="SVG to PNG" description="Convert SVG vectors to PNG format" slug="svg-to-png" acceptedFormats={{'image/svg+xml': ['.svg']}} targetMimeType="image/png" targetExtension=".png" />} />
          <Route path="tools/image/png-to-svg" element={<ImageToSvgPage title="PNG to SVG" slug="png-to-svg" acceptedFormats={{'image/png': ['.png']}} />} />
          <Route path="tools/image/jpg-to-svg" element={<ImageToSvgPage title="JPG to SVG" slug="jpg-to-svg" acceptedFormats={{'image/jpeg': ['.jpg', '.jpeg']}} />} />
          <Route path="tools/image/jpeg-to-svg" element={<ImageToSvgPage title="JPEG to SVG" slug="jpeg-to-svg" acceptedFormats={{'image/jpeg': ['.jpg', '.jpeg']}} />} />
          <Route path="tools/image/video-to-gif" element={<VideoToGifPage />} />
          <Route path="tools/image/mp4-to-gif" element={<VideoToGifPage />} />
          <Route path="tools/image/png-to-ico" element={<FormatConverterPage title="PNG to ICO" description="Convert PNG images to ICO format" slug="png-to-ico" acceptedFormats={{'image/png': ['.png']}} targetMimeType="image/png" targetExtension=".ico" />} />
          <Route path="tools/image/avif-to-jpg" element={<FormatConverterPage title="AVIF to JPG" description="Convert AVIF images to JPG format" slug="avif-to-jpg" acceptedFormats={{'image/avif': ['.avif']}} targetMimeType="image/jpeg" targetExtension=".jpg" />} />
          <Route path="tools/image/svg-converter" element={<FormatConverterPage title="SVG Converter" description="Convert SVG images to PNG format" slug="svg-converter" acceptedFormats={{'image/svg+xml': ['.svg']}} targetMimeType="image/png" targetExtension=".png" />} />
          <Route path="tools/image/heic-to-jpg" element={<HeicConverterPage title="HEIC to JPG" description="Convert Apple HEIC images to JPG format" slug="heic-to-jpg" targetFormat="image/jpeg" targetExtension=".jpg" />} />
          <Route path="tools/image/heic-to-png" element={<HeicConverterPage title="HEIC to PNG" description="Convert Apple HEIC images to PNG format" slug="heic-to-png" targetFormat="image/png" targetExtension=".png" />} />
          <Route path="tools/image/crop-image" element={<CropImagePage />} />
          <Route path="tools/image/meme-generator" element={<MemeGeneratorPage />} />
          <Route path="tools/image/reverse-image-search" element={<ReverseImageSearchPage />} />

          <Route path="tools/pdf" element={<PdfToolsPage />} />
          <Route path="tools/pdf/merge-pdf" element={<MergePdfPage />} />
          <Route path="tools/pdf/rotate-pdf" element={<RotatePdfPage />} />
          <Route path="tools/pdf/lock-pdf" element={<LockPdfPage />} />
          <Route path="tools/pdf/split-pdf" element={<SplitPdfPage />} />
          <Route path="tools/pdf/pdf-to-zip" element={<SplitPdfPage />} />
          <Route path="tools/pdf/pdf-to-jpg" element={<PdfToJpgPage />} />
          <Route path="tools/pdf/compress-pdf" element={<CompressPdfPage />} />
          <Route path="tools/pdf/word-to-pdf" element={<WordToPdfPage />} />
          <Route path="tools/pdf/pdf-to-word" element={<PdfToWordPage />} />
          <Route path="tools/pdf/compress-pdf-to-50kb" element={<CompressPdfPage />} />
          <Route path="tools/pdf/compress-pdf-to-100kb" element={<CompressPdfPage />} />
          <Route path="tools/pdf/compress-pdf-to-150kb" element={<CompressPdfPage />} />
          <Route path="tools/pdf/compress-pdf-to-200kb" element={<CompressPdfPage />} />
          <Route path="tools/pdf/resize-pdf-to-200kb" element={<CompressPdfPage />} />
          <Route path="tools/pdf/compress-pdf-to-300kb" element={<CompressPdfPage />} />
          <Route path="tools/pdf/compress-pdf-to-400kb" element={<CompressPdfPage />} />
          <Route path="tools/pdf/compress-pdf-to-500kb" element={<CompressPdfPage />} />
          <Route path="tools/pdf/compress-pdf-to-1mb" element={<CompressPdfPage />} />
          <Route path="tools/pdf/compress-pdf-to-1-5mb" element={<CompressPdfPage />} />
          <Route path="tools/pdf/compress-pdf-to-2mb" element={<CompressPdfPage />} />
          <Route path="tools/pdf/unlock-pdf" element={<ComingSoonPage title="Unlock PDF" categoryName="PDF Tools" />} />
          <Route path="tools/pdf/powerpoint-to-pdf" element={<ComingSoonPage title="PowerPoint To PDF" categoryName="PDF Tools" />} />
          <Route path="tools/pdf/excel-to-pdf" element={<ComingSoonPage title="Excel To PDF" categoryName="PDF Tools" />} />

          <Route path="tools/calculators" element={<CalculatorsPage />} />
          <Route path="tools/calculators/age-calculator" element={<AgeCalculatorPage />} />
          <Route path="tools/calculators/chronological-age-calculator" element={<ChronologicalAgeCalculatorPage />} />
          <Route path="tools/calculators/hours-calculator" element={<HoursCalculatorPage />} />

          <Route path="tools/dev" element={<DevToolsPage />} />
          <Route path="tools/dev/json-viewer" element={<JsonViewerPage />} />
          <Route path="tools/dev/text-to-binary" element={<BinaryTextConverterPage />} />
          <Route path="tools/dev/binary-to-text" element={<BinaryTextConverterPage />} />
          <Route path="tools/dev/binary-decoder" element={<BinaryTextConverterPage />} />
          <Route path="tools/dev/php-formatter" element={<PhpFormatterPage />} />

          <Route path="tools/website" element={<WebsiteToolsPage />} />
          <Route path="tools/website/meta-tag-generator" element={<MetaTagGeneratorPage />} />
          <Route path="tools/website/open-graph-generator" element={<OpenGraphGeneratorPage />} />
          <Route path="tools/website/twitter-card-generator" element={<TwitterCardGeneratorPage />} />
          <Route path="tools/website/robots-txt-generator" element={<RobotsTxtGeneratorPage />} />
          <Route path="tools/website/xml-sitemap-generator" element={<XmlSitemapGeneratorPage />} />
          <Route path="tools/website/html-viewer" element={<HtmlViewerPage />} />
          <Route path="tools/website/url-opener" element={<UrlOpenerPage />} />
          <Route path="tools/website/adsense-calculator" element={<AdsenseCalculatorPage />} />
          <Route path="tools/website/url-shortener" element={<UrlShortenerPage />} />
          <Route path="tools/website/check-server-status" element={<CheckServerStatusPage />} />
          <Route path="tools/website/is-it-down" element={<IsItDownPage />} />
          <Route path="tools/website/what-is-my-browser" element={<WhatIsMyBrowserPage />} />
          <Route path="tools/website/website-page-snooper" element={<WebsitePageSnooperPage />} />
          <Route path="tools/website/geo-ip-locator" element={<GeoIpLocatorPage />} />
          <Route path="tools/website/website-page-size-checker" element={<WebsitePageSizeCheckerPage />} />
          <Route path="tools/website/meta-tags-analyzer" element={<MetaTagsAnalyzerPage />} />
          <Route path="tools/website/redirect-checker" element={<RedirectCheckerPage />} />
          <Route path="tools/website/page-comparison" element={<PageComparisonPage />} />
          <Route path="tools/website/open-graph-checker" element={<OpenGraphCheckerPage />} />
          <Route path="tools/website/cloaking-checker" element={<CloakingCheckerPage />} />
          <Route path="tools/website/google-cache-checker" element={<GoogleCacheCheckerPage />} />
          
          <Route path="tools/website/google-index-checker" element={<GoogleIndexCheckerPage />} />
          <Route path="tools/website/page-authority-checker" element={<PageAuthorityCheckerPage />} />
          <Route path="tools/website/mobile-friendly-test" element={<MobileFriendlyTestPage />} />
          <Route path="tools/website/link-tracker" element={<ComingSoonPage title="Link Tracker" categoryName="Website Tools" />} />
          <Route path="tools/website/index-pages-checker" element={<IndexPagesCheckerPage />} />
          <Route path="tools/website/spam-score-checker" element={<SpamScoreCheckerPage />} />
          <Route path="tools/website/page-speed-test" element={<PageSpeedTestPage />} />

          <Route path="tools/domain" element={<DomainToolsPage />} />
          <Route path="tools/domain/domain-hosting-checker" element={<DomainHostingCheckerPage />} />
          <Route path="tools/domain/domain-age-checker" element={<DomainAgeCheckerPage />} />

          <Route path="tools/keywords/keywords-density-checker" element={<KeywordsDensityCheckerPage />} />

          <Route path="tools/other" element={<OtherToolsPage />} />
          <Route path="tools/other/fake-name-generator" element={<FakeNameGeneratorPage />} />
          <Route path="tools/other/credit-card-generator" element={<CreditCardGeneratorPage />} />
          <Route path="tools/other/emojis" element={<EmojisPage />} />
          <Route path="tools/other/password-generator" element={<PasswordGeneratorPage />} />
          <Route path="tools/other/qr-code-generator" element={<QrCodeGeneratorPage />} />
          <Route path="tools/other/find-facebook-id" element={<ComingSoonPage title="Find Facebook ID" categoryName="Other Tools" />} />

          {/* Design Studio Tools (Phase 6) */}
          <Route path="tools/design/logo-maker" element={<DesignStudioPage title="Logo Maker" description="Design beautiful vector logos instantly." slug="logo-maker" categoryName="Design Tools" categoryPath="/tools/design" width={800} height={800} />} />
          <Route path="tools/design/resume-builder" element={<DesignStudioPage title="Resume Builder" description="Craft a professional CV or Resume." slug="resume-builder" categoryName="Design Tools" categoryPath="/tools/design" width={794} height={1123} />} />
          <Route path="tools/design/flyer-maker" element={<DesignStudioPage title="Flyer Maker" description="Build gorgeous event flyers and banners." slug="flyer-maker" categoryName="Design Tools" categoryPath="/tools/design" width={794} height={1123} />} />
          <Route path="tools/design/poster-maker" element={<DesignStudioPage title="Poster Maker" description="Design large format posters easily." slug="poster-maker" categoryName="Design Tools" categoryPath="/tools/design" width={1080} height={1920} />} />
          <Route path="tools/design/invitation-maker" element={<DesignStudioPage title="Invitation Maker" description="Create elegant cards and invitations." slug="invitation-maker" categoryName="Design Tools" categoryPath="/tools/design" width={1050} height={1500} />} />
          <Route path="tools/design/business-card-maker" element={<DesignStudioPage title="Business Card Maker" description="Design custom business cards." slug="business-card-maker" categoryName="Design Tools" categoryPath="/tools/design" width={1050} height={600} />} />

          {/* AI Tools (Phase 4) */}
          <Route path="tools/ai" element={<AIToolsPage />} />
          <Route path="tools/ai/plagiarism-checker" element={<ComingSoonPage title="Plagiarism Checker" categoryName="AI Tools" />} />
          <Route path="tools/ai/essay-writer" element={<ComingSoonPage title="AI Essay Writer" categoryName="AI Tools" />} />
          <Route path="tools/ai/article-rewriter" element={<GenericAIToolPage title="Article Rewriter" description="Rewrite complete articles easily using AI." slug="article-rewriter" categoryName="AI Tools" categoryPath="/tools/ai" promptTemplate="Please rewrite the following article to make it unique and engaging while preserving the original meaning:" actionButtonText="Rewrite Article" />} />
          <Route path="tools/ai/grammar-checker" element={<GenericAIToolPage title="Free Grammar Checker" description="Check and correct grammar instantly." slug="grammar-checker" categoryName="AI Tools" categoryPath="/tools/ai" promptTemplate="Please review the following text. Correct all grammar, spelling, and punctuation errors. Provide the corrected text only:" actionButtonText="Check Grammar" />} />
          <Route path="tools/ai/spell-checker" element={<GenericAIToolPage title="Spell Checker" description="Advanced spelling correction." slug="spell-checker" categoryName="AI Tools" categoryPath="/tools/ai" promptTemplate="Correct any spelling errors in the following text. Provide the corrected text only:" actionButtonText="Check Spelling" />} />
          <Route path="tools/ai/paraphraser" element={<GenericAIToolPage title="Paraphrasing Tool" description="Paraphrase sentences instantly." slug="paraphraser" categoryName="AI Tools" categoryPath="/tools/ai" promptTemplate="Paraphrase the following text. Rephrase it in a natural and fluent way:" actionButtonText="Paraphrase" />} />
          <Route path="tools/ai/paragraph-generator" element={<GenericAIToolPage title="Paragraph Generator" description="Generate AI paragraphs from prompts." slug="paragraph-generator" categoryName="AI Tools" categoryPath="/tools/ai" inputLabel="Writing Prompt" inputPlaceholder="What should the paragraph be about?" promptTemplate="Generate a well-written paragraph based on the following prompt:" actionButtonText="Generate Paragraph" />} />
          <Route path="tools/ai/title-generator" element={<GenericAIToolPage title="Title Generator" description="Generate catchy titles." slug="title-generator" categoryName="AI Tools" categoryPath="/tools/ai" inputLabel="Topic or Description" inputPlaceholder="E.g., An article about AI taking over..." promptTemplate="Generate a list of 5 catchy and engaging titles based on the following topic or description:" actionButtonText="Generate Titles" />} />
          <Route path="tools/ai/summarizer" element={<GenericAIToolPage title="Text Summarizer" description="Summarize long texts." slug="summarizer" categoryName="AI Tools" categoryPath="/tools/ai" promptTemplate="Summarize the following text into key bullet points and a short concluding paragraph:" actionButtonText="Summarize Text" />} />
          <Route path="tools/ai/email-writer" element={<GenericAIToolPage title="AI Email Writer" description="Draft professional emails." slug="email-writer" categoryName="AI Tools" categoryPath="/tools/ai" inputLabel="Email Details" inputPlaceholder="E.g., Write a polite email to my boss asking for next Friday off..." promptTemplate="Draft a professional and well-formatted email based on the following instructions:" actionButtonText="Write Email" />} />
          <Route path="tools/ai/story-generator" element={<GenericAIToolPage title="AI Story Generator" description="Write creative stories." slug="story-generator" categoryName="AI Tools" categoryPath="/tools/ai" inputLabel="Story Prompt" inputPlaceholder="E.g., A sci-fi story about a time traveler..." promptTemplate="Write an engaging and creative short story based on the following prompt:" actionButtonText="Generate Story" />} />
          <Route path="tools/ai/content-detector" element={<GenericAIToolPage title="AI Content Detector" description="Detect AI generated content." slug="content-detector" categoryName="AI Tools" categoryPath="/tools/ai" promptTemplate="Analyze the following text and determine the probability of it being written by AI vs a human. Provide a clear percentage breakdown and reasoning:" actionButtonText="Analyze Content" />} />
          <Route path="tools/ai/humanizer" element={<GenericAIToolPage title="AI Humanizer" description="Make AI text sound more human." slug="humanizer" categoryName="AI Tools" categoryPath="/tools/ai" promptTemplate="Rewrite the following text to make it sound completely human, natural, conversational, and avoiding typical AI formalisms:" actionButtonText="Humanize Text" />} />
          <Route path="tools/ai/ai-writer" element={<GenericAIToolPage title="AI Writer" description="General-purpose AI writing assistant." slug="ai-writer" categoryName="AI Tools" categoryPath="/tools/ai" inputLabel="What do you want to write?" inputPlaceholder="Describe what you want the AI to write..." promptTemplate="Please write the following:" actionButtonText="Write Content" />} />

          <Route path="*" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">404 - Not Found</h2></div>} />
          </Route>
        </Routes>
      </Suspense>
      <Analytics />
    </BrowserRouter>
  );
}
