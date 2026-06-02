/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                 TYPEWRITER                                 */
/* -------------------------------------------------------------------------- */

function useTypewriter(
  text: string,
  speed = 38,
  startDelay = 600
): { displayed: string; done: boolean } {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      let index = 0;

      interval = setInterval(() => {
        index++;

        setDisplayed(text.slice(0, index));

        if (index >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

/* -------------------------------------------------------------------------- */
/*                                   HERO                                     */
/* -------------------------------------------------------------------------- */

export default function Sample() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [services, setServices] = useState<string[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);

  const { displayed, done } = useTypewriter(
    "we'd love to\nhear from you!"
  );

  const toggleService = (service: string) => {
    setServices((prev) =>
      prev.includes(service)
        ? prev.filter((item) => item !== service)
        : [...prev, service]
    );
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);

  /* ------------------------------------------------------------------------ */
  /*                          DESKTOP VIDEO SCRUBBING                         */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
  const video: HTMLVideoElement = videoRef.current!;
const canvas: HTMLCanvasElement = canvasRef.current!;
  if (!video || !canvas || window.innerWidth < 1024) return;

  const FRAMES = 80;
  let targetIdx = 0;
  let currentIdx = 0;
  let lastDrawn = -1;
  let rafId: number;
  const ctx = canvas.getContext("2d")!;

  async function extractFrames() {
    if (video.readyState < 1) {
      await new Promise<void>(res =>
        video.addEventListener("loadedmetadata", () => res(), { once: true })
      );
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    for (let i = 0; i < FRAMES; i++) {
      video.currentTime = (i / (FRAMES - 1)) * video.duration;
      await new Promise(res =>
        video.addEventListener("seeked", res, { once: true })
      );
      framesRef.current.push(await createImageBitmap(video));
    }

    // swap: hide video, show canvas
    video.style.display = "none";
    canvas.style.display = "block";
    ctx.drawImage(framesRef.current[0], 0, 0, canvas.width, canvas.height);
  }

  function tick() {
    if (framesRef.current.length === FRAMES) {
      const diff = targetIdx - currentIdx;
      if (Math.abs(diff) > 0.3) currentIdx += diff * 0.12;
      const idx = Math.round(Math.max(0, Math.min(FRAMES - 1, currentIdx)));
      if (idx !== lastDrawn) {
        ctx.drawImage(framesRef.current[idx], 0, 0, canvas.width, canvas.height);
        lastDrawn = idx;
      }
    }
    rafId = requestAnimationFrame(tick);
  }

  function handleMouseMove(e: MouseEvent) {
    targetIdx += (e.movementX / window.innerWidth) * 0.8 * FRAMES;
    targetIdx = Math.max(0, Math.min(FRAMES - 1, targetIdx));
  }

  extractFrames();
  rafId = requestAnimationFrame(tick);
  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    cancelAnimationFrame(rafId);
    framesRef.current.forEach(f => f.close()); // free GPU memory
  };
}, []);

  /* ------------------------------------------------------------------------ */
  /*                              MOBILE AUTOPLAY                             */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (window.innerWidth < 1024) {
      video.autoplay = true;

      video.play().catch(() => {});
    }
  }, []);

  const serviceOptions = [
    "Brand",
    "Digital",
    "Campaign",
    "Other",
  ];

  return (
    <div className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen w-screen">
      {/* ------------------------------------------------------------------- */}
      {/* BACKGROUND VIDEO                                                    */}
      {/* ------------------------------------------------------------------- */}

      <div className="order-last lg:order-0 relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-right lg:object-bottom-right"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4"
            type="video/mp4"
          />
        </video>
        <canvas
          ref={canvasRef}
          style={{ display: "none" }}
          className="w-full h-full object-cover object-right lg:object-bottom-right"
        />
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* NAVBAR                                                              */}
      {/* ------------------------------------------------------------------- */}

      <header className="fixed top-0 inset-x-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">
        {/* Logo */}

        <div className="flex items-center gap-3">
          <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none">
            ONSTREAM®
          </span>

          <span className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1">
            ✳
          </span>
        </div>

        {/* Desktop Nav */}

        <nav className="hidden md:flex items-center text-[23px] text-black">
          <a
            href="#"
            className="hover:opacity-60 transition-opacity"
          >
            Labs
          </a>

          <span className="opacity-40">,&nbsp;</span>

          <a
            href="#"
            className="hover:opacity-60 transition-opacity"
          >
            Studio
          </a>

          <span className="opacity-40">,&nbsp;</span>

          <a
            href="#"
            className="hover:opacity-60 transition-opacity"
          >
            Openings
          </a>

          <span className="opacity-40">,&nbsp;</span>

          <a
            href="#"
            className="hover:opacity-60 transition-opacity"
          >
            Shop
          </a>
        </nav>

        {/* CTA */}

        <a
          href="#"
          className="hidden md:block text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>

        {/* Mobile Burger */}

        <button
          onClick={() =>
            setIsMobileMenuOpen((prev) => !prev)
          }
          className="md:hidden flex flex-col justify-center gap-[5px] z-11"
        >
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen
                ? "rotate-45 translate-y-[7px]"
                : ""
            }`}
          />

          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />

          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen
                ? "-rotate-45 -translate-y-[7px]"
                : ""
            }`}
          />
        </button>
      </header>

      {/* Mobile Menu */}

      <div
        className={`md:hidden fixed inset-0 z-9 bg-white/95 backdrop-blur-sm transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full flex flex-col justify-center items-center gap-8 text-4xl">
          <a href="#">Labs</a>
          <a href="#">Studio</a>
          <a href="#">Openings</a>
          <a href="#">Shop</a>
        </div>
      </div>


      <div className="relative z-10 flex flex-col order-first lg:order-0 w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen">
        <main
          id="spade-hero"
          className="w-full max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center"
        >
          <div className="pt-28">
            {/* Headline */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-black leading-[1.08] mb-8 select-none w-full whitespace-pre-wrap">
                {displayed}

                {!done && (
                  <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />
                )}
              </h1>
            </motion.div>

            {/* Description */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
              }}
            >
              <p className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-14 max-w-2xl">
                Whether you have questions, feedback,
                <br />
                drop us a message and we&apos;ll get back to
                you as soon as possible.
              </p>
            </motion.div>

            {/* Services */}

            <div>
              <h3 className="text-2xl font-medium tracking-tight mb-2">
                What sort of service?
              </h3>

              <p className="opacity-85 text-[#738273] mb-8">
                Select all that apply
              </p>

              <div className="flex flex-wrap gap-3">
                {serviceOptions.map((service) => {
                  const active =
                    services.includes(service);

                  return (
                    <motion.button
                      key={service}
                      whileTap={{ scale: 0.96 }}
                      onClick={() =>
                        toggleService(service)
                      }
                      className={`relative flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 ${
                        active
                          ? "bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5 transform"
                          : "bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55"
                      }`}
                    >
                      <AnimatePresence>
                        {active && (
                          <motion.span
                            initial={{
                              scale: 0,
                              opacity: 0,
                            }}
                            animate={{
                              scale: 1,
                              opacity: 1,
                            }}
                            exit={{
                              scale: 0,
                              opacity: 0,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                          >
                            <Check size={16} />
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {service}
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-6">
                <AnimatePresence mode="wait">
                  {services.length === 0 ? (
                    <motion.p
                      key="placeholder"
                      initial={{
                        opacity: 0,
                        y: 6,
                      }}
                      animate={{
                        opacity: 0.5,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -6,
                      }}
                      className="italic text-xs"
                    >
                      Please click to select services
                      above.
                    </motion.p>
                  ) : (
                    <motion.div
                      key="selected"
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 24,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="bg-[#FAFBF9] border rounded-2xl px-5 py-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                        <p className="text-[#1C2E1E]">
                          Ready to inquire about:{" "}
                          {services.join(", ")}
                        </p>

                        <button className="flex items-center gap-2 text-[#4D6D47] uppercase text-xs tracking-wider">
                          Let&apos;s Go
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
