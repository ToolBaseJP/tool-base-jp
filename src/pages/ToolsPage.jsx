import { Link } from "react-router-dom";

export default function ToolsPage() {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "12px" }}>ツール一覧</h1>
      <p style={{ color: "#4b5563", marginBottom: "24px" }}>
        Tool Base JP で公開しているツールです。
      </p>

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
          <h2 style={{ marginTop: 0, marginBottom: "10px" }}>オセロ</h2>
          <p style={{ color: "#4b5563", lineHeight: 1.7 }}>
            CPU対戦つきのシンプルなオセロゲームです。
          </p>
          <Link to="/tools/othello" style={{ color: "#2563eb", textDecoration: "none" }}>
            開く
          </Link>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            opacity: 0.85,
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: "10px" }}>追加予定</h2>
          <p style={{ color: "#4b5563", lineHeight: 1.7 }}>
            今後、便利ツールや他のゲームを追加予定です。
          </p>
        </div>
      </div>
    </div>
  );
}