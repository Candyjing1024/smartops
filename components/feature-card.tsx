"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  onClick?: () => void
}

export function FeatureCard({ icon: Icon, title, description, onClick }: FeatureCardProps) {
  return (
    <Card
      className="cursor-pointer card-hover bg-card border-border/50 shadow-lg hover:shadow-xl backdrop-blur-sm relative overflow-hidden group"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardContent className="p-6 text-center space-y-4 relative z-10">
        <div className="flex justify-center">
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 shadow-inner group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
            <Icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-300" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
