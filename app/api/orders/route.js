

let orders = [];

export async function POST(req) {
  const body = await req.json();

  const items = (body.items || []).map((item) => ({
    title: item.title || item.name || "",
    author: item.author || "",
   image: item.cover || item.image || item.thumbnail || "https://via.placeholder.com/80x100?text=Book",
    price: item.price || 0,
    qty: item.qty || item.quantity || 1,
  }));

  const newOrder = {
    id: "ORD" + Date.now(),
    date: new Date().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    status: body.status || "processing",
    paymentMethod: body.paymentMethod || "Online",
    deliveryAddress: body.deliveryAddress || "",
    trackingNumber: body.trackingNumber || "TRK" + Date.now(),
    items,
    itemsCount: items.reduce((sum, i) => sum + (i.qty || 1), 0),
    total: body.total || items.reduce((sum, i) => sum + i.price * i.qty, 0),
  };

  orders.push(newOrder);

  return Response.json({
    success: true,
    order: newOrder,
  });
}

export async function GET() {
  return Response.json({
    success: true,
    orders,
  });
}