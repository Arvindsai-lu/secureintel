const tabs = {
  analysis: document.getElementById('panel-analysis'),
  history: document.getElementById('panel-history'),
  settings: document.getElementById('panel-settings')
};

function switchTab(key) {
  Object.keys(tabs).forEach(k => tabs[k].classList.remove('active-tab'));
  tabs[key].classList.add('active-tab');
}

document.getElementById('tab-analysis')?.addEventListener('click', () => switchTab('analysis'));
document.getElementById('tab-history')?.addEventListener('click', () => switchTab('history'));
document.getElementById('tab-settings')?.addEventListener('click', () => switchTab('settings'));
