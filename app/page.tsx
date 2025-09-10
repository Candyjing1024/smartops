"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { FeatureCard } from "@/components/feature-card"
import { TroubleshootingForm } from "@/components/troubleshooting-form"
import { OEMManuals } from "@/components/oem-manuals"
import { LoginForm } from "@/components/login-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Sparkles, FileText, Database, Award, Shield } from "lucide-react"
import { MaintenanceLogging } from "@/components/maintenance-logging"
import { FeedbackPage } from "@/components/feedback-page"
import { AskDigitalWorker } from "@/components/ask-digital-worker"

const features = [
  {
    icon: BookOpen,
    title: "Knowledge Hub Spotlights",
    description: "Admin Announcements",
  },
  {
    icon: Sparkles,
    title: "Ask Digital Worker",
    description: "Find what you need in seconds",
  },
  {
    icon: FileText,
    title: "OEM Manuals",
    description: "Official Equipment Manufacturer Documents",
  },
  {
    icon: Database,
    title: "Parts & Materials Database",
    description: "Specifications and Documentation",
  },
  {
    icon: Award,
    title: "Industry Standards",
    description: "Search for relevant standards",
  },
  {
    icon: Shield,
    title: "Safety Instructions & Posters",
    description: "Safety posters and visual aids",
  },
]

export default function KnowledgeHub() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("knowledge")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [workspaceName, setWorkspaceName] = useState("") // Added workspace name state

  const handleSearch = () => {
    console.log("Searching for:", searchQuery)
  }

  const handleFeatureClick = (title: string) => {
    if (title === "OEM Manuals") {
      setActiveTab("oemanuals")
    }
    if (title === "Ask Digital Worker") {
      setActiveTab("askdigitalworker")
    }
    console.log("Clicked feature:", title)
  }

  const handleLoginWithWorkspace = (workspace: string) => {
    setWorkspaceName(workspace)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setActiveTab("knowledge") // Reset to default tab
    setWorkspaceName("") // Clear workspace name on logout
  }

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLoginWithWorkspace} />
  }

  if (activeTab === "feedback") {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
          workspaceName={workspaceName}
        />
        <FeedbackPage />
      </div>
    )
  }

  if (activeTab === "troubleshooting") {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
          workspaceName={workspaceName}
        />
        <TroubleshootingForm />
      </div>
    )
  }

  if (activeTab === "maintenancelog") {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
          workspaceName={workspaceName}
        />
        <MaintenanceLogging />
      </div>
    )
  }

  if (activeTab === "oemanuals") {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
          workspaceName={workspaceName}
        />
        <OEMManuals />
      </div>
    )
  }

  if (activeTab === "askdigitalworker") {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
          workspaceName={workspaceName}
        />
        <AskDigitalWorker />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} workspaceName={workspaceName} />
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="glass-effect border-b border-border/30 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-accent/10" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <p className="text-muted-foreground text-lg">Welcome to the</p>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent text-balance animate-in slide-in-from-bottom-4 duration-1000">
                  Knowledge Hub
                </h1>
              </div>

              {/* Search Bar */}
              <div className="flex gap-3 max-w-2xl mx-auto animate-in slide-in-from-bottom-8 duration-1000 delay-300">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="What do you want to know?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-background/80 backdrop-blur-sm border-border/50 shadow-lg focus:shadow-xl transition-all duration-300 rounded-xl"
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="h-12 px-8 bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Feature Grid */}
        <section className="p-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/2 to-transparent" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-12 duration-1000 delay-500">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="animate-in slide-in-from-bottom-4 duration-700"
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    onClick={() => handleFeatureClick(feature.title)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
