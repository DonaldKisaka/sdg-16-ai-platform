import { FakeNewsDetector } from "@/components/fake-news-detector"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"

export default function FakeNewsDetectionPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h1 className="font-serif font-bold text-xl text-foreground">Fake News Detection</h1>
                  <p className="text-xs text-muted-foreground">AI-powered misinformation analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-serif font-bold text-3xl md:text-4xl mb-4">Analyze Content for Misinformation</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use our AI-powered tool to analyze news articles, social media posts, or any text content for potential
              misinformation and credibility issues.
            </p>
          </div>

          <FakeNewsDetector />
        </div>
      </main>
    </div>
  )
}
