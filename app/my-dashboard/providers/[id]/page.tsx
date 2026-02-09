"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  ChevronRight,
  GraduationCap,
  Languages as LanguageIcon,
  MapPin,
  Plus,
  Sprout,
  Stethoscope
} from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { BookingSidebar } from "./_components/booking-sidebar";

const AREAS_OF_EXPERTISE = [
  "Anxiety Disorders", "CBT", "Depression", "Post-Partum", "Mindfulness", "Couples Counseling"
];

const ADDITIONAL_SKILLS = [
  "Interpersonal Therapy", "Solution-Focused Therapy", "Motivational Interviewing", "Stress Management"
];

export default function ProviderDetailPage() {
  return (
    <div className="bg-[#F8F7FC]">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <NextLink href="/" className="hover:text-primary transition-colors">Home</NextLink>
        <ChevronRight size={14} />
        <NextLink href="/my-dashboard/providers" className="hover:text-primary transition-colors">Therapists</NextLink>
        <ChevronRight size={14} />
        <span className="text-secondary font-medium">Dr. Sarah Jenkins</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Header Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center relative">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden flex-shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
                alt="Dr. Sarah Jenkins"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-success border-4 border-white" />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Dr. Sarah Jenkins, PsyD
                </h1>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-xs px-2.5 py-0.5 font-bold">
                  Top
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground font-medium">
                <span className="flex items-center gap-1">Clinical Psychologist</span>
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                <span>12 years experience</span>
              </div>
              <div className="flex items-center gap-1.5 text-action font-medium">
                <MapPin size={18} />
                <span>Dubai, UAE</span>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start rounded-none h-auto p-0 mb-8 overflow-x-hidden gap-8 scrollbar-hide">
              <TabsTrigger
                value="about"
                className="rounded-none border-b-[3px] border-transparent cursor-pointer data-[state=active]:border-b-[#9B85C1] data-[state=active]:text-[#9B85C1] font-bold text-base px-0 py-4 shadow-none transition-all hover:text-[#9B85C1]/70 text-[#6B7280] bg-transparent data-[state=active]:bg-transparent"
              >
                About & Bio
              </TabsTrigger>
              <TabsTrigger
                value="specialization"
                className="rounded-none border-b-[3px] border-transparent cursor-pointer data-[state=active]:border-b-[#9B85C1] data-[state=active]:text-[#9B85C1] font-bold text-base px-0 py-4 shadow-none transition-all hover:text-[#9B85C1]/70 text-[#6B7280] bg-transparent data-[state=active]:bg-transparent"
              >
                Specialization
              </TabsTrigger>
              <TabsTrigger
                value="availability"
                className="rounded-none border-b-[3px] border-transparent cursor-pointer data-[state=active]:border-b-[#9B85C1] data-[state=active]:text-[#9B85C1] font-bold text-base px-0 py-4 shadow-none transition-all hover:text-[#9B85C1]/70 text-[#6B7280] bg-transparent data-[state=active]:bg-transparent"
              >
                Availability
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <section className="space-y-4">
                <h2 className="text-xl font-bold">About Dr. Jenkins</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Dr. Sarah Jenkins specializes in cognitive behavioral therapy (CBT) and mindfulness-based practices.
                  She has over a decade of experience helping individuals navigate anxiety, depression, and complex life transitions.
                  Her approach is client-centered, warm, and evidence-based, focusing on empowering patients with practical tools for sustainable emotional health.
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-3xl flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1 uppercase tracking-widest text-muted-foreground">Education</h4>
                    <p className="font-medium text-foreground">PsyD in Clinical Psychology</p>
                    <p className="text-muted-foreground text-sm">Stanford University</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <LanguageIcon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1 uppercase tracking-widest text-muted-foreground">Language</h4>
                    <p className="font-medium text-foreground">English (Native)</p>
                    <p className="text-muted-foreground text-sm">Spanish (Professional)</p>
                  </div>
                </div>
              </div>

              <section className="space-y-4">
                <h2 className="text-xl font-bold">Areas of Expertise</h2>
                <div className="flex flex-wrap gap-2.5">
                  {AREAS_OF_EXPERTISE.map((area) => (
                    <Badge
                      key={area}
                      variant="outline"
                      className="h-11 px-6 rounded-xl border-action/20 bg-action/5 text-foreground font-medium text-sm hover:bg-action/10 transition-colors"
                    >
                      {area}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="h-11 px-6 rounded-xl border-primary/20 bg-primary/5 text-primary font-bold text-sm cursor-pointer hover:bg-primary/10">
                    +4 more
                  </Badge>
                </div>
              </section>
            </TabsContent>

            <TabsContent value="specialization" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Brain size={18} />
                </div>
                <h2 className="text-xl font-bold">Clinical Focus</h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Cognitive Behavioral Therapy (CBT)",
                    icon: <Brain className="text-primary" size={20} />,
                    description: "Dr. Jenkins utilizes CBT to help clients identify and challenge unhelpful thought patterns and behaviors. By developing practical, action-oriented strategies, clients can effectively manage symptoms of anxiety and depression while building emotional resilience for long-term mental wellness."
                  },
                  {
                    title: "Mindfulness-Based Practice",
                    icon: <Sprout className="text-primary" size={20} />,
                    description: "Integrating mindfulness techniques, Dr. Jenkins guides clients in developing a greater awareness of the present moment. This approach is particularly effective for managing stress, enhancing emotional regulation, and fostering a compassionate relationship with oneself during difficult life transitions."
                  },
                  {
                    title: "Treatment Approach",
                    icon: <Stethoscope className="text-primary" size={20} />,
                    isDetailed: true
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl space-y-4 shadow-sm">
                    <div className="flex items-center gap-3 font-bold text-lg">
                      <div className="p-2 rounded-xl bg-primary/5">
                        {item.icon}
                      </div>
                      {item.title}
                    </div>
                    {item.description && (
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    )}
                    {item.isDetailed && (
                      <div className="space-y-4 pt-2">
                        <p className="text-muted-foreground mb-4">
                          My methodology is rooted in a collaborative, evidence-based framework designed to treat the whole person, not just the symptoms.
                        </p>
                        <div className="space-y-3">
                          {[
                            { title: "Evidence-Based Foundation", desc: "Utilizing only proven therapeutic techniques that have been clinically validated through rigorous psychological research." },
                            { title: "Collaborative Goal Setting", desc: "We work together to define your path to recovery, ensuring every session moves you closer to your personal definition of wellness." },
                            { title: "Trauma-Informed Care", desc: "A sensitive, safe environment that acknowledges the impact of life experiences on current mental and emotional health." },
                            { title: "Holistic Integration", desc: "Recognizing the interconnectedness of physical health, lifestyle, and mental well-being in your treatment plan." }
                          ].map((point, pIdx) => (
                            <div key={pIdx} className="flex gap-3">
                              <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center text-success mt-1">
                                <Plus size={12} className="rotate-45" /> {/* Using Plus rotated as check or just Check */}
                              </div>
                              <div className="flex-1">
                                <h5 className="font-bold text-sm">{point.title}</h5>
                                <p className="text-muted-foreground text-sm">{point.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <section className="space-y-4">
                <h2 className="text-xl font-bold">Additional Skills</h2>
                <div className="flex flex-wrap gap-2.5">
                  {ADDITIONAL_SKILLS.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="h-11 px-6 rounded-xl border-primary/20 bg-primary/5 text-foreground font-medium text-sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </section>
            </TabsContent>

            <TabsContent value="availability" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Simplified Availability View */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-7 border-b">
                  {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, i) => (
                    <div key={day} className={`p-4 text-center space-y-1 ${i === 1 ? 'bg-primary/5 border-b-2 border-primary' : ''}`}>
                      <span className="text-[10px] font-bold text-muted-foreground">{day}</span>
                      <div className="text-lg font-bold">{i + 7}</div>
                    </div>
                  ))}
                </div>
                <div className="p-6 grid grid-cols-7 gap-4">
                  {/* Columns for slots */}
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="space-y-3">
                      {i === 1 ? (
                        <>
                          <Button variant="outline" className="w-full text-xs h-9 bg-muted/30 border-none">9:00 AM</Button>
                          <Button variant="outline" className="w-full text-xs h-9 bg-action/10 border-action text-action font-bold">11:30 AM</Button>
                          <Button variant="outline" className="w-full text-xs h-9 bg-muted/30 border-none">2:00 PM</Button>
                          <Button variant="outline" className="w-full text-xs h-9 bg-muted/30 border-none">9:00 AM</Button>
                        </>
                      ) : i === 4 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-50 py-4">
                          <Plus className="rotate-45" size={24} />
                          <span className="text-[10px] font-bold mt-1 text-center leading-tight">Fully Booked</span>
                        </div>
                      ) : i > 4 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-50 py-4">
                          <Plus className="rotate-45" size={24} />
                          <span className="text-[10px] font-bold mt-1 text-center leading-tight">Weekend</span>
                        </div>
                      ) : (
                        <>
                          <Button variant="outline" className="w-full text-xs h-9 bg-muted/30 border-none">9:00 AM</Button>
                          <Button variant="outline" className="w-full text-xs h-9 bg-muted/30 border-none">9:00 AM</Button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <BookingSidebar />
        </div>
      </div>
    </div>
  );
}
