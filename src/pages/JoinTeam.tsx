import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AnimatedSection from "@/components/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Award, Users, GraduationCap, Briefcase, CheckCircle, CalendarCheck, Lightbulb, Palette, Megaphone, PenLine, Wallet } from "lucide-react";
import { toast } from "sonner";

const departments = [
  { icon: CalendarCheck, name: "Event Management", desc: "Plan and execute flagship events" },
  { icon: Lightbulb, name: "Technical Team", desc: "Build tech solutions and manage digital assets" },
  { icon: Palette, name: "Design & Creatives", desc: "Brand identity, posters, social media graphics" },
  { icon: Megaphone, name: "Public Relations", desc: "Outreach, guest coordination, partnerships" },
  { icon: PenLine, name: "Content & Social Media", desc: "Content strategy, copywriting, community management" },
  { icon: Wallet, name: "Finance & Sponsorship", desc: "Budget management, sponsor hunting" },
];

const benefits = [
  { icon: Award, text: "Leadership experience" },
  { icon: GraduationCap, text: "Skill development" },
  { icon: Users, text: "Networking opportunities" },
  { icon: Briefcase, text: "Certificate of participation" },
];

const schema = z.object({
  name: z.string().min(2, "Required"),
  studentId: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Required"),
  yearBranch: z.string().min(1, "Required"),
  department: z.string().min(1, "Required"),
  motivation: z.string().min(50, "At least 50 characters").max(2000),
  experience: z.string().optional(),
  portfolio: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const JoinTeam = () => {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { name: "", studentId: "", email: "", phone: "", yearBranch: "", department: "", motivation: "", experience: "", portfolio: "" } });

  const onSubmit = (data: FormData) => {
    console.log("Application:", data);
    toast.success("Application submitted!");
    setSubmitted(true);
  };

  return (
    <main>
      <section className="section-padding text-center px-4">
        <AnimatedSection className="max-w-2xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Join the <span className="text-gradient">SPIC Family</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-lg mx-auto">
            Are you passionate about innovation, creativity, and building something impactful? We're looking for driven students to join our team.
          </p>
        </AnimatedSection>
      </section>

      {/* Benefits */}
      <section className="py-8 border-y border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6">
            {benefits.map((b, i) => (
              <AnimatedSection key={b.text} delay={i * 0.06} className="flex items-center gap-2 text-sm">
                <b.icon className="h-3.5 w-3.5 text-primary" />
                <span>{b.text}</span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="section-padding-sm">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-8">
            <h2 className="font-display text-xl sm:text-2xl font-bold mb-1.5">Open Positions</h2>
            <p className="text-muted-foreground text-sm">Choose the department that excites you</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {departments.map((d, i) => (
              <AnimatedSection key={d.name} delay={i * 0.05}>
                <Card className="h-full hover:shadow-md">
                  <CardContent className="p-4 flex gap-3">
                    <div className="h-8 w-8 shrink-0 rounded-md bg-primary/8 flex items-center justify-center">
                      <d.icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{d.name}</h3>
                      <p className="text-[11px] text-muted-foreground">{d.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-padding-sm bg-muted/30 border-t border-border/40">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-xl mx-auto">
            {submitted ? (
              <Card>
                <CardContent className="p-10 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold mb-2">Application Submitted!</h3>
                  <p className="text-muted-foreground">We'll get back to you within 7 days.</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 sm:p-8">
                  <h2 className="font-display text-lg font-bold mb-6">Apply Now</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem><FormLabel>Full Name *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="studentId" render={({ field }) => (
                          <FormItem><FormLabel>Student ID *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem><FormLabel>Email *</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem><FormLabel>Phone *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="yearBranch" render={({ field }) => (
                          <FormItem><FormLabel>Year & Branch *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                              <SelectContent>
                                {["First Year", "Second Year", "Third Year", "Final Year"].map(y =>
                                  ["EII", "CSE", "IT", "ECE", "ME"].map(b =>
                                    <SelectItem key={`${y}-${b}`} value={`${y} - ${b}`}>{y} — {b}</SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          <FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="department" render={({ field }) => (
                          <FormItem><FormLabel>Department *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                              <SelectContent>
                                {departments.map(d => <SelectItem key={d.name} value={d.name}>{d.name}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          <FormMessage /></FormItem>
                        )} />
                      </div>
                      <FormField control={form.control} name="motivation" render={({ field }) => (
                        <FormItem><FormLabel>Why do you want to join SPIC? *</FormLabel><FormControl><Textarea rows={5} placeholder="200–500 words" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="experience" render={({ field }) => (
                        <FormItem><FormLabel>Previous Experience</FormLabel><FormControl><Textarea rows={3} placeholder="Optional" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="portfolio" render={({ field }) => (
                        <FormItem><FormLabel>Portfolio / LinkedIn / GitHub</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <Button type="submit" size="lg" className="w-full">Submit Application</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
};

export default JoinTeam;
