import { useEffect, useState } from 'react';

const sampleMessages = [
  '[CHIMICHURRI] Buy wall detected at 3.2K MC.',
  '[Fentanyl] Sudden spike: +48% in last 2m.',
  '[GEDcoin] Wallet drain triggered stop-loss.',
  '[Unemployed Corp] Massive sell detected.',
  '[NightSchool] Graduated. $420K MC goal hit.',
];

export default function LiveFeedPlaceholder() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMsg = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
      setLogs((prevLogs) => {
        const updated = [newMsg, ...prevLogs];
        return updated.slice(0, 5); // Keep last 5 logs
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chartPlaceholder">
      <h4>🚨 Live Signal Activity</h4>
      <div className="chartBox" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        {logs.length === 0 ? (
          <p>[Waiting for activity...]</p>
        ) : (
          logs.map((log, i) => <p key={i}>→ {log}</p>)
        )}
      </div>
    </div>
  );
}