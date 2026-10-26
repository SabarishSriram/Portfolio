/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";

interface Props {
  index: number;
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  image?: string;
  /** Solid fill behind the image for screenshots that aren't 16:9 (default: dot grid) */
  imageBackground?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex size-full items-center justify-center">
      <span className="font-dot text-4xl font-bold uppercase sm:text-5xl">
        {title}
        <span className="text-brand">.</span>
      </span>
    </div>
  );
}

export function ProjectCard({
  index,
  title,
  href,
  description,
  dates,
  tags,
  image,
  imageBackground,
  video,
  links,
  className,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [imageFailed, setImageFailed] = useState(false);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--x", `${e.clientX - rect.left}px`);
    node.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <article
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card transition-colors duration-500 hover:border-foreground/20",
        className,
      )}
    >
      {/* Spotlight that follows the pointer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(360px_circle_at_var(--x)_var(--y),color-mix(in_oklch,var(--foreground)_6%,transparent),transparent_60%)]"
      />

      {/* 16:9 frame matching laptop screenshots; contain-fit so nothing is cropped or stretched */}
      <a
        href={href || "#"}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${title}`}
        className={cn(
          "relative m-2 mb-0 block aspect-video overflow-hidden rounded-[1.25rem] border border-border bg-background",
          !imageBackground && "dot-grid",
        )}
        style={imageBackground ? { backgroundColor: imageBackground } : undefined}
      >
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="size-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        ) : image && !imageFailed ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="size-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <Placeholder title={title} />
        )}
      </a>

      <div className="relative flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>
            <span className="text-brand">{String(index + 1).padStart(2, "0")}</span>
            <span className="mx-2">/</span>
            {dates}
          </span>
          {links && links.length > 0 && (
            <span className="flex items-center gap-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 inline-flex items-center gap-1 transition-colors hover:text-foreground"
                >
                  {link.icon}
                  {link.type}
                </a>
              ))}
            </span>
          )}
        </div>

        <h3 className="flex items-center gap-2 font-dot text-3xl leading-none font-bold uppercase">
          {title}
          <ArrowUpRight className="size-5 -translate-x-1 translate-y-1 text-muted-foreground opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
        </h3>

        <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
          {description}
        </p>

        {tags.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-muted px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
