import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        padding: "16px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#111827",
            textDecoration: "none",
          }}
        >
          Tool Base JP
        </Link>

        <nav style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#374151" }}>
            ホーム
          </Link>
          <Link to="/tools" style={{ textDecoration: "none", color: "#374151" }}>
            ツール
          </Link>
          <Link to="/contact" style={{ textDecoration: "none", color: "#374151" }}>
            お問い合わせ
          </Link>
          <Link to="/privacy" style={{ textDecoration: "none", color: "#374151" }}>
            プライバシーポリシー
          </Link>
        </nav>
      </div>
    </header>
  );
}