import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'DATABASE_URL not configured' },
        { status: 503 }
      )
    }
    const items = await prisma.item.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'DATABASE_URL not configured' },
        { status: 503 }
      )
    }
    const body = await request.json()
    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }
    const item = await prisma.item.create({
      data: { name: body.name },
    })
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    )
  }
}
