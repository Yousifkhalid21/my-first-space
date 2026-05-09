export const metadata = {
  title: "FigaroLabs Networking Studio",
  description: "Interactive networking mind map dashboard with bilingual support."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
