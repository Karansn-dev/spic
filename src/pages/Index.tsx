import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "@/components/AnimatedSection";
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

  useEffect(() => {
    const id = setInterval(() => setTestimonialIdx((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[100px]" />
        </div>
        <AnimatedSection className="max-w-3xl">
          <p className="mb-5 text-sm font-medium tracking-widest uppercase text-muted-foreground">
            A Student Society of the EII Department, RKGIT
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-5">
            Society of Promotion of{" "}
            <span className="text-gradient">Innovation & Creativity</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
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
        <a href="#countdown" className="absolute bottom-8 text-muted-foreground hover:text-foreground transition-colors" aria-label="Scroll down">
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </section>

      {/* Countdown */}
      <section id="countdown" className="section-padding-sm border-y border-border/40">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-2">Next Big Event</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">Ideation 2.0</h2>
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-10">
              <Calendar className="h-3.5 w-3.5" /> 11 March 2026
              <span className="mx-1 text-border">&bull;</span>
              <MapPin className="h-3.5 w-3.5" /> CRC
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex justify-center gap-4 sm:gap-8 mb-10">
              {[
                { val: countdown.days, label: "Days" },
                { val: countdown.hours, label: "Hours" },
                { val: countdown.minutes, label: "Min" },
                { val: countdown.seconds, label: "Sec" },
              ].map(({ val, label }) => (
                <div key={label} className="flex flex-col items-center min-w-[60px]">
                  <span className="font-display text-3xl sm:text-4xl font-bold tabular-nums text-foreground">
                    {String(val).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] text-muted-foreground mt-1.5 uppercase tracking-wide">{label}</span>
                </div>
              ))}
            </div>
            <Button asChild size="lg">
              <Link to="/events">Register Now</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 0.08} className="text-center py-4">
                <div className="font-display text-3xl sm:text-4xl font-bold text-primary mb-1">
                  <Counter end={s.value} suffix={s.suffix} />
                </div>
                <p className="font-medium text-sm text-foreground">{s.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join SPIC */}
      <section className="section-padding border-t border-border/40">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Why Be Part of SPIC?</h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">Discover the opportunities that await you</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 0.06}>
                <Card className="h-full group hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/8 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                      <b.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display font-semibold text-base mb-1.5">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding border-t border-border/40 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">What Our Members Say</h2>
          </AnimatedSection>
          <div className="max-w-xl mx-auto text-center">
            <Quote className="h-6 w-6 text-primary/20 mx-auto mb-5" />
            <p className="text-base sm:text-lg leading-relaxed text-foreground mb-6 min-h-[4rem]">
              &ldquo;{testimonials[testimonialIdx].quote}&rdquo;
            </p>
            <p className="font-semibold text-sm">{testimonials[testimonialIdx].name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {testimonials[testimonialIdx].batch} &mdash; {testimonials[testimonialIdx].role}
            </p>
            <div className="flex justify-center gap-1.5 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === testimonialIdx ? "bg-primary w-6" : "bg-border w-1.5 hover:bg-muted-foreground"}`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick CTAs */}
      <section className="section-padding">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
              Join the community of innovators and start building your future today.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild size="lg">
                <Link to="/events">Explore Events <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/join">Join Our Team</Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
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
