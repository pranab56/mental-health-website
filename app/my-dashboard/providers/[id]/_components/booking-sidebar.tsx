"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const TIME_SLOTS = [
  "9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM", "6:00 PM"
];

export function BookingSidebar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>("11:30 AM");

  return (
    <Card className="border-none shadow-sm rounded-3xl overflow-hidden sticky top-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h4 className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-1">
              Session Fee
            </h4>
            <p className="text-muted-foreground text-sm">50-minute virtual session</p>
          </div>
          <div className="text-2xl font-bold">$150</div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-sm">Select Date</h4>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <ChevronLeft size={16} />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>

          <div className="flex justify-center bg-muted/20 rounded-2xl p-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="p-0"
              classNames={{
                root: "w-full",
                months: "w-full",
                month: "w-full space-y-4",
                caption: "hidden",
                table: "w-full border-collapse space-y-2",
                head_row: "flex w-full justify-between mb-2",
                head_cell: "text-muted-foreground w-8 font-normal text-[10px] uppercase",
                row: "flex w-full justify-between mt-1",
                cell: "text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                day: "h-8 w-8 p-0 font-medium aria-selected:opacity-100 hover:bg-muted cursor-pointer rounded-full transition-colors flex items-center justify-center",
                day_selected: "bg-action text-white hover:bg-action hover:text-white focus:bg-action focus:text-white rounded-full",
                day_today: "bg-muted text-foreground",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-30 cursor-not-allowed",
              }}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-[10px] tracking-widest text-muted-foreground uppercase">
                Available Slots ({date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) || 'Oct 8'})
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {TIME_SLOTS.slice(0, 4).map((slot) => (
                <Button
                  key={slot}
                  variant="outline"
                  onClick={() => setSelectedSlot(slot)}
                  className={`h-11 border-none transition-all rounded-xl font-bold ${selectedSlot === slot
                    ? "bg-action/10 border border-action text-action-foreground shadow-sm px-4"
                    : "bg-muted/30 hover:bg-muted font-medium"
                    }`}
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>

          <Button
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold flex items-center justify-center gap-2 group transition-all"
            asChild
          >
            <Link href={`/my-dashboard/providers/1/book`}>
              Continue to Booking
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          <p className="text-[10px] text-center text-muted-foreground leading-relaxed px-4">
            You won't be charged yet. We'll verify your insurance in the next step.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
