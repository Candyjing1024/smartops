"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Search, Wrench } from "lucide-react"

export function TroubleshootingForm() {
  const [machineName, setMachineName] = useState("")
  const [faultId, setFaultId] = useState("")
  const [lineNumber, setLineNumber] = useState("")
  const [issueDescription, setIssueDescription] = useState("")

  const handleSearch = () => {
    console.log("Troubleshooting search:", { machineName, faultId, lineNumber, issueDescription })
  }

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-background via-background to-primary/5">
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="glass-effect border-b border-border/30 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-accent/10" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent text-balance animate-in slide-in-from-bottom-4 duration-1000">
                  Troubleshooting
                </h1>
                <p className="text-muted-foreground text-lg">Find solutions for machine issues and faults</p>
              </div>
            </div>
          </div>
        </header>

        {/* Troubleshooting Form */}
        <section className="p-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/2 to-transparent" />
          <div className="max-w-2xl mx-auto relative z-10">
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-8 space-y-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-in slide-in-from-bottom-8 duration-1000 delay-300">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="machine-name">Machine Name</Label>
                  <Input
                    id="machine-name"
                    placeholder="Enter machine name or identifier"
                    value={machineName}
                    onChange={(e) => setMachineName(e.target.value)}
                    className="bg-background/80 backdrop-blur-sm border-border/50 shadow-sm focus:shadow-md transition-all duration-300 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fault-id">Machine Fault ID</Label>
                  <Input
                    id="fault-id"
                    placeholder="Enter fault code or ID"
                    value={faultId}
                    onChange={(e) => setFaultId(e.target.value)}
                    className="bg-background/80 backdrop-blur-sm border-border/50 shadow-sm focus:shadow-md transition-all duration-300 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="line-number">Line Number</Label>
                  <Input
                    id="line-number"
                    placeholder="Enter line number (e.g., 1, 2, 3)"
                    value={lineNumber}
                    onChange={(e) => setLineNumber(e.target.value)}
                    className="bg-background/80 backdrop-blur-sm border-border/50 shadow-sm focus:shadow-md transition-all duration-300 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issue-description">Issue Description</Label>
                  <Textarea
                    id="issue-description"
                    placeholder="Describe the issue in detail..."
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    className="bg-background/80 backdrop-blur-sm border-border/50 shadow-sm focus:shadow-md transition-all duration-300 rounded-lg min-h-[120px]"
                  />
                </div>
              </div>

              <Button
                onClick={handleSearch}
                className="w-full bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl h-12"
                size="lg"
              >
                <Search className="h-4 w-4 mr-2" />
                Search Solutions
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
