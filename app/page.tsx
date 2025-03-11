// // /Users/i_kawano/Documents/portfolio/app/page.tsx

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16">
        {/* h1: Heading/L_M_120 */}
        <h1 className="text-heading-l-120 md:text-heading-xl-m-120 font-sf-pro mb-2">Hi, I'm Iori!</h1>
        {/* Hero テキスト: Body/XXL_140 */}
        <p className="max-w-full text-body-xl-140 md:text-body-xxl-140 font-sf-pro">
          A interface designer who loves crafting design to the next level.
          <br />
          Especially curious about the integration of data and design.
        </p>
      </section>

      {/* Work Section */}
      <section className="py-8">
        {/* h2: Heading/L_M_120 */}
        <h2 className="text-heading-m-120 md:text-heading-l-20 font-sf-pro mb-16">Work</h2>

        {/* Project 1 */}
        <Link href="/work/2_day_internship" className="block mb-16 hover:opacity-80">
          <div className="mb-20">
            <div className="mb-6">
              <Image
                src="/work/image1.png"
                alt="2 Day Internship Project"
                width={600}
                height={300}
                className="w-full object-cover"
              />
            </div>

            <div className="flex items-center gap-6 mb-4 flex-wrap md:flex-nowrap">
              <h3 className="text-heading-s-120 md:text-heading-m-120 font-sf-pro">2 Day Internship</h3>
              <div className="flex gap-2">
                <span className=" text-body-l-140 font-sf-pro px-4 py-1 rounded-full bg-[#646464] text-[#fff]">UI</span>
                <span className=" text-body-l-140 font-sf-pro px-4 py-1 rounded-full bg-[#646464] text-[#fff]">Rapid Design</span>
              </div>
            </div>

            {/* <div className="flex items-center gap-6 mb-4 flex-wrap md:flex-nowrap">
            <h3 className="text-heading-s-120 md:text-heading-m-120 font-sf-pro">2 Day Internship</h3>
            <div className="flex gap-2">
              <span className="text-body-l-140 font-sf-pro px-4 py-1 rounded-full bg-[#646464] text-[#FFF]">UI</span>
              <span className="text-body-l-140 font-sf-pro px-4 py-1 rounded-full bg-[#646464] text-[#FFF]">Rapid Design</span>
            </div>
          </div> */}

            {/* 残りの説明文: Body/XL_140 */}
            <p className="mb-2 text-body-xl-140 md:text-body-xxl-140 font-sf-pro">
              A sales support app for easy schedule adjustment with a smartphone
            </p>
            <p className="text-body-m-140 md:text-body-l-140">
              Users can easily find suitable appointment dates, send requests, and get travel time-based suggestions for
              in-person meetings.
            </p>
          </div>
        </Link>

        {/* Project 2 */}
        <Link href="/work/google_ux_design_certificate_project" className="block mb-16 hover:opacity-80">
          <div className="mb-20">
            <div className="mb-6">
              <Image
                src="/work/image2.png"
                alt="Google UX Design Certificate Project"
                width={600}
                height={300}
                className="w-full object-cover"
              />
            </div>
            {/* <div className="flex items-center gap-6 mb-4 flex-wrap md:flex-nowrap">
            <h3 className="text-heading-s-120 md:text-heading-m-120 font-sf-pro">Google UX Design Certificate Project</h3>
            <div className="flex gap-2">
              <span className="text-body-l-140 font-sf-pro px-4 py-1 rounded-full bg-[#646464] text-[#FFF]">Research</span>
              <span className="text-body-l-140 font-sf-pro px-4 py-1 rounded-full bg-[#646464] text-[#FFF]">UI</span>
              <span className="text-body-l-140 font-sf-pro px-4 py-1 rounded-full bg-[#646464] text-[#FFF]">UX</span>
            </div>
          </div> */}
            <div className="flex items-center gap-6 mb-4 flex-wrap md:flex-nowrap">
              <h3 className="text-heading-s-120 md:text-heading-m-120 font-sf-pro">Google UX Design Certificate Project</h3>
              <div className="flex gap-2">
                <span className="text-body-l-140 font-sf-pro px-4 py-1 rounded-full bg-[#646464] text-[#FFF]">Research</span>
                <span className="text-body-l-140 font-sf-pro px-4 py-1 rounded-full bg-[#646464] text-[#FFF]">UI</span>
                <span className="text-body-l-140 font-sf-pro px-4 py-1 rounded-full bg-[#646464] text-[#FFF]">UX</span>
              </div>
            </div>
            <p className="mb-2 text-body-xl-140 md:text-body-xxl-140 font-sf-pro">Navigating the best 100 yen shops in your neighborhood</p>
            <p className="text-body-m-140 md:text-body-l-140">
              Smart100 revolutionizes 100 yen store shopping with real-time pricing and stock data. It combines
              promotions and custom lists, streamlining visits for maximum savings and satisfaction.
            </p>
          </div>
        </Link>

        {/* Project 3 */}
        {/* <div className="mb-20">
          <div className="mb-6">
            <Image
              src="/work/image3.png"
              alt="Redesign Quarterly Employee Survey"
              width={600}
              height={300}
              className="w-full object-cover"
            />
          </div>
          <div className="flex items-center gap-6 mb-4 flex-wrap md:flex-nowrap">
            <h3 className="text-heading-s-120 md:text-heading-m-120 font-sf-pro">Redesign Quarterly Employee Survey</h3>
            <div className="flex gap-2">
              <span className=" text-body-l-140 font-sf-pro px-4 py-1 rounded-full bg-[#646464] text-[#FFF]">UI</span>
              <span className=" text-body-l-140 font-sf-pro px-4 py-1 rounded-full bg-[#646464] text-[#FFF]">System Design</span>
            </div>
          </div>
          <p className="mb-2 text-body-l-140 md:text-body-xl-140 font-sf-pro">
            Enhancing employee feedback through intuitive data visualization
          </p>
          <p className="text-body-m-140 md:text-body-l-140">
            This redesign simplifies survey data into clear insights with interactive visualizations and streamlined
            reporting. HR teams can quickly identify trends, address concerns, and make data-driven decisions, fostering
            a more engaged workplace.
          </p>
        </div> */}
      </section>
    </>
  );
}
