import React, { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import { usePortfolio } from "../../lib/store";
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Smile, 
  MessageSquare, 
  Heart 
} from "lucide-react";

// Testimonial Data Matching the image
const reviewsData = [
  {
    id: "rev1",
    name: "Rohit Verma",
    role: "Founder",
    company: "FitFuel India",
    text: "Swastik delivered a website that exceeded my expectations. The design is modern, fast, and exactly what my brand needed.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "rev2",
    name: "Ananya Sharma",
    role: "Co-founder",
    company: "Maison d'Or",
    text: "Professional, responsive, and easy to work with. The website looks premium and performs even better. Highly recommended!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "rev3",
    name: "Karan Malhotra",
    role: "Founder",
    company: "Learnly",
    text: "He understood my requirements perfectly and turned my ideas into a beautiful, high-converting website. Great experience overall!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "rev4",
    name: "Vivek Patel",
    role: "CEO",
    company: "BuildNext",
    text: "The attention to detail and design sense is top-notch. Communication was smooth and the project was delivered on time. Absolutely loved the final result!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "rev5",
    name: "Neha Iyer",
    role: "Marketing Head",
    company: "Brandora",
    text: "Our website traffic and leads increased significantly after the new site. Swastik knows what works and delivers results!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  }
];

// Reusable Testimonial Card Component
interface TestimonialCardProps {
  review: any;
  isActive?: boolean;
  className?: string;
  isDesktop?: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ review, isActive, className = "", isDesktop = true }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Max 4 degrees tilt as specified
    const tiltX = -(y - yc) / (yc / 4);
    const tiltY = (x - xc) / (xc / 4);
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isDesktop 
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translate3d(0, ${isActive ? "-10px" : "0px"}, 0)`
          : undefined,
        transition: "transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.45s ease, box-shadow 0.45s ease, background-color 0.45s ease",
      }}
      className={`group w-full lg:w-[390px] h-[290px] p-[28px] rounded-[22px] border bg-[#121212]/36 backdrop-blur-[22px] overflow-hidden flex flex-col justify-between cursor-pointer ${
        isActive 
          ? "border-[#A855F7]/50 shadow-[0_0_28px_rgba(168,85,247,0.25)] bg-[#1a1a1a]/40" 
          : "border-white/8 hover:border-[#A855F7]/30 hover:shadow-[0_0_28px_rgba(168,85,247,0.15)] hover:bg-[#1a1a1a]/40"
      } ${className}`}
    >
      {/* Quotation Mark */}
      <div className="flex justify-between items-start">
        <Quote className="w-[42px] h-[42px] text-[#A855F7] opacity-80 group-hover:opacity-100 transition-all duration-300" style={{ filter: "drop-shadow(0 0 4px rgba(168,85,247,0.4))" }} />
      </div>

      {/* Review Text - Clamped to 5 lines */}
      <p className="font-sans font-normal text-[15px] sm:text-[15.5px] leading-relaxed text-white/92 my-auto line-clamp-5">
        {review.text}
      </p>

      {/* Thin Divider */}
      <div className="w-full h-[1px] bg-white/10 my-1" />

      {/* Client Info Footer */}
      <div className="flex items-center justify-between w-full pt-1">
        <div className="flex items-center gap-3">
          <img
            src={review.avatar}
            alt={review.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-14 h-14 rounded-full object-cover border border-white/15 transition-transform duration-[450ms] group-hover:scale-[1.05]"
          />
          <div className="flex flex-col">
            <span className="font-sans font-medium text-base sm:text-[18px] text-white tracking-wide leading-tight">
              {review.name}
            </span>
            <span className="font-sans text-[13px] sm:text-[14px] text-white/50 leading-tight">
              {review.role}, {review.company}
            </span>
          </div>
        </div>

        {/* 5 Filled Stars */}
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-[18px] h-[18px] fill-[#A855F7] text-[#A855F7]" />
          ))}
        </div>
      </div>
    </div>
  );
};

// Energy Sphere Component
const EnergySphereOverlay: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const yOffset = (scrollProgress - 0.5) * -8; // moves upward 8px on scroll

  return (
    <div
      style={{
        transform: `translate3d(-50%, calc(-50% + ${yOffset}px), 0)`,
        boxShadow: "0 0 90px rgba(168,85,247,0.35)",
        mixBlendMode: "screen",
      }}
      className="absolute top-1/2 left-1/2 w-[420px] h-[420px] rounded-full pointer-events-none z-0 opacity-85 overflow-hidden flex items-center justify-center bg-radial from-[#A855F7]/25 via-[#8B5CF6]/10 to-transparent transition-transform duration-100 ease-out"
    >
      {/* Animated Glowing Plasma Fields */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.3)_0%,transparent_70%)] animate-pulse" style={{ animationDuration: "3.5s" }} />
      
      {/* Intricate High Tech Rotating Rings */}
      <div className="absolute w-[95%] h-[95%] rounded-full border border-dashed border-[#A855F7]/20 animate-[spin_30s_linear_infinite]" />
      <div className="absolute w-[80%] h-[80%] rounded-full border border-dotted border-[#8B5CF6]/30 animate-[spin_20s_linear_infinite_reverse]" />

      {/* Plasma Core Orbs */}
      <div className="absolute w-[180px] h-[180px] rounded-full bg-gradient-to-tr from-[#A855F7] to-[#E9D5FF] blur-2xl opacity-30 animate-ping" style={{ animationDuration: "5s" }} />
      <div className="absolute w-[240px] h-[240px] rounded-full bg-radial from-[#C084FC]/20 to-transparent blur-xl animate-pulse" style={{ animationDuration: "4s" }} />
    </div>
  );
};

export default function Reviews() {
  const { data } = usePortfolio();
  const reviewsData = data.testimonials;

  const getReview = (index: number) => {
    if (!reviewsData || reviewsData.length === 0) {
      return {
        id: "fallback_" + index,
        name: "Valued Client",
        role: "Partner",
        company: "Vibe Tech",
        text: "Outstanding design and seamless delivery. Highly recommend for any premium project!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      };
    }
    return reviewsData[index % reviewsData.length];
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const cardsGroupRef = useRef<HTMLDivElement>(null);
  
  // Elements for GSAP Entrance Animations
  const labelRef = useRef<HTMLDivElement>(null);
  const heading1Ref = useRef<HTMLHeadingElement>(null);
  const heading2Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0.5);
  const [isDesktop, setIsDesktop] = useState(true);

  // Embla Carousel Setup for Swipeable Testimonials on Mobile/Tablet
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  // Track responsive device width
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update scrollProgress relative to viewport for pixel-perfect parallax
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = rect.height + windowHeight;
      const currentDist = windowHeight - rect.top;
      
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const progress = Math.min(Math.max(currentDist / totalDist, 0), 1);
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync Embla selected slide with activeIndex
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Auto-scrolling reviews to make the section alive
  useEffect(() => {
    const interval = setInterval(() => {
      if (emblaApi) {
        emblaApi.scrollNext();
      } else {
        setActiveIndex((prev) => (prev + 1) % 5);
      }
    }, 4500); // automatic scroll every 4.5 seconds
    return () => clearInterval(interval);
  }, [emblaApi]);

  // Handle previous/next slide navigation
  const handlePrev = () => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    } else {
      setActiveIndex((prev) => (prev - 1 + 5) % 5);
    }
  };

  const handleNext = () => {
    if (emblaApi) {
      emblaApi.scrollNext();
    } else {
      setActiveIndex((prev) => (prev + 1) % 5);
    }
  };

  const handleDotClick = (index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    } else {
      setActiveIndex(index);
    }
  };

  const [hasAnimated, setHasAnimated] = useState(false);

  const runEntranceAnimation = () => {
    if (hasAnimated) return;
    setHasAnimated(true);

    const tl = gsap.timeline();

    // 0.2 Background fades
    tl.to(containerRef.current, {
      opacity: 1,
      duration: 1.0,
    }, 0.2);

    // 0.4 Section label
    tl.fromTo(labelRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      0.4
    );

    // 0.7 Heading line one
    tl.fromTo(heading1Ref.current,
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
      0.7
    );

    // 1.0 Heading line two
    tl.fromTo(heading2Ref.current,
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
      1.0
    );

    // 1.3 Description
    tl.fromTo(descRef.current,
      { opacity: 0, y: 25 },
      { opacity: 0.82, y: 0, duration: 1.0, ease: "power3.out" },
      1.3
    );

    // 1.6 Energy sphere glow increases
    if (sphereRef.current) {
      tl.fromTo(sphereRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 0.85, scale: 1, duration: 1.2, ease: "power2.out" },
        1.6
      );
    }

    // 1.9 Top testimonial cards (Rohit Verma, Ananya Sharma)
    const topCards = containerRef.current?.querySelectorAll(".top-card-element");
    if (topCards && topCards.length > 0) {
      tl.fromTo(topCards,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.2, ease: "power3.out" },
        1.9
      );
    }

    // 2.2 Bottom cards (Karan Malhotra, Vivek Patel, Neha Iyer)
    const bottomCards = containerRef.current?.querySelectorAll(".bottom-card-element");
    if (bottomCards && bottomCards.length > 0) {
      tl.fromTo(bottomCards,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.2, ease: "power3.out" },
        2.2
      );
    }

    // 2.7 Pagination
    tl.fromTo(paginationRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      2.7
    );

    // 3.0 Stats panel rises
    tl.fromTo(statsRef.current,
      { opacity: 0, y: 45 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
      3.0
    );
  };

  // GSAP Entrance Animations Sequenced Exactly to Specifications
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runEntranceAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.02 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Bulletproof fallback: Run animation after 1.5s to prevent blank page on layout anomalies
    const fallbackTimer = setTimeout(() => {
      runEntranceAnimation();
    }, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [hasAnimated]);

  // Parallax offsets mapped to scroll progress
  const bgYOffset = (scrollProgress - 0.5) * -40; // background Parallax 5%
  const groupYOffset = (scrollProgress - 0.5) * -18; // testimonial group moves upward 18px on scroll

  return (
    <section
      id="reviews"
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#050505] pt-[120px] pb-[100px] px-6 md:px-[72px] flex flex-col items-center justify-between opacity-95 transition-opacity duration-300"
    >
      {/* 1. Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <video
          ref={bgVideoRef}
          autoPlay
          muted
          loop
          playsInline
          referrerPolicy="no-referrer"
          style={{
            transform: `translate3d(0, ${bgYOffset}px, 0)`,
          }}
          className="absolute inset-0 w-full h-full object-cover z-[-3]"
        >
          <source
            src="https://res.cloudinary.com/dhs9tptrr/video/upload/v1782707893/Video_Object_Remover-1782651228409_bp3c7o.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark Cinematic Overlay */}
        <div
          className="absolute inset-0 z-[-2]"
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,.84) 0%, rgba(0,0,0,.70) 50%, rgba(0,0,0,.84) 100%)`,
          }}
        />

        {/* Soft bloom, subtle vignette and extremely subtle purple fog */}
        <div className="absolute inset-0 pointer-events-none z-[-1] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.06)_0%,transparent_80%)]" />
        <div className="absolute top-[40%] left-[25%] w-[600px] h-[600px] rounded-full bg-[#8B5CF6]/4 blur-[160px] pointer-events-none z-[-1]" />
        
        {/* Tiny Floating Particles Field */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1] opacity-35">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#A855F7]/80 rounded-full animate-pulse"
              style={{
                top: `${15 + Math.random() * 70}%`,
                left: `${10 + Math.random() * 80}%`,
                boxShadow: "0 0 8px rgba(168,85,247,0.6)",
                animationDuration: `${5 + Math.random() * 5}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* 2. Content Layout Wrapper */}
      <div className="relative z-10 w-full max-w-[1450px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center pointer-events-auto">
          {/* Small Label */}
          <div ref={labelRef} className="opacity-0 mb-6">
            <span className="font-sans font-medium text-lg tracking-[6px] text-[#A855F7] uppercase">
              CLIENT REVIEWS
            </span>
          </div>

          {/* Main Heading */}
          <h3 className="font-sans font-black text-3xl sm:text-5xl md:text-[74px] leading-[0.95] tracking-tighter text-white max-w-4xl">
            <div ref={heading1Ref} className="opacity-0 mb-1">
              TRUSTED BY{" "}
              <span className="bg-gradient-to-r from-[#E9D5FF] to-[#A855F7] bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(168,85,247,0.22)]">
                CLIENTS.
              </span>
            </div>
            <div ref={heading2Ref} className="opacity-0">
              APPRECIATED FOR{" "}
              <span className="bg-gradient-to-r from-[#E9D5FF] to-[#A855F7] bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(168,85,247,0.22)]">
                RESULTS.
              </span>
            </div>
          </h3>

          {/* Description */}
          <p
            ref={descRef}
            className="font-sans font-normal text-lg sm:text-[28px] leading-relaxed text-white/82 max-w-[700px] mt-8 opacity-0"
          >
            Real feedback from real people who trusted me with their ideas and saw real impact.
          </p>
        </div>

        {/* Interactive Carousel and Testimonial Grid Space */}
        <div className="relative w-full flex items-center justify-center my-8">
          
          {/* Left Arrow (Desktop Only) */}
          <button
            onClick={handlePrev}
            className="absolute left-[-20px] xl:left-0 z-30 w-[72px] h-[72px] rounded-full border border-[#A855F7]/40 bg-black/20 backdrop-blur-[12px] flex items-center justify-center text-white cursor-pointer hover:bg-[#A855F7] hover:border-[#A855F7] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:scale-[1.08] transition-all duration-300 hidden lg:flex"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Right Arrow (Desktop Only) */}
          <button
            onClick={handleNext}
            className="absolute right-[-20px] xl:right-0 z-30 w-[72px] h-[72px] rounded-full border border-[#A855F7]/40 bg-black/20 backdrop-blur-[12px] flex items-center justify-center text-white cursor-pointer hover:bg-[#A855F7] hover:border-[#A855F7] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:scale-[1.08] transition-all duration-300 hidden lg:flex"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Core Grid and Card Container */}
          <div
            ref={cardsGroupRef}
            style={{
              transform: `translate3d(0, ${groupYOffset}px, 0)`,
              transition: "transform 0.15s ease-out",
            }}
            className="w-full max-w-[1240px] px-2 relative z-10"
          >
            
            {/* Centered Energy Sphere Overlay - centered on ALL screen sizes */}
            <div ref={sphereRef} className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <EnergySphereOverlay scrollProgress={scrollProgress} />
            </div>

            {/* 1. DESKTOP GRID LAYOUT (lg & up) - Matches Reference Image perfectly */}
            <div className="hidden lg:grid grid-cols-3 gap-[34px] relative py-10 z-10">
              
              {/* Column 1 */}
              <div className="flex flex-col gap-[34px] justify-between">
                {/* Rohit Verma (Top Card) */}
                <div className="top-card-element">
                  <TestimonialCard 
                    review={getReview(0)} 
                    isActive={activeIndex === 0} 
                    isDesktop={isDesktop}
                  />
                </div>
                {/* Karan Malhotra (Bottom Card) */}
                <div className="bottom-card-element">
                  <TestimonialCard 
                    review={getReview(2)} 
                    isActive={activeIndex === 2} 
                    isDesktop={isDesktop}
                  />
                </div>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-[34px] justify-between">
                {/* Empty block on Row 1 (Shows the beautiful sphere behind) */}
                <div className="h-[290px] w-full" />
                
                {/* Vivek Patel (Bottom Card) */}
                <div className="bottom-card-element">
                  <TestimonialCard 
                    review={getReview(3)} 
                    isActive={activeIndex === 3} 
                    isDesktop={isDesktop}
                  />
                </div>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col gap-[34px] justify-between">
                {/* Ananya Sharma (Top Card) */}
                <div className="top-card-element">
                  <TestimonialCard 
                    review={getReview(1)} 
                    isActive={activeIndex === 1} 
                    isDesktop={isDesktop}
                  />
                </div>
                {/* Neha Iyer (Bottom Card) */}
                <div className="bottom-card-element">
                  <TestimonialCard 
                    review={getReview(4)} 
                    isActive={activeIndex === 4} 
                    isDesktop={isDesktop}
                  />
                </div>
              </div>
            </div>

            {/* 2. TABLET GRID LAYOUT (md to lg) - 2 Columns (Exactly 3 cards) */}
            <div className="hidden md:flex lg:hidden flex-col gap-10 items-center justify-center py-6 z-10 relative">
              <div className="grid grid-cols-2 gap-8 w-full max-w-[820px] relative z-10">
                <TestimonialCard review={getReview(0)} isActive={activeIndex === 0} isDesktop={false} />
                <TestimonialCard review={getReview(1)} isActive={activeIndex === 1} isDesktop={false} />
                <div className="col-span-2 flex justify-center">
                  <TestimonialCard review={getReview(2)} isActive={activeIndex === 2} isDesktop={false} />
                </div>
              </div>
            </div>

            {/* 3. MOBILE SWIPEABLE SWIPER (below md) - Embla Carousel */}
            <div className="md:hidden overflow-hidden w-full px-2 py-4" ref={emblaRef}>
              <div className="flex gap-4">
                {reviewsData.map((review, rIdx) => (
                  <div key={review.id} className="flex-shrink-0 w-[85vw] max-w-[390px]">
                    <TestimonialCard 
                      review={review} 
                      isActive={activeIndex === rIdx} 
                      isDesktop={false}
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Dots Pagination Indicator Below */}
        <div 
          ref={paginationRef}
          className="flex items-center justify-center gap-[18px] mt-8 mb-16 opacity-0"
        >
          {reviewsData.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => handleDotClick(dotIdx)}
              className={`h-[10px] rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === dotIdx 
                  ? "w-[24px] bg-[#A855F7] shadow-[0_0_12px_#A855F7]" 
                  : "w-[10px] bg-white/20 hover:bg-white/45 border border-white/5"
              }`}
            />
          ))}
        </div>

        {/* 4. Bottom Stats Bar */}
        <div 
          ref={statsRef}
          className="w-full max-w-[1450px] opacity-0 pointer-events-auto"
        >
          <div className="w-full min-h-[120px] rounded-[24px] border border-white/8 bg-[#121212]/34 backdrop-blur-[24px] py-8 px-4 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-2 select-none">
            
            {/* Stat Item 1 */}
            <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-6 w-full lg:border-r border-white/10 last:border-0 justify-center">
              <Smile className="w-8 h-8 md:w-10 md:h-10 text-[#A855F7] flex-shrink-0" />
              <div className="flex flex-col text-left">
                <span className="font-sans font-bold text-2xl sm:text-[38px] lg:text-[44px] xl:text-[48px] text-[#A855F7] leading-none mb-1">
                  50+
                </span>
                <span className="font-sans font-medium text-[10px] sm:text-[14px] lg:text-[16px] xl:text-[18px] text-white/90 whitespace-nowrap leading-none">
                  Happy Clients
                </span>
              </div>
            </div>

            {/* Stat Item 2 */}
            <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-6 w-full lg:border-r border-white/10 last:border-0 justify-center">
              <Star className="w-8 h-8 md:w-10 md:h-10 text-[#A855F7] flex-shrink-0" />
              <div className="flex flex-col text-left">
                <span className="font-sans font-bold text-2xl sm:text-[38px] lg:text-[44px] xl:text-[48px] text-[#A855F7] leading-none mb-1">
                  100+
                </span>
                <span className="font-sans font-medium text-[10px] sm:text-[14px] lg:text-[16px] xl:text-[18px] text-white/90 whitespace-nowrap leading-none">
                  Projects Completed
                </span>
              </div>
            </div>

            {/* Stat Item 3 */}
            <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-6 w-full lg:border-r border-white/10 last:border-0 justify-center">
              <MessageSquare className="w-8 h-8 md:w-10 md:h-10 text-[#A855F7] flex-shrink-0" />
              <div className="flex flex-col text-left">
                <span className="font-sans font-bold text-2xl sm:text-[38px] lg:text-[44px] xl:text-[48px] text-[#A855F7] leading-none mb-1">
                  4.9/5
                </span>
                <span className="font-sans font-medium text-[10px] sm:text-[14px] lg:text-[16px] xl:text-[18px] text-white/90 whitespace-nowrap leading-none">
                  Average Rating
                </span>
              </div>
            </div>

            {/* Stat Item 4 */}
            <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-6 w-full last:border-0 justify-center">
              <Heart className="w-8 h-8 md:w-10 md:h-10 text-[#A855F7] flex-shrink-0" />
              <div className="flex flex-col text-left">
                <span className="font-sans font-bold text-2xl sm:text-[38px] lg:text-[44px] xl:text-[48px] text-[#A855F7] leading-none mb-1">
                  100%
                </span>
                <span className="font-sans font-medium text-[10px] sm:text-[14px] lg:text-[16px] xl:text-[18px] text-white/90 whitespace-nowrap leading-none">
                  Client Satisfaction
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
