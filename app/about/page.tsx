// /app/about/page.tsx
'use client';
import { Link, Underline } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import InterestsVisualization from './InterestsVisualization';



const BlogPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // スクロールに応じた activeSection の更新
  useEffect(() => {
    const sections = ['overview', 'about', 'results', 'conclusion'];
    const handleScroll = () => {
      let currentSection = activeSection;
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            currentSection = id;
          }
        }
      }
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <div className="font-sans">
      {/* Hero Section */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
        <div className="lg:col-span-6">
          <div className="flex flex-col items-start gap-10 relative">
            <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
              <h1 className=" mb-2   text-heading-l-120 md:text-heading-xl-m-120 ">Iori Kawano</h1>
              <p className="max-w-full    text-body-m-140 md:text-body-xxl-140  ">
                I'm a UI/UX designer with a passion for creating structured, detail-oriented designs that drive scalable and idiomatic solutions.
              </p>
              {/* Idiomatic means (here: 71. 直観的より慣用的に)[https://www.sociomedia.co.jp/9752] */}
              <p className="max-w-full    text-body-m-140 md:text-body-xxl-140  ">
                I specialize in building robust <b>design systems</b> that grow with products and ensure consistency
                across platforms.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="relative pt-0 md:pt-8">
            <img src="/about/my_image.png" alt="My image" className="w-full max-w-lg mx-auto" />
          </div>
        </div>
      </div>

      <section className="pt-4 md:pt-0 pb-4 md:pb-0 flex flex-col gap-4">
        <h2 className="text-heading-m-120 md:text-heading-l-20"> My Interests</h2>
        <p className="max-w-full   text-body-m-140 md:text-body-xxl-140 ">
          This visualization highlights the topics I am deeply interested in. Each node represents a subject that
          inspires my curiosity and enriches my perception of the world.
        </p>
        {/* <p className="max-w-full text-body-xxl-140 font-sf-pro">
        You can explore the detailed code and learn more about how this visualization was created by visiting <a href='https://observablehq.com/d/bd3961d63646b374' style={{ textDecoration: "underline" }}>this Observable notebook</a>.
        </p> */}
        <InterestsVisualization />
      </section>
    </div>
  );
};

export default BlogPage;
