// pages/index.js
import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../Layout";
import WalletPanel from "../components/WalletPanel";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  const { publicKey } = useWallet();
  const [activeTab, setActiveTab] = useState("movers");
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatch = (token) => {
    const exists = watchlist.some((t) => t.name === token.name);
    if (exists) {
      setWatchlist(watchlist.filter((t) => t.name !== token.name));
    } else {
      setWatchlist([...watchlist, token]);
    }
  };

  const tokenData = {
    movers: [
      { name: "Fentanyl", mcap: "$36.7K" },
      { name: "Unemployed Corp", mcap: "$10.3K" },
    ],
    graduate: [
      { name: "GEDcoin", mcap: "$4.2K" },
      { name: "NightSchool", mcap: "$6.5K" },
    ],
    watchlist,
  };

  const filteredTokens = tokenData[activeTab] || [];

  return (
    <Layout>
      <Head>
        <title>Veal Swap | Matrix Tracker</title>
      </Head>

      <div className="walletPanel">
        <WalletMultiButton />
      </div>

      <WalletPanel publicKey={publicKey} />

      <div className="tokenGrid">
        {filteredTokens.map((token, i) => {
          const inWatchlist = watchlist.some((t) => t.name === token.name);
          return (
            <div key={i} className="tokenCard">
              <h3>{token.name}</h3>
              <p>Market Cap: {token.mcap}</p>
              <button onClick={() => toggleWatch(token)}>
                {inWatchlist
                  ? "− Remove from Watchlist"
                  : "+ Add to Watchlist"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="chartPlaceholder">
        <h4>🚨 Live Signal Activity</h4>
        <div className="chartBox">
          <p>[Webhook Trigger Logs Appear Here]</p>
        </div>
      </div>
    </Layout>
  );
}