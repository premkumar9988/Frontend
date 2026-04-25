"use client";

import { useState } from "react";

const INITIAL_FORM = { name: "", age: 25, email: "" };

export default function UserManager() {
  const [formData, setFormData]     = useState(INITIAL_FORM);
  const [savedUser, setSavedUser]   = useState(null);
  const [users, setUsers]           = useState([]);
  const [count, setCount]           = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSaveUser = () => {
    if (!formData.name.trim()) return;
    setSavedUser({ ...formData });
  };

  const handleAddUser = () => {
    if (!formData.name.trim()) return;
    setUsers((prev) => [...prev, { ...formData }]);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">User Manager</h1>

      {/* Auth */}
      <section className="space-y-2">
        <p className="text-sm text-gray-500">
          Status:{" "}
          <span className={isLoggedIn ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
            {isLoggedIn ? "Logged in" : "Logged out"}
          </span>
        </p>
        <button
          onClick={() => setIsLoggedIn((prev) => !prev)}
          className="px-4 py-1.5 border rounded text-sm hover:bg-gray-50"
        >
          {isLoggedIn ? "Log out" : "Log in"}
        </button>
      </section>

      {/* Form */}
      <section className="space-y-3">
        <h2 className="text-base font-medium">Form</h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Full name"
          onChange={handleChange}
          className="block w-full border rounded px-3 py-2 text-sm"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          placeholder="Age"
          min={0}
          max={120}
          onChange={handleChange}
          className="block w-full border rounded px-3 py-2 text-sm"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email address"
          onChange={handleChange}
          className="block w-full border rounded px-3 py-2 text-sm"
        />

        <div className="flex gap-2">
          <button
            onClick={handleSaveUser}
            className="px-4 py-1.5 border rounded text-sm hover:bg-gray-50"
          >
            Save user
          </button>
          <button
            onClick={handleAddUser}
            className="px-4 py-1.5 border rounded text-sm hover:bg-gray-50"
          >
            Add to list
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-1.5 border rounded text-sm text-gray-400 hover:bg-gray-50"
          >
            Clear
          </button>
        </div>
      </section>

      {/* Saved user */}
      {savedUser && (
        <section>
          <h2 className="text-base font-medium mb-1">Saved user</h2>
          <p className="text-sm text-gray-600">
            {savedUser.name} · Age {savedUser.age} · {savedUser.email || "No email"}
          </p>
        </section>
      )}

      {/* Counter */}
      <section>
        <h2 className="text-base font-medium mb-2">Counter</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCount((n) => n - 1)}
            className="px-3 py-1 border rounded text-sm hover:bg-gray-50"
          >
            −
          </button>
          <span className="text-xl font-semibold w-8 text-center">{count}</span>
          <button
            onClick={() => setCount((n) => n + 1)}
            className="px-3 py-1 border rounded text-sm hover:bg-gray-50"
          >
            +
          </button>
          <button
            onClick={() => setCount(0)}
            className="px-3 py-1 text-xs text-gray-400 border rounded hover:bg-gray-50"
          >
            Reset
          </button>
        </div>
      </section>

      {/* User list */}
      <section>
        <h2 className="text-base font-medium mb-2">
          User list{" "}
          <span className="text-gray-400 font-normal">({users.length})</span>
        </h2>

        {users.length === 0 ? (
          <p className="text-sm text-gray-400">No users added yet.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((user, index) => (
              <li
                key={index}
                className="text-sm border rounded px-3 py-2 text-gray-700"
              >
                <span className="font-medium">{user.name}</span>
                {" · "} Age {user.age}
                {user.email && ` · ${user.email}`}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}