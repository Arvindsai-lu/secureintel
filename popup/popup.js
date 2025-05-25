// ========== RecruitIntel Popup Script ==========

// Save analysis result to localStorage history
function saveToHistory(message, reply) {
  const entry = {
    id: Date.now(),
    message,
    reply,
    timestamp: new Date().toISOString()
  };
  const history = JSON.parse(localStorage.getItem("recruitintel_history") || "[]");
  history.unshift(entry); // latest first
  localStorage.setItem("recruitintel_history", JSON.stringify(history));
}

// Extract score for the meter (0–100 scale)
function extractRiskScoreFromReply(reply) {
  const match = reply.match(/(low|medium|high)/i);
  if (!match) return 0;
  switch (match[1].toLowerCase()) {
    case "low": return 25;
    case "medium": return 60;
    case "high": return 90;
    default: return 0;
  }
}

// Render history from localStorage
function renderHistory() {
  const history = JSON.parse(localStorage.getItem("recruitintel_history") || "[]");
  const historyBox = document.getElementById("historyBox");
  if (!history.length) {
    historyBox.innerHTML = "<p>📭 No saved messages yet.</p>";
    return;
  }

  historyBox.innerHTML = `
    <h4>📜 History</h4>
    ${history.map(entry => `
      <div class="history-entry">
        <b>Message:</b><br>${entry.message}<br>
        <b>Reply:</b><br>${entry.reply}<br>
        <small>${new Date(entry.timestamp).toLocaleString()}</small>
      </div>
    `).join("")}
  `;
}

// Run once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const analyzeBtn = document.getElementById("analyzeBtn");
  const msgInput = document.getElementById("msgInput");
  const resultBox = document.getElementById("result");
  const riskMeterFill = document.getElementById("riskMeterFill");
  const historyBtn = document.getElementById("historyBtn");
  const clearHistoryBtn = document.getElementById("clearHistoryBtn");
  const exportBtn = document.getElementById("exportBtn");

  // Analyze recruiter message
  analyzeBtn.addEventListener("click", async () => {
    const message = msgInput.value.trim();
    if (!message) return alert("⚠️ Please paste a message first.");

    resultBox.innerText = "⏳ Analyzing recruiter message...";
    riskMeterFill.style.width = "0%";

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are a job scam detector. Evaluate recruiter messages and respond with a short risk score (low/medium/high) and reasoning."
            },
            {
              role: "user",
              content: message
            }
          ]
        })
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "⚠️ No response from GPT.";
      resultBox.innerText = reply;

      const score = extractRiskScoreFromReply(reply);
      riskMeterFill.style.width = `${score}%`;

      saveToHistory(message, reply);
    } catch (err) {
      console.error("❌ GPT API error:", err);
      resultBox.innerText = "❌ Error: Could not contact GPT API.";
    }
  });

  // Show analysis history
  historyBtn.addEventListener("click", renderHistory);

  // Clear history
  clearHistoryBtn.addEventListener("click", () => {
    if (confirm("🗑️ Clear all saved message analyses?")) {
      localStorage.removeItem("recruitintel_history");
      renderHistory();
    }
  });

  // Export history to JSON file
  exportBtn.addEventListener("click", () => {
    const history = JSON.parse(localStorage.getItem("recruitintel_history") || "[]");
    if (!history.length) return alert("📭 No history to export.");

    const blob = new Blob([JSON.stringify(history, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recruitintel_analysis_history.json";
    a.click();
    URL.revokeObjectURL(url);
  });
});
