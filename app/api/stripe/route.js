import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!secretKey) {
      console.error("Missing STRIPE_SECRET_KEY environment variable");
      return NextResponse.json(
        { message: "Server misconfigured: missing STRIPE_SECRET_KEY" },
        { status: 500 }
      );
    }

    if (!baseUrl) {
      console.error("Missing NEXT_PUBLIC_BASE_URL environment variable");
      return NextResponse.json(
        { message: "Server misconfigured: missing NEXT_PUBLIC_BASE_URL" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secretKey);

    const body = await request.json();
    const { amount } = body;
    const currency = body.currency || "inr";

    console.log("Received body:", { amount, currency });

    if (!amount || typeof amount !== "number") {
      return NextResponse.json(
        { message: "Valid amount required" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: "Book Purchase",
            },
            unit_amount: amount * 100, // amount in rupees → paise
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cancel`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("STRIPE ERROR:", error);
    return NextResponse.json(
      { message: error.message || "Payment failed" },
      { status: 500 }
    );
  }
}