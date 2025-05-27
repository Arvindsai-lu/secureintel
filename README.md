from pathlib import Path

readme_content = """
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
