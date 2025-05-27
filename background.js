// ========== RecruitIntel Background Script ==========

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "analyzeMessage") {
    const messageText = request.prompt;

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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", // 🔐 Replace with actual secure key
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a job scam detector. Evaluate recruiter messages and respond with:
- A short risk score (low/medium/high)
- A brief reasoning
- Look out for red flags such as:
  • Sponsored post
  • Unrealistic pay (e.g., $100/hr for entry-level)
  • No recruiter email
  • Reuse of real company name in misleading ways
  • Suspicious links (bit.ly, forms.gle)`
          },
          {
            role: "user",
            content: messageText
          }
        ]
      })
    })
      .then(res => res.json())
      .then(data => {
        const reply = data.choices?.[0]?.message?.content || "⚠️ No response from GPT.";
        sendResponse({ success: true, reply });
      })
      .catch(err => {
        console.error("❌ GPT API error:", err);
        sendResponse({ success: false, error: "API call failed." });
      });

    // ✅ Required for async response
    return true;
  }

  // Future: Handle other types like 'scanLinkedInJobPost'
  return false;
});
