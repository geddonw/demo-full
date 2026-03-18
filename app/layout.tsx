import './globals.css'

export const metadata = {
  title: 'Demo Full - Next.js + Prisma + PostgreSQL',
  description: 'A demo app with database support',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
