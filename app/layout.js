import './globals.css'

export const metadata = {
  title: 'ValuationPro - Institutional Stock Analysis',
  description: 'Professional stock valuation platform with forward EPS estimates and dynamic P/E bands',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="gradient-bg">
        {children}
      </body>
    </html>
  )
}
