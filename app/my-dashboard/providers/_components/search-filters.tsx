"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { DollarSign, Filter, Languages as LanguageIcon, Search, User, Users } from "lucide-react";
import { useState } from "react";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: {
    therapyType: string;
    gender: string;
    languages: string[];
    priceRange: number[];
  };
  onFiltersChange: (filters: any) => void;
}

export function SearchFilters({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange
}: SearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApply = () => {
    onFiltersChange(localFilters);
  };

  const handleReset = () => {
    const reset = {
      therapyType: "All",
      gender: "all",
      languages: [],
      priceRange: [50],
    };
    setLocalFilters(reset);
    onFiltersChange(reset);
  };

  const toggleLanguage = (lang: string) => {
    setLocalFilters(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang]
    }));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 bg-white p-3 rounded-2xl shadow-sm border border-gray-50">
      <div className="relative flex-1">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search size={18} />
        </div>
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or specialty..."
          className="pl-11 h-12 md:h-13 border-none bg-background focus:bg-accent/50 transition-colors rounded-xl md:rounded-2xl text-sm md:text-base w-full"
        />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary" className="bg-primary cursor-pointer hover:bg-primary/90 text-white h-12 md:h-13 px-6 md:px-8 rounded-xl md:rounded-2xl gap-2 font-semibold shadow-md shadow-primary/20 shrink-0">
            <Filter size={18} />
            <span>Filter</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
          <div className="p-6 border-b flex items-center justify-between">
            <SheetTitle className="text-xl font-bold">Filters</SheetTitle>
            <Button
              variant="link"
              onClick={handleReset}
              className="text-secondary p-0 h-auto font-medium"
            >
              Reset
            </Button>
          </div>

          <ScrollArea className="flex-1 p-6">
            <div className="space-y-8 pb-8">
              {/* Therapy Type */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <Users size={18} className="text-primary" />
                  Therapy Type
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Individual", "Couple", "Family", "Teen"].map((type) => (
                    <Badge
                      key={type}
                      variant="outline"
                      onClick={() => setLocalFilters(prev => ({ ...prev, therapyType: type }))}
                      className={`h-10 px-4 rounded-xl cursor-pointer border-muted-foreground/20 hover:border-primary transition-colors ${localFilters.therapyType === type ? "bg-primary/10 border-primary text-primary" : "bg-muted/30"
                        }`}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Gender Preference */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <User size={18} className="text-primary" />
                  Gender Preference
                </div>
                <RadioGroup
                  value={localFilters.gender}
                  onValueChange={(val) => setLocalFilters(prev => ({ ...prev, gender: val }))}
                >
                  <div className="space-y-3">
                    {["Female", "Male", "Non-binary"].map((gender) => (
                      <div key={gender} className="flex items-center space-x-3">
                        <RadioGroupItem value={gender.toLowerCase()} id={gender} className="border-muted-foreground/50 text-primary" />
                        <label htmlFor={gender} className="text-sm font-medium leading-none cursor-pointer">
                          {gender}
                        </label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Language */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <LanguageIcon size={18} className="text-primary" />
                  Language
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "English", "French", "Spanish", "Tagalog",
                    "Cantonese", "Punjabi", "Mandarin", "Arabic",
                    "Hindi", "German", "Cree", "Ojibway"
                  ].map((lang) => (
                    <div key={lang} className="flex items-center space-x-3">
                      <Checkbox
                        id={lang}
                        checked={localFilters.languages.includes(lang)}
                        onCheckedChange={() => toggleLanguage(lang)}
                        className="border-muted-foreground/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <label htmlFor={lang} className="text-sm font-medium leading-none cursor-pointer">
                        {lang}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <DollarSign size={18} className="text-primary" />
                  Price Range (Up to)
                </div>
                <div className="pt-2 px-1">
                  <Slider
                    max={300}
                    step={10}
                    value={localFilters.priceRange}
                    onValueChange={(val) => setLocalFilters(prev => ({ ...prev, priceRange: val }))}
                    className="py-4"
                  />
                  <div className="flex justify-between text-sm font-bold mt-2">
                    <span>$0</span>
                    <span>${localFilters.priceRange[0]}+</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="p-6 mt-auto">
            <SheetTrigger asChild>
              <Button
                onClick={handleApply}
                className="w-full h-14 bg-primary hover:bg-primary/90 rounded-2xl font-bold text-base shadow-lg shadow-primary/20"
              >
                Apply Filters
              </Button>
            </SheetTrigger>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
