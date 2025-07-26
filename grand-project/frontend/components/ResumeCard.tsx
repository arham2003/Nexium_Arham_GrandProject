"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
}

export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <Link
      href={href || "#"}
      className="block cursor-pointer"
      onClick={handleClick}
      target="_blank"
    >
      <Card className="flex items-left gap-4 p-4 bg-gray-100">
        {/* Logo */}
        <Avatar className="size-12 border bg-black dark:bg-foreground">
          <AvatarImage src={logoUrl} alt={altText} className="object-contain" />
          <AvatarFallback>{altText[0]}</AvatarFallback>
        </Avatar>

        {/* Text + Period */}
        <div className="flex flex-1 items-center justify-between gap-4">
          {/* Title, subtitle, badges */}
          <div className="flex flex-col">
            <h3 className="text-sm font-bold leading-tight flex items-left gap-1">
              {title}
              {badges && (
                <span className="inline-flex gap-x-1">
                  {badges.map((badge, index) => (
                    <Badge
                      variant="secondary"
                      className="align-middle text-xs"
                      key={index}
                    >
                      {badge}
                    </Badge>
                  ))}
                </span>
              )}
              {description && (
                <ChevronRightIcon
                  className={cn(
                    "size-4 ml-1 transition-transform",
                    isExpanded ? "rotate-90" : "rotate-0"
                  )}
                />
              )}
            </h3>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>

          {/* Period */}
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {period}
          </span>
        </div>
      </Card>
    </Link>
  );
};
