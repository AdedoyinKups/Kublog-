import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  weight: [ "400", "500", "600", "700"],
  subsets: ["latin"],
});



export const metadata = {
  title: "Kublog - oG blog",
  description: "d oG blog app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${outfit.className}`}
      >
        {children}
      </body>
    </html>
  );
}
