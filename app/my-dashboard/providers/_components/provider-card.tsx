"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Provider {
  id: string;
  name: string;
  title: string;
  image: string;
  tags: string[];
  description: string;
  price: number;
  availability: string;
  isTop?: boolean;
}

interface ProviderCardProps {
  provider: Provider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-5">
          <div className="flex gap-3 sm:gap-4 mb-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
              <Image
                src={provider.image}
                alt={provider.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-lg text-foreground truncate">
                    {provider.name}
                  </h3>
                  <p className="text-secondary font-medium text-sm">
                    {provider.title}
                  </p>
                </div>
                {provider.isTop && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-xs px-2 py-0">
                    Top
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {provider.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="bg-muted text-[10px] font-bold tracking-wider border-none px-2 py-0"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {provider.description}
          </p>

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-lg">${provider.price}</span>
              <span className="text-muted-foreground text-sm">/ Session</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-muted-foreground text-xs font-medium">
                {provider.availability}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="border-primary cursor-pointer text-primary hover:bg-primary/5 rounded-lg h-11" asChild>
              <Link href={`/my-dashboard/providers/${provider.id}`}>
                View Profile
              </Link>
            </Button>
            <Button className="bg-primary cursor-pointer hover:bg-primary/90 text-white rounded-lg h-11" asChild>
              <Link href={`/my-dashboard/providers/${provider.id}/book`}>
                Book Now
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
