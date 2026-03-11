import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { api, type Registration } from "@/services/api";
import {
  Calendar,
  MapPin,
  Download,
  Mail,
  Loader2,
  Search,
  QrCode,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const emailSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export default function Dashboard() {
  const [registrations, setRegistrations] = useState<Registration[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({ resolver: zodResolver(emailSchema) });

  const onSearch = async ({ email }: { email: string }) => {
    setError("");
    setLoading(true);
    try {
      const data = await api.getRegistrations(email);
      setRegistrations(data);
    } catch (err: any) {
      setError(err.message ?? "Failed to fetch registrations.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async (id: string) => {
    try {
      await api.resendEmail(id);
      // Update local state
      setRegistrations(
        (prev) =>
          prev?.map((r) =>
            r.id === id ? { ...r, emailStatus: "sent" as const } : r
          ) ?? null
      );
    } catch {
      // Silently fail — user can retry
    }
  };

  const handleDownload = (reg: Registration) => {
    const link = document.createElement("a");
    link.href = reg.qrDataUrl;
    link.download = `ticket-${reg.eventName.replace(/\s+/g, "-").toLowerCase()}.png`;
    link.click();
  };

  return (
    <main>
      {/* Hero */}
      <section className="section-padding text-center px-4">
        <AnimatedSection className="max-w-2xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            My <span className="text-gradient">Tickets</span>
          </h1>
          <p className="text-base text-muted-foreground">
            View and download your event QR tickets
          </p>
        </AnimatedSection>
      </section>

      {/* Email lookup */}
      <section className="section-padding-sm border-t border-border/40">
        <div className="container mx-auto px-4 max-w-lg">
          <AnimatedSection>
            <form
              onSubmit={handleSubmit(onSearch)}
              className="flex gap-2 items-end"
            >
              <div className="flex-1 space-y-1.5">
                <Label htmlFor="dash-email">Email address</Label>
                <Input
                  id="dash-email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-1.5" />
                    Look up
                  </>
                )}
              </Button>
            </form>
          </AnimatedSection>

          {error && (
            <p className="mt-4 text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">
              {error}
            </p>
          )}
        </div>
      </section>

      {/* Results */}
      {registrations !== null && (
        <section className="section-padding-sm">
          <div className="container mx-auto px-4 max-w-2xl">
            {registrations.length === 0 ? (
              <AnimatedSection>
                <div className="text-center py-12">
                  <QrCode className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">
                    No registrations found for this email.
                  </p>
                </div>
              </AnimatedSection>
            ) : (
              <div className="space-y-4">
                {registrations.map((reg, i) => (
                  <AnimatedSection key={reg.id} delay={i * 0.05}>
                    <Card className="hover:shadow-md">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <h3 className="font-display font-semibold text-base mb-1">
                              {reg.eventName}
                            </h3>
                            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(reg.eventDate).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {reg.eventVenue}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {reg.checkedIn ? (
                              <Badge className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Checked In
                              </Badge>
                            ) : (
                              <Badge variant="outline">Active</Badge>
                            )}
                          </div>
                        </div>

                        {/* Toggle QR preview */}
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setExpandedId(
                                expandedId === reg.id ? null : reg.id
                              )
                            }
                          >
                            <QrCode className="h-3.5 w-3.5 mr-1.5" />
                            {expandedId === reg.id
                              ? "Hide Ticket"
                              : "View Ticket"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownload(reg)}
                          >
                            <Download className="h-3.5 w-3.5 mr-1.5" />
                            Download
                          </Button>
                          {reg.emailStatus === "failed" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleResend(reg.id)}
                            >
                              <Mail className="h-3.5 w-3.5 mr-1.5" />
                              Resend
                            </Button>
                          )}
                        </div>

                        {/* QR Preview */}
                        {expandedId === reg.id && reg.qrDataUrl && (
                          <div className="mt-4 flex flex-col items-center border-t border-border/40 pt-4">
                            <img
                              src={reg.qrDataUrl}
                              alt="QR Ticket"
                              className="w-52 h-52 rounded-md border border-border"
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                              Present this QR code at the event entrance.
                            </p>
                          </div>
                        )}

                        {/* Email status indicator */}
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                          {reg.emailStatus === "sent" ? (
                            <>
                              <CheckCircle2 className="h-3 w-3 text-green-600" />
                              Ticket emailed
                            </>
                          ) : reg.emailStatus === "failed" ? (
                            <>
                              <XCircle className="h-3 w-3 text-destructive" />
                              Email delivery failed
                            </>
                          ) : (
                            <>
                              <Loader2 className="h-3 w-3 animate-spin" />
                              Email pending…
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
