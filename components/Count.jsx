"use client";

import { useState, useEffect } from "react";

export default function Count () {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [input, setinput] = useState("");
  const [output, setoutput] = useState("");

  useEffect(() => {
    console.log("count has been updated to", count);
    console.log("name is updated to", name);
  }, [count, name]);

  useEffect(() => {
    setoutput(input.toUpperCase());
  }, [input]);



  return (
    <div>
      <h1 className="text-2xl font-semibold">Count: {count}</h1>
      <h1 className="text-xl font-medium">Name: {name}</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => setCount(count - 1)}
      >
        Decrement
      </button>

      <input
        type="text"
        value={name}
        placeholder="enter a name"
        onChange={(e) => setName(e.target.value)}
        className="border p-4"
      />
      <input
        type="text"
        onChange={(e) => setinput(e.target.value)}
        className="border p-4"
      />
      <p className="text-lg font-medium">Output: {output}</p>
    </div>


  );
}
