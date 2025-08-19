"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut,
  Play,
  Maximize2
} from "lucide-react";

interface MediaGalleryProps {
  images: string[];
  videos?: string[];
  vrTours?: string[];
}

export function MediaGallery({ images, videos = [], vrTours = [] }: MediaGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const allMedia = [...images, ...videos, ...vrTours];
  const currentMedia = allMedia[selectedIndex];
  const isVideo = videos.includes(currentMedia);
  const isVRTour = vrTours.includes(currentMedia);

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % allMedia.length);
    setZoomLevel(1);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev * 1.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev / 1.5, 0.5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        prevImage();
      } else {
        nextImage();
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isLightboxOpen) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case 'Escape':
        setIsLightboxOpen(false);
        break;
      case '+':
      case '=':
        handleZoomIn();
        break;
      case '-':
        handleZoomOut();
        break;
    }
  };

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (allMedia.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">
            <p>No media available for this property</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Main Image Display */}
      <Card>
        <CardContent className="p-0">
          <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
            {currentMedia && (
              <div className="relative w-full h-full">
                {isVideo ? (
                  <video
                    src={currentMedia}
                    controls
                    className="w-full h-full object-cover"
                    poster={images[0]}
                  />
                ) : isVRTour ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-900">
                    <div className="text-center text-white">
                      <Play className="h-16 w-16 mx-auto mb-4" />
                      <p className="text-lg">360° VR Tour</p>
                      <p className="text-sm text-gray-300">Click to view immersive tour</p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={currentMedia}
                    alt={`Property image ${selectedIndex + 1}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
                    onClick={() => setIsLightboxOpen(true)}
                  />
                )}
                
                {/* Overlay Controls */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white text-gray-900"
                    onClick={() => setIsLightboxOpen(true)}
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Navigation Arrows */}
                {allMedia.length > 1 && (
                  <>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {allMedia.length > 1 && (
            <div className="p-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allMedia.map((media, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === selectedIndex
                        ? 'border-blue-600 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {videos.includes(media) ? (
                      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    ) : vrTours.includes(media) ? (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <Maximize2 className="h-6 w-6 text-white" />
                      </div>
                    ) : (
                      <img
                        src={media}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Fullscreen Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-none w-screen h-screen p-0 bg-black">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              size="sm"
              variant="secondary"
              className="absolute top-4 right-4 z-50 bg-white/90 hover:bg-white text-gray-900"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Zoom Controls */}
            <div className="absolute top-4 left-4 z-50 flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white text-gray-900"
                onClick={handleZoomOut}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white text-gray-900"
                onClick={handleZoomIn}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            {/* Main Image */}
            <div
              className="relative w-full h-full flex items-center justify-center"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {currentMedia && (
                <div
                  className="transition-transform duration-200 ease-out"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  {isVideo ? (
                    <video
                      src={currentMedia}
                      controls
                      className="max-w-full max-h-full object-contain"
                      poster={images[0]}
                    />
                  ) : isVRTour ? (
                    <div className="text-center text-white">
                      <Play className="h-24 w-24 mx-auto mb-6" />
                      <p className="text-2xl mb-2">360° VR Tour</p>
                      <p className="text-lg text-gray-300">Immersive property experience</p>
                    </div>
                  ) : (
                    <img
                      src={currentMedia}
                      alt={`Property image ${selectedIndex + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Navigation Arrows */}
            {allMedia.length > 1 && (
              <>
                <Button
                  size="lg"
                  variant="secondary"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/50 text-white px-4 py-2 rounded-full">
              {selectedIndex + 1} of {allMedia.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 