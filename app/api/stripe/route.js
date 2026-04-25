import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { amount } = await req.json();

    if (!amount) {
      return Response.json({ error: "Amount required" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: "Book Order" },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/order-success",
      cancel_url: "http://localhost:3000/checkout",
    });

    
    return Response.json({ url: session.url });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Stripe error" }, { status: 500 });
  }
}