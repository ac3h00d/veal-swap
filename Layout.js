// components/Layout.js
export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <h1>Veal Swap | Matrix Tracker</h1>
        <nav>
          <ul>
            <li>Movers</li>
            <li>New Tokens</li>
            <li>Watchlist</li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}