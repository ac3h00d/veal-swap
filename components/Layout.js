// components/Layout.js
export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <h1>Veal Swap | Matrix Tracker</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}