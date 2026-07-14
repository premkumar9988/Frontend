let orders = [];

export async function GET() {
  return Response.json({
    success: true,
    orders,
  });
}

export async function POST(req) {
  const body = await req.json();

  // ✅ ensure only valid items are stored
  const filteredItems = (body.items || []).filter(item => item.qty > 0);

  const newOrder = {
    id: "ORD-" + Date.now(),
    date: new Date().toLocaleDateString(),

    items: filteredItems.map(item => ({
      title: item.title,
      author: item.author,
      image: item.image || item.cover, // ✅ handle both
      price: item.price,
      qty: item.qty,
    })),

    itemsCount: filteredItems.length,
    total: body.total,
    status: body.status || "processing",
    paymentMethod: body.paymentMethod,
    trackingNumber: "TRK" + Math.floor(Math.random() * 1000000),
    deliveryAddress: body.deliveryAddress,
  };

  orders.push(newOrder);

  return Response.json({
    success: true,
    order: newOrder,
  });
}