import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
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

export const DATA = {
  name: "Sabarish Sriram",
  initials: "SS",
  url: "https://yourdomain.com",
  location: "Chennai, India",
  locationLink: "https://www.google.com/maps/place/chennai",
  description:
    "Full Stack Developer focused on building scalable AI-powered applications and modern web platforms.",
  summary:
    "I am a Computer Science student at SRM University with hands-on experience in building AI-driven platforms, scalable web applications, and developer tools. I have worked on real-world projects involving computer vision, large-scale email processing, and AI-based document transformation systems. Currently, I serve as a Technical Lead at HackTheBox SRM, where I help build systems used by thousands of users.",

  avatarUrl: "/me.png",

  skills: [
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "TypeScript", icon: Typescript },
    { name: "Node.js", icon: Nodejs },
    { name: "Python", icon: Python },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "Docker", icon: Docker },
    { name: "Java", icon: Java },
    { name: "C++", icon: Csharp },
  ],

  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],

  contact: {
    email: "vbsabarishsriram@gmail.com",
    tel: "+917010428022",
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
      logoUrl: "/company.png",
      start: "July 2025",
      end: "October 2025",
      description:
        "Built an AI-powered floor plan analysis platform using Next.js and FastAPI, integrating YOLOv8 and Detectron2. Developed a TypeScript canvas for visualizing ML detections and automated area calculations across 50+ architectural elements. Designed a Docker Compose pipeline for multi-model inference, reducing latency and supporting 30+ daily users.",
    },
  ],

  education: [
    {
      school: "SRM University KTR",
      href: "https://www.srmist.edu.in/",
      degree:
        "B.Tech Computer Science and Engineering (IoT Specialization) - CGPA: 9.11",
      logoUrl: "/srm.png",
      start: "2023",
      end: "2027",
    },
  ],

  projects: [
    {
      title: "ZeroInbox",
      href: "https://github.com/SabarishSriram/ZeroInbox",
      dates: "2025",
      active: true,
      description:
        "Built an email management platform integrating Gmail and Microsoft Graph APIs to process 5000+ emails per inbox. Implemented brand-level grouping and bulk inbox actions like unsubscribe, archive, and automated digest generation.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Supabase",
        "TailwindCSS",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/SabarishSriram/ZeroInbox",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
    },
    {
      title: "TierLister",
      href: "https://github.com/SabarishSriram/Tier-Lister",
      dates: "2025",
      active: true,
      description:
        "Developed a Reddit-based tier list platform using Devvit, supporting 1000+ daily users. Integrated OAuth2 authentication and Redis caching to handle 6000+ real-time votes efficiently.",
      technologies: [
        "React",
        "Express",
        "TypeScript",
        "Redis",
        "TailwindCSS",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/SabarishSriram/Tier-Lister",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
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
    },
  ],

  hackathons: [],

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
