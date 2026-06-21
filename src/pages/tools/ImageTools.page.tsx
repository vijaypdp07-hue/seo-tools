import { Link } from "react-router-dom";
import { Image as ImageIcon, Minimize, FileCode, SwitchCamera, Search, ChevronRight, Calculator, Shuffle } from "lucide-react";

export function ImageToolsPage() {
  const tools = [
    { name: "Image Compressor", icon: Minimize, path: "/tools/image/image-compressor", desc: "Compress JPEG, PNG, WEBP images with zero quality loss." },
    { name: "Crop Image", icon: SwitchCamera, path: "/tools/image/crop-image", desc: "Crop your images easily inside the browser." },
    { name: "PNG to JPG", icon: Shuffle, path: "/tools/image/png-to-jpg", desc: "Convert PNG images to JPG format instantly." },
    { name: "HEIC to JPG", icon: Shuffle, path: "/tools/image/heic-to-jpg", desc: "Convert Apple HEIC images to JPG format." },
    { name: "SVG to PNG", icon: Shuffle, path: "/tools/image/svg-to-png", desc: "Convert SVG vectors to PNG format." },
    { name: "Favicon Generator", icon: ImageIcon, path: "/tools/image/favicon-generator", desc: "Generate favicons from any image." },
    { name: "RGB to HEX", icon: Calculator, path: "/tools/image/rgb-to-hex", desc: "Convert RGB color codes to HEX instantly." },
    { name: "MB to KB Converter", icon: Calculator, path: "/tools/image/mb-to-kb-converter", desc: "Convert file sizes from MB to KB." },
    { name: "Photo Resizer in KB", icon: Minimize, path: "/tools/image/photo-resizer-in-kb", desc: "Resize an image to an exact target KB size." },
    { name: "PNG to SVG", icon: Shuffle, path: "/tools/image/png-to-svg", desc: "Trace raster images to scalable vector graphics." },
    { name: "Image to Text", icon: FileCode, path: "/tools/image/image-to-text", desc: "Extract text from images using advanced OCR technology." },
    { name: "Meme Generator", icon: ImageIcon, path: "/tools/image/meme-generator", desc: "Create funny memes overlaying text on your images." },
    { name: "Video to GIF", icon: ImageIcon, path: "/tools/image/video-to-gif", desc: "Convert video files directly into GIF animations." },
    { name: "MP4 to GIF", icon: ImageIcon, path: "/tools/image/mp4-to-gif", desc: "Convert your MP4 videos to GIF instantly in browser." },
    { name: "Reverse Image Search", icon: Search, path: "/tools/image/reverse-image-search", desc: "Find visually similar images across the web using Google Lens." },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <nav aria-label="breadcrumb" className="flex items-center text-sm text-text-muted">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="size-4 mx-1" />
        <span className="text-text-primary font-medium" aria-current="page">Image Tools</span>
      </nav>

      <header className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary flex items-center gap-3">
          <ImageIcon className="size-8 text-primary" />
          Image Tools
        </h1>
        <p className="text-lg text-text-secondary max-w-3xl">
          Resize, compress, convert, and optimize images directly in the browser. Zero server uploads ensures full privacy and incredible speed.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.name}
              to={tool.path}
              className="group flex flex-col p-6 rounded-xl border border-border-base bg-bg-base hover:shadow-tool hover:border-border-focus transition-all duration-200"
            >
              <div className="size-12 rounded-lg bg-primary-light flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <Icon className="size-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <p className="text-sm text-text-secondary flex-1">
                {tool.desc}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
