"use client";

import Image from "next/image";
import "./animation.css";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";


const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// Types and deletes a list of words, one after another
const ROLES = [
  "Website Creator & AI Enthusiast",
  "Full-Stack Developer",
  "Next.js Builder",
];

function Typewriter({ words }: { words: string[] }) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0;
    let c = words[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = words[w];
      c += deleting ? -1 : 1;
      setText(word.slice(0, c));

      let wait = deleting ? 40 : 80;
      if (!deleting && c === word.length) {
        deleting = true;
        wait = 1600;
      } else if (deleting && c === 0) {
        deleting = false;
        w = (w + 1) % words.length;
        wait = 300;
      }
      timer = setTimeout(tick, wait);
    };

    timer = setTimeout(tick, 2200);
    return () => clearTimeout(timer);
  }, [words]);

  return (
    <span>
      {text}
      <span className="caret" aria-hidden="true" />
    </span>
  );
}

const NAME_WORDS = ["Tinza", "Ilyas."];

const SKILLS = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Python",
  "Git & GitHub",
];

const PROJECTS = [
  {
    title: " Static Interactive Builder",
    description: "A modern interactive resume website with responsive design.",
    link: "https://resume-builder-eight-lake.vercel.app/",
  },
  {
    title: "AI Spec Book",
    description: "An AI-focused documentation book built with Docusaurus, featuring structured chapters and organized learning content.",
    link: "https://ai-speck-book.vercel.app/",
  },
  {
    
  title: "Clinical Website",
  description: "A modern and responsive clinical website designed to provide healthcare information and an easy user experience.",
  link: "https://clinic-website-7nhca7p26.vercel.app/#",

  },
  {
  title: "Nike E-Commerce Website",
  description: "A modern Nike-inspired e-commerce website designed in Figma and developed with a clean, responsive user interface.",
  link: "https://hackathon-quarter-2-zeta.vercel.app/",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080610] text-white">

      {/* NAVBAR */}
      <nav className="anim-nav sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-[#080610]/90 px-8 py-6 backdrop-blur-xl md:px-16">
        <h1 className="text-2xl font-bold text-purple-400">
          TINZA.
        </h1>

        <div className="hidden gap-8 text-sm text-gray-300 md:flex">
          <a href="#home" className="hover:text-purple-400">Home</a>
          <a href="#about" className="hover:text-purple-400">About</a>
          <a href="#skills" className="hover:text-purple-400">Skills</a>
          <a href="#projects" className="hover:text-purple-400">Projects</a>
          <a href="#contact" className="hover:text-purple-400">Contact</a>
        </div>

        <a
          href="#contact"
          className="anim-ring rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold transition hover:bg-purple-700"
        >
          Let's Talk
        </a>
      </nav>

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative flex min-h-[85vh] flex-col-reverse items-center justify-between gap-12 px-8 py-16 md:flex-row md:px-20"
      >
        {/* LEFT CONTENT */}
        <div className="z-10 max-w-2xl">

          <p
            className="anim-up mb-5 tracking-[0.3em] text-purple-400"
            style={d(0)}
          >
            FULL-STACK WEB DEVELOPER
          </p>

          <h2 className="text-5xl font-extrabold leading-tight md:text-7xl">
            <span className="hello-mask">
              <span className="mask-in" style={d(150)}>
                Hello, I'm
              </span>
            </span>
            <span
              className="block text-purple-500"
              aria-label="Tinza Ilyas."
            >
              {NAME_WORDS.map((word, wi) => (
                <span
                  key={word}
                  aria-hidden="true"
                  className={`inline-block whitespace-nowrap ${
                    wi === 0 ? "mr-[0.25em]" : ""
                  }`}
                >
                  {word.split("").map((ch, i) => (
                    <span
                      key={i}
                      className="name-letter inline-block"
                      style={{ "--i": i + wi * 6 } as CSSProperties}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
              ))}
            </span>
            <span className="name-line" aria-hidden="true" />
          </h2>

          <h3
            className="anim-up mt-5 min-h-[2rem] text-xl font-semibold text-gray-200 md:text-2xl"
            style={d(700)}
          >
            <Typewriter words={ROLES} />
          </h3>

          <p
            className="anim-up mt-6 max-w-xl leading-8 text-gray-400"
            style={d(850)}
          >
            I create modern, responsive and user-friendly
            websites with creativity, clean code and a
            passion for technology.
          </p>

          <div
            className="anim-up mt-9 flex flex-wrap gap-4"
            style={d(1000)}
          >
            <a
              href="#projects"
              className="rounded-full bg-purple-600 px-8 py-3 font-semibold shadow-lg shadow-purple-900/40 transition hover:-translate-y-1 hover:bg-purple-700"
            >
              Explore My Work →
            </a>

            <a
              href="#contact"
              className="rounded-full border border-purple-500 px-8 py-3 transition hover:bg-purple-600"
            >
              Contact Me
            </a>
          </div>

          <div
            className="anim-up mt-10 flex gap-6 text-sm text-gray-400"
            style={d(1150)}
          >
            <span>Creative Developer</span>
            <span>•</span>
            <span>Technology Lover</span>
          </div>
        </div>

        {/* RIGHT PROFILE IMAGE */}
        <div
          className="anim-up relative flex items-center justify-center"
          style={d(300)}
        >

          <div className="anim-glow absolute h-72 w-72 rounded-full bg-purple-600/30 blur-[100px] md:h-96 md:w-96" />

          <div className="anim-float relative rounded-[45%] border-2 border-purple-500 p-2 shadow-[0_0_60px_rgba(147,51,234,0.35)]">
            <Image
              src="/portfolio.png"
              alt="Tinza Ilyas - Web Developer"
              width={420}
              height={520}
              priority
              className="h-[350px] w-[280px] rounded-[45%] object-cover md:h-[480px] md:w-[380px]"
            />
          </div>

          <div className="anim-float-slow absolute -bottom-5 -left-8 rounded-xl border border-purple-500/40 bg-[#171020] px-5 py-3 shadow-xl">
            <p className="text-sm font-semibold text-purple-300">
              Let's Create ✨
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="border-t border-white/10 px-8 py-20 md:px-24">
        <Reveal>
          <h2 className="text-3xl font-bold">
            About <span className="text-purple-400">Me</span>
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-6 max-w-3xl leading-8 text-gray-400">
            I'm Tinza Ilyas, a passionate Full-Stack Web Developer
            with skills in HTML, CSS, JavaScript, TypeScript, React,
            Next.js and Python.
            I enjoy creating responsive websites, exploring
            modern technologies and developing creative
            digital experiences.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-4 max-w-3xl leading-8 text-gray-400">
            I learned web development first, then completed the
            Artificial Intelligence course at Governor House, so I
            can build websites and add AI features to them.
          </p>
        </Reveal>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="px-8 py-20 md:px-24">
        <Reveal>
          <h2 className="text-3xl font-bold">
            My <span className="text-purple-400">Skills</span>
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-4">
          {SKILLS.map((skill, i) => (
            <Reveal key={skill} delay={i * 70}>
              <span className="block rounded-xl border border-purple-900 bg-purple-950/40 px-7 py-4 text-purple-200 transition hover:-translate-y-1 hover:border-purple-500 hover:bg-purple-900/50">
                {skill}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="px-8 py-20 md:px-24">
        <Reveal>
          <h2 className="text-3xl font-bold">
            Featured <span className="text-purple-400">Projects</span>
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-5 max-w-2xl text-gray-400">
            A collection of my web development projects
            showcasing creativity, design and technical skills.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.title} delay={i * 140} className="h-full">
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} in a new tab`}
                  className="block h-full cursor-pointer rounded-2xl border border-purple-900/60 bg-[#110d1c] p-7 transition hover:-translate-y-2 hover:border-purple-500"
                >
                  <h3 className="text-xl font-bold text-purple-300">
                    {project.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-400">
                    {project.description}
                  </p>
                </a>
              ) : (
                <div className="h-full rounded-2xl border border-purple-900/60 bg-[#110d1c] p-7 transition hover:-translate-y-2 hover:border-purple-500">
                  <h3 className="text-xl font-bold text-purple-300">
                    {project.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-400">
                    {project.description}
                  </p>
                </div>
              )}
            </Reveal>
         
          ))}
        </div>
      </section>
      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="relative overflow-hidden px-8 py-28 md:px-24"
      >
        {/* Background Glow */}
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[120px]" />

        <Reveal>
          <div className="relative mx-auto max-w-4xl rounded-3xl border border-purple-500/30 bg-[#110d1c] px-7 py-16 text-center shadow-[0_0_60px_rgba(147,51,234,0.12)] md:px-16">

            <p className="mb-5 text-sm font-semibold tracking-[0.35em] text-purple-400">
              GET IN TOUCH
            </p>

            <h2 className="text-4xl font-extrabold leading-tight md:text-6xl">
              Let's Work
              <span className="text-purple-400"> Together.</span>
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-gray-400 md:text-lg">
              Have an idea or a project in mind?
              I'm always excited to work on creative projects,
              build amazing websites and explore new opportunities.
              Let's create something great together!
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-5">

              <a
                href="mailto:tinzailyas@gmail.com"
                className="anim-ring inline-flex items-center gap-3 rounded-full bg-purple-600 px-9 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-purple-700"
              >
                <span>✉</span>
                Contact Me
                <span>→</span>
              </a>

              <a
                href="mailto:tinzailyas@gmail.com"
                className="text-sm text-purple-300 transition hover:text-white"
              >
                tinzailyas@gmail.com
              </a>

            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-purple-900/40 bg-[#080610] px-8 py-10 text-center">

        <h2 className="text-2xl font-extrabold tracking-wider text-purple-400">
          TINZA.
        </h2>

        <p className="mt-3 text-sm text-gray-400">
          Creating • Building • Innovating
        </p>

        <div className="mt-6 flex justify-center gap-6 text-sm text-gray-400">
          <a href="#home" className="transition hover:text-purple-400">
            Home
          </a>
          <a href="#about" className="transition hover:text-purple-400">
            About
          </a>
          <a href="#projects" className="transition hover:text-purple-400">
            Projects
          </a>
          <a href="#contact" className="transition hover:text-purple-400">
            Contact
          </a>
        </div>

        <div className="mx-auto mt-8 h-px max-w-md bg-purple-900/40" />

        <p className="mt-6 text-xs text-gray-500">
          © 2026 Tinza Ilyas. All rights reserved.
        </p>

        <p className="mt-2 text-xs text-purple-400">
          Build • Learn • Grow ✨
        </p>

      </footer>

    </main>
  );
} 