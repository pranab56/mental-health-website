"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  ShieldCheck,
  Video
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const TIME_SLOTS = ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"];

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string>("11:30 AM");
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-foreground">Confirm Booking</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Section */}
          <div className="bg-white p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg">Booking Summary</h2>
              <span className="text-secondary font-bold text-sm bg-secondary/10 px-3 py-1 rounded-full">65% Completed</span>
            </div>
            <p className="text-sm font-medium text-muted-foreground">Booking Summary</p>
            <Progress value={65} className="h-2.5 bg-muted [&>div]:bg-secondary" />
          </div>

          {/* Date & Time Selection */}
          <div className="bg-white p-8 rounded-3xl space-y-6 ">
            <h2 className="text-xl font-bold">Select Date & Time</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 ">
                <div className="flex items-center justify-between text-sm font-bold">
                  <span>Select Date</span>
                  <div className="flex gap-2">
                    <ChevronLeft size={18} className="text-muted-foreground cursor-pointer" />
                    <ChevronRight size={18} className="text-muted-foreground cursor-pointer" />
                  </div>
                </div>
                <div className="bg-muted/30 p-4 rounded-3xl w-full flex justify-center ">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="p-0 pointer-events-none opacity-50 w-full" // Placeholder style like image
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                  Available Slots (Oct 8)
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {TIME_SLOTS.map((slot) => (
                    <Button
                      key={slot}
                      variant="outline"
                      onClick={() => setSelectedSlot(slot)}
                      className={`h-12 border-none transition-all rounded-xl cursor-pointer font-bold ${selectedSlot === slot
                        ? "bg-action/10 border border-action text-action "
                        : "bg-muted/30 hover:bg-muted font-medium"
                        }`}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-8 rounded-3xl space-y-6">
            <h2 className="text-xl font-bold">Payment Method</h2>
            <RadioGroup defaultValue="card" className="grid grid-cols-1 md:grid-cols-3 gap-4" onValueChange={setPaymentMethod}>
              <div className={`relative px-6 py-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center gap-2 ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-transparent bg-muted/20'}`}>
                <RadioGroupItem value="card" id="card" className="absolute right-4 top-4" />
                <CreditCard className={paymentMethod === 'card' ? 'text-primary' : 'text-muted-foreground'} size={24} />
                <label htmlFor="card" className="font-bold text-sm cursor-pointer">Credit Card</label>
              </div>
              <div className={`relative px-6 py-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center gap-2 ${paymentMethod === 'insurance' ? 'border-primary bg-primary/5' : 'border-transparent bg-muted/20'}`}>
                <RadioGroupItem value="insurance" id="insurance" className="absolute right-4 top-4" />
                <ShieldCheck className={paymentMethod === 'insurance' ? 'text-primary' : 'text-muted-foreground'} size={24} />
                <label htmlFor="insurance" className="font-bold text-sm cursor-pointer">Insurance</label>
              </div>
              <div className={`relative px-6 py-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center gap-2 ${paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-transparent bg-muted/20'}`}>
                <RadioGroupItem value="paypal" id="paypal" className="absolute right-4 top-4" />
                <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" width={24} height={24} alt="Paypal" className="grayscale opacity-50" />
                <label htmlFor="paypal" className="font-bold text-sm cursor-pointer">Paypal</label>
              </div>
            </RadioGroup>


          </div>
        </div>

        <div className="space-y-8">
          {/* Provider Summary */}
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden p-6">
            <div className="flex gap-4 items-center">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"
                  alt="Dr. Sarah Jenkins"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Dr. Sarah Jenkins, PsyD</h3>
                <p className="text-secondary text-xs font-medium">Clinical Psychologist</p>
                <Badge variant="secondary" className="mt-1 bg-primary/10 text-primary border-none text-[10px] px-2 py-0">Top</Badge>
              </div>
            </div>

            <div className="mt-6 space-y-4 pt-6 border-t border-dashed">
              <div className="flex gap-3 text-sm font-medium">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <CalendarIcon size={16} />
                </div>
                <div>
                  <p className="text-foreground">Thursday, Oct 8, 2023</p>
                  <p className="text-muted-foreground text-xs">09:00 AM-09:50 AM (50 min)</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm font-medium">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Video size={16} />
                </div>
                <div>
                  <p className="text-foreground">Online Video Call</p>
                  <p className="text-muted-foreground text-xs">Secure HIPAA link via email</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Order Summary */}
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden p-6 space-y-6">
            <h3 className="font-bold text-lg">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-muted-foreground">Initial Consultation</span>
                <span>$150.00</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span className="text-muted-foreground">Processing Fee</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t">
                <span className="font-bold text-lg">Total Amount</span>
                <span className="text-secondary font-bold text-xl">$155.00</span>
              </div>
            </div>

            <Button className="flex items-center cursor-pointer justify-center w-full  h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold  gap-2 group asChild">
              <Link href={`/my-dashboard/providers/1/book/success`}>
                <span className='flex items-center justify-center gap-2'>Continue to Booking  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>

              </Link>
            </Button>

            <p className="text-[15px] text-center text-muted-foreground leading-relaxed px-4">
              You won&apos;t be charged yet. We&apos;ll verify your insurance in the next step.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
