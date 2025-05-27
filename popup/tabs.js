document.addEventListener('DOMContentLoaded', () => {
  const tabs = {
    analysis: document.getElementById('panel-analysis'),
    history: document.getElementById('panel-history'),
    settings: document.getElementById('panel-settings')
  };

  const tabButtons = {
    analysis: document.getElementById('tab-analysis'),
    history: document.getElementById('tab-history'),
    settings: document.getElementById('tab-settings')
  };

  function switchTab(key) {
    // Hide all tab panels
    Object.values(tabs).forEach(tab => tab?.classList.remove('active-tab'));
    // Show selected tab panel
    tabs[key]?.classList.add('active-tab');

    // Update button active states (optional)
    Object.values(tabButtons).forEach(btn => btn?.classList.remove('active'));
    tabButtons[key]?.classList.add('active');
  }

  // Wire up click events
  Object.entries(tabButtons).forEach(([key, btn]) => {
    btn?.addEventListener('click', () => switchTab(key));
  });

  // Optional: Set default tab
  switchTab('analysis');
});
