// utils/gptCheck.ts (pseudo code)
export async function analyzeTextWithGPT(text: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a job fraud detector assistant.' },
        { role: 'user', content: `Analyze this recruiter message and tell if it's likely fake:\n${text}` }
      ]
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
}

// Ghost Job Check Prompt (for OpenAI)
const ghostJobPrompt = `You're a job listing analyzer. Determine if the job looks suspicious, stale, or fake. 
Criteria: no salary, vague title, job posted >30 days ago, generic language.

Job Posting:
"""
Senior Software Engineer at TopTech
Posted: 45 days ago
"Looking for a passionate developer to join our dynamic team. Exciting opportunity."
"""

Result:`
