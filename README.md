# 🔍 RecruitIntel - Chrome Extension for Job Scam Detection

**RecruitIntel** is a dark-mode-first Chrome extension designed to protect job seekers from fake recruiters, AI-generated job scams, and ghost job listings on platforms like LinkedIn.

---

## 🚀 Features

- 🛡️ **Trust Badge** injection on recruiter profiles
- ✉️ **GPT-4 message analysis** for scam detection
- 📊 **Risk meter** with color-coded confidence levels
- 📜 **History tracking** with export & clear options
- ⚙️ **Settings tab** with privacy-first options
- 📁 Local-first design (no data is uploaded externally without consent)

---

## 📂 Folder Structure

```plaintext
recruitintel-extension/
├── manifest.json
├── icon.png
├── content/
│   └── inject.js
├── popup/
│   ├── index.html
│   ├── popup.js
│   ├── styles.css
│   └── tabs.js
```

---

## 🧠 How It Works

1. Click the extension while on a recruiter profile or job post
2. Paste a recruiter message into the analyzer
3. GPT-4 evaluates scam risk and flags red alerts
4. See visual risk score & store results in history
5. Optional: Export history as JSON

---

## 🧪 Tech Stack

- 🧠 GPT-4 (via OpenAI API)
- 🌐 Chrome Extensions (Manifest V3)
- 💅 HTML, CSS (Dark Mode + Responsive Grid)
- 💾 LocalStorage

---

## 🔒 Privacy

RecruitIntel is designed with **user trust and privacy first**:
- No scraping or background tracking
- All data stays in your browser (localStorage)
- Manual export options only (no auto-upload)

---

## 📦 Coming Soon

- Recruiter Reputation Graph (based on public behavior)
- Resume watermarking protection
- Ghost job cross-check via job board APIs
- Community flagging system

---

## 📌 Setup Instructions

1. Clone or download this repository
2. Visit `chrome://extensions` and enable **Developer Mode**
3. Click **Load unpacked** and select the project folder
4. Use the extension popup to analyze recruiter messages

---

## 🙌 Contributing

Suggestions and PRs are welcome! Open an issue or fork to improve trust tools for job seekers.

---

## ⚠️ Disclaimer
This is a proof-of-concept tool. It does not replace human judgment. Always do your own due diligence during job searches.

---

**Built with love by cybersecurity students & privacy nerds 🕵️‍♂️🧠**
