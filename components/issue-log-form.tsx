"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Mic, MicOff, Upload, X, FileText } from "lucide-react"

export function IssueLogForm() {
  const [formData, setFormData] = useState({
    date: "",
    issueStartDate: "",
    status: "Open",
    owner: "",
    background: "",
    rootCauses: "",
    countermeasures: "",
    stakeholderDiscussion: "",
    lineNumber: "",
    machineName: "",
    keyWords: "", // Changed from title to keyWords
  })

  const [isRecording, setIsRecording] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [loggingHistory, setLoggingHistory] = useState([
    {
      date: new Date().toLocaleDateString(),
      action: "Issue created",
      user: "System",
      details: "Initial issue log entry created",
    },
  ])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Add to logging history
    setLoggingHistory((prev) => [
      ...prev,
      {
        date: new Date().toLocaleDateString(),
        action: `Updated ${field}`,
        user: formData.owner || "User",
        details: `Changed ${field} to: ${value.substring(0, 50)}${value.length > 50 ? "..." : ""}`,
      },
    ])
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: BlobPart[] = []
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" })
        // In a real implementation, you would send this to a speech-to-text service
        console.log("[v0] Audio recorded:", blob)
        handleInputChange("background", formData.background + " [Voice recording processed]")
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("[v0] Error starting recording:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
      setIsRecording(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])

    setLoggingHistory((prev) => [
      ...prev,
      {
        date: new Date().toLocaleDateString(),
        action: "Files uploaded",
        user: formData.owner || "User",
        details: `Uploaded ${files.length} file(s): ${files.map((f) => f.name).join(", ")}`,
      },
    ])
  }

  const removeFile = (index: number) => {
    const fileName = uploadedFiles[index].name
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))

    setLoggingHistory((prev) => [
      ...prev,
      {
        date: new Date().toLocaleDateString(),
        action: "File removed",
        user: formData.owner || "User",
        details: `Removed file: ${fileName}`,
      },
    ])
  }

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-background via-background to-primary/5">
      <header className="glass-effect border-b border-border/30 p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-accent/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent text-balance animate-in slide-in-from-bottom-4 duration-1000">
              Issue Log
            </h1>
            <p className="text-muted-foreground text-lg">Document and track issue resolution process</p>
          </div>
        </div>
      </header>

      <section className="p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/2 to-transparent" />
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 animate-in slide-in-from-bottom-8 duration-1000 delay-300">
            <CardHeader className="bg-gradient-to-r from-primary to-accent text-white rounded-t-lg">
              <CardTitle className="text-xl">Issue Log</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-2">
                  <Label htmlFor="lineNumber" className="text-sm font-medium">
                    Line Number
                  </Label>
                  <Input
                    id="lineNumber"
                    placeholder="Enter line number (e.g., Line 1, Line 2)"
                    value={formData.lineNumber}
                    onChange={(e) => handleInputChange("lineNumber", e.target.value)}
                    className="bg-background/80 backdrop-blur-sm border-border/50 shadow-sm focus:shadow-md transition-all duration-300 rounded-lg h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="machineName" className="text-sm font-medium">
                    Machine Name
                  </Label>
                  <Input
                    id="machineName"
                    placeholder="Enter machine name or ID"
                    value={formData.machineName}
                    onChange={(e) => handleInputChange("machineName", e.target.value)}
                    className="bg-background/80 backdrop-blur-sm border-border/50 shadow-sm focus:shadow-md transition-all duration-300 rounded-lg h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keyWords" className="text-sm font-medium">
                    Key Words
                  </Label>
                  <Input
                    id="keyWords"
                    placeholder="Enter key words or tags"
                    value={formData.keyWords}
                    onChange={(e) => handleInputChange("keyWords", e.target.value)}
                    className="bg-background/80 backdrop-blur-sm border-border/50 shadow-sm focus:shadow-md transition-all duration-300 rounded-lg h-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="bg-background/80 backdrop-blur-sm border-border/50 shadow-sm focus:shadow-md transition-all duration-300 rounded-lg h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issueStartDate" className="text-sm font-medium">
                    Issue Start Date
                  </Label>
                  <Input
                    id="issueStartDate"
                    type="date"
                    value={formData.issueStartDate}
                    onChange={(e) => handleInputChange("issueStartDate", e.target.value)}
                    className="bg-background/80 backdrop-blur-sm border-border/50 shadow-sm focus:shadow-md transition-all duration-300 rounded-lg h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-medium">
                    Status
                  </Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger className="bg-background/80 backdrop-blur-sm border-border/50 shadow-sm focus:shadow-md transition-all duration-300 rounded-lg h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In-Progress">In-Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner" className="text-sm font-medium">
                    Owner
                  </Label>
                  <Input
                    id="owner"
                    placeholder="Enter owner name"
                    value={formData.owner}
                    onChange={(e) => handleInputChange("owner", e.target.value)}
                    className="bg-background/80 backdrop-blur-sm border-border/50 shadow-sm focus:shadow-md transition-all duration-300 rounded-lg h-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 animate-in slide-in-from-bottom-8 duration-1000 delay-500">
            <CardHeader className="bg-gradient-to-r from-primary to-accent text-white">
              <CardTitle className="text-lg">Background</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="background">Description</Label>
                  <Button
                    type="button"
                    variant={isRecording ? "destructive" : "outline"}
                    size="sm"
                    onClick={isRecording ? stopRecording : startRecording}
                    className="flex items-center gap-1 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    {isRecording ? "Stop Recording" : "Voice to Text"}
                  </Button>
                </div>
                <Textarea
                  id="background"
                  placeholder="Describe the background of the issue..."
                  value={formData.background}
                  onChange={(e) => handleInputChange("background", e.target.value)}
                  className="min-h-[120px] bg-background/80 backdrop-blur-sm border-border/50 shadow-sm focus:shadow-md transition-all duration-300 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label>Upload Pictures</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Files
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Uploaded Files:</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-muted/80 backdrop-blur-sm rounded-lg shadow-sm"
                        >
                          <span className="text-sm truncate">{file.name}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 animate-in slide-in-from-left-8 duration-1000 delay-700 h-fit">
                <CardHeader className="bg-gradient-to-r from-primary to-accent text-white">
                  <CardTitle className="text-lg">Identify Root Causes</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Textarea
                    placeholder="Identify and describe the root causes..."
                    value={formData.rootCauses}
                    onChange={(e) => handleInputChange("rootCauses", e.target.value)}
                    className="min-h-[120px] bg-background/80 backdrop-blur-sm border-border/50 shadow-sm focus:shadow-md transition-all duration-300 rounded-lg resize-none"
                  />
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 animate-in slide-in-from-left-8 duration-1000 delay-900 h-fit">
                <CardHeader className="bg-gradient-to-r from-primary to-accent text-white">
                  <CardTitle className="text-lg">Develop Countermeasures</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Textarea
                    placeholder="Describe the countermeasures and corrective actions..."
                    value={formData.countermeasures}
                    onChange={(e) => handleInputChange("countermeasures", e.target.value)}
                    className="min-h-[120px] bg-background/80 backdrop-blur-sm border-border/50 shadow-sm focus:shadow-md transition-all duration-300 rounded-lg resize-none"
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 animate-in slide-in-from-right-8 duration-1000 delay-700 h-fit">
                <CardHeader className="bg-gradient-to-r from-primary to-accent text-white">
                  <CardTitle className="text-lg">Stakeholder Discussion and Agreement</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Textarea
                    placeholder="Document stakeholder discussions and agreements..."
                    value={formData.stakeholderDiscussion}
                    onChange={(e) => handleInputChange("stakeholderDiscussion", e.target.value)}
                    className="min-h-[120px] bg-background/80 backdrop-blur-sm border-border/50 shadow-sm focus:shadow-md transition-all duration-300 rounded-lg resize-none"
                  />
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 animate-in slide-in-from-right-8 duration-1000 delay-900 h-fit">
                <CardHeader className="bg-gradient-to-r from-primary to-accent text-white">
                  <CardTitle className="text-lg">Update Logging History</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3 max-h-[280px] overflow-y-auto">
                    {loggingHistory.map((entry, index) => (
                      <div
                        key={index}
                        className="p-3 bg-muted/80 backdrop-blur-sm rounded-lg text-sm shadow-sm border border-border/30"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-foreground">{entry.action}</span>
                          <span className="text-xs text-muted-foreground">{entry.date}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mb-1">By: {entry.user}</div>
                        <div className="text-xs text-foreground/80">{entry.details}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
