"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { ProviderCard } from "./_components/provider-card";
import { SearchFilters } from "./_components/search-filters";

const MOCK_PROVIDERS = [
  {
    id: "1",
    name: "Dr. Sarah Jenkins",
    title: "Clinical Psychologist",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    tags: ["ANXIETY", "CBT", "DEPRESSION"],
    description: "Specializing in anxiety disorders and personal growth through evidence-based cognitive behavioral therapy.",
    price: 150,
    availability: "Available tomorrow",
    isTop: true,
    gender: "female",
    languages: ["English", "Spanish"],
    therapyTypes: ["Individual", "Couple"],
    rating: 4.9,
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    title: "Psychiatrist",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
    tags: ["ADHD", "MEDICATION", "BIOFEEDBACK"],
    description: "Expert in neurodevelopmental disorders and holistic approach to psychiatric wellness.",
    price: 200,
    availability: "Available today",
    isTop: true,
    gender: "male",
    languages: ["English", "Mandarin"],
    therapyTypes: ["Individual"],
    rating: 4.8,
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    title: "Licensed Counselor",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400",
    tags: ["RELATIONSHIPS", "LGBTQ+", "TRAUMA"],
    description: "Trauma-informed counselor focusing on relationship dynamics and personal identity.",
    price: 125,
    availability: "Available next week",
    isTop: false,
    gender: "female",
    languages: ["English", "Spanish"],
    therapyTypes: ["Individual", "Family"],
    rating: 4.7,
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    title: "Clinical Psychologist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
    tags: ["PTSD", "EMDR", "VETERANS"],
    description: "Specialized in trauma recovery and EMDR therapy for veterans and first responders.",
    price: 175,
    availability: "Available tomorrow",
    isTop: true,
    gender: "male",
    languages: ["English"],
    therapyTypes: ["Individual"],
    rating: 5.0,
  },
  {
    id: "5",
    name: "Lisa Thompson",
    title: "Family Therapist",
    image: "https://images.unsplash.com/photo-1559839734-2b71f153678c?auto=format&fit=crop&q=80&w=400",
    tags: ["FAMILY", "PARENTS", "CHILDREN"],
    description: "Helping families navigate complex dynamics and improving communication between generations.",
    price: 140,
    availability: "Available today",
    isTop: false,
    gender: "female",
    languages: ["English", "French"],
    therapyTypes: ["Family", "Teen"],
    rating: 4.6,
  },
  {
    id: "6",
    name: "Dr. Robert Foster",
    title: "Neuropsychologist",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    tags: ["BRAIN INJURY", "COGNITIVE", "REHAB"],
    description: "Comprehensive neuropsychological assessments and personalized cognitive rehabilitation plans.",
    price: 250,
    availability: "Available in 2 days",
    isTop: true,
    gender: "male",
    languages: ["English", "German"],
    therapyTypes: ["Individual"],
    rating: 4.9,
  }
];

const AVAILABILITY_ORDER: Record<string, number> = {
  "Available today": 0,
  "Available tomorrow": 1,
  "Available in 2 days": 2,
  "Available next week": 3
};

export default function ProvidersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("highest-rated");
  const [filters, setFilters] = useState({
    therapyType: "All",
    gender: "all",
    languages: [] as string[],
    priceRange: [300],
  });

  const filteredProviders = useMemo(() => {
    return MOCK_PROVIDERS.filter((provider) => {
      // Search logic
      const searchTerms = searchQuery.toLowerCase();
      const matchesSearch =
        provider.name.toLowerCase().includes(searchTerms) ||
        provider.title.toLowerCase().includes(searchTerms) ||
        provider.tags.some(tag => tag.toLowerCase().includes(searchTerms));

      if (!matchesSearch) return false;

      // Type Filter
      if (filters.therapyType !== "All" && !provider.therapyTypes.includes(filters.therapyType)) {
        return false;
      }

      // Gender Filter
      if (filters.gender !== "all" && provider.gender !== filters.gender) {
        return false;
      }

      // Language Filter
      if (filters.languages.length > 0 && !filters.languages.some(lang => provider.languages.includes(lang))) {
        return false;
      }

      // Price Filter
      if (provider.price > filters.priceRange[0]) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Sorting logic
      if (sortBy === "highest-rated") {
        return b.rating - a.rating;
      } else if (sortBy === "price-low") {
        return a.price - b.price;
      } else if (sortBy === "price-high") {
        return b.price - a.price;
      } else if (sortBy === "availability") {
        return (AVAILABILITY_ORDER[a.availability as keyof typeof AVAILABILITY_ORDER] ?? 99) -
          (AVAILABILITY_ORDER[b.availability as keyof typeof AVAILABILITY_ORDER] ?? 99);
      }
      return 0;
    });
  }, [searchQuery, sortBy, filters]);

  return (
    <div className="">
      <SearchFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="order-2 md:order-1">
          <h2 className="text-lg md:text-xl font-medium text-muted-foreground">
            Showing <span className="font-bold text-foreground">{filteredProviders.length}</span> therapists in your area
          </h2>
        </div>
        <div className="flex items-center gap-3 order-1 md:order-2 w-full md:w-auto justify-between md:justify-end">
          <span className="text-muted-foreground font-medium whitespace-nowrap">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px] bg-transparent border-none shadow-none font-bold text-foreground focus:ring-0 cursor-pointer text-right md:text-left">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="highest-rated">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="availability">Next Available</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredProviders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
          <p className="text-muted-foreground text-lg">No therapists found matching your criteria.</p>
          <Button
            variant="link"
            onClick={() => {
              setSearchQuery("");
              setFilters({
                therapyType: "All",
                gender: "all",
                languages: [],
                priceRange: [300],
              });
            }}
            className="text-primary mt-2"
          >
            Clear all filters
          </Button>
        </div>
      )}

      {/* Pagination (Mocked for now) */}
      {filteredProviders.length > 0 && (
        <div className="flex items-center justify-center gap-2 md:gap-4 mt-12 pb-12">
          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-white shadow-sm opacity-50 cursor-not-allowed">
            <ChevronLeft size={20} />
          </Button>
          <div className="flex items-center gap-1.5 md:gap-3">
            <Button className="w-10 h-10 rounded-full bg-action hover:bg-action/90 text-white font-bold p-0">1</Button>
            <Button variant="ghost" className="w-10 h-10 rounded-full bg-white shadow-sm font-bold p-0">2</Button>
            <span className="text-muted-foreground px-1">...</span>
          </div>
          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-white shadow-sm">
            <ChevronRight size={20} />
          </Button>
        </div>
      )}
    </div>
  );
}