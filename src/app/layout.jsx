import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter()

export const metadata = {
  title: "NAS Explorer",
  description: "remote file explorer for nas systems.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-zinc-950 text-white`}>
        {children}
      </body>
    </html>
  )
}