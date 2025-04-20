// // // // /Users/i_kawano/Documents/portfolio/app/work/2_day_internship/page.tsx

'use client';
import React, { useState, useEffect } from 'react';
import BackToTopButton from '@/src/compositions/BackToTopButton';

const CaseStudyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'design-process', 'solution', 'reflection'];
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
    <div className="font-sans my-8 md:my-16">
      <BackToTopButton />
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-[896px] w-full mx-auto">
          <div className="flex flex-wrap justify-center">
            {/* Hero Image */}
            <img src="/work/2_day_internship/thumbnail.png" alt="Phone mockups" className="w-full max-w-[896px]" />
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="bg-white pt-4 pb-8">
        <div className="max-w-[896px] w-full mx-auto">
          <div className="flex items-center gap-6 mb-4 flex-wrap md:flex-nowrap">
            <h1 className="text-heading-s-120 md:text-heading-m-120 font-sf-pro">2 Day Internship</h1>
            <div className="flex gap-2">
              <span className="text-body-l-140 font-sf-pro px-4 py-1 rounded-full  bg-[#646464] text-[#fff]">UI</span>
              <span className="text-body-l-140 font-sf-pro px-4 py-1 rounded-full  bg-[#646464] text-[#fff]">
                Rapid Design
              </span>
            </div>
          </div>

          {/* 説明文: Body/XL_140 */}
          <p className="text-heading-xxs-120 font-sf-pro text-gray-600 mb-8">
            A sales support app for easy schedule adjustment with a smartphone
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              {/* キャプション: Caption/XL_120 (font-sf-mono) */}
              <h3 className="text-caption-m-120 font-sf-mono text-gray-500 mb-2">Timeline</h3>
              {/* 小テキスト: Body/L_140 */}
              <p className="text-body-l-140 font-sf-pro">Feb 19, 2024 - Feb 15, 2024</p>
            </div>
            <div>
              <h3 className="text-caption-m-120 font-sf-mono text-gray-500 mb-2">My Skills</h3>
              <p className="text-body-l-140 font-sf-pro">UI, UX, Intern</p>
            </div>
            <div>
              <h3 className="text-caption-m-120 font-sf-mono text-gray-500 mb-2">Type</h3>
              <p className="text-body-l-140 font-sf-pro">Solo</p>
            </div>
            <div>
              <h3 className="text-caption-m-120 font-sf-mono text-gray-500 mb-2">Deliverables</h3>
              <p className="text-body-l-140 font-sf-pro">Wireframes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1152px] w-full mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Main Content */}
          <div className="md:w-3/4">
            {/* Overview Section */}
            <section id="overview" className="w-full mx-auto py-8 bg-white text-[#002a38]">
              {/* Heading: L_M_120 */}
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-sf-pro mb-6">Overview</h2>

              {/* 残りのテキスト: Body/XL_140 */}
              <p className="text-body-m-140 md:text-body-l-140 font-sf-pro mb-6">
                During my 2-day internship at Knowledge Work Inc, I participated in a design exploration project
                centered around the challenge of efficiently scheduling meetings.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-6">
                <div className="lg:col-span-6">
                  <p className="text-body-m-140 md:text-body-l-140 font-sf-pro mb-4">
                    The project was inspired by the following hypothetical scenario, provided by the company:
                  </p>

                  <ul className="space-y-2 mb-6 text-body-m-140 md:text-body-l-140">
                    <li className="flex gap-2">
                      <span className="text-lg">•</span>
                      <div>
                        <span className="text-[#ff6b6b] font-medium">A</span> needed a new meeting time after the first
                        consultation.
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-lg">•</span>
                      <div>
                        <span className="text-[#ff6b6b] font-medium">A</span> required{' '}
                        <span className="text-[#6b88ff] font-medium">B</span>'s presence.
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-lg">•</span>
                      <div>
                        <span className="text-[#ff6b6b] font-medium">A</span> and{' '}
                        <span className="text-[#6b88ff] font-medium">B</span> sought a 1‑hour slot.
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-lg">•</span>
                      <div>
                        Before proposing times to <span className="text-[#6b88ff] font-medium">C</span> and{' '}
                        <span className="text-[#6b88ff] font-medium">D</span>,{' '}
                        <span className="text-[#ff6b6b] font-medium">A</span> confirmed availability with{' '}
                        <span className="text-[#6b88ff] font-medium">B</span>.
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-lg">•</span>
                      <div>
                        <span className="text-[#ff6b6b] font-medium">A</span> then presented the options to{' '}
                        <span className="text-[#6b88ff] font-medium">C</span> and{' '}
                        <span className="text-[#6b88ff] font-medium">D</span>.
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-lg">•</span>
                      <div>
                        <span className="text-[#6b88ff] font-medium">C</span> coordinated with{' '}
                        <span className="text-[#6b88ff] font-medium">D</span> for a common time.
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-lg">•</span>
                      <div>
                        <span className="text-[#6b88ff] font-medium">C</span> confirmed{' '}
                        <span className="text-[#6b88ff] font-medium">D</span>'s availability before replying to{' '}
                        <span className="text-[#ff6b6b] font-medium">A</span>.
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-lg">•</span>
                      <div>
                        Finally, <span className="text-[#6b88ff] font-medium">C</span> provided a mutually agreed time
                        to <span className="text-[#ff6b6b] font-medium">A</span>.
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-6 relative">
                  <div className="absolute inset-0 bg-gray-100 rounded-[40px] -z-10"></div>
                  <div className="relative pt-0 md:pt-8">
                    <img
                      src="/work/2_day_internship/2_day_internship-image.png"
                      alt="Project overview diagram"
                      className="w-full max-w-lg mx-auto"
                    />
                  </div>
                </div>
              </div>

              <p className="text-body-m-140 md:text-body-l-140 font-sf-pro">
                As a UI/UX design intern, my role involved conducting user research, creating wireframes, designing user
                interfaces...
              </p>
            </section>

            {/* Problem Section
            <section className="py-8">
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-sf-pro mb-6">Problem</h2>
              <p className="mb-4 text-body-m-140 md:text-body-l-140 font-sf-pro">
                Our user research process highlighted several potential challenges...
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-2 text-body-m-140 md:text-body-l-140 font-sf-pro">
                <li>Difficulty coordinating dates...</li>
                <li>Confirming availability...</li>
                <li>Existing scheduling tools lacked workflow integration.</li>
                <li>Mobile-unfriendly interfaces slowed the process.</li>
              </ul>
            </section> */}

            {/* Design Process Section */}
            <section id="design-process" className="py-8">
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-sf-pro mb-6">Design Process</h2>
              <p className="mb-4 text-body-m-140 md:text-body-l-140 font-sf-pro">
                The design process involved a combination of research, prototyping, and testing.
              </p>
              <ol className="list-decimal pl-5 mb-4 space-y-4 text-body-m-140 md:text-body-l-140 font-sf-pro">
                <li>
                  <strong>Information Gathering:</strong> I began by reviewing existing scheduling apps, and conducting
                  competitive analysis. This research helped me identify key user needs and pain points.
                </li>
                <li>
                  <strong>Prototyping:</strong> After the research, I created low-fidelity wireframes from selecting
                  candidate date and time to requesting them for the companion. I then conducted usability testing with
                  a sales person at the company I participated.
                </li>
                <li>
                  <strong>Improvements:</strong> Based on the results of our usability testing, I made several key
                  improvements to the design, including the fact that travel time needs to be considered as well as
                  available slots, and adding clearer instructions. These improvements significantly enhanced the
                  overall user experience.
                </li>
              </ol>
            </section>

            {/* Solution Section */}
            <section id="solution" className="py-8">
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-sf-pro mb-6">Solution</h2>
              <div className="mb-8">
                <h3 className="text-heading-xxs-120 font-sf-pro mb-4">1. Condition Search</h3>
                <p className="mb-4 text-body-m-140 md:text-body-l-140 font-sf-pro">
                  Search by “Refine by criteria” at the top of the calendar view (companion / business target / location
                  / duration)
                </p>
                <div className="grid grid-cols-1 gap-4 mt-6">
                  <img src="/work/2_day_internship/frames1.png" alt="Condition search wireframe 1" className="w-full" />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-heading-xxs-120 font-sf-pro mb-4">2. Search Results</h3>
                <p className="mb-4 text-body-m-140 md:text-body-l-140 font-sf-pro">
                  The "Search results" view dims the surrounding area, highlighting the specified period (from the 5th
                  to the 9th). Results are presented in a list view at the bottom on the page, and users can easily
                  adjust the time by tapping the right arrow.
                </p>
                <p className="mb-4 text-body-m-140 md:text-body-l-140 font-sf-pro">
                  In Day view of the calendar, the meeting time and the travel time displayed, eliminating the need to
                  worry about travel time.
                </p>
                <div className="grid grid-cols-1 gap-4 mt-6">
                  <img src="/work/2_day_internship/frames2.png" alt="Condition search wireframe 2" className="w-full" />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-heading-xxs-120 font-sf-pro mb-4">3. Send Request</h3>
                <p className="mb-4 text-body-m-140 md:text-body-l-140 font-sf-pro">
                  The screen transitions to the confirmation page about the detail.
                </p>
                <div className="grid grid-cols-1 gap-4 mt-6">
                  <img src="/work/2_day_internship/frames3.png" alt="Condition search wireframe 3" className="w-full" />
                </div>
              </div>
            </section>

            {/* Reflection Section */}
            <section id="reflection" className="py-8">
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-sf-pro mb-6">Reflection</h2>
              <div className="mb-6">
                <h3 className="text-heading-xxs-120 font-sf-pro mb-3">Impressions</h3>
                <ul className="list-disc pl-5 space-y-2 text-body-m-140 md:text-body-l-140 font-sf-pro">
                  <li>
                    The most impressive part was interviewing the sales staff and receiving valuable feedback on the
                    designs at that point in time.
                  </li>
                  <li>
                    The reactions of the designers during the presentation were impressive; they took the students' work
                    seriously and reacted with large nods of their heads.
                  </li>
                  <li>
                    Feedback was provided in the form of a set of good points (GOOD), opportunities for improvement
                    (OPPORTUNITY) and areas for improvement (IMPROVE).
                  </li>
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-heading-xxs-120 font-sf-pro mb-3">Reflection</h3>
                <ul className="list-disc pl-5 space-y-2 text-body-m-140 md:text-body-l-140 font-sf-pro">
                  <li>
                    As mentioned above, I got an opportunity to interview a sales person and his feedback provided me
                    with more practical design ideas. For me, the interview was my first experience and very valuable.
                  </li>
                  <li>
                    I received realistic advice for improvement that I need to consider not only available slots but
                    also travel time. I learned not only to consider the usability and usability of the application, but
                    also the perspective of what users want to use this application in what environment and for what
                    purpose.
                  </li>
                  <li>
                    As for the function to obtain location information of each individual, I felt that privacy concerns
                    and the fact that some people register locations in their calendars while others do not, were
                    challenges in connecting design with the real world.
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar - Hidden on mobile */}
          <div className="hidden md:flex md:w-1/4 pl-4 pt-8 items-start justify-center">
            <nav className="sticky top-24">
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection('overview')}
                    // 非アクティブ: scale-100, opacity-50
                    // アクティブ:   scale-110, opacity-100
                    className={
                      activeSection === 'overview'
                        ? 'text-left text-body-xxl-140 font-sf-pro transition-transform duration-900 scale-110'
                        : 'text-left text-heading-xxs-120 font-sf-pro transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    Overview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('design-process')}
                    className={
                      activeSection === 'design-process'
                        ? 'text-left text-body-xxl-140 font-sf-pro transition-transform duration-900 scale-110'
                        : 'text-left text-heading-xxs-120 font-sf-pro transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    Design Process
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('solution')}
                    className={
                      activeSection === 'solution'
                        ? 'text-left text-body-xxl-140 font-sf-pro transition-transform duration-900 scale-110'
                        : 'text-left text-heading-xxs-120 font-sf-pro transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    Solution
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('reflection')}
                    className={
                      activeSection === 'reflection'
                        ? 'text-left text-body-xxl-140 font-sf-pro transition-transform duration-900 scale-110'
                        : 'text-left text-heading-xxs-120 font-sf-pro transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    Reflection
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyPage;

// "use client";
// import CaseStudyLayout from "@/components/CaseStudyLayout";
// import twoDayInternshipData from "@/data/2DayInternshipData";

// export default function twoDayInternshipPage() {
//   return <CaseStudyLayout data={twoDayInternshipData} />;
// }
