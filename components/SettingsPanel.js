// components/SettingsPanel.js

import { useState } from 'react';

export default function SettingsPanel({ pollingInterval, setPollingInterval }) {
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setPollingInterval(value);
      localStorage.setItem('pollingInterval', value);
    }
  };

  return (
    <div className="settingsPanel">
      <div className="settingsToggle" onClick={() => setOpen(!open)}>
        ⚙️ Settings {open ? '▲' : '▼'}
      </div>
      {open && (
        <div className="settingsContent">
          <label>
            ⏱ Polling Interval (ms):
            <input
              type="number"
              value={pollingInterval}
              onChange={handleChange}
              min="500"
              step="500"
            />
          </label>
        </div>
      )}
    </div>
  );
}