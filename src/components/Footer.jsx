import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#ffffff",
        borderTop: "1px solid #e5e7eb",
        marginTop: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ color: "#111827", fontWeight: "bold" }}>Tool Base JP</div>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Link to="/contact" style={{ textDecoration: "none", color: "#4b5563" }}>
            お問い合わせ
          </Link>
          <Link to="/privacy" style={{ textDecoration: "none", color: "#4b5563" }}>
            プライバシーポリシー
          </Link>
        </div>

        <div style={{ color: "#6b7280", fontSize: "14px" }}>© Tool Base JP</div>
      </div>
    </footer>
  );
}