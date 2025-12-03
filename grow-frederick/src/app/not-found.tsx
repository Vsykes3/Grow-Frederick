import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Page not found</h1>
      <p style={{ opacity: 0.8 }}>This page doesn't exist. Head back to the dashboard.</p>
      <Link
        href="/"
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "999px",
          border: "1px solid #ccc",
          textDecoration: "none",
        }}
      >
        Go home
      </Link>
    </main>
  );
}

