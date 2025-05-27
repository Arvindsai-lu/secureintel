# 🔍 RecruitIntel - Chrome Extension for Job Scam Detection

**RecruitIntel** is a Chrome extension designed to protect job seekers on LinkedIn from fake recruiters, ghost job scams, and misleading job posts. It uses GPT-4 to assess risk, flag red flags, and visualize trust metrics — all with a sleek, dark-mode-first interface.

---

## 🚀 Features

- ✅ **Trust Score Bar** under recruiter profiles
- 🔍 **GPT-4 Risk Analysis** on recruiter messages & job posts
- ⚠️ **Floating scam alerts** on suspicious content
- 🧠 **Inline GPT summaries** below job titles
- 📜 **History panel** to review past analyses
- 📁 **Export options** (JSON & CSV)
- 🔧 **Custom settings**: Auto-save, color-blind mode, privacy toggle
- ☁️ **Chrome Sync** support for saving data across devices
- 🌒 **Tailwind-inspired dark mode UI**

---

## 📂 Folder Structure

```plaintext
recruitintel-extension/
├── manifest.json
├── background.js
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

1. Install the extension from `chrome://extensions` (Load unpacked)
2. Navigate to a LinkedIn job or recruiter profile
3. Extension injects Trust Score, floating alerts & link warnings
4. Use the popup to paste recruiter messages for GPT-4 risk check
5. Analyze red flags, monitor history, or export analysis data

---

## ⚙️ Tech Stack

- 💬 GPT-4 via OpenAI API
- 🧩 Chrome Extension (Manifest V3)
- 🎨 Tailwind-like custom CSS (Dark Mode First)
- 💾 Chrome Sync + localStorage
- 🔍 JS content scripts for LinkedIn DOM parsing

---

## 🔒 Privacy & Security

RecruitIntel is built with **user trust** in mind:

- No tracking or external analytics
- No server-side data processing
- All data stored locally or via Chrome Sync
- GPT queries are manually triggered, never automatic

---

## 📦 Roadmap

- 🧭 Recruiter Trust Map (visual reputation)
- 🛡️ Scam filter badge directly on LinkedIn job feeds
- 🧬 ML-based behavior pattern recognition
- 🧑‍💻 Resume leak protection alert system
- 🧪 Firefox version (coming soon)

---

## 📌 Installation Instructions

1. Clone this repo
2. Go to `chrome://extensions`
3. Enable **Developer Mode**
4. Click **Load Unpacked** → select the repo folder
5. Pin the extension and start analyzing jobs & recruiters

---

## 🙌 Contributions

Pull requests, ideas, and feedback are welcome! Let's build a safer job search experience together.

---

## ⚠️ Disclaimer

This tool provides AI-assisted insights and red flags but does not replace human judgment. Always cross-check information before proceeding with job offers.

---

**Built with care by cybersecurity students & privacy advocates 🧠🕵️‍♂️**
