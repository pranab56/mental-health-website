"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { addMonths } from "date-fns";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const TIME_SLOTS = [
  "9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM", "6:00 PM"
];

export function BookingSidebar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>("11:30 AM");

  const handlePrevMonth = () => setMonth(addMonths(month, -1));
  const handleNextMonth = () => setMonth(addMonths(month, 1));

  return (
    <Card className="border border-gray-100 shadow-sm overflow-hidden sticky top-8 animate-in fade-in slide-in-from-right-4 duration-500 w-full max-w-full">
      {/* Session Fee Header */}
      <div className="bg-[#F1F9F9] p-6 flex justify-between items-center">
        <div className="space-y-1">
          <h4 className="text-[11px] font-bold tracking-widest text-[#4B5563] uppercase">
            SESSION FEE
          </h4>
          <p className="text-[#6B7280] text-sm">50-minute virtual session</p>
        </div>
        <div className="text-[28px] font-bold text-[#111827]">$150</div>
      </div>

      <CardContent className="p-6 space-y-8">
        {/* Date Selection */}
        <div className="space-y-4 w-full">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-[#111827] text-base">Select Date</h4>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#111827] hover:bg-transparent"
                onClick={handlePrevMonth}
              >
                <ChevronLeft size={18} strokeWidth={2.5} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#111827] hover:bg-transparent"
                onClick={handleNextMonth}
              >
                <ChevronRight size={18} strokeWidth={2.5} />
              </Button>
            </div>
          </div>

          <div className="flex justify-center w-full">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              month={month}
              onMonthChange={setMonth}
              hideNavigation
              className="p-0 w-full"
              classNames={{
                root: "w-full",
                months: "w-full",
                month: "w-full space-y-4",
                month_caption: "flex items-center justify-center h-10 w-full text-sm font-bold text-[#111827] mb-4",
                table: "w-full !border-collapse",
                month_grid: "w-full !border-collapse",
                weekdays: "grid grid-cols-7 w-full mb-4",
                weekday: "text-[#9CA3AF] font-medium text-xs text-center",
                week: "grid grid-cols-7 w-full mb-2",
                day: "flex justify-center items-center relative h-10 p-0",
                day_button: "h-10 w-10 p-0 font-medium text-[#111827] hover:bg-[#F3F4F6] cursor-pointer rounded-full transition-colors flex items-center justify-center",
                day_selected: "!bg-[#6BB9BA] !text-white hover:!bg-[#6BB9BA] hover:!text-white focus:!bg-[#6BB9BA] focus:!text-white",
                day_today: "bg-[#F3F4F6] text-[#111827]",
                day_outside: "text-[#D1D5DB] opacity-100",
                day_disabled: "text-gray-300 opacity-30 cursor-not-allowed",
              }}
            />
          </div>
        </div>

        {/* Available Slots */}
        <div className="space-y-4">
          <h4 className="font-bold text-[11px] tracking-widest text-[#6B7280] uppercase">
            AVAILABLE SLOTS ({date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toLowerCase() || 'oct 8'})
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {TIME_SLOTS.slice(0, 4).map((slot) => (
              <Button
                key={slot}
                variant="ghost"
                onClick={() => setSelectedSlot(slot)}
                className={cn(
                  "h-12 w-full transition-all rounded-xl font-bold text-sm",
                  selectedSlot === slot
                    ? "bg-[#F0F9F9] border border-[#6BB9BA] text-[#111827]"
                    : "bg-[#F8F8FC] text-[#6B7280] hover:bg-gray-100"
                )}
              >
                {slot}
              </Button>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="space-y-4 pt-2">
          <Button
            className="w-full h-[56px] bg-[#9B85C1] hover:bg-[#8A74AF] text-white rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-colors shadow-none"
            asChild
          >
            <Link href={`/my-dashboard/providers/1/book`}>
              Continue to Booking
              <ArrowRight size={20} strokeWidth={2.5} />
            </Link>
          </Button>

          <p className="text-[11px] text-center text-[#6B7280] leading-relaxed px-4">
            You won&apos;t be charged yet. We&apos;ll verify your insurance in the next step.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
