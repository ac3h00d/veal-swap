import { useEffect, useState } from 'react';

export default function LiveFeedPlaceholder() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="chartPlaceholder">
      <h4>📡 Pump.fun Token Feed</h4>
      <div className="chartBox">
        {loading ? (
          <p>Fetching live tokens from Pump.fun...</p>
        ) : (
          <p>[Live token data will display here]</p>
        )}
      </div>
    </div>
  );
}