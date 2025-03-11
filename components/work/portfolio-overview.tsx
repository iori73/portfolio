import Image from 'next/image';

export default function PortfolioOverview() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white text-[#002a38]">
      <h1 className="text-5xl font-bold mb-6">Overview</h1>
      <p className="text-lg mb-6">
            During my 2-day internship at Knowledge Work Inc, I participated in a design exploration project centered
            around the challenge of efficiently scheduling meetings.
          </p>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-6">
        <div className="lg:col-span-6">

          <p className="text-lg mb-4">
            The project was inspired by the following hypothetical scenario, provided by the company:
          </p>

          <ul className="space-y-2 mb-6">
            <li className="flex gap-2">
              <span className="text-lg">•</span>
              <div>
                <span className="text-[#ff6b6b] font-medium">A</span>, wanting to schedule a second meeting with C and{' '}
                <span className="text-[#6b88ff] font-medium">D</span> after a successful initial consultation, needed to
                find a suitable time.
              </div>
            </li>

            <li className="flex gap-2">
              <span className="text-lg">•</span>
              <div>
                <span className="text-[#ff6b6b] font-medium">A</span>, as a sales manager, required the attendance of
                colleague <span className="text-[#6b88ff] font-medium">B</span> at the meeting, scheduled to be held in
                person.
              </div>
            </li>

            <li className="flex gap-2">
              <span className="text-lg">•</span>
              <div>
                <span className="text-[#ff6b6b] font-medium">A</span> and{' '}
                <span className="text-[#6b88ff] font-medium">B</span> had flexible availability within the next week and
                wanted to identify a 1-hour window.
              </div>
            </li>

            <li className="flex gap-2">
              <span className="text-lg">•</span>
              <div>
                Before proposing times to C and <span className="text-[#6b88ff] font-medium">D</span>,{' '}
                <span className="text-[#ff6b6b] font-medium">A</span> wanted to confirm the suitability of the times
                with B.
              </div>
            </li>

            <li className="flex gap-2">
              <span className="text-lg">•</span>
              <div>
                <span className="text-[#ff6b6b] font-medium">A</span> needed to easily present the confirmed options to
                C and <span className="text-[#6b88ff] font-medium">D</span> for their selection.
              </div>
            </li>

            <li className="flex gap-2">
              <span className="text-lg">•</span>
              <div>
                C, upon receiving the options, needed to coordinate with{' '}
                <span className="text-[#6b88ff] font-medium">D</span> to find a mutually available time.
              </div>
            </li>

            <li className="flex gap-2">
              <span className="text-lg">•</span>
              <div>
                C also needed to confirm that <span className="text-[#6b88ff] font-medium">D</span> was available for a
                meeting at that time before responding to
                <span className="text-[#ff6b6b] font-medium"> A</span>.
              </div>
            </li>

            <li className="flex gap-2">
              <span className="text-lg">•</span>
              <div>
                Finally, C had to respond to <span className="text-[#ff6b6b] font-medium">A</span> with a mutually
                agreed upon time between C and <span className="text-[#6b88ff] font-medium">D</span>.
              </div>
            </li>
          </ul>

        </div>

        <div className="lg:col-span-6 relative">
          <div className="relative">
            <div className="absolute inset-0 bg-gray-100 rounded-[40px] -z-10"></div>

            {/* 画像 */}
            <div className="relative pt-8 px-4">
              <Image
                src="/work/2_day_internship-image.png"
                alt="Meeting scheduling workflow illustration"
                width={463}
                height={557}
                className="w-full h-auto"
              />

              {/* <div className="absolute top-[22%] right-[5%] bg-white rounded-lg px-3 py-1 border border-gray-200 shadow-sm">
                <p className="text-sm">
                  <span className="font-medium">1. A</span> selects matching dates
                </p>
              </div>

              <div className="absolute top-[38%] right-[5%] bg-white rounded-lg px-3 py-1 border border-gray-200 shadow-sm">
                <p className="text-sm">
                  <span className="font-medium">2. A</span> sends request to B
                </p>
              </div>

              <div className="absolute top-[48%] right-[5%] bg-white rounded-lg px-3 py-1 border border-gray-200 shadow-sm">
                <p className="text-sm">
                  <span className="font-medium">3. B</span> approves/suggests change
                </p>
              </div>

              <div className="absolute top-[60%] right-[5%] bg-white rounded-lg px-3 py-1 border border-gray-200 shadow-sm">
                <p className="text-sm">
                  <span className="font-medium">4. A</span> sends request to client(C and D)
                </p>
              </div>

              <div className="absolute bottom-[25%] left-[50%] transform -translate-x-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center border border-gray-200">
                <span className="font-medium">C</span>
              </div>

              <div className="absolute bottom-[25%] left-[65%] transform -translate-x-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center border border-gray-200">
                <span className="font-medium">D</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <p className="text-lg">
            As a UI/UX design intern, my role involved conducting user research, creating wireframes, designing user
            interfaces, and conducting usability testing. I focused on leveraging the insights gained from designer
            feedback and an interview with a sales person to create a user-friendly mobile app concept.
          </p>
    </div>
  );
}
