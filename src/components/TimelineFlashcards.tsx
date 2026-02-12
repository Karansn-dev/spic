import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type TimelineYear = {
  year: number;
  yearDisplay: string;
  events: string[];
};

const timelineData: TimelineYear[] = [
  {
    year: 2022,
    yearDisplay: "2022",
    events: ["Society Inception", "Core Team Formation"],
  },
  {
    year: 2023,
    yearDisplay: "2023",
    events: [
      "Ideation 1.0 (Inter-college Pitch Competition)",
      "Industrial Visit: Mother Dairy",
      "Expert Talk on Design Thinking",
    ],
  },
  {
    year: 2024,
    yearDisplay: "2024",
    events: [
      "TEDx RKGIT Organizer",
      "E-Summit '24",
      "Workshop: Zero to One",
    ],
  },
  {
    year: 2025,
    yearDisplay: "2025",
    events: [
      "Hack-a-Preneur (24-hour Hackathon)",
      "Startup Expo Visit",
      "Alumni Connect Session",
    ],
  },
  {
    year: 2026,
    yearDisplay: "2026",
    events: [
      "Ideation 2.0 (Upcoming)",
      "National Incubation Drive",
    ],
  },
];

export default function TimelineFlashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const current = timelineData[currentIndex];
  const progress = ((currentIndex + 1) / timelineData.length) * 100;

  const handleNext = () => {
    if (currentIndex < timelineData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-background via-card to-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-3">
            SPIC Journey
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our milestones and achievements
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-cta transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            {currentIndex + 1} / {timelineData.length}
          </p>
        </div>

        {/* Flashcard */}
        <div
          className="mb-8 h-80 cursor-pointer perspective"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className={`relative w-full h-full transition-transform duration-500 transform-gpu ${
              isFlipped ? "[transform:rotateY(180deg)]" : ""
            }`}
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front */}
            <Card
              className={`absolute w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-2 border-primary/30 hover:border-primary/50 transition-all duration-300 cursor-pointer group ${
                isFlipped ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <div className="text-center">
                <div className="text-6xl sm:text-7xl font-display font-bold text-gradient mb-4">
                  {current.yearDisplay}
                </div>
                <p className="text-muted-foreground text-sm">
                  Click to reveal events
                </p>
              </div>
            </Card>

            {/* Back */}
            <Card
              className={`absolute w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-accent/10 via-card to-primary/10 border-2 border-accent/30 hover:border-accent/50 transition-all duration-300 overflow-y-auto ${
                isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              style={{
                transform: "rotateY(180deg)",
              }}
            >
              <div className="w-full">
                <h3 className="font-display text-2xl font-bold text-center mb-6 text-primary">
                  {current.yearDisplay}
                </h3>
                <div className="space-y-3">
                  {current.events.map((event, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20 hover:border-primary/40 transition-colors"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">
                        {event}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <Button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            variant="outline"
            size="lg"
            className="flex-1"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Previous
          </Button>

          <Button
            onClick={() => setIsFlipped(!isFlipped)}
            variant="secondary"
            size="lg"
            className="flex-1"
          >
            {isFlipped ? "Show Year" : "Show Events"}
          </Button>

          <Button
            onClick={handleNext}
            disabled={currentIndex === timelineData.length - 1}
            variant="outline"
            size="lg"
            className="flex-1"
          >
            Next
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </div>

        {/* Quick navigation dots */}
        <div className="flex justify-center gap-2 mt-8">
          {timelineData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setIsFlipped(false);
              }}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "bg-primary w-8"
                  : "bg-border hover:bg-muted-foreground"
              }`}
              aria-label={`Go to year ${timelineData[idx].yearDisplay}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
