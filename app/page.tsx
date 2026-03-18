export const dynamic = 'force-dynamic'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getItems() {
  try {
    if (!process.env.DATABASE_URL) {
      return []
    }
    return await prisma.item.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch {
    return []
  }
}

export default async function Home() {
  const items = await getItems()

  return (
    <main className="container">
      <h1>Item List</h1>

      {!process.env.DATABASE_URL && (
        <div className="info-box">
          <p><strong>Note:</strong> DATABASE_URL environment variable is not set.</p>
          <p>The app is running in demo mode without database connection.</p>
        </div>
      )}

      {process.env.DATABASE_URL && items.length === 0 && (
        <div className="info-box">
          <p>No items yet. Add some via the API!</p>
          <code>{`curl -X POST http://localhost:3000/api/items -H "Content-Type: application/json" -d '{"name":"Test Item"}'`}</code>
        </div>
      )}

      {items.length > 0 && (
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id} className="item">
              <span className="item-name">{item.name}</span>
              <span className="item-date">{new Date(item.createdAt).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
