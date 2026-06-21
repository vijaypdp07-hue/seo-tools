import { 
  FileText, 
  Image as ImageIcon, 
  FileCode, 
  Calculator, 
  Code, 
  Settings, 
  Globe,
  MoreHorizontal,
  Sparkles, 
  PenTool
} from "lucide-react";

export interface ToolItem {
  name: string;
  desc: string;
  path: string;
  category: string;
  icon?: any;
}

export const allTools: ToolItem[] = [
  // Text Tools
  { name: "Word Counter", desc: "Count words, characters, sentences, readable time, and estimate paragraph distribution.", path: "/tools/text/word-counter", category: "Text Tools", icon: FileText },
  { name: "Case Converter", desc: "Instantly convert text to UPPERCASE, lowercase, CamelCase, Title Case, or Sentence case.", path: "/tools/text/case-converter", category: "Text Tools", icon: FileText },
  { name: "Word Combiner", desc: "Combine two lists of words or keywords with customized spacing, colons, or dashes.", path: "/tools/text/word-combiner", category: "Text Tools", icon: FileText },
  { name: "Reverse Text Generator", desc: "Reverse character flows, mirror phrases, or flip text upside down for fun layouts.", path: "/tools/text/reverse-text", category: "Text Tools", icon: FileText },
  { name: "Online Notepad", desc: "A browser-based rich text pad that saves auto-backups locally inside browser memory.", path: "/tools/text/online-notepad", category: "Text Tools", icon: FileText },
  { name: "Morse Code Translator", desc: "Encode regular text to Morse code or decode Morse code audio beats and signals.", path: "/tools/text/morse-code-translator", category: "Text Tools", icon: FileText },
  { name: "Text To Image", desc: "Create beautiful banners and graphics with multi-line styles and colored overlays.", path: "/tools/text/text-to-image", category: "Text Tools", icon: FileText },
  { name: "Small Text Generator", desc: "Convert your text into tiny subscript, superscript, or small caps unicode characters.", path: "/tools/text/small-text-generator", category: "Text Tools", icon: FileText },
  { name: "Bold Text Generator", desc: "Generate bold unicode text that works on social media profiles.", path: "/tools/text/bold-text-generator", category: "Text Tools", icon: FileText },
  { name: "Upside Down Text Generator", desc: "Flip your text completely upside down.", path: "/tools/text/upside-down-text-generator", category: "Text Tools", icon: FileText },
  { name: "Invisible Character", desc: "Copy blank or invisible space characters for usernames or social formats.", path: "/tools/text/invisible-character", category: "Text Tools", icon: FileText },
  { name: "Small Caps Generator", desc: "Convert standard text into sᴍᴀʟʟ ᴄᴀᴘs letters.", path: "/tools/text/small-caps-generator", category: "Text Tools", icon: FileText },
  { name: "Online Text Editor", desc: "Write cleanly with a distraction-free online text editor.", path: "/tools/text/online-text-editor", category: "Text Tools", icon: FileText },
  { name: "Speech to Text", desc: "Dictate live using your browser's speech recognition capabilities.", path: "/tools/text/speech-to-text", category: "Text Tools", icon: FileText },
  { name: "OCR / Image to Text", desc: "Extract text seamlessly from any image upload natively with browser-based optical character recognition.", path: "/tools/text/ocr", category: "Text Tools", icon: FileText },
  
  // Image Tools
  { name: "Image Compressor", desc: "Reduce PNG, JPEG, and WebP physical file size with real-time compression level controls.", path: "/tools/image/image-compressor", category: "Image Tools", icon: ImageIcon },
  { name: "Convert To JPG", desc: "Convert miscellaneous formats like HEIC, WebP, and PNG into standardized high-quality JPEGs.", path: "/tools/image/convert-to-jpg", category: "Image Tools", icon: ImageIcon },
  { name: "Favicon Generator", desc: "Instantly create fully compatible multi-sized favicons and manifest files for web projects.", path: "/tools/image/favicon-generator", category: "Image Tools", icon: ImageIcon },
  { name: "Photo Resizer In KB", desc: "Precisely target an exact file size in KB for your JPEGs and PNGs.", path: "/tools/image/photo-resizer-in-kb", category: "Image Tools", icon: ImageIcon },
  { name: "Compress Image to 10KB", desc: "Reduce any image file to exactly under 10KB.", path: "/tools/image/compress-image-to-10kb", category: "Image Tools", icon: ImageIcon },
  { name: "Compress Image to 20KB", desc: "Reduce any image file to exactly under 20KB.", path: "/tools/image/compress-image-to-20kb", category: "Image Tools", icon: ImageIcon },
  { name: "Compress JPEG to 30KB", desc: "Reduce any image file to exactly under 30KB.", path: "/tools/image/compress-jpeg-to-30kb", category: "Image Tools", icon: ImageIcon },
  { name: "Compress Image to 50KB", desc: "Reduce any image file to exactly under 50KB.", path: "/tools/image/compress-image-to-50kb", category: "Image Tools", icon: ImageIcon },
  { name: "Compress JPEG to 100KB", desc: "Quickly reduce any image file to exactly under 100KB.", path: "/tools/image/compress-jpeg-to-100kb", category: "Image Tools", icon: ImageIcon },
  { name: "Compress JPEG to 200KB", desc: "Quickly reduce any image file to exactly under 200KB.", path: "/tools/image/compress-jpeg-to-200kb", category: "Image Tools", icon: ImageIcon },
  { name: "Compress Image to 1MB", desc: "Quickly reduce any image file to exactly under 1MB.", path: "/tools/image/compress-image-to-1mb", category: "Image Tools", icon: ImageIcon },
  { name: "Compress JPG", desc: "Reduce JPG files while keeping quality.", path: "/tools/image/compress-jpg", category: "Image Tools", icon: ImageIcon },
  { name: "Compress PNG", desc: "Reduce PNG files while keeping quality.", path: "/tools/image/compress-png", category: "Image Tools", icon: ImageIcon },
  { name: "Resize Image to 20KB", desc: "Target exactly 20KB size.", path: "/tools/image/resize-image-to-20kb", category: "Image Tools", icon: ImageIcon },
  { name: "Resize Image to 50KB", desc: "Target exactly 50KB size.", path: "/tools/image/resize-image-to-50kb", category: "Image Tools", icon: ImageIcon },
  { name: "Resize Image to 100KB", desc: "Target exactly 100KB size.", path: "/tools/image/resize-image-to-100kb", category: "Image Tools", icon: ImageIcon },
  { name: "Reduce Image Size in KB", desc: "Compress image file sizes heavily.", path: "/tools/image/reduce-image-size-kb", category: "Image Tools", icon: ImageIcon },
  { name: "HEIC to JPG", desc: "Convert Apple HEIC photos cleanly into standard JPEGs in the browser.", path: "/tools/image/heic-to-jpg", category: "Image Tools", icon: ImageIcon },
  { name: "HEIC to PNG", desc: "Convert Apple HEIC photos cleanly into transparent PNGs.", path: "/tools/image/heic-to-png", category: "Image Tools", icon: ImageIcon },
  { name: "Crop Image", desc: "Freehand or aspect-ratio crop any given image natively without servers.", path: "/tools/image/crop-image", category: "Image Tools", icon: ImageIcon },
  { name: "MB to KB Converter", desc: "Data format scale conversion utility for exact storage size mappings.", path: "/tools/image/mb-to-kb-converter", category: "Image Tools", icon: ImageIcon },
  { name: "RGB to Hex", desc: "Extract hex strings from RGB integer sets and visualize the color blocks instantly.", path: "/tools/image/rgb-to-hex", category: "Image Tools", icon: ImageIcon },
  { name: "PNG to JPG", desc: "Convert transparent vector-rich PNGs into small-sized JPEGs easily.", path: "/tools/image/png-to-jpg", category: "Image Tools", icon: ImageIcon },
  { name: "JPG to PNG", desc: "Convert rigid JPEGs into uncompressed flat PNGs.", path: "/tools/image/jpg-to-png", category: "Image Tools", icon: ImageIcon },
  { name: "WEBP to PNG", desc: "Turn next-gen WebP variants natively back into high-fidelity PNG outputs.", path: "/tools/image/webp-to-png", category: "Image Tools", icon: ImageIcon },
  { name: "SVG to PNG", desc: "Rasterize vector graphic structures into high-res PNG static outputs.", path: "/tools/image/svg-to-png", category: "Image Tools", icon: ImageIcon },
  { name: "PNG to SVG", desc: "Convert standard transparent files into fully scalable SVG vectors seamlessly natively.", path: "/tools/image/png-to-svg", category: "Image Tools", icon: ImageIcon },
  { name: "JPG to SVG", desc: "Translate strict JPEG boundaries cleanly into minimal scalable SVG outlines natively.", path: "/tools/image/jpg-to-svg", category: "Image Tools", icon: ImageIcon },
  { name: "JPEG to SVG", desc: "Translate tight generic metadata structures directly to responsive SVG DOM segments.", path: "/tools/image/jpeg-to-svg", category: "Image Tools", icon: ImageIcon },
  { name: "PNG to ICO", desc: "Convert standard transparent files into standard Windows ICO favicons natively.", path: "/tools/image/png-to-ico", category: "Image Tools", icon: ImageIcon },
  { name: "AVIF to JPG", desc: "Convert heavy next-gen AVIF file data into baseline standard JPEGs.", path: "/tools/image/avif-to-jpg", category: "Image Tools", icon: ImageIcon },
  { name: "JPEG Optimizer", desc: "Strip standard JPEG metadata arrays seamlessly keeping maximum fidelity.", path: "/tools/image/jpeg-optimizer", category: "Image Tools", icon: ImageIcon },
  { name: "SVG Converter", desc: "Clean and minimize scalable vector layers for leaner DOM payloads.", path: "/tools/image/svg-converter", category: "Image Tools", icon: ImageIcon },
  { name: "Video to GIF", desc: "Generate animated GIFs straight from high-quality MP4 file uploads via Wasm.", path: "/tools/image/video-to-gif", category: "Image Tools", icon: ImageIcon },
  { name: "Image To Text Converter", desc: "Extract raw copyable strings natively from a local picture upload.", path: "/tools/image/image-to-text", category: "Image Tools", icon: ImageIcon },
  { name: "MP4 to GIF", desc: "Convert standard MP4 video loops cleanly into web-ready GIF files.", path: "/tools/image/mp4-to-gif", category: "Image Tools", icon: ImageIcon },
  { name: "Meme Generator", desc: "Author custom top and bottom impact font captions rapidly over uploaded image macros.", path: "/tools/image/meme-generator", category: "Image Tools", icon: ImageIcon },
  { name: "Reverse Image Search", desc: "Directly pipe your local uploads into standard web-based reverse engine proxies.", path: "/tools/image/reverse-image-search", category: "Image Tools", icon: ImageIcon },

  // PDF Tools
  { name: "Merge PDF", desc: "Merge multiple locally uploaded PDF files securely in browser into a single formatted PDF.", path: "/tools/pdf/merge-pdf", category: "PDF Tools", icon: FileCode },
  { name: "Rotate PDF", desc: "Instantly rotate the pages of your PDF document in 90-degree steps.", path: "/tools/pdf/rotate-pdf", category: "PDF Tools", icon: FileCode },
  { name: "Lock PDF", desc: "Secure your PDFs thoroughly with a custom encryption password natively.", path: "/tools/pdf/lock-pdf", category: "PDF Tools", icon: FileCode },
  { name: "Split PDF", desc: "Divide large documents into modular page-based extractions.", path: "/tools/pdf/split-pdf", category: "PDF Tools", icon: FileCode },
  { name: "PDF to JPG", desc: "Convert PDF pages into separate high-resolution JPG images safely and easily.", path: "/tools/pdf/pdf-to-jpg", category: "PDF Tools", icon: FileCode },
  { name: "Compress PDF", desc: "Dramatically lower the final byte cost of a dense vector PDF document.", path: "/tools/pdf/compress-pdf", category: "PDF Tools", icon: FileCode },
  { name: "PDF to ZIP", desc: "Turn arrays of generated PDFs efficiently into one multi-file ZIP archive natively.", path: "/tools/pdf/pdf-to-zip", category: "PDF Tools", icon: FileCode },
  { name: "Compress PDF to 50KB", desc: "Aggressively strip content rendering objects matching EXACT 50KB limitations natively.", path: "/tools/pdf/compress-pdf-to-50kb", category: "PDF Tools", icon: FileCode },
  { name: "Compress PDF to 100KB", desc: "Aggressively strip content rendering objects matching EXACT 100KB limitations natively.", path: "/tools/pdf/compress-pdf-to-100kb", category: "PDF Tools", icon: FileCode },
  { name: "Compress PDF to 150KB", desc: "Aggressively strip content rendering objects matching EXACT 150KB limitations natively.", path: "/tools/pdf/compress-pdf-to-150kb", category: "PDF Tools", icon: FileCode },
  { name: "Compress PDF to 200KB", desc: "Aggressively strip content rendering objects matching EXACT 200KB limitations natively.", path: "/tools/pdf/compress-pdf-to-200kb", category: "PDF Tools", icon: FileCode },
  { name: "Resize PDF to 200KB", desc: "Resize matching exactly 200KB limit natively.", path: "/tools/pdf/resize-pdf-to-200kb", category: "PDF Tools", icon: FileCode },
  { name: "Compress PDF to 300KB", desc: "Aggressively strip content rendering objects matching EXACT 300KB limitations natively.", path: "/tools/pdf/compress-pdf-to-300kb", category: "PDF Tools", icon: FileCode },
  { name: "Compress PDF to 400KB", desc: "Reduce memory requirements accurately mapping file payloads down to exactly 400KB.", path: "/tools/pdf/compress-pdf-to-400kb", category: "PDF Tools", icon: FileCode },
  { name: "Compress PDF to 500KB", desc: "Minimize graphic vectors retaining resolution under exactly 500KB constraints natively.", path: "/tools/pdf/compress-pdf-to-500kb", category: "PDF Tools", icon: FileCode },
  { name: "Compress PDF to 1MB", desc: "Squish and convert structural assets retaining visual data perfectly under roughly 1MB limitations natively.", path: "/tools/pdf/compress-pdf-to-1mb", category: "PDF Tools", icon: FileCode },
  { name: "Compress PDF to 1.5MB", desc: "Process and encode visual resources optimally fitting files perfectly to exactly 1.5MB natively.", path: "/tools/pdf/compress-pdf-to-1-5mb", category: "PDF Tools", icon: FileCode },
  { name: "Compress PDF to 2MB", desc: "Flatten image elements securely, staying carefully under general 2 Megabyte limitations natively.", path: "/tools/pdf/compress-pdf-to-2mb", category: "PDF Tools", icon: FileCode },
  { name: "Word To PDF", desc: "Safely map DOCX standard properties into flat formatted PDFs natively.", path: "/tools/pdf/word-to-pdf", category: "PDF Tools", icon: FileCode },
  { name: "PDF To Word", desc: "Draft basic doc extracts directly from rendered text-nodes.", path: "/tools/pdf/pdf-to-word", category: "PDF Tools", icon: FileCode },
  { name: "Unlock PDF", desc: "Strip password encryption completely enabling simple distribution.", path: "/tools/pdf/unlock-pdf", category: "PDF Tools", icon: FileCode },
  { name: "PowerPoint To PDF", desc: "Process PPTX structures generating flattened presentation slides.", path: "/tools/pdf/powerpoint-to-pdf", category: "PDF Tools", icon: FileCode },
  { name: "Excel To PDF", desc: "Translate generic sheet tables over to formatted clean vector outputs.", path: "/tools/pdf/excel-to-pdf", category: "PDF Tools", icon: FileCode },

  // Calculators
  { name: "Age Calculator", desc: "Calculate chronological age down to the exact years, months, weeks, days, and seconds.", path: "/tools/calculators/age-calculator", category: "Calculators", icon: Calculator },
  { name: "Chronological Age Calculator", desc: "Accurately compute highly specific chronological measurements between complex date intervals natively.", path: "/tools/calculators/chronological-age-calculator", category: "Calculators", icon: Calculator },
  { name: "Hours Calculator", desc: "Sum up duration inputs formatted in hours and minutes.", path: "/tools/calculators/hours-calculator", category: "Calculators", icon: Calculator },

  // Dev Tools
  { name: "JSON Viewer & Formatter", desc: "Parse, syntax highlight, format, validate, and inspect nested fields in JSON feeds.", path: "/tools/dev/json-viewer", category: "Dev Tools", icon: Code },
  { name: "Text to Binary", desc: "Examine ASCII/UTF code tables and translate characters into Binary sequences and back.", path: "/tools/dev/text-to-binary", category: "Dev Tools", icon: Code },
  { name: "Binary to Text", desc: "Decode raw binary bits cleanly back into their original Unicode characters.", path: "/tools/dev/binary-to-text", category: "Dev Tools", icon: Code },
  { name: "Binary Decoder", desc: "Decode raw binary payloads via dynamic base shifts seamlessly into readable ASCII streams.", path: "/tools/dev/binary-decoder", category: "Dev Tools", icon: Code },
  { name: "PHP Formatter", desc: "Beautify and auto-indent your raw PHP code blocks using a local parser.", path: "/tools/dev/php-formatter", category: "Dev Tools", icon: Code },

  // Domain Tools
  { name: "Domain Hosting Checker", desc: "Validate active domain registration hosts handling root traffic flow pathways natively.", path: "/tools/domain/domain-hosting-checker", category: "Domain Tools", icon: Globe },
  { name: "Domain Age Checker", desc: "Request standard DNS records calculating initial registration offsets and active lifespans natively.", path: "/tools/domain/domain-age-checker", category: "Domain Tools", icon: Globe },

  // Meta & SEO Tools
  { name: "Keywords Density Checker", desc: "Analyze page strings recursively graphing exact occurrence keyword percentage values natively.", path: "/tools/keywords/keywords-density-checker", category: "Meta & SEO", icon: Settings },
  { name: "Meta Tag Generator", desc: "Instantly create standard HTML title, description, robot, and keyword tags for layouts.", path: "/tools/website/meta-tag-generator", category: "Meta & SEO", icon: Settings },
  { name: "Open Graph Generator", desc: "Generate Facebook OG and Twitter Cards so shared links feature custom thumbnails & headlines.", path: "/tools/website/open-graph-generator", category: "Meta & SEO", icon: Settings },
  { name: "Twitter Card Generator", desc: "Easily scaffold standard formatted markup meta specifically for Twitter micro-rendering natively.", path: "/tools/website/twitter-card-generator", category: "Meta & SEO", icon: Settings },
  { name: "Robots.txt Generator", desc: "Build crawler instruction guides safely including Sitemap references and blocking rules.", path: "/tools/website/robots-txt-generator", category: "Meta & SEO", icon: Settings },
  { name: "XML Sitemap Generator", desc: "Auto-assemble an indexed XML file payload containing proper URL frequency tags.", path: "/tools/website/xml-sitemap-generator", category: "Meta & SEO", icon: Settings },
  { name: "HTML Viewer", desc: "Evaluate basic rendered DOM blocks and parse layout trees dynamically using local inputs.", path: "/tools/website/html-viewer", category: "Meta & SEO", icon: Settings },
  { name: "URL Opener", desc: "Bulk-open a long list of URL hyperlinks simultaneously in a browser session.", path: "/tools/website/url-opener", category: "Meta & SEO", icon: Settings },
  { name: "Adsense Calculator", desc: "Analyze raw traffic flow conversion RPM patterns computing absolute Adsense projection bounds safely.", path: "/tools/website/adsense-calculator", category: "Meta & SEO", icon: Settings },
  { name: "URL Shortener", desc: "Generate shortened persistent safe-links and track real click traffic natively.", path: "/tools/website/url-shortener", category: "Meta & SEO", icon: Settings },
  { name: "Check Server Status", desc: "Trace operational routing capabilities directly checking standard header availability natively.", path: "/tools/website/check-server-status", category: "Meta & SEO", icon: Settings },
  { name: "Is It Down", desc: "Confirm operational availability verifying explicit error bounds directly routing globally.", path: "/tools/website/is-it-down", category: "Meta & SEO", icon: Settings },
  { name: "What Is My Browser", desc: "Evaluate exact string capabilities explicitly identifying underlying agent parameters natively.", path: "/tools/website/what-is-my-browser", category: "Meta & SEO", icon: Settings },
  { name: "Website Page Snooper", desc: "Inspect specific response paths reviewing exact request delivery formatting globally natively.", path: "/tools/website/website-page-snooper", category: "Meta & SEO", icon: Settings },
  { name: "GEO IP Locator", desc: "Determine local positional origins routing exactly based on IP blocks.", path: "/tools/website/geo-ip-locator", category: "Meta & SEO", icon: Settings },
  { name: "Website Page Size Checker", desc: "Calculate raw rendering volumes directly examining the absolute load values locally.", path: "/tools/website/website-page-size-checker", category: "Meta & SEO", icon: Settings },
  { name: "Meta Tags Analyzer", desc: "Extract current layout standards resolving raw descriptions instantly natively.", path: "/tools/website/meta-tags-analyzer", category: "Meta & SEO", icon: Settings },
  { name: "Redirect Checker", desc: "Examine complex routing shifts validating direct trace status transitions natively.", path: "/tools/website/redirect-checker", category: "Meta & SEO", icon: Settings },
  { name: "Page Comparison", desc: "Visually diff exact formatting shifts contrasting code structure implementations side-by-side natively.", path: "/tools/website/page-comparison", category: "Meta & SEO", icon: Settings },
  { name: "Open Graph Checker", desc: "Resolve structural headers precisely graphing custom previews accurately matching native standards.", path: "/tools/website/open-graph-checker", category: "Meta & SEO", icon: Settings },
  { name: "Cloaking Checker", desc: "Detect raw string differentials confirming exactly visual outputs match natively generated search bot outputs.", path: "/tools/website/cloaking-checker", category: "Meta & SEO", icon: Settings },
  { name: "Google Cache Checker", desc: "Find recent static indexes matching URL structures accurately tracking exact indexing timestamps.", path: "/tools/website/google-cache-checker", category: "Meta & SEO", icon: Settings },
  { name: "Google Index Checker", desc: "Confirm exact string matching routing URLs directly searching localized index domains natively.", path: "/tools/website/google-index-checker", category: "Meta & SEO", icon: Settings },
  { name: "Page Authority Checker", desc: "Estimate exact weight values validating standard external inbound domain capabilities.", path: "/tools/website/page-authority-checker", category: "Meta & SEO", icon: Settings },
  { name: "Mobile Friendly Test", desc: "Directly parse display bounds generating simple reactive layout validations.", path: "/tools/website/mobile-friendly-test", category: "Meta & SEO", icon: Settings },
  { name: "Link Tracker", desc: "Examine active external pathing finding explicit destination links globally.", path: "/tools/website/link-tracker", category: "Meta & SEO", icon: Settings },
  { name: "Index Pages Checker", desc: "Retrieve total path counts explicitly bound within current indexing standards natively.", path: "/tools/website/index-pages-checker", category: "Meta & SEO", icon: Settings },
  { name: "Spam Score Checker", desc: "Correlate algorithmic tracking exactly estimating overall structural string penalties natively.", path: "/tools/website/spam-score-checker", category: "Meta & SEO", icon: Settings },
  { name: "Page Speed Test", desc: "Analyze a web page's load speed and performance metrics utilizing Google PageSpeed Insights.", path: "/tools/website/page-speed-test", category: "Meta & SEO", icon: Settings },
  
  // Other Tools
  { name: "Fake Name Generator", desc: "Bulk spin localized, random profile identities, names, and contact parameters.", path: "/tools/other/fake-name-generator", category: "Other Tools", icon: MoreHorizontal },
  { name: "Credit Card Generator", desc: "Generate Luhn-accurate sequence mock numbers for testing form logic.", path: "/tools/other/credit-card-generator", category: "Other Tools", icon: MoreHorizontal },
  { name: "Emojis", desc: "Quickly access and copy hundreds of web-ready unicode glyph emojis.", path: "/tools/other/emojis", category: "Other Tools", icon: MoreHorizontal },
  { name: "Password Generator", desc: "Cryptographically mix ultra-secure strings directly on the client side.", path: "/tools/other/password-generator", category: "Other Tools", icon: MoreHorizontal },
  { name: "QR Code Generator", desc: "Translate text or URLs into fully scannable digital blocks instantly.", path: "/tools/other/qr-code-generator", category: "Other Tools", icon: MoreHorizontal },
  { name: "Find Facebook ID", desc: "Extract raw system ID structures formatting raw usernames into strict number sequences natively.", path: "/tools/other/find-facebook-id", category: "Other Tools", icon: MoreHorizontal },

  // Design Studio Tools
  { name: "Logo Maker", desc: "Design beautiful vector logos instantly.", path: "/tools/design/logo-maker", category: "Design Tools", icon: PenTool },
  { name: "Resume Builder", desc: "Craft a professional CV or Resume.", path: "/tools/design/resume-builder", category: "Design Tools", icon: PenTool },
  { name: "Flyer Maker", desc: "Build gorgeous event flyers and banners.", path: "/tools/design/flyer-maker", category: "Design Tools", icon: PenTool },
  { name: "Poster Maker", desc: "Design large format posters easily.", path: "/tools/design/poster-maker", category: "Design Tools", icon: PenTool },
  { name: "Invitation Maker", desc: "Create elegant cards and invitations.", path: "/tools/design/invitation-maker", category: "Design Tools", icon: PenTool },
  { name: "Business Card Maker", desc: "Design custom business cards.", path: "/tools/design/business-card-maker", category: "Design Tools", icon: PenTool },

  // AI Tools
  { name: "Article Rewriter", desc: "Rewrite complete articles easily using AI.", path: "/tools/ai/article-rewriter", category: "AI Tools", icon: Sparkles },
  { name: "Free Grammar Checker", desc: "Check and correct grammar instantly using AI.", path: "/tools/ai/grammar-checker", category: "AI Tools", icon: Sparkles },
  { name: "Spell Checker", desc: "Advanced spelling correction powered by AI.", path: "/tools/ai/spell-checker", category: "AI Tools", icon: Sparkles },
  { name: "Paraphrasing Tool", desc: "Paraphrase sentences instantly into a more natural tone.", path: "/tools/ai/paraphraser", category: "AI Tools", icon: Sparkles },
  { name: "Paragraph Generator", desc: "Generate comprehensive paragraphs from short prompts.", path: "/tools/ai/paragraph-generator", category: "AI Tools", icon: Sparkles },
  { name: "Title Generator", desc: "Generate catchy and engaging titles for your content.", path: "/tools/ai/title-generator", category: "AI Tools", icon: Sparkles },
  { name: "Text Summarizer", desc: "Summarize long texts into short bullet points.", path: "/tools/ai/summarizer", category: "AI Tools", icon: Sparkles },
  { name: "AI Email Writer", desc: "Draft professional and well-formatted emails instantly.", path: "/tools/ai/email-writer", category: "AI Tools", icon: Sparkles },
  { name: "AI Story Generator", desc: "Write engaging and creative short stories.", path: "/tools/ai/story-generator", category: "AI Tools", icon: Sparkles },
  { name: "AI Content Detector", desc: "Determine the probability of text being written by AI vs human.", path: "/tools/ai/content-detector", category: "AI Tools", icon: Sparkles },
  { name: "AI Humanizer", desc: "Rewrite text to make it sound completely human and natural.", path: "/tools/ai/humanizer", category: "AI Tools", icon: Sparkles },
  { name: "AI Writer", desc: "Draft any text using a general-purpose AI writing assistant.", path: "/tools/ai/ai-writer", category: "AI Tools", icon: Sparkles },
];

// Re-export common categories based on tools
export const getCategories = () => {
    const counts: Record<string, number> = {};
    allTools.forEach(tool => {
      counts[tool.category] = (counts[tool.category] || 0) + 1;
    });

    return [
        { name: "Text Tools", icon: FileText, path: "/tools/text", count: counts["Text Tools"] || 0, desc: "Format, count, translate, and manipulate lines of textual scripts of any size." },
        { name: "Image Tools", icon: ImageIcon, path: "/tools/image", count: counts["Image Tools"] || 0, desc: "Compress and change formats of high-fidelity camera files completely offline." },
        { name: "PDF Tools", icon: FileCode, path: "/tools/pdf", count: counts["PDF Tools"] || 0, desc: "Consolidate documents and merge multiple pages together with high precision." },
        { name: "Dev Tools", icon: Code, path: "/tools/dev", count: counts["Dev Tools"] || 0, desc: "JSON formatting, viewer inspection, and multi-encoding translators." },
        { name: "Domain Tools", icon: Globe, path: "/tools/domain", count: counts["Domain Tools"] || 0, desc: "Validate and inspect underlying domain registration metrics and lifespans." },
        { name: "Calculators", icon: Calculator, path: "/tools/calculators", count: counts["Calculators"] || 0, desc: "Accurate chronological trackers and age counters for daily computation." },
        { name: "Meta & SEO", icon: Settings, path: "/tools/website", count: counts["Meta & SEO"] || 0, desc: "Optimize index rules, meta headers, and social previews on web platforms." },
        { name: "Design Tools", icon: PenTool, path: "/tools/design", count: counts["Design Tools"] || 0, desc: "Create logos, resumes, flyers, and robust web graphics right in your browser." },
        { name: "AI Tools", icon: Sparkles, path: "/tools/ai", count: counts["AI Tools"] || 0, desc: "Leverage AI to write, rewrite, summarize, and analyze text instantly." },
        { name: "Other Tools", icon: MoreHorizontal, path: "/tools/other", count: counts["Other Tools"] || 0, desc: "Miscellaneous generators for fake identities, passwords, and QR payloads." },
    ];
};
