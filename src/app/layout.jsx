import "./globals.css";

export const metadata = {
  title: "23 ans 💖",
  description: "Expérience anniversaire",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}