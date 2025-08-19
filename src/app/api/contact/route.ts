import { NextRequest, NextResponse } from "next/server"
import { ContactForm } from "@/types"

export async function POST(request: NextRequest) {
  try {
    const body: ContactForm = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Log the contact request
    
    // For now, we'll just return success
    return NextResponse.json({ 
      message: "Contact form submitted successfully",
      data: {
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message
      }
    })
    
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 