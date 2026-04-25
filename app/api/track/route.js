export async function POST(req) {
  const { trackingNumber } = await req.json();

  const res = await fetch("https://api.aftership.com/v4/trackings", {
    method: "POST",
    headers: {
      "aftership-api-key": process.env.AFTERSHIP_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tracking: {
        tracking_number: trackingNumber,
        slug: "india-post",
      },
    }),
  });

  const data = await res.json();
  return Response.json(data);
}