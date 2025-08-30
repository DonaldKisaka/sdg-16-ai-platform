"use client"

import type React from "react"
import { callGeminiAPI, createLegalSimplificationPrompt } from "@/lib/gemini"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Upload, Loader2, Download, Share, BookOpen, AlertCircle, CheckCircle2 } from "lucide-react"

interface SimplificationResult {
  originalText: string
  simplifiedText: string
  keyTerms: { term: string; definition: string }[]
  summary: string
  complexity: "low" | "medium" | "high"
  readingLevel: string
}

export function LegalDocumentSimplifier() {
  const [activeTab, setActiveTab] = useState("upload")
  const [text, setText] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<SimplificationResult | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleSimplify = async () => {
    setIsProcessing(true)
    setResult(null)

    try {
      let content = ""

      if (activeTab === "upload" && file) {
        // For file uploads, we'll use a sample text for now
        // In a real implementation, you'd extract text from the file
        content =
          'WHEREAS, the Party of the First Part (hereinafter referred to as "Licensor") is the owner of certain intellectual property rights...'
      } else {
        content = text
      }

      const prompt = createLegalSimplificationPrompt(content)
      const response = await callGeminiAPI(prompt)

      // Parse the JSON response from Gemini
      const simplificationResult = JSON.parse(response)

      // Add the original text to the result
      const result: SimplificationResult = {
        originalText: content,
        ...simplificationResult,
      }

      setResult(result)
    } catch (error) {
      console.error("Simplification failed:", error)
      // Fallback to mock data if API fails
      const mockResult: SimplificationResult = {
        originalText: activeTab === "upload" && file ? "Sample legal text..." : text || "Sample legal text...",
        simplifiedText: "Unable to simplify document due to API error. Please try again.",
        keyTerms: [
          {
            term: "API Error",
            definition: "A technical issue prevented the simplification process",
          },
        ],
        summary: "Document simplification could not be completed. Please try again.",
        complexity: "high",
        readingLevel: "Unable to determine → Please retry",
      }
      setResult(mockResult)
    } finally {
      setIsProcessing(false)
    }
  }

  const getComplexityColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getComplexityBadge = (level: string) => {
    switch (level) {
      case "low":
        return "default"
      case "medium":
        return "secondary"
      case "high":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" />
            Document Input
          </CardTitle>
          <CardDescription>Upload a legal document or paste text to get a simplified version</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Document
              </TabsTrigger>
              <TabsTrigger value="text" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Paste Text
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">Legal Document</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Upload your legal document</p>
                    <p className="text-xs text-muted-foreground">Supports PDF, DOC, DOCX, TXT files up to 10MB</p>
                  </div>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                    className="mt-4"
                  />
                  {file && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="text" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text">Legal Text</Label>
                <Textarea
                  id="text"
                  placeholder="Paste your legal document text here. For example: 'WHEREAS, the Party of the First Part hereby agrees to...'"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={8}
                />
                <p className="text-sm text-muted-foreground">
                  Paste any legal document text including contracts, terms of service, privacy policies, or legal
                  notices.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <Button
            onClick={handleSimplify}
            disabled={isProcessing || (activeTab === "upload" && !file) || (activeTab === "text" && !text.trim())}
            className="w-full mt-6"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Simplifying Document...
              </>
            ) : (
              <>
                <BookOpen className="w-5 h-5 mr-2" />
                Simplify Document
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Original Document */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Original Document
                </span>
                <Badge variant={getComplexityBadge(result.complexity)}>{result.complexity} Complexity</Badge>
              </CardTitle>
              <CardDescription>Complex legal language • {result.readingLevel.split("→")[0].trim()}</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64 w-full rounded-md border p-4">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{result.originalText}</p>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Simplified Version */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Simplified Version
                </span>
                <Badge variant="default">Plain English</Badge>
              </CardTitle>
              <CardDescription>Easy to understand • {result.readingLevel.split("→")[1].trim()}</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64 w-full rounded-md border p-4 bg-muted/30">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{result.simplifiedText}</p>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Additional Results */}
      {result && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-lg">Document Summary</CardTitle>
              <CardDescription>Key takeaway in one sentence</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <BookOpen className="h-4 w-4" />
                <AlertDescription className="text-base">{result.summary}</AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Key Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-lg">Legal Terms Explained</CardTitle>
              <CardDescription>Complex terms translated to plain English</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.keyTerms.map((term, index) => (
                  <div key={index}>
                    <div className="flex items-start gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm">{term.term}</p>
                        <p className="text-sm text-muted-foreground mt-1">{term.definition}</p>
                      </div>
                    </div>
                    {index < result.keyTerms.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Action Buttons */}
      {result && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex-1 bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Download Simplified Version
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Share className="w-4 h-4 mr-2" />
                Share Simplified Document
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                Generate Full Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Information Card */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-lg mb-2">How Document Simplification Works</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Our AI analyzes complex legal language and transforms it into clear, accessible English while preserving
                the original meaning. We identify key terms, break down complex sentences, and provide definitions for
                legal jargon to make documents understandable for everyone.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
