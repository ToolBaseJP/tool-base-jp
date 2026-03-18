import { Link } from "react-router-dom";
import OthelloGame from "../components/OthelloGame";

export default function OthelloPage() {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>
      <section style={{ marginBottom: "24px" }}>
        <h1 style={{ marginBottom: "10px", fontSize: "36px" }}>オセロ</h1>

        <p style={{ color: "#4b5563", lineHeight: 1.7, marginBottom: "16px" }}>
          CPU対戦、難易度変更、1手戻る機能つきのシンプルなオセロゲームです。
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
          <span
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "999px",
              padding: "8px 14px",
              fontSize: "14px",
              color: "#374151",
            }}
          >
            CPU対戦あり
          </span>

          <span
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "999px",
              padding: "8px 14px",
              fontSize: "14px",
              color: "#374151",
            }}
          >
            難易度選択あり
          </span>

          <span
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "999px",
              padding: "8px 14px",
              fontSize: "14px",
              color: "#374151",
            }}
          >
            1手戻る対応
          </span>
        </div>

        <Link to="/tools" style={{ color: "#2563eb", textDecoration: "none" }}>
          ← ツール一覧に戻る
        </Link>
      </section>

      <section>
        <OthelloGame />
      </section>
    </div>
  );
}