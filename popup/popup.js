// ========== RecruitIntel Popup Script with Chrome Sync + Auto-Save + Export as JSON/CSV ==========

function saveToHistory(message, reply) {
  const entry = {
    id: Date.now(),
    message,
    reply,
    timestamp: new Date().toISOString()
  };

  chrome.storage.sync.get({ recruitintel_history: [] }, (data) => {
    const history = data.recruitintel_history;
    history.unshift(entry);
    chrome.storage.sync.set({ recruitintel_history: history });
  });
}

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

function extractRedFlags(reply) {
  const flags = [];
  if (/generic/i.test(reply)) flags.push("🚩 Generic greeting");
  if (/company/i.test(reply) && /missing/i.test(reply)) flags.push("🚩 Missing company info");
  if (/urgent/i.test(reply)) flags.push("🚩 Urgent language");
  if (/sponsored/i.test(reply)) flags.push("🚩 Sponsored post");
  if (/unrealistic|too good/i.test(reply)) flags.push("🚩 Unrealistic offer");
  if (/bit\.ly|forms\.gle|tinyurl|rebrand\.ly/i.test(reply)) flags.push("🚩 Suspicious link");
  return flags;
}

function renderHistory() {
  const historyBox = document.getElementById("historyBox");
  if (!historyBox) return;

  chrome.storage.sync.get({ recruitintel_history: [] }, (data) => {
    const history = data.recruitintel_history;
    historyBox.innerHTML = history.length
      ? `<h4>📜 History</h4>` + history.map(entry => `
          <div class="history-entry">
            <b>Message:</b><br>${entry.message}<br>
            <b>Reply:</b><br>${entry.reply}<br>
            <small>${new Date(entry.timestamp).toLocaleString()}</small>
          </div>
        `).join("")
      : "<p>📬 No saved messages yet.</p>";
  });
}

function exportHistory(format) {
  chrome.storage.sync.get({ recruitintel_history: [] }, (data) => {
    const history = data.recruitintel_history;
    if (!history.length) return alert("📬 No history to export.");

    let blob, filename;
    if (format === "json") {
      blob = new Blob([JSON.stringify(history, null, 2)], { type: "application/json" });
      filename = "recruitintel_analysis_history.json";
    } else if (format === "csv") {
      const csv = ["Message,Reply,Timestamp"];
      history.forEach(e => {
        const msg = e.message.replace(/"/g, '""');
        const rep = e.reply.replace(/"/g, '""');
        csv.push(`"${msg}","${rep}","${e.timestamp}"`);
      });
      blob = new Blob([csv.join("\n")], { type: "text/csv" });
      filename = "recruitintel_analysis_history.csv";
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const analyzeBtn = document.getElementById("analyzeBtn");
  const msgInput = document.getElementById("msgInput");
  const resultBox = document.getElementById("result");
  const riskMeterFill = document.getElementById("riskMeterFill");
  const confidenceScore = document.getElementById("confidenceScore");
  const redFlagsList = document.getElementById("redFlags");
  const autoSaveToggle = document.getElementById("autoSaveToggle");

  const historyBtn = document.getElementById("historyBtn");
  const clearHistoryBtn = document.getElementById("clearHistoryBtn");
  const exportJsonBtn = document.getElementById("exportJsonBtn");
  const exportCsvBtn = document.getElementById("exportCsvBtn");

  chrome.storage.sync.get({ autoSave: true }, (data) => {
    if (autoSaveToggle) autoSaveToggle.checked = data.autoSave;
  });

  autoSaveToggle?.addEventListener("change", () => {
    chrome.storage.sync.set({ autoSave: autoSaveToggle.checked });
  });

  analyzeBtn?.addEventListener("click", () => {
    const message = msgInput?.value.trim();
    if (!message) return alert("⚠️ Please paste a message first.");

    resultBox.innerText = "⏳ Analyzing recruiter message...";
    riskMeterFill.style.width = "0%";

    chrome.runtime.sendMessage({ type: "analyzeMessage", prompt: message }, (response) => {
      const reply = response?.reply || "⚠️ No response from GPT.";
      resultBox.innerText = reply;

      const score = extractRiskScoreFromReply(reply);
      riskMeterFill.style.width = `${score}%`;
      confidenceScore.innerText = `${score + 10}%`;

      const flags = extractRedFlags(reply);
      redFlagsList.innerHTML = flags.length
        ? flags.map(f => `<li>${f}</li>`).join("")
        : "<li>✅ No obvious red flags</li>";

      chrome.storage.sync.get({ autoSave: true }, (data) => {
        if (data.autoSave) {
          saveToHistory(message, reply);
        }
      });
    });
  });

  historyBtn?.addEventListener("click", renderHistory);

  clearHistoryBtn?.addEventListener("click", () => {
    if (confirm("🗑️ Clear all saved message analyses?")) {
      chrome.storage.sync.set({ recruitintel_history: [] }, renderHistory);
    }
  });

  exportJsonBtn?.addEventListener("click", () => exportHistory("json"));
  exportCsvBtn?.addEventListener("click", () => exportHistory("csv"));
});
