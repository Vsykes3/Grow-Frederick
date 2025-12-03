import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Store in database
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
        status: 'pending'
      }
    });

    // In a real implementation, you would send an email here using Resend
    // For now, we'll just log it
    console.log('Contact form submission:', contact);

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message. We\'ll get back to you soon!' 
    });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}















