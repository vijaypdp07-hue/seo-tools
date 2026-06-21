import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { Type, Image as ImageIcon, Square, Circle, Download, Trash2, MousePointer2, Share } from 'lucide-react';

interface FabricEditorProps {
  width: number;
  height: number;
  title: string;
  slug?: string;
  categoryName?: string;
  categoryPath?: string;
}

export function FabricEditor({ width, height, title, slug, categoryName, categoryPath }: FabricEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);

  // Initialize Fabric Canvas
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // To make it responsive, we scale the canvas wrapper
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: width,
      height: height,
      backgroundColor: '#ffffff',
      preserveObjectStacking: true,
    });

    setCanvas(newCanvas);

    const handleSelectionCreated = (e: any) => setSelectedObject(e.selected[0] || null);
    const handleSelectionCleared = () => setSelectedObject(null);
    const handleSelectionUpdated = (e: any) => setSelectedObject(e.selected[0] || null);

    newCanvas.on('selection:created', handleSelectionCreated);
    newCanvas.on('selection:cleared', handleSelectionCleared);
    newCanvas.on('selection:updated', handleSelectionUpdated);

    // Initial dummy text just so the canvas isn't empty
    const text = new fabric.IText(title, {
      left: width / 2,
      top: 50,
      fontFamily: 'Inter',
      fontSize: 32,
      fill: '#0f172a',
      originX: 'center',
      originY: 'center',
    });
    newCanvas.add(text);
    newCanvas.setActiveObject(text);
    newCanvas.renderAll();

    return () => {
      newCanvas.dispose();
    };
  }, [width, height, title]);

  // Make canvas responsive
  useEffect(() => {
    if (!canvas || !containerRef.current) return;
    
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: containerWidth } = entry.contentRect;
        const scale = Math.min(1, containerWidth / width);
        // We use CSS transform to scale the canvas wrapper instead of resizing the actual canvas
        // This keeps the internal coordinate system consistent
        canvas.wrapperEl.style.transform = `scale(${scale})`;
        canvas.wrapperEl.style.transformOrigin = 'top center';
        
        // Adjust the container height to match the scaled canvas
        const scaledHeight = height * scale;
        if (containerRef.current) {
          containerRef.current.style.height = `${Math.max(scaledHeight, 300)}px`;
        }
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [canvas, width, height]);

  // Tools
  const addText = () => {
    if (!canvas) return;
    const text = new fabric.IText('New Text', {
      left: width / 2,
      top: height / 2,
      fontFamily: 'Inter',
      fontSize: 24,
      fill: '#0f172a',
      originX: 'center',
      originY: 'center',
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  const addRectangle = () => {
    if (!canvas) return;
    const rect = new fabric.Rect({
      left: width / 2,
      top: height / 2,
      fill: '#3b82f6',
      width: 100,
      height: 100,
      originX: 'center',
      originY: 'center',
      rx: 8,
      ry: 8,
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
  };

  const addCircle = () => {
    if (!canvas) return;
    const circle = new fabric.Circle({
      left: width / 2,
      top: height / 2,
      fill: '#10b981',
      radius: 50,
      originX: 'center',
      originY: 'center',
    });
    canvas.add(circle);
    canvas.setActiveObject(circle);
    canvas.renderAll();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas || !e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (f) => {
      const data = f.target?.result as string;
      fabric.Image.fromURL(data).then((img) => {
        // Scale down if image is too big
        if (img.width! > width * 0.8) {
          img.scaleToWidth(width * 0.8);
        }
        
        img.set({
          left: width / 2,
          top: height / 2,
          originX: 'center',
          originY: 'center',
        });
        
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const deleteSelected = () => {
    if (!canvas) return;
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length) {
      activeObjects.forEach((obj) => canvas.remove(obj));
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  };

  const shareResult = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Tool Result",
          url: shareUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("URL copied to clipboard!");
    }
  };

  const downloadCanvas = () => {
    if (!canvas) return;
    canvas.discardActiveObject();
    canvas.renderAll();
    const dataURL = canvas.toDataURL({
      format: 'png',
      multiplier: 2 // High quality
    });
    
    const link = document.createElement('a');
    link.download = `${title.toLowerCase().replace(/\\s+/g, '-')}.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (slug && categoryName) {
      import('@/lib/store/useHistoryStore').then(({ useHistoryStore }) => {
        useHistoryStore.getState().recordUsage(slug, categoryName, `${categoryPath}/${slug}`, {
          result: `Downloaded ${title} design.`
        });
      });
    }
  };

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedObject && selectedObject.type !== 'i-text') {
        const isInputTarget = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
        if (!isInputTarget) {
          deleteSelected();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedObject]);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar Tool Panel */}
      <div className="w-full md:w-64 bg-bg-secondary border border-border rounded-xl p-4 flex flex-col gap-4">
        <h3 className="font-semibold text-text-primary mb-2">Design Tools</h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
          <button onClick={addText} className="flex items-center gap-2 px-3 py-2 bg-bg border border-border rounded-md hover:bg-bg-tertiary transition-colors text-sm font-medium">
            <Type className="w-4 h-4 text-text-secondary" /> Add Text
          </button>
          <button onClick={addRectangle} className="flex items-center gap-2 px-3 py-2 bg-bg border border-border rounded-md hover:bg-bg-tertiary transition-colors text-sm font-medium">
            <Square className="w-4 h-4 text-text-secondary" /> Add Rectangle
          </button>
          <button onClick={addCircle} className="flex items-center gap-2 px-3 py-2 bg-bg border border-border rounded-md hover:bg-bg-tertiary transition-colors text-sm font-medium">
            <Circle className="w-4 h-4 text-text-secondary" /> Add Circle
          </button>
          
          <label className="flex items-center gap-2 px-3 py-2 bg-bg border border-border rounded-md hover:bg-bg-tertiary transition-colors text-sm font-medium cursor-pointer">
            <ImageIcon className="w-4 h-4 text-text-secondary" /> Upload Image
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>

        {selectedObject && (
          <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
            <h4 className="text-xs uppercase font-bold text-text-muted">Selection</h4>
            
             <button onClick={deleteSelected} className="flex items-center justify-center gap-2 px-3 py-2 bg-error-light text-error border border-error/20 rounded-md hover:bg-error/10 transition-colors text-sm font-medium w-full">
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        )}
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-hidden bg-bg-tertiary rounded-xl border border-border p-4 flex flex-col items-center">
        <div className="w-full flex justify-end mb-4 gap-2">
          <button onClick={shareResult} className="flex items-center gap-2 px-4 py-2 bg-bg text-text-secondary border border-border rounded-md hover:bg-bg-tertiary transition-colors text-sm font-semibold shadow-sm">
            <Share className="w-4 h-4" /> Share
          </button>
          <button onClick={downloadCanvas} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors text-sm font-semibold shadow-sm">
            <Download className="w-4 h-4" /> Download PNG
          </button>
        </div>
        
        {/* Responsive wrapper for canvas */}
        <div 
          ref={containerRef}
          className="w-full h-full flex justify-center overflow-auto items-start custom-scrollbar p-2"
          style={{ minHeight: "300px" }}
        >
          <div className="shadow-lg relative inline-block bg-white">
            <canvas ref={canvasRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
