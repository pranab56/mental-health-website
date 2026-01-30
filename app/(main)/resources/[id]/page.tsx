"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock Data (Duplicated for simplicity in this specific task scope)
const articles = [
  {
    id: 1,
    title: "5 Simple Habits to Reduce Daily Anxiety",
    category: "Mindfulness",
    readTime: "8 min read",
    author: "Jennifer Taylor",
    role: "Clinical Psychologist",
    date: "March 15, 2024",
    authorImage: "https://i.pravatar.cc/150?img=32",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2000&auto=format&fit=crop",
    content: "Mindfulness is more than just a buzzword; it's a scientifically proven tool that helps us navigate the complexities of modern life. In this comprehensive guide, we'll explore how you can start your journey toward mental clarity and emotional balance."
  },
  {
    id: 2,
    title: "Understanding Relationship Dynamics",
    category: "Relationships",
    readTime: "5 min read",
    author: "Dr. Alex Reed",
    role: "Therapist",
    date: "Feb 28, 2024",
    authorImage: "https://i.pravatar.cc/150?img=11",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "The Science of Better Sleep",
    category: "Sleep Science",
    readTime: "7 min read",
    author: "Sarah Jen",
    role: "Researcher",
    date: "Jan 10, 2024",
    authorImage: "https://i.pravatar.cc/150?img=5",
    image: "https://images.unsplash.com/photo-1511295742362-92c96b136184?q=80&w=2000&auto=format&fit=crop",
  }
]

export default function ArticleDetailsPage() {
  const params = useParams()
  // In a real app, fetch logic would go here. For now, default to ID 1 or find matching.
  const articleId = Number(params.id) || 1
  const article = articles.find(a => a.id === articleId) || articles[0]
  const relatedArticles = articles.filter(a => a.id !== article.id).slice(0, 3)

  return (
    <main className="min-h-screen bg-sidebar pb-20">

      {/* Hero Section */}
      <div className="relative h-[500px] w-full">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute top-8 left-4 md:left-8 flex items-center gap-2 text-white/80 text-sm font-medium z-10">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/resources" className="hover:text-white transition-colors">Resources</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Blog Details</span>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 md:p-12 lg:p-16">
          <div className="container mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/80 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md mb-4 border border-white/20">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 max-w-4xl leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-white/90">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                  <Image src={article.authorImage} alt={article.author} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-bold text-white">{article.author}</p>
                  <p className="text-xs text-white/70">{article.role}</p>
                </div>
              </div>

              <div className="h-8 w-[1px] bg-white/20 hidden sm:block" />

              <div>
                <p className="text-xs text-white/60 mb-0.5 uppercase tracking-wide">Published</p>
                <p className="font-medium text-white">{article.date}</p>
              </div>

              <div className="h-8 w-[1px] bg-white/20 hidden sm:block" />

              <div>
                <p className="text-xs text-white/60 mb-0.5 uppercase tracking-wide">Reading Time</p>
                <p className="font-medium text-white">{article.readTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Main Content */}
        <div className="lg:col-span-8 space-y-12">
          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {article.content}
            </p>

            <h2 className="text-2xl font-bold text-foreground mb-4 font-sans">The Science Behind the Practice</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Mindfulness is more than just a buzzword; it's a scientifically proven tool that helps us navigate the complexities of modern life. In this comprehensive guide, we'll explore how you can start your journey toward mental clarity and emotional balance.
            </p>

            <h2 className="text-2xl font-bold text-foreground mb-6 font-sans">Three Simple Steps to Begin Today</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              You don't need a meditation cushion or a silent retreat to begin. You can practice mindfulness in the midst of your busiest days.
            </p>

            <ul className="space-y-6 list-none pl-0">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2.5" />
                <div>
                  <strong className="text-foreground block mb-1">Three Simple Steps to Begin Today:</strong>
                  <span className="text-muted-foreground">Take three conscious breaths whenever you feel overwhelmed. Focus entirely on the sensation of air entering and leaving your body.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2.5" />
                <div>
                  <strong className="text-foreground block mb-1">Mindful Eating:</strong>
                  <span className="text-muted-foreground">Choose one meal a day to eat without distractions. Notice textures, and aromas of your food.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2.5" />
                <div>
                  <strong className="text-foreground block mb-1">Sensory Grounding:</strong>
                  <span className="text-muted-foreground">Take three conscious breaths whenever you feel overwhelmed. Focus entirely on the sensation of air entering and leaving your body.</span>
                </div>
              </li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mt-8">
              As you continue your practice, you'll notice that the "mental chatter" doesn't necessarily stop, but your relationship with it changes. You become the observer of your experience rather than a captive to it.
            </p>
          </div>

          {/* CTA Box */}
          <div className="bg-secondary/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 mt-12 border border-secondary/20">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Ready to talk to someone?</h3>
              <p className="text-muted-foreground">Our licensed therapists are here to guide you on your journey to mental wellness.</p>
            </div>
            <Button className="bg-action hover:bg-action/90 text-white rounded-xl px-8 h-12 whitespace-nowrap">
              Find a Therapist <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm sticky top-24">
            <h3 className="text-xl font-bold text-foreground mb-6 font-sans">Related Articles</h3>
            <div className="space-y-6">
              {articles.map((item) => (
                <Link href={`/resources/${item.id}`} key={item.id} className="group flex gap-4 items-start">
                  <div className="relative w-24 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors mb-2 leading-snug">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span>{item.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
