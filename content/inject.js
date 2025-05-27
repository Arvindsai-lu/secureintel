// content/inject.js - RecruitIntel LinkedIn Enhancer
(function () {
  const suspiciousDomains = ["bit.ly", "tinyurl.com", "forms.gle", "formsubmit.co"];

  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const alertColor = isDarkMode ? '#f85149' : '#b91c1c';
  const linkFlagColor = isDarkMode ? 'orange' : 'darkorange';

  function createFloatingAlert(text, color = alertColor) {
    if (document.getElementById("recruitintel-floating-alert")) return;
    const badge = document.createElement("div");
    badge.id = "recruitintel-floating-alert";
    badge.innerText = text;
    badge.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      z-index: 9999;
      background: ${color};
      color: white;
      padding: 8px 12px;
      font-weight: bold;
      border-radius: 6px;
      box-shadow: 0 0 6px rgba(0,0,0,0.4);
    `;
    document.body.appendChild(badge);
  }

  function highlightSuspiciousLinks() {
    const links = Array.from(document.querySelectorAll("a"));
    let found = false;

    links.forEach(link => {
      if (suspiciousDomains.some(domain => link.href.includes(domain))) {
        link.insertAdjacentHTML(
          "afterend",
          `<span style="color:${linkFlagColor}; font-weight:bold;"> ⚠️ Suspicious Link</span>`
        );
        found = true;
      }
    });

    return found;
  }

  function insertRiskBox(riskLevel, reply) {
    const colorMap = {
      high: "#f85149",
      medium: "#e3b341",
      low: "#2ea043"
    };
    const color = colorMap[riskLevel] || "#ccc";

    const box = document.createElement("div");
    box.className = "recruitintel-gpt-risk-box";
    box.innerText = `🔍 GPT Risk Check: ${reply}`;
    box.style.cssText = `
      background: ${color}22;
      color: ${color};
      padding: 10px;
      border-radius: 6px;
      border: 1px solid ${color};
      margin: 10px 0;
      font-weight: 500;
    `;

    const jobHeader = document.querySelector(".top-card-layout__title") || document.body;
    jobHeader?.parentNode?.insertBefore(box, jobHeader.nextSibling);
  }

  function analyzeJobPostWithGPT(jobText) {
    chrome.runtime.sendMessage({ type: "gptRiskAnalysis", jobText }, (response) => {
      const reply = response?.reply || "⚠️ No GPT response.";

      const riskLevel = /high/i.test(reply)
        ? "high"
        : /medium/i.test(reply)
        ? "medium"
        : "low";

      insertRiskBox(riskLevel, reply);

      if (riskLevel === "high") {
        createFloatingAlert("⚠️ High Scam Risk Detected", alertColor);
      }
    });
  }

  function init() {
    const jobDescription = document.querySelector(".description__text")?.innerText;
    if (jobDescription) {
      analyzeJobPostWithGPT(jobDescription);
    }

    const foundSuspiciousLinks = highlightSuspiciousLinks();
    if (foundSuspiciousLinks) {
      createFloatingAlert("⚠️ Suspicious Links Detected", isDarkMode ? "#e3b341" : "#d97706");
    }
  }

  window.addEventListener("load", () => {
    setTimeout(init, 2000); // Delay for LinkedIn content to load
  });
})();
