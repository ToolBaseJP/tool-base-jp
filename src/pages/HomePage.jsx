import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
      <section style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "42px", marginBottom: "16px" }}>Tool Base JP</h1>

        <p
          style={{
            fontSize: "18px",
            color: "#4b5563",
            marginBottom: "24px",
            lineHeight: 1.7,
          }}
        >
          Tool Base JP は、ゲーム・便利ツール・比較記事などをまとめたサイトです。
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Link
            to="/tools"
            style={{
              padding: "12px 18px",
              background: "#111827",
              color: "#fff",
              borderRadius: "10px",
              textDecoration: "none",
            }}
          >
            ツール一覧を見る
          </Link>

          <Link
            to="/tools/othello"
            style={{
              padding: "12px 18px",
              background: "#fff",
              color: "#111827",
              border: "1px solid #d1d5db",
              borderRadius: "10px",
              textDecoration: "none",
            }}
          >
            オセロを遊ぶ
          </Link>
        </div>
      </section>

      <section>
        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "24px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: "12px" }}>おすすめツール</h2>
          <p style={{ color: "#4b5563", marginBottom: "20px" }}>現在公開中のツールです。</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "20px",
              }}
            >
              <h3 style={{ marginTop: 0 }}>オセロ</h3>
              <p style={{ color: "#4b5563", lineHeight: 1.7 }}>
                CPU対戦、難易度変更、1手戻る機能つきのオセロゲームです。
              </p>
              <Link to="/tools/othello" style={{ color: "#2563eb", textDecoration: "none" }}>
                オセロを見る
              </Link>
            </div>

            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "20px",
                backgroundColor: "#f9fafb",
              }}
            >
              <h3 style={{ marginTop: 0 }}>追加予定</h3>
              <p style={{ color: "#4b5563", lineHeight: 1.7 }}>
                今後、他のゲームや便利ツールも順次公開予定です。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}