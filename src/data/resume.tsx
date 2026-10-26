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

const RESUME_URL =
  "https://drive.google.com/file/d/1rBwISzB7_V7Df33feiYb1nIWu6a-SBRu/view?usp=sharing";

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
  location: "Pune, India",
  locationLink: "https://www.google.com/maps/place/Pune,+Maharashtra",
  // Pin for the dot-matrix map tile in the hero
  geo: { lat: 18.5204, lng: 73.8567, countries: ["IND"] },
  description: "Full-Stack Developer. Student. Building scalable web apps.",
  summary:
    "I am a Computer Science student at SRM University with hands-on experience in building AI-driven platforms, scalable web applications, and developer tools. I have worked on real-world projects involving computer vision, large-scale email processing, and AI-based document transformation systems.",

  // Number of months of activity to show in GitHub/LeetCode cards (1-12)
  activityMonths: 3,

  avatarUrl: "/me.jpeg",
  resumeUrl: RESUME_URL,

  role: "Full-stack developer",
  // Hero copy: `headline`, then "I build" typed out with each tagline in turn
  headline: "Computer science student at SRM, shipping full-stack products.",
  taglines: [
    "scalable web apps.",
    "AI-powered products.",
    "tools developers love.",
  ],

  timezone: "Asia/Kolkata",
  timezoneLabel: "IST",
  coordinates: "18.5204° N, 73.8567° E",

  skills: [
    {
      category: "Frontend",
      items: [
        { name: "React", icon: "devicon-react-original colored" },
        { name: "Next.js", icon: "devicon-nextjs-plain" },
        { name: "Vue.js", icon: "devicon-vuejs-plain colored" },
        { name: "Tailwind CSS", icon: "devicon-tailwindcss-original colored" },
      ],
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", icon: "devicon-nodejs-plain colored" },
        { name: "Express.js", icon: "devicon-express-original" },
        { name: "FastAPI", icon: "devicon-fastapi-plain colored" },
        { name: "Prisma", icon: "devicon-prisma-original colored" },
        { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
        { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
        { name: "Redis", icon: "devicon-redis-plain colored" },
        { name: "Supabase", icon: "devicon-supabase-plain colored" },
        { name: "Firebase", icon: "devicon-firebase-plain colored" },
      ],
    },
    {
      category: "Infra & Tools",
      items: [
        { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark" },
        { name: "Docker", icon: "devicon-docker-plain colored" },
        { name: "Git", icon: "devicon-git-plain colored" },
        { name: "GitHub", icon: "devicon-github-original" },
        { name: "Figma", icon: "devicon-figma-plain colored" },
      ],
    },
    {
      category: "Languages",
      items: [
        { name: "TypeScript", icon: "devicon-typescript-plain colored" },
        { name: "JavaScript", icon: "devicon-javascript-plain colored" },
        { name: "C++", icon: "devicon-cplusplus-plain colored" },
        { name: "HTML", icon: "devicon-html5-plain colored" },
        { name: "CSS", icon: "devicon-css3-plain colored" },
      ],
    },
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
      company: "Bajaj Finserv Health",
      href: "#",
      badges: [],
      location: "On-site",
      title: "Full Stack Developer Intern",
      logoUrl: "/bajaj-finserv-health.jpeg",
      start: "July 2026",
      end: "Present",
      description: "Engineered a document forgery detection pipeline with 5 forensic modules to detect tampering and potential AI-generated content in PDFs and images using metadata and pixel-level analysis. Optimized document digitization and translation pipelines by migrating to Azure AI Vision OCR and refining translation workflows, reducing average end-to-end processing time from 9s to 1.5s per document (83% reduction). Integrated RabbitMQ for asynchronous document processing, enabling queue-based task execution across digitization and forensic services.",
    },
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
        "Built student and admin dashboards using Next.js and Firebase for 500+ users and 50+ projects, with real-time task assignment and Cashfree-integrated payments. Automated 1,000+ emails via Firebase Functions and cron jobs, reducing onboarding effort by 80% through scalable communication workflows.",
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
      dates: "Jan 2025",
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
      image: "/zeroinbox.png",
      // Fills the frame around images that aren't 16:9
      imageBackground: "#ffffff",
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
      image:
        "https://camo.githubusercontent.com/77e4ed4ad773c9306918c31bf52c00f173dc964a8e20d54afb64e24e99521b5e/68747470733a2f2f692e726564642e69742f7175713269346a6f38646367312e706e67",
      imageBackground: "#000000",
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
      image: "/slidescribe.png",
      imageBackground: "#000000",
      video: "",
    },
  ],

  hackathons: [] as Hackathon[],

  leadership: [
    {
      title: "Technical Lead",
      company: "HackTheBox SRM",
      logoUrl: "/htb-logo.jpg",
      dates: "May 2024 - Present",
      description:
        "Led development of the HTB SRM website and recruitment platform handling 1000+ applications and 2000+ users. Built using Next.js, Prisma, PostgreSQL, Clerk, and AWS S3.",
    },
  ],
} as const;
