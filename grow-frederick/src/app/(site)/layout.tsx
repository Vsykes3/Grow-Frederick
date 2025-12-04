export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout is a pass-through since the root layout already provides Navbar and Footer
  // It exists to group site routes together without affecting the URL structure
  return <>{children}</>;
}
