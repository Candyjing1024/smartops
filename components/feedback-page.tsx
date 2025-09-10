"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input, Textarea } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Send, CheckCircle, MessageSquare, ThumbsUp, Lightbulb } from "lucide-react"

const feedbackCategories = [
  { value: "content", label: "Content Quality", icon: ThumbsUp },
  { value: "usability", label: "Usability", icon: MessageSquare },
  { value: "suggestions", label: "Suggestions", icon: Lightbulb },
  { value: "technical", label: "Technical Issues", icon: Star },
  { value: "general", label: "General Feedback", icon: MessageSquare },
]

export function FeedbackPage() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [category, setCategory] = useState("")
  const [subject, setSubject] = useState("")
  const [feedback, setFeedback] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Feedback submitted:", { rating, category, subject, feedback })
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setRating(0)
      setCategory("")
      setSubject("")
      setFeedback("")
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <main className="flex-1 overflow-auto bg-gradient-to-br from-background via-background to-primary/5">
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />

          <Card className="glass-effect border-border/30 shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-500">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">Thank You!</h3>
                <p className="text-muted-foreground">
                  Your feedback has been submitted successfully. We appreciate your input to help improve our Knowledge
                  Hub.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 overflow-auto bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="glass-effect border-b border-border/30 p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-accent/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent text-balance">
              Feedback Portal
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
              Help us improve the Knowledge Hub by sharing your thoughts, suggestions, and experiences
            </p>
          </div>
        </div>
      </header>

      {/* Feedback Form */}
      <section className="p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/2 to-transparent" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Card className="glass-effect border-border/30 shadow-2xl animate-in slide-in-from-bottom-8 duration-1000 delay-300">
            <CardHeader className="bg-gradient-to-r from-primary to-accent text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <MessageSquare className="h-6 w-6" />
                Share Your Feedback
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Your input helps us create a better experience for everyone
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Rating Section */}
                <div className="space-y-4">
                  <label className="text-lg font-semibold text-foreground">Overall Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="transition-all duration-200 hover:scale-110"
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setRating(star)}
                      >
                        <Star
                          className={`h-8 w-8 transition-colors duration-200 ${
                            star <= (hoveredRating || rating)
                              ? "fill-accent text-accent"
                              : "text-muted-foreground hover:text-accent/50"
                          }`}
                        />
                      </button>
                    ))}
                    {rating > 0 && <span className="ml-4 text-sm text-muted-foreground">{rating} out of 5 stars</span>}
                  </div>
                </div>

                {/* Category Selection */}
                <div className="space-y-4">
                  <label className="text-lg font-semibold text-foreground">Feedback Category</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {feedbackCategories.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setCategory(cat.value)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:scale-105 ${
                          category === cat.value
                            ? "border-primary bg-primary/10 shadow-lg"
                            : "border-border hover:border-primary/50 bg-card"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <cat.icon
                            className={`h-5 w-5 ${category === cat.value ? "text-primary" : "text-muted-foreground"}`}
                          />
                          <span
                            className={`font-medium ${category === cat.value ? "text-primary" : "text-foreground"}`}
                          >
                            {cat.label}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-4">
                  <label className="text-lg font-semibold text-foreground">Subject</label>
                  <Input
                    placeholder="Brief summary of your feedback..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="h-12 bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary transition-all duration-300"
                    required
                  />
                </div>

                {/* Detailed Feedback */}
                <div className="space-y-4">
                  <label className="text-lg font-semibold text-foreground">Detailed Feedback</label>
                  <Textarea
                    placeholder="Share your thoughts, suggestions, or describe any issues you've encountered..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-32 bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary transition-all duration-300 resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="px-8 py-3 bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                    disabled={!rating || !category || !subject || !feedback}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
