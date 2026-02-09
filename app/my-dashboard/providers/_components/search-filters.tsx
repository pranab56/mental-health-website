"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { DollarSign, Filter, Languages as LanguageIcon, Search, User, Users } from "lucide-react";
import { useEffect, useState } from "react";

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

  // Sync local filters with props when they change externally
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

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
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6 bg-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-sm border border-gray-50">
      {/* Search Input - Responsive */}
      <div className="relative flex-1 w-full">
        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
        </div>
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or specialty..."
          className="pl-9 sm:pl-11 h-10 sm:h-12 md:h-13 lg:h-13 border-none bg-background focus:bg-accent/50 transition-colors rounded-lg sm:rounded-xl md:rounded-2xl text-xs sm:text-sm md:text-base w-full"
        />
      </div>

      {/* Filter Button - Responsive */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="secondary"
            className="bg-primary cursor-pointer hover:bg-primary/90 text-white h-10 sm:h-12 md:h-13 lg:h-13 px-4 sm:px-6 md:px-8 rounded-lg sm:rounded-xl md:rounded-2xl gap-1.5 sm:gap-2 font-semibold shadow-md shadow-primary/20 shrink-0 w-full sm:w-auto text-xs sm:text-sm md:text-base"
          >
            <Filter className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            <span>Filter</span>
          </Button>
        </SheetTrigger>

        {/* Filter Sheet - Responsive */}
        <SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-full max-h-screen">
          {/* Header - Responsive - Fixed at top */}
          <div className="p-4 sm:p-5 md:p-6 border-b flex items-center justify-between shrink-0">
            <SheetTitle className="text-lg sm:text-xl font-bold">Filters</SheetTitle>
            <Button
              variant="link"
              onClick={handleReset}
              className="text-secondary p-0 h-auto font-medium text-sm sm:text-base hover:underline"
            >
              Reset
            </Button>
          </div>

          {/* Scrollable Filter Content - Responsive - Takes remaining space */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="p-4 sm:p-5 md:p-6 space-y-6 sm:space-y-7 md:space-y-8">

              {/* Therapy Type - Responsive */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 font-semibold text-foreground text-sm sm:text-base">
                  <Users className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-primary" />
                  Therapy Type
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Individual", "Couple", "Family", "Teen"].map((type) => (
                    <Badge
                      key={type}
                      variant="outline"
                      onClick={() => setLocalFilters(prev => ({ ...prev, therapyType: type }))}
                      className={`h-8 sm:h-9 md:h-10 px-3 sm:px-4 rounded-lg sm:rounded-xl cursor-pointer border-muted-foreground/20 hover:border-primary transition-colors text-xs sm:text-sm ${localFilters.therapyType === type
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-muted/30"
                        }`}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Gender Preference - Responsive */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 font-semibold text-foreground text-sm sm:text-base">
                  <User className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-primary" />
                  Gender Preference
                </div>
                <RadioGroup
                  value={localFilters.gender}
                  onValueChange={(val) => setLocalFilters(prev => ({ ...prev, gender: val }))}
                >
                  <div className="space-y-2.5 sm:space-y-3">
                    {["Female", "Male", "Non-binary"].map((gender) => (
                      <div key={gender} className="flex items-center space-x-2.5 sm:space-x-3">
                        <RadioGroupItem
                          value={gender.toLowerCase()}
                          id={gender}
                          className="border-muted-foreground/50 text-primary w-4 h-4 sm:w-5 sm:h-5"
                        />
                        <label
                          htmlFor={gender}
                          className="text-xs sm:text-sm font-medium leading-none cursor-pointer"
                        >
                          {gender}
                        </label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Language - Responsive */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 font-semibold text-foreground text-sm sm:text-base">
                  <LanguageIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-primary" />
                  Language
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {[
                    "English", "French", "Spanish", "Tagalog",
                    "Cantonese", "Punjabi", "Mandarin", "Arabic",
                    "Hindi", "German", "Cree", "Ojibway"
                  ].map((lang) => (
                    <div key={lang} className="flex items-center space-x-2.5 sm:space-x-3">
                      <Checkbox
                        id={lang}
                        checked={localFilters.languages.includes(lang)}
                        onCheckedChange={() => toggleLanguage(lang)}
                        className="border-muted-foreground/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary w-4 h-4 sm:w-5 sm:h-5"
                      />
                      <label
                        htmlFor={lang}
                        className="text-xs sm:text-sm font-medium leading-none cursor-pointer"
                      >
                        {lang}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range - Responsive */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 font-semibold text-foreground text-sm sm:text-base">
                  <DollarSign className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-primary" />
                  Price Range (Up to)
                </div>
                <div className="pt-2 px-1 pb-4">
                  <Slider
                    max={300}
                    step={10}
                    value={localFilters.priceRange}
                    onValueChange={(val) => setLocalFilters(prev => ({ ...prev, priceRange: val }))}
                    className="py-3 sm:py-4"
                  />
                  <div className="flex justify-between text-xs sm:text-sm font-bold mt-2">
                    <span>$0</span>
                    <span>${localFilters.priceRange[0]}+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Apply Button - Responsive - Fixed at bottom */}
          <div className="p-4 sm:p-5 md:p-6 border-t bg-background shrink-0">
            <SheetTrigger asChild>
              <Button
                onClick={handleApply}
                className="w-full h-12 sm:h-13 md:h-14 bg-primary hover:bg-primary/90 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base shadow-lg shadow-primary/20"
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
