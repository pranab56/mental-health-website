"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { ArrowRight, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

// Mock Data
 const articles = [
  {
    id: 1,
    title: "5 Simple Habits to Reduce Daily Anxiety",
    category: "Mindfulness",
    readTime: "8 min read",
    author: "Jennifer Taylor",
    role: "Clinical Psychologist",
    authorImage: "https://i.pravatar.cc/150?img=32",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2000&auto=format&fit=crop",
    excerpt: "Discover how mindfulness can transform your daily life and reduce stress through simple, science-backed practices that you can start today.",
    featured: true
  },
  {
    id: 2,
    title: "Understanding Relationship Dynamics",
    category: "Relationships",
    readTime: "5 min read",
    author: "Dr. Alex Reed",
    role: "Therapist",
    authorImage: "https://i.pravatar.cc/150?img=11",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2000&auto=format&fit=crop",
    excerpt: "Finding a therapist who truly understands me was so easy with Mynder. The matching process was spot on.",
    featured: false
  },
  {
    id: 3,
    title: "The Science of Better Sleep",
    category: "Sleep Science",
    readTime: "7 min read",
    author: "Sarah Jen",
    role: "Researcher",
    authorImage: "https://i.pravatar.cc/150?img=5",
    image: "https://images.unsplash.com/photo-1511295742362-92c96b136184?q=80&w=2000&auto=format&fit=crop",
    excerpt: "Finding a therapist who truly understands me was so easy with Mynder. The matching process was spot on.",
    featured: false
  },
  {
    id: 4,
    title: "Mindful Eating Practices",
    category: "Mindfulness",
    readTime: "6 min read",
    author: "Marcus Chen",
    role: "Nutritionist",
    authorImage: "https://i.pravatar.cc/150?img=60",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2000&auto=format&fit=crop",
    excerpt: "Finding a therapist who truly understands me was so easy with Mynder. The matching process was spot on.",
    featured: false
  }
]

const categories = ["All Articles", "Anxiety", "Self-Care", "Relationships", "Mindfulness", "Sleep Science"]

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("All Articles")
  const [searchQuery, setSearchQuery] = useState("")

  const featuredArticle = articles.find(a => a.featured) || articles[0]
  const otherArticles = articles.filter(a => !a.featured)

  return (
    <main className="min-h-screen bg-sidebar py-16 md:py-10">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-bold text-foreground mb-4 font-sans"
          >
            Resources & Articles Hub
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-md max-w-2xl mx-auto"
          >
            Expert insights and practical tools for your mental well-being, curated by licensed professionals.
          </motion.p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col items-center gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 ${activeCategory === cat
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-muted-foreground hover:bg-white/80"
                  }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative w-full max-w-xl"
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search className="w-5 h-5" />
            </div>
            <Input
              type="text"
              placeholder="Search for topics or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 rounded-lg bg-white border-0 shadow-sm focus-visible:ring-1 focus-visible:ring-primary"
            />
          </motion.div>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col lg:flex-row">
              <div className="lg:w-1/2 h-64 lg:h-auto relative">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="lg:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center items-start">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-secondary font-bold text-sm uppercase tracking-wider">{featuredArticle.category}</span>
                  <span className="text-muted-foreground text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">• {featuredArticle.readTime}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                  {featuredArticle.title}
                </h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mt-auto gap-6 sm:gap-0">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={featuredArticle.authorImage}
                        alt={featuredArticle.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{featuredArticle.author}</p>
                      <p className="text-xs text-muted-foreground">{featuredArticle.role}</p>
                    </div>
                  </div>

                  <Link href={`/resources/${featuredArticle.id}`}>
                    <Button className="bg-secondary cursor-pointer hover:bg-secondary/90 text-white rounded-xl px-6 h-12 w-full sm:w-auto">
                      Read More <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <span className="text-secondary font-bold text-xs uppercase tracking-wider mb-2">{article.category}</span>
                <h3 className="text-xl font-bold text-foreground mb-3 leading-snug">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
                <p className="text-primary font-bold text-sm mb-6 inline-flex items-center gap-1 cursor-pointer">
                  <Link href={`/resources/${article.id}`}>Read More</Link>
                </p>

                <div className="flex items-center gap-3 mt-auto pt-6 border-t border-gray-100">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={article.authorImage}
                      alt={article.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{article.author}</p>
                    <p className="text-xs text-muted-foreground">{article.role}</p>
                  </div>
                  <span className="ml-auto text-xs text-muted-foreground">• {article.readTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  )
}