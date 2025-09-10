"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  User,
  Settings,
  FileText,
  BookOpen,
  HelpCircle,
  Shield,
  Cookie,
  RefreshCw,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Wrench,
  Building,
} from "lucide-react"

interface SidebarProps {
  className?: string
  activeTab?: string
  onTabChange?: (tab: string) => void
  onLogout?: () => void
  workspaceName?: string // Added workspace name prop
}

const navigationItems = [
  { icon: User, label: "Me", href: "#", id: "me" },
  { icon: Settings, label: "Production Area", href: "#", id: "production" },
  { icon: FileText, label: "Plant Overview", href: "#", id: "plant" },
  { icon: BookOpen, label: "Knowledge Hub", href: "#", id: "knowledge", active: true },
  { icon: Wrench, label: "Troubleshooting", href: "#", id: "troubleshooting" },
  { icon: FileText, label: "Maintenance Logging", href: "#", id: "maintenancelog" },
  { icon: HelpCircle, label: "Feedback", href: "#", id: "feedback" },
]

const bottomItems = [
  { icon: HelpCircle, label: "User Guide", href: "#" },
  { icon: Shield, label: "Privacy Policy", href: "#" },
  { icon: Cookie, label: "Manage Cookies", href: "#" },
  { icon: RefreshCw, label: "Switch Workspace", href: "#" },
  { icon: LogOut, label: "Logout", href: "#" },
]

export function Sidebar({ className, activeTab = "knowledge", onTabChange, onLogout, workspaceName }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = () => {
    onLogout?.()
  }

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-slate-800 border-r border-slate-700 transition-all duration-300 shadow-xl",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900">
        {!isCollapsed && <h1 className="text-lg font-bold text-white">Digital Worker</h1>}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:bg-slate-700 hover:text-white transition-all duration-200 rounded-lg border-0"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {workspaceName && (
        <div className="p-4 border-b border-slate-700 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Building className="h-5 w-5 text-primary" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-400 uppercase tracking-wide">Workspace</p>
                <p className="text-sm font-medium text-white truncate" title={workspaceName}>
                  {workspaceName}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <Button
            key={item.label}
            variant={activeTab === item.id ? "default" : "ghost"}
            className={cn(
              "w-full justify-start gap-3 transition-all duration-200 rounded-lg border-0",
              activeTab === item.id && "bg-primary text-white shadow-lg hover:bg-primary/90 font-medium",
              activeTab !== item.id && "text-slate-300 hover:bg-slate-700 hover:text-white",
              isCollapsed && "justify-center px-2",
            )}
            onClick={() => onTabChange?.(item.id)}
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </Button>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 space-y-2 border-t border-slate-700 bg-slate-900">
        {bottomItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-slate-400 hover:bg-slate-700 hover:text-white transition-all duration-200 rounded-lg border-0",
              isCollapsed && "justify-center px-2",
            )}
            onClick={item.label === "Logout" ? handleLogout : undefined}
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm">{item.label}</span>}
          </Button>
        ))}
      </div>
    </div>
  )
}
