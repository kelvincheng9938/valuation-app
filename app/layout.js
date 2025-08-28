export const metadata = {
  title: 'ValuationPro - Institutional Stock Analysis',
  description: 'Professional stock valuation platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}