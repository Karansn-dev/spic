import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "@/components/AnimatedSection";
import ThreeDarkBackground from "@/components/ThreeDarkBackground";
import Counter from "@/components/Counter";
import { testimonials } from "@/data/testimonials";
import {
  ChevronDown, Calendar, MapPin, Lightbulb, Users, Award, Rocket,
  Briefcase, GraduationCap, Quote, ArrowRight
} from "lucide-react";

const targetDate = new Date("2026-03-11T09:00:00").getTime();

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, targetDate - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return timeLeft;
}

const benefits = [
  { icon: Lightbulb, title: "Innovation Lab Access", desc: "Work on real-world projects with mentorship" },
  { icon: Briefcase, title: "Industry Connections", desc: "Network with entrepreneurs, VCs, and industry leaders" },
  { icon: GraduationCap, title: "Skill Development", desc: "Workshops on design thinking, pitching, and tech stacks" },
  { icon: Award, title: "Portfolio Building", desc: "Lead events, build your resume with recognized projects" },
  { icon: Rocket, title: "Entrepreneurial Mindset", desc: "Learn to turn ideas into viable startups" },
  { icon: Users, title: "Peer Community", desc: "Collaborate with like-minded innovators" },
];

const stats = [
  { label: "Years Active", value: 4, suffix: "+", sub: "Since 2022" },
  { label: "Events Organized", value: 15, suffix: "+", sub: "Major Events" },
  { label: "Student Reach", value: 500, suffix: "+", sub: "Participants" },
  { label: "Expert Speakers", value: 20, suffix: "+", sub: "Industry Leaders" },
];

const Index = () => {
  const countdown = useCountdown();
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const check = () => {
      try {
        const saved = localStorage.getItem("theme");
        if (saved) {
          setIsDarkTheme(saved === "dark");
        } else {
          setIsDarkTheme(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
        }
      } catch {
        setIsDarkTheme(false);
      }
    };
    check();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "theme") check();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTestimonialIdx((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-gradient-hero px-4 text-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-electric/5 blur-3xl" />
        </div>
        {isDarkTheme && <ThreeDarkBackground className="absolute inset-0 z-0" />}
        <AnimatedSection className="relative z-10 max-w-4xl">
          <p className="mb-4 text-sm font-medium tracking-widest uppercase text-muted-foreground">
            A Student Society of the EII Department, RKGIT
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4">
            Society of Promotion of{" "}
            <span className="text-gradient">Innovation & Creativity</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Where Ideas Spark and Futures Start
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg">
              <Link to="/events">Explore Events</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/join">Join Our Team</Link>
            </Button>
          </div>
        </AnimatedSection>
        <a href="#countdown" className="absolute bottom-8 animate-bounce text-muted-foreground" aria-label="Scroll down">
          <ChevronDown className="h-6 w-6" />
        </a>
      </section>

      {/* Countdown */}
      <section id="countdown" className="py-16 sm:py-20">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">Next Big Event</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">Ideation 2.0</h2>
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-8">
              <Calendar className="h-4 w-4" /> 11 March 2026
              <span className="mx-1">•</span>
              <MapPin className="h-4 w-4" /> CRC
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex justify-center gap-3 sm:gap-6 mb-8">
              {[
                { val: countdown.days, label: "Days" },
                { val: countdown.hours, label: "Hours" },
                { val: countdown.minutes, label: "Minutes" },
                { val: countdown.seconds, label: "Seconds" },
              ].map(({ val, label }) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="font-display text-4xl sm:text-5xl font-bold tabular-nums text-foreground">
                    {String(val).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">{label}</span>
                </div>
              ))}
            </div>
            <Button asChild size="lg" className="bg-gradient-cta border-0 text-primary-foreground hover:opacity-90">
              <Link to="/events">Register Now</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 0.1} className="text-center">
                <div className="font-display text-3xl sm:text-4xl font-bold text-primary mb-1">
                  <Counter end={s.value} suffix={s.suffix} />
                </div>
                <p className="font-medium text-foreground">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join SPIC */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">Why Be Part of SPIC?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Discover the opportunities that await you</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 0.08}>
                <Card className="h-full hover:shadow-md transition-shadow group">
                  <CardContent className="p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <b.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-1">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">What Our Members Say</h2>
          </AnimatedSection>
          <div className="max-w-2xl mx-auto text-center">
            <Quote className="h-8 w-8 text-primary/30 mx-auto mb-4" />
            <p className="text-lg leading-relaxed text-foreground mb-6 min-h-[4rem]">
              "{testimonials[testimonialIdx].quote}"
            </p>
            <p className="font-semibold">{testimonials[testimonialIdx].name}</p>
            <p className="text-sm text-muted-foreground">
              {testimonials[testimonialIdx].batch} — {testimonials[testimonialIdx].role}
            </p>
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIdx(i)}
                  className={`h-2 w-2 rounded-full transition-colors ${i === testimonialIdx ? "bg-primary" : "bg-border"}`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick CTAs */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-8">Ready to Get Started?</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/events">Explore Events <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/join">Join Our Team</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
};

export default Index;
