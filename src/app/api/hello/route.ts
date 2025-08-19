import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ message: "Hello from Rumora API!" })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({ 
      message: "Data received successfully", 
      data: body 
    })
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    )
  }
} 