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
import { Mail, Phone, MapPin, Instagram, Linkedin, Youtube, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type FormData = z.infer<typeof schema>;

const contactInfo = [
  { icon: Mail, label: "Email Us", value: "spic@rkgit.edu.in", href: "mailto:spic@rkgit.edu.in" },
  { icon: Phone, label: "Call Us", value: "+91-XXXXXXXXXX", href: "tel:+91XXXXXXXXXX" },
  { icon: MapPin, label: "Visit Us", value: "EII Department, RKGIT Campus, Ghaziabad" },
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { name: "", email: "", phone: "", subject: "", message: "" } });

  const onSubmit = (data: FormData) => {
    console.log("Contact form:", data);
    toast.success("Message sent! We'll get back to you soon.");
    setSubmitted(true);
  };

  return (
    <main>
      <section className="section-padding text-center px-4">
        <AnimatedSection className="max-w-2xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-base text-muted-foreground">We'd Love to Hear From You</p>
        </AnimatedSection>
      </section>

      <section className="section-padding-sm border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {contactInfo.map((c, i) => (
              <AnimatedSection key={c.label} delay={i * 0.06}>
                <Card className="h-full text-center hover:shadow-md">
                  <CardContent className="p-5">
                    <div className="h-9 w-9 mx-auto mb-3 rounded-md bg-primary/8 flex items-center justify-center">
                      <c.icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-semibold text-xs mb-1">{c.label}</h3>
                    {c.href ? (
                      <a href={c.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{c.value}</a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{c.value}</p>
                    )}
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
            <AnimatedSection delay={0.2}>
              <Card className="h-full text-center hover:shadow-md">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-xs mb-3">Social Media</h3>
                  <div className="flex justify-center gap-2">
                    {[
                      { icon: Instagram, label: "Instagram" },
                      { icon: Linkedin, label: "LinkedIn" },
                      { icon: Youtube, label: "YouTube" },
                    ].map(({ icon: Icon, label }) => (
                      <a key={label} href="#" target="_blank" rel="noopener noreferrer" aria-label={label}
                        className="h-9 w-9 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200">
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          {/* Form */}
          <AnimatedSection className="max-w-xl mx-auto">
            {submitted ? (
              <Card>
                <CardContent className="p-10 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">We'll get back to you soon.</p>
                  <Button className="mt-4" variant="outline" onClick={() => { setSubmitted(false); form.reset(); }}>Send Another</Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 sm:p-8">
                  <h2 className="font-display text-lg font-bold mb-6">Send a Message</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Name *</FormLabel><FormControl><Input placeholder="Your name" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email *</FormLabel><FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>Phone</FormLabel><FormControl><Input placeholder="+91-XXXXXXXXXX" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="subject" render={({ field }) => (
                        <FormItem><FormLabel>Subject *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select a subject" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="event">Event Question</SelectItem>
                              <SelectItem value="partnership">Partnership</SelectItem>
                              <SelectItem value="sponsorship">Sponsorship</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        <FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem><FormLabel>Message *</FormLabel><FormControl><Textarea rows={4} placeholder="Your message..." {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <Button type="submit" size="lg" className="w-full">Send Message</Button>
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

export default Contact;
