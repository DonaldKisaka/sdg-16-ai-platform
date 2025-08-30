import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, FileText, Target, Users, Globe, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-serif font-bold text-xl text-foreground">SDG16 AI Platform</h1>
                <p className="text-xs text-muted-foreground">Peace, Justice & Strong Institutions</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="#about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                About SDG 16
              </Link>
              <Link href="/fake-news-detection">
                <Button variant="secondary" size="sm">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6">
            Supporting UN Sustainable Development Goal 16
          </Badge>
          <h1 className="font-serif font-bold text-4xl md:text-6xl text-balance mb-6">
            Combat Misinformation &<span className="text-accent"> Simplify Legal Documents</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            AI-powered platform that detects fake news and transforms complex legal documents into plain English,
            promoting transparency and informed decision-making.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/fake-news-detection">
              <Button size="lg" className="text-lg px-8">
                <Shield className="w-5 h-5 mr-2" />
                Detect Fake News
              </Button>
            </Link>
            <Link href="/legal-simplifier">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <FileText className="w-5 h-5 mr-2" />
                Simplify Legal Documents
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">
              Powerful AI Tools for Truth & Transparency
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with user-friendly interfaces to make information more accessible
              and trustworthy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Fake News Detection */}
            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="font-serif text-2xl">Fake News Detection</CardTitle>
                <CardDescription className="text-base">
                  Analyze news articles and social media content to identify potential misinformation using advanced AI
                  algorithms.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>URL and text analysis with credibility scoring</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>Source verification and fact-checking</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>Real-time misinformation alerts</span>
                  </li>
                </ul>
                <Link href="/fake-news-detection">
                  <Button className="w-full mt-6 bg-transparent" variant="outline">
                    Try Fake News Detection
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Legal Document Simplifier */}
            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="font-serif text-2xl">Legal Document Simplifier</CardTitle>
                <CardDescription className="text-base">
                  Transform complex legal jargon into clear, understandable language that everyone can comprehend.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>Plain English translations of legal terms</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>Key points extraction and summaries</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>Downloadable simplified documents</span>
                  </li>
                </ul>
                <Link href="/legal-simplifier">
                  <Button className="w-full mt-6 bg-transparent" variant="outline">
                    Try Document Simplifier
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SDG 16 Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              UN Sustainable Development Goal 16
            </Badge>
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6">Peace, Justice & Strong Institutions</h2>
            <p className="text-lg text-muted-foreground">
              Our platform directly supports SDG 16 by promoting access to information, reducing misinformation, and
              making legal systems more transparent and accessible to all.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-serif font-semibold text-xl mb-2">Access to Information</h3>
              <p className="text-muted-foreground">
                Ensuring everyone has access to reliable, fact-checked information and simplified legal documents.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-serif font-semibold text-xl mb-2">Combat Misinformation</h3>
              <p className="text-muted-foreground">
                Using AI to identify and flag false information, protecting democratic processes and public discourse.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-serif font-semibold text-xl mb-2">Inclusive Justice</h3>
              <p className="text-muted-foreground">
                Making legal systems more accessible by translating complex documents into understandable language.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6">Ready to Fight Misinformation?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join the movement for truth, transparency, and accessible justice. Start using our AI-powered tools today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/fake-news-detection">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Started Now
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg">SDG16 AI Platform</h3>
                <p className="text-sm text-muted-foreground">Supporting Peace, Justice & Strong Institutions</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                Built for hackathon • Powered by Azure OpenAI & Semantic Kernel
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
