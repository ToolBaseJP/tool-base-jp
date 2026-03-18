import { Link } from "react-router-dom";

export default function ToolsPage() {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>ツール一覧</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginTop: 0 }}>オセロ</h2>
          <p style={{ color: "#4b5563", lineHeight: 1.7 }}>
            CPU対戦つきのシンプルなオセロゲームです。
          </p>
          <Link to="/tools/othello" style={{ color: "#2563eb", textDecoration: "none" }}>
            開く
          </Link>
        </div>
      </div>
    </div>
  );
}