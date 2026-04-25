"use client";


export default function OrderProgress({ status }) {
  const steps = ["Placed", "Packed", "Shipped", "Delivered"];
  const current = steps.indexOf(status);

  return (
    <div className="flex gap-2 mt-2">
      {steps.map((step, i) => (
        <div key={i} className="flex-1 text-center">
          <div
            className={`h-2 ${
              i <= current ? "bg-green-500" : "bg-gray-600"
            }`}
          />
          <p className="text-xs mt-1">{step}</p>
        </div>
      ))}
    </div>
  );
}