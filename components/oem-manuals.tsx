"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Upload, Search, FileText, Download, Eye } from "lucide-react"

export function OEMManuals() {
  const [searchQuery, setSearchQuery] = useState("")
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [manualTitle, setManualTitle] = useState("")
  const [manualDescription, setManualDescription] = useState("")
  const [machineModel, setMachineModel] = useState("")

  // Mock data for existing manuals
  const existingManuals = [
    {
      id: 1,
      title: "Accumulator Model A3-2024",
      machineModel: "A3-2024",
      description: "Complete operation and maintenance manual",
      uploadDate: "2024-11-15",
      fileSize: "2.4 MB",
      fileType: "PDF",
    },
    {
      id: 2,
      title: "Conveyor System CS-100",
      machineModel: "CS-100",
      description: "Installation and troubleshooting guide",
      uploadDate: "2024-11-10",
      fileSize: "1.8 MB",
      fileType: "PDF",
    },
    {
      id: 3,
      title: "Packaging Unit PU-500",
      machineModel: "PU-500",
      description: "Safety procedures and operation manual",
      uploadDate: "2024-11-08",
      fileSize: "3.1 MB",
      fileType: "PDF",
    },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadFile(file)
    }
  }

  const handleUploadSubmit = () => {
    if (uploadFile && manualTitle && machineModel) {
      console.log("Uploading manual:", {
        file: uploadFile,
        title: manualTitle,
        description: manualDescription,
        machineModel: machineModel,
      })
      // Reset form
      setUploadFile(null)
      setManualTitle("")
      setManualDescription("")
      setMachineModel("")
    }
  }

  const handleSearch = () => {
    console.log("Searching manuals for:", searchQuery)
  }

  const filteredManuals = existingManuals.filter(
    (manual) =>
      manual.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manual.machineModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manual.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <main className="flex-1 overflow-auto">
      <header className="bg-background border-b border-border p-6">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">OEM Manuals</h1>
            <p className="text-muted-foreground">Official Equipment Manufacturer Documents</p>
          </div>
        </div>
      </header>

      <section className="p-6">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="search" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="search" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search Manuals
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Machine Manuals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Search Machine Manuals
                  </CardTitle>
                  <CardDescription>
                    Find operation manuals, troubleshooting guides, and technical documentation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by manual title, machine model, or keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      />
                    </div>
                    <Button onClick={handleSearch} className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Search
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {filteredManuals.map((manual) => (
                      <Card key={manual.id} className="border border-border">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-primary" />
                                <h3 className="font-semibold text-foreground">{manual.title}</h3>
                              </div>
                              <p className="text-sm text-muted-foreground">{manual.description}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>Model: {manual.machineModel}</span>
                                <span>Size: {manual.fileSize}</span>
                                <span>Uploaded: {manual.uploadDate}</span>
                                <span>Type: {manual.fileType}</span>
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upload" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    All Uploaded Documentation
                  </CardTitle>
                  <CardDescription>View and manage all uploaded machine manuals and documentation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {existingManuals.map((manual) => (
                      <Card key={manual.id} className="border border-border">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-primary" />
                                <h3 className="font-semibold text-foreground">{manual.title}</h3>
                              </div>
                              <p className="text-sm text-muted-foreground">{manual.description}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>Model: {manual.machineModel}</span>
                                <span>Size: {manual.fileSize}</span>
                                <span>Uploaded: {manual.uploadDate}</span>
                                <span>Type: {manual.fileType}</span>
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload New Manual
                  </CardTitle>
                  <CardDescription>
                    Add new operation manuals, maintenance guides, and technical documentation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="manual-title">Manual Title *</Label>
                      <Input
                        id="manual-title"
                        placeholder="e.g., Accumulator Model A3-2024"
                        value={manualTitle}
                        onChange={(e) => setManualTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="machine-model">Machine Model *</Label>
                      <Input
                        id="machine-model"
                        placeholder="e.g., A3-2024"
                        value={machineModel}
                        onChange={(e) => setMachineModel(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="manual-description">Description</Label>
                    <Textarea
                      id="manual-description"
                      placeholder="Brief description of the manual content..."
                      value={manualDescription}
                      onChange={(e) => setManualDescription(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file-upload">Upload Manual File *</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <input
                        id="file-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-1">
                          {uploadFile ? uploadFile.name : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs text-muted-foreground">PDF, DOC, DOCX files up to 10MB</p>
                      </label>
                    </div>
                  </div>

                  <Button
                    onClick={handleUploadSubmit}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={!uploadFile || !manualTitle || !machineModel}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Manual
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  )
}
