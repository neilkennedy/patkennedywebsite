
"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

const galleryImages = [
  { src: "/gallery/001.jpg", alt: "Gallery image 1" },
  { src: "/gallery/002.jpg", alt: "Gallery image 2" },
  { src: "/gallery/003.jpg", alt: "Gallery image 3" },
  { src: "/gallery/004.jpg", alt: "Gallery image 4" },
];

export default function Home() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentIndex((i) => (i + 1) % galleryImages.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
      } else if (e.key === "Escape") {
        setLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  // Touch swipe navigation
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;
    if (diff > 50) {
      setCurrentIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
    } else if (diff < -50) {
      setCurrentIndex((i) => (i + 1) % galleryImages.length);
    }
    touchStartX.current = null;
  };

  // Open lightbox
  const openLightbox = useCallback((idx: number) => {
    setCurrentIndex(idx);
    setLightboxOpen(true);
  }, []);

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/heroImage.jpg" alt="Pat Kennedy Carpenter" width={40} height={40} className="rounded-full" />
          <span className="font-bold text-lg text-gray-800 dark:text-gray-100">Pat Kennedy Carpenter</span>
        </div>
        <ul className="flex gap-6 text-gray-700 dark:text-gray-200">
          <li><a href="#home" className="hover:underline">Home</a></li>
          <li><a href="#gallery" className="hover:underline">Gallery</a></li>
          <li><a href="#contact" className="hover:underline">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <Image src="/heroImage.jpg" alt="Hero" width={320} height={180} className="rounded shadow mb-6" priority />
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          <span>Pat </span><span>Kennedy</span>
        </h1>
        <h3 className="text-xl sm:text-2xl font-medium mb-6 text-gray-700 dark:text-gray-300">Carpenter. Kilkenny, Ireland</h3>
      </section>

      {/* Who Am I Section */}
      <section className="py-8 px-4 bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100 text-center">Who Am I</h2>
        <div className="max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300 text-center">
          <p className="mb-4">I have worked as a carpenter for over 30 years. I am based in Kilkenny, Ireland but travel around Leinster for work.</p>
          <p className="mb-4">I specialise in wooden flooring but I also have many years experience in other forms of carpentry. A small list below is presented as an example of what I do.</p>
          <p className="mb-4">I have some great full resolution pictures below in the gallery so please click through to check them out.</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-10 px-4 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100 text-center">What I Do</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded shadow text-center">
            <Image src="/flooring.jpg" alt="Wooden Flooring" width={80} height={80} className="mx-auto mb-2 rounded" />
            <h3 className="font-bold mb-2">Wooden Flooring</h3>
            <p>Hard wood, laminate or any other type of wooden flooring. Quick fitting, quality service and no mess.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded shadow text-center">
            <Image src="/decking.jpg" alt="Outdoor Decking" width={80} height={80} className="mx-auto mb-2 rounded" />
            <h3 className="font-bold mb-2">Outdoor Decking</h3>
            <p>Quality decking to help enjoy those summer BBQs.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded shadow text-center">
            <Image src="/attic.jpg" alt="Attic Conversions" width={80} height={80} className="mx-auto mb-2 rounded" />
            <h3 className="font-bold mb-2">Attic Conversions</h3>
            <p>Converting an unused attic into a beautiful new bedroom with wooden fixtures.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded shadow text-center">
            <h3 className="font-bold mb-2">Second Fixing</h3>
            <p>All types of second fixing including skirting boards, architrave and door frames in hard wood and soft wood.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded shadow text-center">
            <h3 className="font-bold mb-2">...And Everything Else</h3>
            <p>Plus anything else you can think of including wall and ceiling sheeting, conservatories and wardrobes.</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-10 px-4 bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100 text-center">Gallery</h2>
        <h4 className="text-md mb-6 text-gray-700 dark:text-gray-300 text-center">Scroll / swipe through for more. Click for full screen</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {galleryImages.map((img, idx) => (
            <button
              key={img.src}
              className="focus:outline-none"
              onClick={() => openLightbox(idx)}
              aria-label={`Open image ${idx + 1}`}
            >
              <Image src={img.src} alt={img.alt} width={200} height={150} className="rounded shadow hover:scale-105 transition-transform" />
            </button>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            tabIndex={-1}
            onClick={closeLightbox}
          >
            <div
              className="relative flex flex-col items-center"
              onClick={e => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={galleryImages[currentIndex].src}
                alt={galleryImages[currentIndex].alt}
                width={600}
                height={400}
                className="rounded shadow mb-4 max-w-full h-auto"
                priority
              />
              <div className="flex justify-between w-full px-4">
                <button
                  className="text-white text-2xl px-4 py-2 focus:outline-none"
                  onClick={() => setCurrentIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length)}
                  aria-label="Previous image"
                >&#8592;</button>
                <button
                  className="text-white text-2xl px-4 py-2 focus:outline-none"
                  onClick={() => setCurrentIndex((i) => (i + 1) % galleryImages.length)}
                  aria-label="Next image"
                >&#8594;</button>
              </div>
              <button
                className="absolute top-2 right-2 text-white text-3xl px-2 py-1 focus:outline-none"
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >&#10005;</button>
            </div>
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-10 px-4 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100 text-center">How to Contact Me</h2>
        <div className="max-w-xl mx-auto text-center text-lg text-gray-700 dark:text-gray-300">
          <p className="mb-4">Feel free to contact me at a time that is convenient for you. I am available 7 days a week, at any time of the day.</p>
          <p className="mb-2">tel: <a href="tel:+353868346964" className="text-blue-600 dark:text-blue-400 underline">(086) 834 6964</a></p>
          <p className="mb-2">email: <a href="mailto:p.kennedykk@yahoo.ie?subject=Carpentry%20work%20from%20your%20website" className="text-blue-600 dark:text-blue-400 underline">p.kennedykk@yahoo.ie</a></p>
          <p className="mb-2">facebook: <a href="https://www.facebook.com/pat.kennedy.92167" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">/pat.kennedy.92167</a></p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 py-6 text-center text-gray-700 dark:text-gray-300 mt-auto">
        &copy; {new Date().getFullYear()} Pat Kennedy Carpenter. All rights reserved.
      </footer>
    </div>
  );
}
