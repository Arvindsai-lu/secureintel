// content/trustScore.js - Inject Trust Score Bar under LinkedIn profile heading
(function () {
  function createTrustScoreBar(score, label) {
    const color = score >= 80 ? '#2ea043' : score >= 50 ? '#e3b341' : '#f85149';
    const bar = document.createElement("div");
    bar.id = "recruitintel-trust-bar";
    bar.style.cssText = `
      margin-top: 12px;
      background: #0d1117;
      padding: 8px 14px;
      border-radius: 6px;
      border: 1px solid ${color};
      color: ${color};
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 12px;
    `;

    const meter = document.createElement("div");
    meter.style.cssText = `
      height: 10px;
      flex: 1;
      background: #30363d;
      border-radius: 4px;
      overflow: hidden;
    `;

    const fill = document.createElement("div");
    fill.style.cssText = `
      height: 100%;
      width: ${score}%;
      background: ${color};
      transition: width 0.3s ease-in-out;
    `;
    meter.appendChild(fill);

    bar.innerText = `✅ Trust Score: ${score} (${label})`;
    bar.appendChild(meter);

    return bar;
  }

  function injectScore() {
    const heading = document.querySelector(".text-heading-xlarge");
    if (!heading || document.getElementById("recruitintel-trust-bar")) return;

    // Example score logic
    const profileConnections = document.body.innerText.match(/\d+\+? connections/);
    const score = profileConnections ? 80 : 40;
    const label = score >= 80 ? "Low Risk" : score >= 50 ? "Moderate Risk" : "High Risk";

    const scoreBar = createTrustScoreBar(score, label);
    heading.insertAdjacentElement("afterend", scoreBar);
  }

  window.addEventListener("load", () => setTimeout(injectScore, 2000));
})();
