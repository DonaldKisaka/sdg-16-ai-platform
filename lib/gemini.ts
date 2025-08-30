interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string
      }>
    }
  }>
}

export async function callGeminiAPI(prompt: string): Promise<string> {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  })

  if (!response.ok) {
    throw new Error("Failed to call Gemini API")
  }

  const data = await response.json()
  return data.result
}

export function createFakeNewsPrompt(content: string, isUrl: boolean): string {
  return `You are an expert fact-checker and misinformation analyst. Analyze the following ${isUrl ? "URL content" : "text"} for potential misinformation and provide a detailed assessment.

Content to analyze:
${content}

Please provide your analysis in the following JSON format:
{
  "credibilityScore": [number between 0-100],
  "riskLevel": ["low" | "medium" | "high"],
  "findings": [array of specific findings about potential issues],
  "sources": [array of verification sources that could be used],
  "summary": "Brief summary of the analysis"
}

Focus on:
- Source credibility and authority
- Factual accuracy and evidence
- Language patterns and bias
- Cross-referencing with known facts
- Emotional manipulation tactics

Respond only with valid JSON.`
}

export function createLegalSimplificationPrompt(legalText: string): string {
  return `You are an expert legal document simplifier. Transform the following complex legal text into plain English while preserving all important legal meanings and obligations.

Legal text to simplify:
${legalText}

Please provide your analysis in the following JSON format:
{
  "simplifiedText": "The legal text rewritten in plain English with bullet points and clear structure",
  "keyTerms": [
    {
      "term": "legal term",
      "definition": "simple explanation"
    }
  ],
  "summary": "One sentence summary of what this document is about",
  "complexity": ["low" | "medium" | "high"],
  "readingLevel": "Original Level → Simplified Level"
}

Guidelines:
- Use simple, everyday language
- Break down complex sentences
- Explain legal jargon
- Use bullet points for lists
- Maintain legal accuracy
- Make it accessible to 8th grade reading level

Respond only with valid JSON.`
}
