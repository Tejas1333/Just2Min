import '../styles/globals.css'

export const metadata = {
  title: 'Just 2 Minutes',
  description: 'Lower activation energy — start with 2 minutes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  )
}