import { Link } from "react-router-dom";
import OthelloGame from "../components/OthelloGame";

export default function OthelloPage() {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ marginBottom: "8px" }}>オセロ</h1>
        <p style={{ color: "#4b5563" }}>
          CPU対戦つきのシンプルなオセロゲームです。
        </p>
        <Link to="/tools" style={{ color: "#2563eb", textDecoration: "none" }}>
          ← ツール一覧に戻る
        </Link>
      </div>

      <OthelloGame />
    </div>
  );
}