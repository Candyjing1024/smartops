"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Lock, Globe, Building } from "lucide-react"

interface LoginFormProps {
  onLogin: () => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [language, setLanguage] = useState("en") // Set English as default language
  const [workspace, setWorkspace] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt:", { username, language, workspace })
    onLogin()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <Card className="w-full max-w-md glass-effect shadow-2xl relative z-10 animate-in slide-in-from-bottom-8 duration-1000">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Digital Worker Login
          </CardTitle>
          <CardDescription className="text-muted-foreground">Access your Knowledge Hub workspace</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-11 bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary transition-all duration-300"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary transition-all duration-300"
                required
              />
            </div>

            {/* Language Selection */}
            <div className="space-y-2">
              <Label htmlFor="language" className="text-sm font-medium flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                Language
              </Label>
              <Select value={language} onValueChange={setLanguage} required>
                <SelectTrigger className="h-11 bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary transition-all duration-300">
                  <SelectValue placeholder="Select your language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Workspace Name */}
            <div className="space-y-2">
              <Label htmlFor="workspace" className="text-sm font-medium flex items-center gap-2">
                <Building className="h-4 w-4 text-primary" />
                Workspace Name
              </Label>
              <Input
                id="workspace"
                type="text"
                placeholder="Enter workspace name"
                value={workspace}
                onChange={(e) => setWorkspace(e.target.value)}
                className="h-11 bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary transition-all duration-300"
                required
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-slate-800 hover:bg-slate-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg"
            >
              Sign In
            </Button>
          </form>

          {/* Additional Options */}
          <div className="mt-6 text-center space-y-2">
            <Button variant="ghost" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Forgot your password?
            </Button>
            <div className="text-xs text-muted-foreground">Need help? Contact your system administrator</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
