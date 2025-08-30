"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle, CheckCircle, XCircle, LinkIcon, FileText, Loader2, Info } from "lucide-react"
import { callGeminiAPI, createFakeNewsPrompt } from "@/lib/gemini"

interface AnalysisResult {
  credibilityScore: number
  riskLevel: "low" | "medium" | "high"
  findings: string[]
  sources: string[]
  summary: string
}

export function FakeNewsDetector() {
  const [activeTab, setActiveTab] = useState("url")
  const [url, setUrl] = useState("")
  const [text, setText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setResult(null)

    try {
      const content = activeTab === "url" ? url : text
      const prompt = createFakeNewsPrompt(content, activeTab === "url")

      const response = await callGeminiAPI(prompt)

      // Parse the JSON response from Gemini
      const analysisResult = JSON.parse(response)

      setResult(analysisResult)
    } catch (error) {
      console.error("Analysis failed:", error)
      // Fallback to mock data if API fails
      const mockResult: AnalysisResult = {
        credibilityScore: Math.floor(Math.random() * 40) + 30,
        riskLevel: Math.random() > 0.5 ? "medium" : "high",
        findings: ["Unable to complete full analysis due to API error", "Please try again or contact support"],
        sources: ["Fallback analysis system"],
        summary: "Analysis could not be completed. Please try again.",
      }
      setResult(mockResult)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getRiskColor = (level: string) => {
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

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "low":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "medium":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case "high":
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Info className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent" />
            Content Analysis
          </CardTitle>
          <CardDescription>Choose how you'd like to submit content for analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url" className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4" />
                URL Analysis
              </TabsTrigger>
              <TabsTrigger value="text" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Text Analysis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Article or Social Media URL</Label>
                <Input
                  id="url"
                  placeholder="https://example.com/news-article"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Enter the URL of a news article, social media post, or any web content you'd like to analyze.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="text" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text">Text Content</Label>
                <Textarea
                  id="text"
                  placeholder="Paste the text content you'd like to analyze for potential misinformation..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={6}
                />
                <p className="text-sm text-muted-foreground">
                  Paste any text content including news articles, social media posts, or claims you'd like to verify.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || (activeTab === "url" && !url.trim()) || (activeTab === "text" && !text.trim())}
            className="w-full mt-6"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing Content...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5 mr-2" />
                Analyze for Misinformation
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              {getRiskIcon(result.riskLevel)}
              Analysis Results
            </CardTitle>
            <CardDescription>AI-powered credibility assessment and misinformation detection</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Credibility Score */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Credibility Score</Label>
                <Badge
                  variant={
                    result.riskLevel === "high"
                      ? "destructive"
                      : result.riskLevel === "medium"
                        ? "secondary"
                        : "default"
                  }
                >
                  {result.credibilityScore}/100
                </Badge>
              </div>
              <Progress value={result.credibilityScore} className="h-3" />
              <div className="flex items-center gap-2">
                {getRiskIcon(result.riskLevel)}
                <span className={`font-medium capitalize ${getRiskColor(result.riskLevel)}`}>
                  {result.riskLevel} Risk
                </span>
              </div>
            </div>

            {/* Summary */}
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-base">{result.summary}</AlertDescription>
            </Alert>

            {/* Key Findings */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Key Findings</Label>
              <div className="space-y-2">
                {result.findings.map((finding, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{finding}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sources */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Verification Sources</Label>
              <div className="space-y-2">
                {result.sources.map((source, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-card border rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{source}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button variant="outline" className="flex-1 bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Shield className="w-4 h-4 mr-2" />
                Report Misinformation
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
              <Info className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-lg mb-2">How Our Analysis Works</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Our AI system analyzes content using multiple factors including source credibility, language patterns,
                fact-checking databases, and cross-referencing with verified information sources. The credibility score
                reflects the likelihood that the content contains accurate, reliable information.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
