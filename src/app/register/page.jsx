// "use client";
// import { useState } from "react";

// export default function RegisterPage() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("Registering...");

//     try {
//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setMessage("✅ Registered successfully!");
//       } else {
//         setMessage(`❌ ${data.error || "Registration failed"}`);
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("⚠️ Something went wrong");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white text-gray-600 p-8 rounded-2xl shadow-md w-96"
//       >
//         <h2 className="text-2xl font-semibold mb-6 text-center">
//           Create Account
//         </h2>

//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//           className="w-full p-2 mb-3 border rounded"
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           value={form.email}
//           onChange={handleChange}
//           required
//           className="w-full p-2 mb-3 border rounded"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//           className="w-full p-2 mb-4 border rounded"
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
//         >
//           Register
//         </button>

//         {message && (
//           <p className="text-center mt-4 text-sm text-gray-600">{message}</p>
//         )}
//       </form>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Creating account...");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Account created! Redirecting...");
        setTimeout(() => router.push("/login"), 1200);
      } else {
        setMessage(`❌ ${data.error || "Failed to register"}`);
      }
    } catch {
      setMessage("⚠️ Something went wrong");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, #fafbfc 0%, #f0f9ff 50%, #fef3c7 100%)",
      }}
    >
      <div
        className="w-full max-w-md p-8 rounded-2xl"
        style={{
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
        }}
      >
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-teal-500/30">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Create your workspace
          </h2>
          <p className="text-gray-500">
            Start managing your team and finances today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
              required
              className="h-11 rounded-xl border-0 px-3 text-gray-700"
              style={{
                background: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(10px)",
              }}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
              required
              className="h-11 rounded-xl border-0 px-3 text-gray-700"
              style={{
                background: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(10px)",
              }}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full h-11 rounded-xl border-0 px-3 text-gray-700"
            style={{
              background: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(10px)",
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full h-11 rounded-xl border-0 px-3 text-gray-700"
            style={{
              background: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(10px)",
            }}
          />

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium shadow-lg shadow-teal-500/30 transition"
          >
            Create account
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-gray-600">{message}</p>
        )}

        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-teal-600 hover:text-teal-700 transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
