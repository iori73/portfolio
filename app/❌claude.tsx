// // app/work/2-day-internship/page.tsx
// // import Header from 'src/compositions/Header';  // 適宜パスを調整
// // import Footer from 'src/compositions/Footer';


// "use client";

// import React, { useState } from 'react';

// const CaseStudyPage: React.FC = () => {
//   const [activeSection, setActiveSection] = useState<string>('overview');

//   const scrollToSection = (sectionId: string) => {
//     setActiveSection(sectionId);
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className="font-sans">


//       {/* Hero Section with Phones */}
//       <section className="py-8 px-4 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex flex-wrap justify-center">
//             <img src="/api/placeholder/800/400" alt="Phone mockups" className="w-full max-w-3xl" />
//           </div>
//         </div>
//       </section>

//       {/* Project Info */}
//       <section className="bg-white px-4 pt-4 pb-8">
//         <div className="max-w-6xl mx-auto">
//           <h1 className="text-xl font-medium mb-2">2 Day Internship</h1>
//           <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs mb-4">UX/UI Design</span>
//           <p className="text-sm text-gray-600 mb-6">
//             A sales support app for easy schedule adjustment with a smartphone
//           </p>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
//             <div>
//               <h3 className="text-xs text-gray-500 mb-1">Time Limit</h3>
//               <p>Feb 19, 2024 - Feb 15, 2024</p>
//             </div>
//             <div>
//               <h3 className="text-xs text-gray-500 mb-1">My Skills</h3>
//               <p>UX, UX + Infra</p>
//             </div>
//             <div>
//               <h3 className="text-xs text-gray-500 mb-1">Type</h3>
//               <p>Solo</p>
//             </div>
//             <div>
//               <h3 className="text-xs text-gray-500 mb-1">Tool + Deliverables</h3>
//               <p>Wireframes</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <div className="max-w-6xl mx-auto px-4">
//         <div className="flex flex-col md:flex-row">
//           {/* Sidebar - Hidden on mobile */}
//           <div className="hidden md:block md:w-1/4 pr-8 pt-8">
//             <nav className="sticky top-8">
//               <ul className="space-y-3">
//                 <li>
//                   <button 
//                     onClick={() => scrollToSection('overview')}
//                     className={`text-left ${activeSection === 'overview' ? 'font-medium' : ''}`}
//                   >
//                     Overview
//                   </button>
//                 </li>
//                 <li>
//                   <button 
//                     onClick={() => scrollToSection('design-process')}
//                     className={`text-left ${activeSection === 'design-process' ? 'font-medium' : ''}`}
//                   >
//                     Design Process
//                   </button>
//                 </li>
//                 <li>
//                   <button 
//                     onClick={() => scrollToSection('solution')}
//                     className={`text-left ${activeSection === 'solution' ? 'font-medium' : ''}`}
//                   >
//                     Solution
//                   </button>
//                 </li>
//                 <li>
//                   <button 
//                     onClick={() => scrollToSection('reflection')}
//                     className={`text-left ${activeSection === 'reflection' ? 'font-medium' : ''}`}
//                   >
//                     Reflection
//                   </button>
//                 </li>
//               </ul>
//             </nav>
//           </div>

//           {/* Main Content */}
//           <div className="md:w-3/4">
//             {/* Overview Section */}
//             <section id="overview" className="py-8 mb-[24px]">
//               <h2 className="text-2xl font-medium mb-6">Overview</h2>
//               <p className="mb-4">
//                 During the 2-day internship at Knowledge Work Inc., I participated in a design exploration project centered around the challenge of scheduling meetings.
//               </p>
//               <p className="mb-4">
//                 The project was inspired by the following requirements:
//               </p>
//               <ul className="list-disc pl-5 mb-4 space-y-2">
//                 <li>The need to share product features with clients.</li>
//                 <li>
//                   Scheduling a general meeting with 5 staff after a successful initial consultation.
//                 </li>
//                 <li>This was a major issue, because the absence of even one staff member can affect sales activities.</li>
//                 <li>
//                   Staff needed to check each other's calendar availability within the next week.
//                 </li>
//                 <li>This process took a long time and required lots of communication.</li>
//                 <li>
//                   Sales staffs were often required to coordinate schedules with clients for meetings.
//                 </li>
//                 <li>Finally, it had to happen fast - with a security guarantee.</li>
//               </ul>
//               <p className="mb-4">
//                 For this UI design team, my role involved conducting user research, creating wireframes, designing user interfaces, and conducting usability testing.
//               </p>
//               <div className="mt-8">
//                 <img src="/api/placeholder/600/400" alt="Project overview diagram" className="w-full max-w-lg mx-auto" />
//               </div>
//             </section>

//             {/* Problem Section */}
//             <section className="py-8 mb-[24px]">
//               <h2 className="text-2xl font-medium mb-6">(Problem)</h2>
//               <p className="mb-4">
//                 Our user research process highlighted several challenges in scheduling meetings:
//               </p>
//               <ul className="list-disc pl-5 mb-4 space-y-2">
//                 <li>Difficulty coordinating available dates across participants.</li>
//                 <li>Confirming availability with key stakeholders was time-consuming.</li>
//                 <li>Current tools lacked integration with workflows.</li>
//                 <li>Mobile-unfriendly interfaces slowed scheduling.</li>
//               </ul>
//             </section>

//             {/* Design Process Section */}
//             <section id="design-process" className="py-8 mb-[24px]">
//               <h2 className="text-2xl font-medium mb-6">(Design Process)</h2>
//               <p className="mb-4">Our design process consisted of research, prototyping, and testing.</p>
//               <ol className="list-decimal pl-5 mb-4 space-y-4">
//                 <li>
//                   <strong>Information Gathering:</strong> Mapping existing tools, analyzing user needs.
//                 </li>
//                 <li>
//                   <strong>Prototyping:</strong> Creating wireframes for sharing meeting times and reviewing participants.
//                 </li>
//                 <li>
//                   <strong>Improvements:</strong> Enhancing date selection, explicit confirmations, and interactions.
//                 </li>
//               </ol>
//             </section>

//             {/* Solution Section */}
//             <section id="solution" className="py-8 mb-[24px]">
//               <h2 className="text-2xl font-medium mb-6">Solution</h2>
//               <div className="mb-8">
//                 <h3 className="text-lg font-medium mb-4">1. Condition Search</h3>
//                 <p className="mb-4">
//                   Search by criteria at the top of the calendar view.
//                 </p>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//                   <img src="/api/placeholder/200/400" alt="Condition search 1" className="w-full" />
//                   <img src="/api/placeholder/200/400" alt="Condition search 2" className="w-full" />
//                   <img src="/api/placeholder/200/400" alt="Condition search 3" className="w-full" />
//                 </div>
//               </div>
//               <div className="mb-8">
//                 <h3 className="text-lg font-medium mb-4">2. Search Results</h3>
//                 <p className="mb-4">
//                   The system view dims surrounding areas, highlighting a specified period.
//                 </p>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//                   <img src="/api/placeholder/200/400" alt="Search results 1" className="w-full" />
//                   <img src="/api/placeholder/200/400" alt="Search results 2" className="w-full" />
//                   <img src="/api/placeholder/200/400" alt="Search results 3" className="w-full" />
//                 </div>
//               </div>
//               <div className="mb-8">
//                 <h3 className="text-lg font-medium mb-4">3. Send Request</h3>
//                 <p className="mb-4">Transitions to the confirmation page.</p>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//                   <img src="/api/placeholder/200/400" alt="Send request 1" className="w-full" />
//                   <img src="/api/placeholder/200/400" alt="Send request 2" className="w-full" />
//                 </div>
//               </div>
//             </section>

//             {/* Reflection Section */}
//             <section id="reflection" className="py-8 mb-[24px]">
//               <h2 className="text-2xl font-medium mb-6">Reflection</h2>
//               <div className="mb-6">
//                 <h3 className="text-lg font-medium mb-3">Impressions</h3>
//                 <ul className="list-disc pl-5 space-y-2">
//                   <li>Valuable feedback was received in real time.</li>
//                   <li>Presentation skills improved through partner questions.</li>
//                   <li>MOSCOW framework defined key improvement opportunities.</li>
//                 </ul>
//               </div>
//               <div className="mb-6">
//                 <h3 className="text-lg font-medium mb-3">Reflection</h3>
//                 <ul className="list-disc pl-5 space-y-2">
//                   <li>It was an opportunity to combine UX data with practical design views.</li>
//                   <li>Different working styles provided unique insights for product design.</li>
//                 </ul>
//               </div>
//             </section>

//             {/* Footer with Social Icons */}
//             {/* <footer className="py-8 border-t mt-12">
//               <div className="flex justify-center space-x-4 mb-4">
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
//                   </svg>
//                 </a>
//                 <a href="#" className="text-gray-600 hover:text-gray-900">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84..." />
//                   </svg>
//                 </a>
//               </div>
//               <p className="text-center text-sm">© 2025 Iori Kawano</p>
//             </footer> */}
//           </div>
//         </div>
//       </div>

//       {/* Footer from global layout is not repeated if Header/Footer already in layout */}
//       {/* Alternatively, if you want a page-specific footer, include here */}
//     </div>
//   );
// };

// export default CaseStudyPage;




// claude
'use client';
import React, { useState } from 'react';

const CaseStudyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans">

      {/* Hero Section with Phones */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center">
            <img src="work/image1.png" alt="Phone mockups" className="w-full max-w-4xl" />
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="bg-white px-4 pt-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl font-medium mb-2">2 Day Internship</h1>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs mb-4">UX/UI Design</span>
          <p className="text-sm text-gray-600 mb-6">
            A sales support app for easy schedule adjustment with a smartphone
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <h3 className="text-xs text-gray-500 mb-1">Time Limit</h3>
              <p>Feb 19, 2024 - Feb 15, 2024</p>
            </div>
            <div>
              <h3 className="text-xs text-gray-500 mb-1">My Skills</h3>
              <p>UX, UX + Infra</p>
            </div>
            <div>
              <h3 className="text-xs text-gray-500 mb-1">Type</h3>
              <p>Solo</p>
            </div>
            <div>
              <h3 className="text-xs text-gray-500 mb-1">Tool + Deliverables</h3>
              <p>Wireframes</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-8xl mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          {/* Main Content */}
          <div className="md:w-3/4">
            {/* Overview Section */}
            <section id="overview" className="py-8">
              <h2 className="text-2xl font-medium mb-6">Overview</h2>
              <p className="mb-4">
                During the 2-day internship at Knowledge Work Inc., I participated in a design exploration project
                centered around the challenge of scheduling meetings.
              </p>
              <p className="mb-4">The project was inspired by the following requirements:</p>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li>The need to share product features with clients.</li>
                <li>
                  According to schedule a general meeting with 5 staff - after a successful initial consultation, with a
                  client.
                </li>
                <li>
                  This was a major issue, because the absence of even one staff member can affect sales activities.
                </li>
                <li>
                  In the current system, staff need to check each other's calendar availability within the next week and
                  confirm to specify a better window.
                </li>
                <li>
                  This process took a long time and required lots of communication - we needed to easily collect the
                  confirmed availability of each staff member.
                </li>
                <li>
                  Sales staffs were often required to spend time coordinating schedules with clients for meetings. Time
                  needed to confirm that - was available for the meeting at that time before responding to clients.
                </li>
                <li>Finally, it had to happen fast - with a security guarantee.</li>
              </ul>
              <p className="mb-4">
                For this UI design team, my role involved conducting user research, creating wireframes, designing user
                interfaces, and conducting usability testing. I focused on leveraging the insights gained from designer
                feedback and an interview with a sales person to create a user-friendly and efficient solution.
              </p>

              {/* Accompanying Image */}
              <div className="mt-8">
                <img
                  src="work/2_day_internship-image.png"
                  alt="Project overview diagram"
                  className="w-full max-w-lg mx-auto"
                />
              </div>
            </section>

            {/* Problem Section */}
            <section className="py-8">
              <h2 className="text-2xl font-medium mb-6">(Problem)</h2>
              <p className="mb-4">
                Our user research process highlighted several potential challenges in the process of scheduling
                meetings:
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li>Difficulty manually available dates across multiple participants.</li>
                <li>Confirming availability with key stakeholders was time-consuming.</li>
                <li>Current scheduling tools lacked integration with existing workflows.</li>
                <li>
                  Mobile-unfriendly interfaces slowed the scheduling process when design resources were in a mobile app
                  context.
                </li>
              </ul>
            </section>

            {/* Design Process Section */}
            <section id="design-process" className="py-8">
              <h2 className="text-2xl font-medium mb-6">(Design Process)</h2>
              <p className="mb-4">Our design process consisted of research, prototyping, and testing.</p>

              <ol className="list-decimal pl-5 mb-4 space-y-4">
                <li>
                  <strong>Information Gathering:</strong> We began by English your research results, e.g., mapping
                  existing scheduling tools, analyzing user needs and pain points.
                </li>
                <li>
                  <strong>Prototyping:</strong> Based on our insights, we created wireframes that illustrate the types
                  of processes we needed, e.g. sharing available meeting times and reviewing confirmed participants to
                  achieve efficient design solutions. We made specific choices such as using default system fonts for
                  better readability.
                </li>
                <li>
                  <strong>Improvements:</strong> Based on the results of our usability testing, we made several key
                  improvements to the app's design, specifically focusing on the simplicity of selecting dates,
                  providing more explicit confirmation, and adding helpful interactions. These improvements
                  significantly enhanced the overall user experience.
                </li>
              </ol>
            </section>

            {/* Solution Section */}
            <section id="solution" className="py-8">
              <h2 className="text-2xl font-medium mb-6">Solution</h2>

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">1. Condition Search</h3>
                <p className="mb-4">
                  Search by "before 5x criteria" at the top of the calendar view (company / business target / location /
                  division)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <img src="/api/placeholder/200/400" alt="Condition search wireframe 1" className="w-full" />
                  <img src="/api/placeholder/200/400" alt="Condition search wireframe 2" className="w-full" />
                  <img src="/api/placeholder/200/400" alt="Condition search wireframe 3" className="w-full" />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">2. Search Results</h3>
                <p className="mb-4">
                  The "search system" view dims the surrounding area, highlighting the specified period (from the 5th to
                  the 10th of February 2024). A line on the left hand side on the page will open text area about the key
                  names and right panel.
                </p>
                <p className="mb-4">
                  Tap on the visible block for viewing time and for meet time schedule. Continuing the need to worry
                  about travel time.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <img src="/api/placeholder/200/400" alt="Search results wireframe 1" className="w-full" />
                  <img src="/api/placeholder/200/400" alt="Search results wireframe 2" className="w-full" />
                  <img src="/api/placeholder/200/400" alt="Search results wireframe 3" className="w-full" />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">3. Send Request</h3>
                <p className="mb-4">This option transitions to the confirmation page about the detail.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <img src="/api/placeholder/200/400" alt="Send request wireframe 1" className="w-full" />
                  <img src="/api/placeholder/200/400" alt="Send request wireframe 2" className="w-full" />
                </div>
              </div>
            </section>

            {/* Reflection Section */}
            <section id="reflection" className="py-8">
              <h2 className="text-2xl font-medium mb-6">Reflection</h2>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Impressions</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Despite the short two-day time frame, the sales staff end receiving valuable feedback on the designs
                    in real time in review.
                  </li>
                  <li>
                    The presentation skills: during the presentation were incredibly, they took the questions from
                    various partners and matured with large scale of their needs.
                  </li>
                  <li>
                    Framework for defining improvement opportunities: MOSCOW (MUST, opportunities for improvement,
                    should had to and areas for improvement) (GPTT/CIL).
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Reflection</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    An opportunity to combine UX data pattern and his feedback combined with more practical design
                    views. For the few methods with my first experience and I am satisfied.
                  </li>
                  <li>
                    We also worked in different ways. I would like to use the design handoff as a tool, since not just
                    complaining of what users want to use this application is what and conflict the UI shall practice,
                    but as a strategic decision requires identification of each individual, so that differences produced
                    and adapted to the context of work by designing a product for the world.
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar - Hidden on mobile */}
          <div className="hidden md:block md:w-1/4 pr-8 pt-8">
            <nav className="sticky top-8">
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection('overview')}
                    className={`text-left ${activeSection === 'overview' ? 'font-medium' : ''}`}
                  >
                    Overview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('design-process')}
                    className={`text-left ${activeSection === 'design-process' ? 'font-medium' : ''}`}
                  >
                    Design Process
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('solution')}
                    className={`text-left ${activeSection === 'solution' ? 'font-medium' : ''}`}
                  >
                    Solution
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('reflection')}
                    className={`text-left ${activeSection === 'reflection' ? 'font-medium' : ''}`}
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
