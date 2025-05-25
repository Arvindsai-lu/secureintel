// content/inject.js
(function () {
  const profileSection = document.querySelector('.pv-text-details__left-panel');
  if (!profileSection) return;

  const container = document.createElement('div');
  container.id = 'recruitintel-box';
  container.style.cssText = 'padding:10px;margin-top:10px;border:2px solid #0a66c2;background:#eef6fa;color:#000;font-size:14px;white-space:pre-wrap;';
  container.innerText = '🔍 RecruitIntel: Analyzing recruiter trust...';

  profileSection.appendChild(container);

  // Run trust score evaluation after short delay
  setTimeout(() => {
    const summary = [];
    let score = 100;

    const connText = document.querySelector('.pv-top-card--list-bullet span')?.innerText || "";
    if (connText.includes("connections")) {
      const match = connText.match(/\d+/);
      const connections = match ? parseInt(match[0]) : 0;
      if (connections < 100) {
        summary.push("- Low number of connections detected");
        score -= 20;
      }
    } else {
      summary.push("- Connection count not visible");
      score -= 15;
    }

    const titleElement = document.querySelector('.text-body-medium.break-words');
    if (!titleElement || !titleElement.innerText.trim()) {
      summary.push("- No title or bio found");
      score -= 30;
    }

    const infoBlock = document.querySelector('.pv-top-card--list');
    if (!infoBlock || infoBlock.innerText.trim().length < 20) {
      summary.push("- Profile appears incomplete");
      score -= 25;
    }

    const riskLevel = score >= 80 ? "Low Risk" : score >= 50 ? "Moderate Risk" : "High Risk";
    container.innerText = `✅ Trust Score: ${score} (${riskLevel})\n` + summary.join("\n");

    const reportBtn = document.createElement('button');
    reportBtn.innerText = '🚩 Report this Recruiter';
    reportBtn.style.cssText = 'margin-top:10px;padding:6px 10px;border:none;background:#c62828;color:#fff;border-radius:4px;cursor:pointer;font-weight:bold;';
    container.appendChild(document.createElement('br'));
    container.appendChild(reportBtn);

    reportBtn.addEventListener('click', () => {
      const profileName = document.querySelector('.text-heading-xlarge')?.innerText || "Unknown";
      const report = {
        name: profileName,
        url: window.location.href,
        timestamp: new Date().toISOString()
      };
      const existing = JSON.parse(localStorage.getItem('recruitintel_reports') || '[]');
      existing.push(report);
      localStorage.setItem('recruitintel_reports', JSON.stringify(existing));
      alert('✅ Recruiter has been reported. Thank you!');
    });

  }, 1500);
})();
