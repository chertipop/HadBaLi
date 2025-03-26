"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    telephoneNumber: "",
  });
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Registration failed");

      const data = await res.json();

      setMessage("User registered successfully!");
      setForm({ name: "", email: "", password: "", telephoneNumber: "" });

      // Redirect after short delay
      setTimeout(() => router.push("/api/auth/signin"), 500);
    } catch (error) {
      setMessage("Registration failed. Please try again.");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "password", "telephoneNumber"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : field === "password" ? "password" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        ))}

        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Register
        </button>

        {message && (
          <p className={`text-center mt-2 ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}