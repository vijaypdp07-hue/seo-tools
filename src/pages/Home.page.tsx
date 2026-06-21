import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Image as ImageIcon, 
  FileCode, 
  Calculator, 
  Code, 
  Settings, 
  Globe,
  MoreHorizontal,
  Search, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  X 
} from "lucide-react";

interface ToolItem {
  name: string;
  desc: string;
  path: string;
  category: string;
}

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const allTools: ToolItem[] = useMemo(() => [
    // Text Tools
    { name: "Word Counter", desc: "Count words, characters, sentences, readable time, and estimate paragraph distribution.", path: "/tools/text/word-counter", category: "Text Tools" },
    { name: "Case Converter", desc: "Instantly convert text to UPPERCASE, lowercase, CamelCase, Title Case, or Sentence case.", path: "/tools/text/case-converter", category: "Text Tools" },
    { name: "Word Combiner", desc: "Combine two lists of words or keywords with customized spacing, colons, or dashes.", path: "/tools/text/word-combiner", category: "Text Tools" },
    { name: "Reverse Text Generator", desc: "Reverse character flows, mirror phrases, or flip text upside down for fun layouts.", path: "/tools/text/reverse-text", category: "Text Tools" },
    { name: "Online Notepad", desc: "A browser-based rich text pad that saves auto-backups locally inside browser memory.", path: "/tools/text/online-notepad", category: "Text Tools" },
    { name: "Morse Code Translator", desc: "Encode regular text to Morse code or decode Morse code audio beats and signals.", path: "/tools/text/morse-code-translator", category: "Text Tools" },
    { name: "Text To Image", desc: "Create beautiful banners and graphics with multi-line styles and colored overlays.", path: "/tools/text/text-to-image", category: "Text Tools" },
    { name: "Small Text Generator", desc: "Convert your text into tiny subscript, superscript, or small caps unicode characters.", path: "/tools/text/small-text-generator", category: "Text Tools" },
    { name: "Bold Text Generator", desc: "Generate bold unicode text that works on social media profiles.", path: "/tools/text/bold-text-generator", category: "Text Tools" },
    { name: "Upside Down Text Generator", desc: "Flip your text completely upside down.", path: "/tools/text/upside-down-text-generator", category: "Text Tools" },
    { name: "Invisible Character", desc: "Copy blank or invisible space characters for usernames or social formats.", path: "/tools/text/invisible-character", category: "Text Tools" },
    { name: "Small Caps Generator", desc: "Convert standard text into sᴍᴀʟʟ ᴄᴀᴘs letters.", path: "/tools/text/small-caps-generator", category: "Text Tools" },
    { name: "Online Text Editor", desc: "Write cleanly with a distraction-free online text editor.", path: "/tools/text/online-text-editor", category: "Text Tools" },
    { name: "Speech to Text", desc: "Dictate live using your browser's speech recognition capabilities.", path: "/tools/text/speech-to-text", category: "Text Tools" },
    { name: "OCR / Image to Text", desc: "Extract text seamlessly from any image upload natively with browser-based optical character recognition.", path: "/tools/text/ocr", category: "Text Tools" },
    
    // Image Tools
    { name: "Image Compressor", desc: "Reduce PNG, JPEG, and WebP physical file size with real-time compression level controls.", path: "/tools/image/image-compressor", category: "Image Tools" },
    { name: "Convert To JPG", desc: "Convert miscellaneous formats like HEIC, WebP, and PNG into standardized high-quality JPEGs.", path: "/tools/image/convert-to-jpg", category: "Image Tools" },
    { name: "Favicon Generator", desc: "Instantly create fully compatible multi-sized favicons and manifest files for web projects.", path: "/tools/image/favicon-generator", category: "Image Tools" },
    { name: "Photo Resizer In KB", desc: "Precisely target an exact file size in KB for your JPEGs and PNGs.", path: "/tools/image/photo-resizer-in-kb", category: "Image Tools" },
    { name: "Compress Image to 10KB", desc: "Reduce any image file to exactly under 10KB.", path: "/tools/image/compress-image-to-10kb", category: "Image Tools" },
    { name: "Compress Image to 20KB", desc: "Reduce any image file to exactly under 20KB.", path: "/tools/image/compress-image-to-20kb", category: "Image Tools" },
    { name: "Compress JPEG to 30KB", desc: "Reduce any image file to exactly under 30KB.", path: "/tools/image/compress-jpeg-to-30kb", category: "Image Tools" },
    { name: "Compress Image to 50KB", desc: "Reduce any image file to exactly under 50KB.", path: "/tools/image/compress-image-to-50kb", category: "Image Tools" },
    { name: "Compress JPEG to 100KB", desc: "Quickly reduce any image file to exactly under 100KB.", path: "/tools/image/compress-jpeg-to-100kb", category: "Image Tools" },
    { name: "Compress JPEG to 200KB", desc: "Quickly reduce any image file to exactly under 200KB.", path: "/tools/image/compress-jpeg-to-200kb", category: "Image Tools" },
    { name: "Compress Image to 1MB", desc: "Quickly reduce any image file to exactly under 1MB.", path: "/tools/image/compress-image-to-1mb", category: "Image Tools" },
    { name: "Compress JPG", desc: "Reduce JPG files while keeping quality.", path: "/tools/image/compress-jpg", category: "Image Tools" },
    { name: "Compress PNG", desc: "Reduce PNG files while keeping quality.", path: "/tools/image/compress-png", category: "Image Tools" },
    { name: "Resize Image to 20KB", desc: "Target exactly 20KB size.", path: "/tools/image/resize-image-to-20kb", category: "Image Tools" },
    { name: "Resize Image to 50KB", desc: "Target exactly 50KB size.", path: "/tools/image/resize-image-to-50kb", category: "Image Tools" },
    { name: "Resize Image to 100KB", desc: "Target exactly 100KB size.", path: "/tools/image/resize-image-to-100kb", category: "Image Tools" },
    { name: "Reduce Image Size in KB", desc: "Compress image file sizes heavily.", path: "/tools/image/reduce-image-size-kb", category: "Image Tools" },
    { name: "HEIC to JPG", desc: "Convert Apple HEIC photos cleanly into standard JPEGs in the browser.", path: "/tools/image/heic-to-jpg", category: "Image Tools" },
    { name: "HEIC to PNG", desc: "Convert Apple HEIC photos cleanly into transparent PNGs.", path: "/tools/image/heic-to-png", category: "Image Tools" },
    { name: "Crop Image", desc: "Freehand or aspect-ratio crop any given image natively without servers.", path: "/tools/image/crop-image", category: "Image Tools" },
    { name: "MB to KB Converter", desc: "Data format scale conversion utility for exact storage size mappings.", path: "/tools/image/mb-to-kb-converter", category: "Image Tools" },
    { name: "RGB to Hex", desc: "Extract hex strings from RGB integer sets and visualize the color blocks instantly.", path: "/tools/image/rgb-to-hex", category: "Image Tools" },
    { name: "PNG to JPG", desc: "Convert transparent vector-rich PNGs into small-sized JPEGs easily.", path: "/tools/image/png-to-jpg", category: "Image Tools" },
    { name: "JPG to PNG", desc: "Convert rigid JPEGs into uncompressed flat PNGs.", path: "/tools/image/jpg-to-png", category: "Image Tools" },
    { name: "WEBP to PNG", desc: "Turn next-gen WebP variants natively back into high-fidelity PNG outputs.", path: "/tools/image/webp-to-png", category: "Image Tools" },
    { name: "SVG to PNG", desc: "Rasterize vector graphic structures into high-res PNG static outputs.", path: "/tools/image/svg-to-png", category: "Image Tools" },
    { name: "PNG to SVG", desc: "Convert standard transparent files into fully scalable SVG vectors seamlessly natively.", path: "/tools/image/png-to-svg", category: "Image Tools" },
    { name: "JPG to SVG", desc: "Translate strict JPEG boundaries cleanly into minimal scalable SVG outlines natively.", path: "/tools/image/jpg-to-svg", category: "Image Tools" },
    { name: "JPEG to SVG", desc: "Translate tight generic metadata structures directly to responsive SVG DOM segments.", path: "/tools/image/jpeg-to-svg", category: "Image Tools" },
    { name: "PNG to ICO", desc: "Convert standard transparent files into standard Windows ICO favicons natively.", path: "/tools/image/png-to-ico", category: "Image Tools" },
    { name: "AVIF to JPG", desc: "Convert heavy next-gen AVIF file data into baseline standard JPEGs.", path: "/tools/image/avif-to-jpg", category: "Image Tools" },
    { name: "JPEG Optimizer", desc: "Strip standard JPEG metadata arrays seamlessly keeping maximum fidelity.", path: "/tools/image/jpeg-optimizer", category: "Image Tools" },
    { name: "SVG Converter", desc: "Clean and minimize scalable vector layers for leaner DOM payloads.", path: "/tools/image/svg-converter", category: "Image Tools" },
    { name: "Video to GIF", desc: "Generate animated GIFs straight from high-quality MP4 file uploads via Wasm.", path: "/tools/image/video-to-gif", category: "Image Tools" },
    { name: "Image To Text Converter", desc: "Extract raw copyable strings natively from a local picture upload.", path: "/tools/image/image-to-text", category: "Image Tools" },
    { name: "MP4 to GIF", desc: "Convert standard MP4 video loops cleanly into web-ready GIF files.", path: "/tools/image/mp4-to-gif", category: "Image Tools" },
    { name: "Meme Generator", desc: "Author custom top and bottom impact font captions rapidly over uploaded image macros.", path: "/tools/image/meme-generator", category: "Image Tools" },
    { name: "Reverse Image Search", desc: "Directly pipe your local uploads into standard web-based reverse engine proxies.", path: "/tools/image/reverse-image-search", category: "Image Tools" },

    // PDF Tools
    { name: "Merge PDF", desc: "Merge multiple locally uploaded PDF files securely in browser into a single formatted PDF.", path: "/tools/pdf/merge-pdf", category: "PDF Tools" },
    { name: "Rotate PDF", desc: "Instantly rotate the pages of your PDF document in 90-degree steps.", path: "/tools/pdf/rotate-pdf", category: "PDF Tools" },
    { name: "Lock PDF", desc: "Secure your PDFs thoroughly with a custom encryption password natively.", path: "/tools/pdf/lock-pdf", category: "PDF Tools" },
    { name: "Split PDF", desc: "Divide large documents into modular page-based extractions.", path: "/tools/pdf/split-pdf", category: "PDF Tools" },
    { name: "PDF to JPG", desc: "Convert PDF pages into separate high-resolution JPG images safely and easily.", path: "/tools/pdf/pdf-to-jpg", category: "PDF Tools" },
    { name: "Compress PDF", desc: "Dramatically lower the final byte cost of a dense vector PDF document.", path: "/tools/pdf/compress-pdf", category: "PDF Tools" },
    { name: "PDF to ZIP", desc: "Turn arrays of generated PDFs efficiently into one multi-file ZIP archive natively.", path: "/tools/pdf/pdf-to-zip", category: "PDF Tools" },
    { name: "Compress PDF to 50KB", desc: "Aggressively strip content rendering objects matching EXACT 50KB limitations natively.", path: "/tools/pdf/compress-pdf-to-50kb", category: "PDF Tools" },
    { name: "Compress PDF to 100KB", desc: "Aggressively strip content rendering objects matching EXACT 100KB limitations natively.", path: "/tools/pdf/compress-pdf-to-100kb", category: "PDF Tools" },
    { name: "Compress PDF to 150KB", desc: "Aggressively strip content rendering objects matching EXACT 150KB limitations natively.", path: "/tools/pdf/compress-pdf-to-150kb", category: "PDF Tools" },
    { name: "Compress PDF to 200KB", desc: "Aggressively strip content rendering objects matching EXACT 200KB limitations natively.", path: "/tools/pdf/compress-pdf-to-200kb", category: "PDF Tools" },
    { name: "Resize PDF to 200KB", desc: "Resize matching exactly 200KB limit natively.", path: "/tools/pdf/resize-pdf-to-200kb", category: "PDF Tools" },
    { name: "Compress PDF to 300KB", desc: "Aggressively strip content rendering objects matching EXACT 300KB limitations natively.", path: "/tools/pdf/compress-pdf-to-300kb", category: "PDF Tools" },
    { name: "Compress PDF to 400KB", desc: "Reduce memory requirements accurately mapping file payloads down to exactly 400KB.", path: "/tools/pdf/compress-pdf-to-400kb", category: "PDF Tools" },
    { name: "Compress PDF to 500KB", desc: "Minimize graphic vectors retaining resolution under exactly 500KB constraints natively.", path: "/tools/pdf/compress-pdf-to-500kb", category: "PDF Tools" },
    { name: "Compress PDF to 1MB", desc: "Squish and convert structural assets retaining visual data perfectly under roughly 1MB limitations natively.", path: "/tools/pdf/compress-pdf-to-1mb", category: "PDF Tools" },
    { name: "Compress PDF to 1.5MB", desc: "Process and encode visual resources optimally fitting files perfectly to exactly 1.5MB natively.", path: "/tools/pdf/compress-pdf-to-1-5mb", category: "PDF Tools" },
    { name: "Compress PDF to 2MB", desc: "Flatten image elements securely, staying carefully under general 2 Megabyte limitations natively.", path: "/tools/pdf/compress-pdf-to-2mb", category: "PDF Tools" },
    { name: "Word To PDF", desc: "Safely map DOCX standard properties into flat formatted PDFs natively.", path: "/tools/pdf/word-to-pdf", category: "PDF Tools" },
    { name: "PDF To Word", desc: "Draft basic doc extracts directly from rendered text-nodes.", path: "/tools/pdf/pdf-to-word", category: "PDF Tools" },
    { name: "Unlock PDF", desc: "Strip password encryption completely enabling simple distribution.", path: "/tools/pdf/unlock-pdf", category: "PDF Tools" },
    { name: "PowerPoint To PDF", desc: "Process PPTX structures generating flattened presentation slides.", path: "/tools/pdf/powerpoint-to-pdf", category: "PDF Tools" },
    { name: "Excel To PDF", desc: "Translate generic sheet tables over to formatted clean vector outputs.", path: "/tools/pdf/excel-to-pdf", category: "PDF Tools" },

    // Calculators
    { name: "Age Calculator", desc: "Calculate chronological age down to the exact years, months, weeks, days, and seconds.", path: "/tools/calculators/age-calculator", category: "Calculators" },
    { name: "Chronological Age Calculator", desc: "Accurately compute highly specific chronological measurements between complex date intervals natively.", path: "/tools/calculators/chronological-age-calculator", category: "Calculators" },
    { name: "Hours Calculator", desc: "Sum up duration inputs formatted in hours and minutes.", path: "/tools/calculators/hours-calculator", category: "Calculators" },

    // Dev Tools
    { name: "JSON Viewer & Formatter", desc: "Parse, syntax highlight, format, validate, and inspect nested fields in JSON feeds.", path: "/tools/dev/json-viewer", category: "Dev Tools" },
    { name: "Text to Binary", desc: "Examine ASCII/UTF code tables and translate characters into Binary sequences and back.", path: "/tools/dev/text-to-binary", category: "Dev Tools" },
    { name: "Binary to Text", desc: "Decode raw binary bits cleanly back into their original Unicode characters.", path: "/tools/dev/binary-to-text", category: "Dev Tools" },
    { name: "Binary Decoder", desc: "Decode raw binary payloads via dynamic base shifts seamlessly into readable ASCII streams.", path: "/tools/dev/binary-decoder", category: "Dev Tools" },
    { name: "PHP Formatter", desc: "Beautify and auto-indent your raw PHP code blocks using a local parser.", path: "/tools/dev/php-formatter", category: "Dev Tools" },

    // Domain Tools
    { name: "Domain Hosting Checker", desc: "Validate active domain registration hosts handling root traffic flow pathways natively.", path: "/tools/domain/domain-hosting-checker", category: "Domain Tools" },
    { name: "Domain Age Checker", desc: "Request standard DNS records calculating initial registration offsets and active lifespans natively.", path: "/tools/domain/domain-age-checker", category: "Domain Tools" },

    // Meta & SEO Tools
    { name: "Keywords Density Checker", desc: "Analyze page strings recursively graphing exact occurrence keyword percentage values natively.", path: "/tools/keywords/keywords-density-checker", category: "Meta & SEO" },
    { name: "Meta Tag Generator", desc: "Instantly create standard HTML title, description, robot, and keyword tags for layouts.", path: "/tools/website/meta-tag-generator", category: "Meta & SEO" },
    { name: "Open Graph Generator", desc: "Generate Facebook OG and Twitter Cards so shared links feature custom thumbnails & headlines.", path: "/tools/website/open-graph-generator", category: "Meta & SEO" },
    { name: "Twitter Card Generator", desc: "Easily scaffold standard formatted markup meta specifically for Twitter micro-rendering natively.", path: "/tools/website/twitter-card-generator", category: "Meta & SEO" },
    { name: "Robots.txt Generator", desc: "Build crawler instruction guides safely including Sitemap references and blocking rules.", path: "/tools/website/robots-txt-generator", category: "Meta & SEO" },
    { name: "XML Sitemap Generator", desc: "Auto-assemble an indexed XML file payload containing proper URL frequency tags.", path: "/tools/website/xml-sitemap-generator", category: "Meta & SEO" },
    { name: "HTML Viewer", desc: "Evaluate basic rendered DOM blocks and parse layout trees dynamically using local inputs.", path: "/tools/website/html-viewer", category: "Meta & SEO" },
    { name: "URL Opener", desc: "Bulk-open a long list of URL hyperlinks simultaneously in a browser session.", path: "/tools/website/url-opener", category: "Meta & SEO" },
    { name: "Adsense Calculator", desc: "Analyze raw traffic flow conversion RPM patterns computing absolute Adsense projection bounds safely.", path: "/tools/website/adsense-calculator", category: "Meta & SEO" },
    { name: "URL Shortener", desc: "Generate shortened persistent safe-links and track real click traffic natively.", path: "/tools/website/url-shortener", category: "Meta & SEO" },
    { name: "Check Server Status", desc: "Trace operational routing capabilities directly checking standard header availability natively.", path: "/tools/website/check-server-status", category: "Meta & SEO" },
    { name: "Is It Down", desc: "Confirm operational availability verifying explicit error bounds directly routing globally.", path: "/tools/website/is-it-down", category: "Meta & SEO" },
    { name: "What Is My Browser", desc: "Evaluate exact string capabilities explicitly identifying underlying agent parameters natively.", path: "/tools/website/what-is-my-browser", category: "Meta & SEO" },
    { name: "Website Page Snooper", desc: "Inspect specific response paths reviewing exact request delivery formatting globally natively.", path: "/tools/website/website-page-snooper", category: "Meta & SEO" },
    { name: "GEO IP Locator", desc: "Determine local positional origins routing exactly based on IP blocks.", path: "/tools/website/geo-ip-locator", category: "Meta & SEO" },
    { name: "Website Page Size Checker", desc: "Calculate raw rendering volumes directly examining the absolute load values locally.", path: "/tools/website/website-page-size-checker", category: "Meta & SEO" },
    { name: "Meta Tags Analyzer", desc: "Extract current layout standards resolving raw descriptions instantly natively.", path: "/tools/website/meta-tags-analyzer", category: "Meta & SEO" },
    { name: "Redirect Checker", desc: "Examine complex routing shifts validating direct trace status transitions natively.", path: "/tools/website/redirect-checker", category: "Meta & SEO" },
    { name: "Page Comparison", desc: "Visually diff exact formatting shifts contrasting code structure implementations side-by-side natively.", path: "/tools/website/page-comparison", category: "Meta & SEO" },
    { name: "Open Graph Checker", desc: "Resolve structural headers precisely graphing custom previews accurately matching native standards.", path: "/tools/website/open-graph-checker", category: "Meta & SEO" },
    { name: "Cloaking Checker", desc: "Detect raw string differentials confirming exactly visual outputs match natively generated search bot outputs.", path: "/tools/website/cloaking-checker", category: "Meta & SEO" },
    { name: "Google Cache Checker", desc: "Find recent static indexes matching URL structures accurately tracking exact indexing timestamps.", path: "/tools/website/google-cache-checker", category: "Meta & SEO" },
    { name: "Google Index Checker", desc: "Confirm exact string matching routing URLs directly searching localized index domains natively.", path: "/tools/website/google-index-checker", category: "Meta & SEO" },
    { name: "Page Authority Checker", desc: "Estimate exact weight values validating standard external inbound domain capabilities.", path: "/tools/website/page-authority-checker", category: "Meta & SEO" },
    { name: "Mobile Friendly Test", desc: "Directly parse display bounds generating simple reactive layout validations.", path: "/tools/website/mobile-friendly-test", category: "Meta & SEO" },
    { name: "Link Tracker", desc: "Examine active external pathing finding explicit destination links globally.", path: "/tools/website/link-tracker", category: "Meta & SEO" },
    { name: "Index Pages Checker", desc: "Retrieve total path counts explicitly bound within current indexing standards natively.", path: "/tools/website/index-pages-checker", category: "Meta & SEO" },
    { name: "Spam Score Checker", desc: "Correlate algorithmic tracking exactly estimating overall structural string penalties natively.", path: "/tools/website/spam-score-checker", category: "Meta & SEO" },
    
    // Other Tools
    { name: "Fake Name Generator", desc: "Bulk spin localized, random profile identities, names, and contact parameters.", path: "/tools/other/fake-name-generator", category: "Other Tools" },
    { name: "Credit Card Generator", desc: "Generate Luhn-accurate sequence mock numbers for testing form logic.", path: "/tools/other/credit-card-generator", category: "Other Tools" },
    { name: "Emojis", desc: "Quickly access and copy hundreds of web-ready unicode glyph emojis.", path: "/tools/other/emojis", category: "Other Tools" },
    { name: "Password Generator", desc: "Cryptographically mix ultra-secure strings directly on the client side.", path: "/tools/other/password-generator", category: "Other Tools" },
    { name: "QR Code Generator", desc: "Translate text or URLs into fully scannable digital blocks instantly.", path: "/tools/other/qr-code-generator", category: "Other Tools" },
    { name: "Find Facebook ID", desc: "Extract raw system ID structures formatting raw usernames into strict number sequences natively.", path: "/tools/other/find-facebook-id", category: "Other Tools" },
  ], []);

  // Compute actual counts dynamically based on the tool list
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allTools.forEach(tool => {
      counts[tool.category] = (counts[tool.category] || 0) + 1;
    });
    return counts;
  }, [allTools]);

  const categories = useMemo(() => [
    { name: "Text Tools", icon: FileText, path: "/tools/text", count: categoryCounts["Text Tools"] || 0, desc: "Format, count, translate, and manipulate lines of textual scripts of any size." },
    { name: "Image Tools", icon: ImageIcon, path: "/tools/image", count: categoryCounts["Image Tools"] || 0, desc: "Compress and change formats of high-fidelity camera files completely offline." },
    { name: "PDF Tools", icon: FileCode, path: "/tools/pdf", count: categoryCounts["PDF Tools"] || 0, desc: "Consolidate documents and merge multiple pages together with high precision." },
    { name: "Dev Tools", icon: Code, path: "/tools/dev", count: categoryCounts["Dev Tools"] || 0, desc: "JSON formatting, viewer inspection, and multi-encoding translators." },
    { name: "Domain Tools", icon: Globe, path: "/tools/domain", count: categoryCounts["Domain Tools"] || 0, desc: "Validate and inspect underlying domain registration metrics and lifespans." },
    { name: "Calculators", icon: Calculator, path: "/tools/calculators", count: categoryCounts["Calculators"] || 0, desc: "Accurate chronological trackers and age counters for daily computation." },
    { name: "Meta & SEO", icon: Settings, path: "/tools/website", count: categoryCounts["Meta & SEO"] || 0, desc: "Optimize index rules, meta headers, and social previews on web platforms." },
    { name: "Other Tools", icon: MoreHorizontal, path: "/tools/other", count: categoryCounts["Other Tools"] || 0, desc: "Miscellaneous generators for fake identities, passwords, and QR payloads." },
  ], [categoryCounts]);

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return allTools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(query) ||
        tool.desc.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query)
    );
  }, [searchQuery, allTools]);

  const popularTools = useMemo(() => {
    return [
      { name: "Word Counter", path: "/tools/text/word-counter", icon: FileText, desc: "Quickly assess length and readable index." },
      { name: "JSON Viewer", path: "/tools/dev/json-viewer", icon: Code, desc: "Format, inspect, and beautify your raw responses." },
      { name: "Open Graph Generator", path: "/tools/website/open-graph-generator", icon: Settings, desc: "Maximize CTR on social link shares." },
      { name: "Image Compressor", path: "/tools/image/image-compressor", icon: ImageIcon, desc: "Shrink image weight inside your browser." },
    ];
  }, []);

  return (
    <div className="space-y-16 py-8 md:py-12 animate-in fade-in duration-300">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
          Free Online Tools for <span className="text-primary">Everyone</span>
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
          A client-side-optimized productivity platform. No signups, no slow servers, and completely private. All tasks are computed locally inside your browser browser.
        </p>

        {/* Dynamic Search Box */}
        <div className="pt-4 max-w-lg mx-auto relative">
          <div className="relative shadow-md rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition-all border border-border-base bg-bg-base flex items-center pr-2">
            <span className="pl-4 text-text-muted">
              <Search className="size-5" />
            </span>
            <input 
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 15+ microtools instantly..."
              className="w-full px-3 py-4 text-base bg-transparent border-0 outline-none placeholder:text-text-muted text-text-primary"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="p-1 rounded-full hover:bg-bg-secondary text-text-muted transition-colors mr-2"
                title="Clear Search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Real-time dropdown search outcomes */}
          {searchQuery.trim() !== "" && (
            <div className="absolute left-0 right-0 mt-2 bg-bg-base border border-border-focus rounded-xl shadow-lg z-50 overflow-hidden max-h-80 overflow-y-auto text-left divide-y divide-border-base">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => (
                  <Link
                    key={tool.name}
                    to={tool.path}
                    className="block p-4 hover:bg-primary-light/40 hover:text-primary transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-text-primary text-sm sm:text-base group-hover:text-primary transition-colors">
                        {tool.name}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-bg-secondary text-text-muted rounded-full border border-border-base">
                        {tool.category}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary mt-1 line-clamp-1">{tool.desc}</p>
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center text-text-secondary">
                  <p className="font-medium">No tools matches &quot;{searchQuery}&quot;</p>
                  <p className="text-xs text-text-muted mt-1">Try searching for keywords like &quot;Word&quot;, &quot;JSON&quot;, &quot;PDF&quot;, or &quot;Tag&quot;.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Popular/Recent Tools */}
      <section className="bg-bg-secondary -mx-4 px-4 py-12 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8 rounded-3xl border border-border-base/10 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-primary size-5" />
            <h2 className="text-xl font-bold text-text-primary">Popular Utilities</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularTools.map((p) => {
              const ToolIcon = p.icon;
              return (
                <Link 
                  key={p.name}
                  to={p.path} 
                  className="p-5 bg-bg-base border border-border-base rounded-xl hover:shadow-tool hover:border-border-focus transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-1.5 bg-primary-light/50 rounded text-primary">
                        <ToolIcon className="size-4" />
                      </div>
                      <h4 className="font-bold text-text-primary text-sm sm:text-base group-hover:text-primary transition-colors">
                        {p.name}
                      </h4>
                    </div>
                    <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-primary inline-flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-transform">
                    <span>Open Tool</span>
                    <ArrowRight className="size-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="text-primary size-5" />
          <h2 className="text-2xl font-bold text-text-primary">Browse Categories</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                to={category.path}
                className="group flex flex-col p-6 rounded-xl border border-border-base bg-bg-base hover:shadow-tool hover:border-border-focus transition-all duration-200"
              >
                <div className="size-12 rounded-lg bg-primary-light flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors text-text-primary">
                  {category.name}
                </h3>
                <p className="text-sm text-text-secondary mb-4 flex-1 leading-relaxed">
                  {category.desc}
                </p>
                <div className="mt-auto text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary-light/30 rounded-full w-fit">
                  {category.count} {category.count === 1 ? "Tool" : "Tools"} Ready
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
