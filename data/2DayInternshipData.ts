// /Users/i_kawano/Documents/portfolio/data/2DayInternshipData.ts

import { CaseStudyData } from "@/components/CaseStudyTypes";

const twoDayInternshipData: CaseStudyData = {
  heroImage: "/work/image1.png",
  projectTitle: "2 Day Internship",
  tags: ["UI", "Rapid Design"],
  projectDescription:
    "A sales support app for easy schedule adjustment with a smartphone",
  infoGrid: {
    timeline: "Feb 19, 2024 - Feb 15, 2024",
    role: "UI, UX, Intern",
    team: "Solo",
    deliverables: "Wireframes"
  },
  sections: [
    {
      id: "overview",
      heading: "Overview",
      description:
        "During my 2-day internship at Knowledge Work Inc, I participated in a design exploration project centered around the challenge of efficiently scheduling meetings. The project was inspired by a scenario where the absence of even one staff member could affect sales activities.",
        layoutType: "splitImage", // ←★追加
        bullets: [
          "A needed a new meeting time after the first consultation.",
          "A required B's presence.",
          "A and B sought a 1-hour slot.",
          "Before proposing times to C and D, A confirmed availability with B.",
          "A then presented the options to C and D.",
          "C coordinated with D for a common time.",
          "C confirmed D's availability before replying to A.",
          "Finally, C provided a mutually agreed time to A."
        ],
      images: ["/work/2_day_internship/2_day_internship-image.png"],
    },
    {
      id: "design-process",
      heading: "Design Process",
      description:
        "The design process involved a combination of user research, prototyping, and testing. I conducted competitive analysis, created low-fidelity wireframes, and iterated the design based on usability feedback.",
      images: []  // ※必要に応じて画像パスを追加
    },
    {
      id: "solution",
      heading: "Solution",
      description:
        "To address the scheduling challenges, the solution was implemented in three steps: condition search, displaying search results, and transitioning to a send request confirmation page.",
      images: [
        "/work/2_day_internship/frames1.png",
        "/work/2_day_internship/frames2.png",
        "/work/2_day_internship/frames3.png"
      ]
    },
    {
      id: "reflection",
      heading: "Reflection",
      description:
        "Reflecting on the project, I gained valuable insights from the user research and usability testing, which informed further improvements in the design.",
      images: []  // ※必要に応じて追加
    }
  ]
};

export default twoDayInternshipData;
