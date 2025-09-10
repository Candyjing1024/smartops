"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Input, Textarea } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Search, Mic, MicOff, Upload, X } from "lucide-react"

export function MaintenanceLogging() {
  const [activeTab, setActiveTab] = useState("create")
  const [searchFilters, setSearchFilters] = useState({
    machine: "",
    line: "",
    dateFrom: "",
    dateTo: "",
    status: "All Status", // Updated default value to be a non-empty string
  })

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
    keyWords: "",
  })

  const [isRecording, setIsRecording] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [loggingHistory, setLoggingHistory] = useState([
    {
      date: new Date().toLocaleDateString(),
      action: "Issue created",
      user: "System",
      details: "Initial maintenance log entry created",
    },
  ])

  // Mock search results
  const [searchResults] = useState([
    {
      id: "ML001",
      machine: "Accumulator 2",
      line: "Line 2",
      date: "2024-11-15",
      status: "Resolved",
      owner: "Pinesoo",
      keyWords: "Broken Shaft, Conveyor",
    },
    {
      id: "ML002",
      machine: "Packaging Unit 1",
      line: "Line 1",
      date: "2024-11-10",
      status: "In-Progress",
      owner: "Fatah",
      keyWords: "Sensor Malfunction, Quality",
    },
    {
      id: "ML003",
      machine: "Filling Station 3",
      line: "Line 3",
      date: "2024-11-08",
      status: "Open",
      owner: "Ilya",
      keyWords: "Leak Detection, Maintenance",
    },
  ])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

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

  const handleSearchFilterChange = (field: string, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [field]: value }))
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

  const filteredResults = searchResults.filter((result) => {
    return (
      (!searchFilters.machine || result.machine.toLowerCase().includes(searchFilters.machine.toLowerCase())) &&
      (!searchFilters.line || result.line.toLowerCase().includes(searchFilters.line.toLowerCase())) &&
      (!searchFilters.status || result.status === searchFilters.status)
    )
  })

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
              Maintenance Logging
            </h1>
            <p className="text-muted-foreground text-lg">Document and track maintenance resolution process</p>
          </div>
        </div>
      </header>

      <section className="p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/2 to-transparent" />
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg">
              <TabsTrigger value="create" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Create Log
              </TabsTrigger>
              <TabsTrigger value="search" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Search Logs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-primary to-accent text-white rounded-t-lg">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Search Maintenance Logs
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="searchMachine">Machine</Label>
                      <Input
                        id="searchMachine"
                        placeholder="Enter machine name"
                        value={searchFilters.machine}
                        onChange={(e) => handleSearchFilterChange("machine", e.target.value)}
                        className="bg-background/80 backdrop-blur-sm border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="searchLine">Line</Label>
                      <Input
                        id="searchLine"
                        placeholder="Enter line number"
                        value={searchFilters.line}
                        onChange={(e) => handleSearchFilterChange("line", e.target.value)}
                        className="bg-background/80 backdrop-blur-sm border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="searchDateFrom">Date From</Label>
                      <Input
                        id="searchDateFrom"
                        type="date"
                        value={searchFilters.dateFrom}
                        onChange={(e) => handleSearchFilterChange("dateFrom", e.target.value)}
                        className="bg-background/80 backdrop-blur-sm border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="searchDateTo">Date To</Label>
                      <Input
                        id="searchDateTo"
                        type="date"
                        value={searchFilters.dateTo}
                        onChange={(e) => handleSearchFilterChange("dateTo", e.target.value)}
                        className="bg-background/80 backdrop-blur-sm border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="searchStatus">Status</Label>
                      <Select
                        value={searchFilters.status}
                        onValueChange={(value) => handleSearchFilterChange("status", value)}
                      >
                        <SelectTrigger className="bg-background/80 backdrop-blur-sm border-border/50">
                          <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Status">All Status</SelectItem>
                          <SelectItem value="Open">Open</SelectItem>
                          <SelectItem value="In-Progress">In-Progress</SelectItem>
                          <SelectItem value="Resolved">Resolved</SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Search Results ({filteredResults.length})</h3>
                    </div>
                    <div className="grid gap-4">
                      {filteredResults.map((result) => (
                        <Card
                          key={result.id}
                          className="bg-background/60 backdrop-blur-sm border-border/30 hover:shadow-md transition-all duration-300"
                        >
                          <CardContent className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                              <div>
                                <Label className="text-xs text-muted-foreground">ID</Label>
                                <p className="font-medium">{result.id}</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">Machine</Label>
                                <p className="font-medium">{result.machine}</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">Line</Label>
                                <p className="font-medium">{result.line}</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">Date</Label>
                                <p className="font-medium">{result.date}</p>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">Status</Label>
                                <span
                                  className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                    result.status === "Resolved"
                                      ? "bg-green-100 text-green-800"
                                      : result.status === "In-Progress"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {result.status}
                                </span>
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">Owner</Label>
                                <p className="font-medium">{result.owner}</p>
                              </div>
                            </div>
                            <div className="mt-2">
                              <Label className="text-xs text-muted-foreground">Key Words</Label>
                              <p className="text-sm text-muted-foreground">{result.keyWords}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="create" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-primary to-accent text-white rounded-t-lg">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Create Maintenance Log
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Top Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lineNumber">Line Number</Label>
                      <Input
                        id="lineNumber"
                        placeholder="Enter line number"
                        value={formData.lineNumber}
                        onChange={(e) => handleInputChange("lineNumber", e.target.value)}
                        className="h-12 bg-background/80 backdrop-blur-sm border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="machineName">Machine Name</Label>
                      <Input
                        id="machineName"
                        placeholder="Enter machine name"
                        value={formData.machineName}
                        onChange={(e) => handleInputChange("machineName", e.target.value)}
                        className="h-12 bg-background/80 backdrop-blur-sm border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="keyWords">Key Words</Label>
                      <Input
                        id="keyWords"
                        placeholder="Enter key words"
                        value={formData.keyWords}
                        onChange={(e) => handleInputChange("keyWords", e.target.value)}
                        className="h-12 bg-background/80 backdrop-blur-sm border-border/50"
                      />
                    </div>
                  </div>

                  {/* Date and Status Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        className="h-12 bg-background/80 backdrop-blur-sm border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="issueStartDate">Issue Start Date</Label>
                      <Input
                        id="issueStartDate"
                        type="date"
                        value={formData.issueStartDate}
                        onChange={(e) => handleInputChange("issueStartDate", e.target.value)}
                        className="h-12 bg-background/80 backdrop-blur-sm border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                        <SelectTrigger className="h-12 bg-background/80 backdrop-blur-sm border-border/50">
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
                      <Label htmlFor="owner">Owner</Label>
                      <Input
                        id="owner"
                        placeholder="Enter owner name"
                        value={formData.owner}
                        onChange={(e) => handleInputChange("owner", e.target.value)}
                        className="h-12 bg-background/80 backdrop-blur-sm border-border/50"
                      />
                    </div>
                  </div>

                  {/* Background Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="background" className="text-lg font-semibold">
                        Background
                      </Label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className={`flex items-center gap-2 ${isRecording ? "bg-destructive text-white" : "bg-primary hover:bg-primary/90 text-white"}`}
                          onClick={isRecording ? stopRecording : startRecording}
                        >
                          {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                          {isRecording ? "Stop Recording" : "Voice to Text"}
                        </button>
                        <button
                          type="button"
                          className="bg-primary hover:bg-primary/90 text-white px-8 py-2"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="h-4 w-4" />
                          Upload Pictures
                        </button>
                      </div>
                    </div>
                    <Textarea
                      id="background"
                      placeholder="Describe the background and details of the issue..."
                      value={formData.background}
                      onChange={(e) => handleInputChange("background", e.target.value)}
                      className="min-h-32 bg-background/80 backdrop-blur-sm border-border/50 resize-none"
                    />
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Uploaded Files:</Label>
                        <div className="flex flex-wrap gap-2">
                          {uploadedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                            >
                              <span>{file.name}</span>
                              <button
                                type="button"
                                className="bg-destructive hover:bg-destructive/90 text-white px-2 py-1 rounded-full"
                                onClick={() => removeFile(index)}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Root Causes Section */}
                  <div className="space-y-2">
                    <Label htmlFor="rootCauses" className="text-lg font-semibold">
                      Identify Root Causes
                    </Label>
                    <Textarea
                      id="rootCauses"
                      placeholder="Identify and describe the root causes of the issue..."
                      value={formData.rootCauses}
                      onChange={(e) => handleInputChange("rootCauses", e.target.value)}
                      className="min-h-24 bg-background/80 backdrop-blur-sm border-border/50 resize-none"
                    />
                  </div>

                  {/* Countermeasures Section */}
                  <div className="space-y-2">
                    <Label htmlFor="countermeasures" className="text-lg font-semibold">
                      Develop Countermeasures
                    </Label>
                    <Textarea
                      id="countermeasures"
                      placeholder="Describe the countermeasures and corrective actions..."
                      value={formData.countermeasures}
                      onChange={(e) => handleInputChange("countermeasures", e.target.value)}
                      className="min-h-24 bg-background/80 backdrop-blur-sm border-border/50 resize-none"
                    />
                  </div>

                  {/* Stakeholder Discussion Section */}
                  <div className="space-y-2">
                    <Label htmlFor="stakeholderDiscussion" className="text-lg font-semibold">
                      Stakeholder Discussion and Agreement
                    </Label>
                    <Textarea
                      id="stakeholderDiscussion"
                      placeholder="Document stakeholder discussions and agreements..."
                      value={formData.stakeholderDiscussion}
                      onChange={(e) => handleInputChange("stakeholderDiscussion", e.target.value)}
                      className="min-h-24 bg-background/80 backdrop-blur-sm border-border/50 resize-none"
                    />
                  </div>

                  {/* Update Logging History Section */}
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Update Logging History</Label>
                    <Card className="bg-background/60 backdrop-blur-sm border-border/30">
                      <CardContent className="p-4">
                        <div className="space-y-3 max-h-48 overflow-y-auto">
                          {loggingHistory.map((entry, index) => (
                            <div key={index} className="flex items-start gap-3 text-sm">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>{entry.date}</span>
                                  <span>•</span>
                                  <span>{entry.user}</span>
                                  <span>•</span>
                                  <span className="font-medium text-primary">{entry.action}</span>
                                </div>
                                <p className="text-foreground mt-1">{entry.details}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      className="bg-primary hover:bg-primary/90 text-white px-8 py-2"
                      onClick={() => {
                        setLoggingHistory((prev) => [
                          ...prev,
                          {
                            date: new Date().toLocaleDateString(),
                            action: "Log saved",
                            user: formData.owner || "User",
                            details: "Maintenance log entry saved successfully",
                          },
                        ])
                      }}
                    >
                      Save Maintenance Log
                    </button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
