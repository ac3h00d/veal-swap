// components/SettingsPanel.js
import { useState } from 'react';

export default function SettingsPanel({ pollingInterval, setPollingInterval }) {
  const [show, setShow] = useState(false);

  return (
    <div className="settingsPanel">
      <div className="settingsToggle" onClick={() => setShow(!show)}>
        ⚙️ Settings
      </div>

      {show && (
        <div className="settingsContent">
          <label>
            ⏱️ Polling Interval (ms):
            <input
              type="number"
              value={pollingInterval}
              onChange={(e) => setPollingInterval(Number(e.target.value))}
              min="1000"
              step="500"
            />
          </label>
        </div>
      )}
    </div>
  );
}