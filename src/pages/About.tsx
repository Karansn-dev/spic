import AnimatedSection from "@/components/AnimatedSection";
import Counter from "@/components/Counter";
import { Card, CardContent } from "@/components/ui/card";
import { timelineData } from "@/data/timeline";
import { BookOpen, Target, Eye, User } from "lucide-react";

const impactStats = [
  { label: "Events Conducted", value: 15, suffix: "+" },
  { label: "Students Engaged", value: 500, suffix: "+" },
  { label: "Industry Partnerships", value: 10, suffix: "+" },
  { label: "Winning Teams Mentored", value: 25, suffix: "+" },
];

const About = () => {
  return (
    <main>
      {/* Hero */}
      <section className="section-padding text-center px-4">
        <AnimatedSection className="max-w-2xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            About <span className="text-gradient">SPIC</span>
          </h1>
          <p className="text-base text-muted-foreground">
            Building Tomorrow's Innovators, Today
          </p>
        </AnimatedSection>
      </section>

      {/* Who We Are */}
      <section className="section-padding-sm border-t border-border/40">
        <div className="container mx-auto px-4 max-w-2xl">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-primary" />
              <h2 className="font-display text-xl sm:text-2xl font-bold">Who We Are</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-6 uppercase tracking-wider">A Student Society of the EII Department, RKGIT</p>
            <div className="space-y-4 text-[15px] text-foreground/85">
              <p className="leading-relaxed">
                The Society of Promotion of Innovation and Creativity (SPIC) is a student-run society at RKGIT, dedicated to fostering a culture of innovation, entrepreneurship, and creativity among students. Our mission is to provide a platform for students to learn, build, and grow.
              </p>
              <blockquote className="border-l-2 border-primary pl-4 my-6 text-primary/90 italic text-sm">
                "We believe in the power of ideas and aim to create an environment where students can turn their ideas into reality."
              </blockquote>
              <p className="leading-relaxed">
                Our vision is to create a vibrant community of innovators and entrepreneurs who are not afraid to take risks and challenge the status quo. We organize a variety of events and activities throughout the year, including hackathons, workshops, innovation fairs, and guest lectures by industry experts.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 gap-4 mt-12">
            <AnimatedSection delay={0.1}>
              <Card className="h-full">
                <CardContent className="p-5 flex gap-3">
                  <Target className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display font-semibold text-sm mb-1">Our Mission</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Provide a platform for students to learn, build, and grow through innovation and creativity.</p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <Card className="h-full">
                <CardContent className="p-5 flex gap-3">
                  <Eye className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display font-semibold text-sm mb-1">Our Vision</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Create a vibrant community of innovators who challenge the status quo and build the future.</p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding border-t border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <AnimatedSection className="text-center mb-14">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">Our Journey</h2>
            <p className="text-sm text-muted-foreground">Milestones & Impact</p>
          </AnimatedSection>
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
            {timelineData.map((item, i) => (
              <AnimatedSection key={item.year} delay={i * 0.08} className="relative mb-10 last:mb-0">
                <div className={`flex flex-col sm:flex-row items-start gap-4 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  <div className="hidden sm:block sm:w-1/2" />
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold z-10">
                    {item.year.slice(-2)}
                  </div>
                  <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8">
                    <h3 className="font-display text-lg font-bold text-primary mb-2">{item.year}</h3>
                    <ul className="space-y-1.5">
                      {item.events.map((e) => (
                        <li key={e} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="h-1 w-1 rounded-full bg-accent mt-2 shrink-0" />
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="section-padding-sm">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold">Our Impact</h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {impactStats.map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 0.08} className="text-center py-2">
                <div className="font-display text-2xl sm:text-3xl font-bold text-primary mb-1">
                  <Counter end={s.value} suffix={s.suffix} />
                </div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Advisor */}
      <section className="section-padding-sm bg-muted/30 border-t border-border/40">
        <div className="container mx-auto px-4 max-w-sm text-center">
          <AnimatedSection>
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/8 flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-display text-lg font-bold">Dr. Ananya Sharma</h3>
            <p className="text-xs text-muted-foreground mb-3">Faculty Patron — EII Department</p>
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              "Guiding students to innovate and create solutions that matter."
            </p>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
};

export default About;
