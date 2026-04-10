import type { ReactNode } from "react";
import { Icons } from "@/components/icons";
import { FileTextIcon, HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";
import { ResumeIcon } from "@radix-ui/react-icons";

const RESUME_URL = "https://drive.google.com/file/d/1rBwISzB7_V7Df33feiYb1nIWu6a-SBRu/view?usp=sharing";

type Hackathon = {
  title: string;
  dates?: string;
  location?: string;
  description?: string;
  image?: string;
  links?: {
    href: string;
    title: string;
    icon: ReactNode;
  }[];
};

export const DATA = {
  name: "Sabarish Sriram",
  initials: "SS",
  url: "https://yourdomain.com",
  location: "Chennai, India",
  locationLink: "https://www.google.com/maps/place/chennai",
  description: "Full-Stack Developer. Student. Building scalable web apps.",
  summary:
    "I am a Computer Science student at SRM University with hands-on experience in building AI-driven platforms, scalable web applications, and developer tools. I have worked on real-world projects involving computer vision, large-scale email processing, and AI-based document transformation systems.",

  avatarUrl: "/me.jpeg",

  skills: [
    // Frontend
    { name: "React", icon: "devicon-react-original colored" },
    { name: "Next.js", icon: "devicon-nextjs-plain" },
    { name: "Vue.js", icon: "devicon-vuejs-plain colored" },
    { name: "Tailwind CSS", icon: "devicon-tailwindcss-original colored" },

    // Backend
    { name: "Node.js", icon: "devicon-nodejs-plain colored" },
    { name: "Express.js", icon: "devicon-express-original" },
    { name: "Prisma", icon: "devicon-prisma-original colored" },
    { name: "Redis", icon: "devicon-redis-plain colored" },
    { name: "Firebase", icon: "devicon-firebase-plain colored" },
    { name: "Supabase", icon: "devicon-supabase-plain colored" },
    { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
    { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
    { name: "FastAPI", icon: "devicon-fastapi-plain colored" },

    // DevOps / Tools
    { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark" },
    { name: "Docker", icon: "devicon-docker-plain colored" },
    { name: "Git", icon: "devicon-git-plain colored" },
    { name: "GitHub", icon: "devicon-github-original" },
    { name: "Figma", icon: "devicon-figma-plain colored" },

    // Languages
    { name: "JavaScript", icon: "devicon-javascript-plain colored" },
    { name: "TypeScript", icon: "devicon-typescript-plain colored" },
    { name: "C++", icon: "devicon-cplusplus-plain colored" },
    { name: "HTML", icon: "devicon-html5-plain colored" },
    { name: "CSS", icon: "devicon-css3-plain colored" },
  ],

  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: RESUME_URL, icon: FileTextIcon, label: "Resume" },
  ],

  contact: {
    email: "vbsabarishsriram@gmail.com",
    tel: "+91 7010428022",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/sabarishsriram",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/sabarish-sriram",
        icon: Icons.linkedin,
        navbar: true,
      },
      LeetCode: {
        name: "LeetCode",
        url: "https://leetcode.com/sabarishsriram",
        icon: Icons.leetcode,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:vbsabarishsriram@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Lean Impeccable Tech",
      href: "#",
      badges: [],
      location: "Remote",
      title: "Full Stack Developer Intern",
      logoUrl: "/company-1.jpeg",
      start: "July 2025",
      end: "October 2025",
      description:
        "Built an AI-powered floor plan analysis platform using Next.js and FastAPI, integrating YOLOv8 and Detectron2. Developed a TypeScript canvas for visualizing ML detections and automated area calculations across 50+ architectural elements. Designed a Docker Compose pipeline for multi-model inference, reducing latency and supporting 30+ daily users.",
    },
    {
      company: "Coreline Solutions",
      href: "#",
      badges: [],
      location: "Remote",
      title: "SDE Intern",
      logoUrl: "/company-2.jpeg",
      start: "June 2025",
      end: "August 2025",
      description:
        "Built student and admin dashboards using Next.js and Firebase for 500+ users and 50+ projects, with real-time task assignment and Cashfree-integrated payments.Automated 1,000+ emails via Firebase Functions and cron jobs, reducing onboarding effort by 80% through scalable communication workflows.",
    },
  ],

  education: [
    {
      school: "SRM Institute of Science and Technology",
      href: "https://www.srmist.edu.in/",
      degree: "B.Tech CSE (IoT)",
      logoUrl: "/college.webp",
      start: "2023",
      end: "2027",
    },
    {
      school: "St. John's Public School",
      href: "https://sjps.edu.in/",
      degree: "Higher Secondary Education",
      logoUrl: "/sjps-logo.webp",
      start: "2021",
      end: "2023",
    },
    {
      school: "Indian School Al Ghubra",

      href: "https://indianschool.com/",
      degree: "Secondary Education",
      logoUrl: "/isg.png",
      start: "2008",
      end: "2021",
    },
  ],

  projects: [
    {
      title: "ZeroInbox",
      href: "https://github.com/SabarishSriram/ZeroInbox",
      dates: "Jan2025",
      active: true,
      description:
        "Built an email management platform integrating Gmail and Microsoft Graph APIs to process 5000+ emails per inbox. Implemented brand-level grouping and bulk inbox actions like unsubscribe, archive, and automated digest generation.",
      technologies: ["Next.js", "TypeScript", "Supabase", "TailwindCSS"],
      links: [
        {
          type: "Source",
          href: "https://github.com/SabarishSriram/ZeroInbox",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "https://private-user-images.githubusercontent.com/143879390/569904215-4535c6d4-a22c-4657-8c06-64902be1466f.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzU4MjY0NTksIm5iZiI6MTc3NTgyNjE1OSwicGF0aCI6Ii8xNDM4NzkzOTAvNTY5OTA0MjE1LTQ1MzVjNmQ0LWEyMmMtNDY1Ny04YzA2LTY0OTAyYmUxNDY2Zi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNDEwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDQxMFQxMzAyMzlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT01ZmE2Zjg3NWM2NDhjZmRlODJmYmYzZDU1OTJmMzE0NDkzYTA0YTJmOWJkNTM3NDFlOThmYTRlY2Y1MzJjYTA5JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.SBHGAMFAW2ESCkd-f5oTJn1hqRpcOkm5xhjCA7tdFkE",
      video: "",
    },
    {
      title: "TierLister",
      href: "https://github.com/SabarishSriram/Tier-Lister",
      dates: "Jan 2026",
      active: true,
      description:
        "An interactive tier list tool for Reddit communities where users vote and collaboratively rank items in real time. Moderators can create lists, upload items, and manage participation, while rankings update dynamically based on community input.",
      technologies: ["React", "Express", "TypeScript", "Redis", "TailwindCSS"],
      links: [
        {
          type: "Live",
          href: "https://www.reddit.com/r/tierlist_app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Github",
          href: "https://github.com/SabarishSriram/Tier-Lister",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "https://camo.githubusercontent.com/77e4ed4ad773c9306918c31bf52c00f173dc964a8e20d54afb64e24e99521b5e/68747470733a2f2f692e726564642e69742f7175713269346a6f38646367312e706e67",
      video: "",
    },
    {
      title: "SlideScribe",
      href: "https://github.com/SabarishSriram/SlideScribe",
      dates: "2025",
      active: true,
      description:
        "Built an AI platform that converts PDFs and PPTs into structured notes, quizzes, and flashcards using Gemini API. Implemented a scalable document pipeline with Prisma, PostgreSQL, and Docker, deployed on AWS.",
      technologies: [
        "Vue.js",
        "Express",
        "Prisma",
        "PostgreSQL",
        "Docker",
        "AWS",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/SabarishSriram/SlideScribe",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],

  hackathons: [] as Hackathon[],

  leadership: [
    {
      title: "Technical Lead",
      company: "HackTheBox SRM",
      dates: "May 2024 - Present",
      description:
        "Led development of the HTB SRM website and recruitment platform handling 1000+ applications and 2000+ users. Built using Next.js, Prisma, PostgreSQL, Clerk, and AWS S3.",
    },
  ],
} as const;
