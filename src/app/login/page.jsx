// // "use client";
// // import { useState } from "react";

// // export default function LoginPage() {
// //   const [form, setForm] = useState({
// //     email: "",
// //     password: "",
// //   });
// //   const [message, setMessage] = useState("");

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setMessage("Logging in...");

// //     try {
// //       const res = await fetch("/api/auth/login", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(form),
// //       });

// //       const data = await res.json();

// //       if (res.ok) {
// //         // If token returned, save it in localStorage or cookies
// //         if (data.token) {
// //           document.cookie = `token=${data.token}; path=/`;
// //         }

// //         setMessage("✅ Login successful! Redirecting...");
// //         setTimeout(() => {
// //           window.location.href = "/";
// //         }, 1500);
// //       } else {
// //         setMessage(`❌ ${data.error || "Invalid credentials"}`);
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       setMessage("⚠️ Something went wrong");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-white text-gray-600 p-8 rounded-2xl shadow-md w-96"
// //       >
// //         <h2 className="text-2xl font-semibold mb-6 text-center">
// //           Login to Account
// //         </h2>

// //         <input
// //           type="email"
// //           name="email"
// //           placeholder="Email Address"
// //           value={form.email}
// //           onChange={handleChange}
// //           required
// //           className="w-full p-2 mb-3 border rounded"
// //         />

// //         <input
// //           type="password"
// //           name="password"
// //           placeholder="Password"
// //           value={form.password}
// //           onChange={handleChange}
// //           required
// //           className="w-full p-2 mb-4 border rounded"
// //         />

// //         <button
// //           type="submit"
// //           className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
// //         >
// //           Login
// //         </button>

// //         {message && (
// //           <p className="text-center mt-4 text-sm text-gray-600">{message}</p>
// //         )}

// //         <p className="text-center text-sm mt-4">
// //           Don’t have an account?{" "}
// //           <a href="/register" className="text-blue-600 hover:underline">
// //             Register
// //           </a>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // }

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Sparkles } from "lucide-react";

// export default function LoginPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("Logging in...");

//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         document.cookie = `token=${data.token}; path=/`;
//         setMessage("✅ Login successful! Redirecting...");
//         setTimeout(() => router.push("/dashboard"), 1200);
//       } else {
//         setMessage(`❌ ${data.error || "Invalid credentials"}`);
//       }
//     } catch {
//       setMessage("⚠️ Something went wrong");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center p-4"
//       style={{
//         background:
//           "linear-gradient(135deg, #fafbfc 0%, #f0f9ff 50%, #fef3c7 100%)",
//       }}
//     >
//       <div
//         className="w-full max-w-md p-8 rounded-2xl"
//         style={{
//           background: "rgba(255, 255, 255, 0.7)",
//           backdropFilter: "blur(20px)",
//           WebkitBackdropFilter: "blur(20px)",
//           boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
//         }}
//       >
//         <div className="text-center mb-6">
//           <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-teal-500/30">
//             <Sparkles className="w-7 h-7 text-white" />
//           </div>
//           <h2 className="text-xl font-semibold text-gray-800">Welcome back</h2>
//           <p className="text-gray-500">Sign in to your TeamFinance workspace</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="text-sm font-medium text-gray-600">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               className="w-full h-11 rounded-xl px-3 mt-1 border-0 text-gray-700"
//               style={{
//                 background: "rgba(255, 255, 255, 0.6)",
//                 backdropFilter: "blur(10px)",
//               }}
//               placeholder="john@example.com"
//             />
//           </div>
//           <div>
//             <label className="text-sm font-medium text-gray-600">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               required
//               className="w-full h-11 rounded-xl px-3 mt-1 border-0 text-gray-700"
//               style={{
//                 background: "rgba(255, 255, 255, 0.6)",
//                 backdropFilter: "blur(10px)",
//               }}
//               placeholder="••••••••"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium shadow-lg shadow-teal-500/30 transition"
//           >
//             Sign in
//           </button>
//         </form>

//         {message && (
//           <p className="text-center mt-4 text-sm text-gray-600">{message}</p>
//         )}

//         <p className="text-center text-sm mt-6 text-gray-600">
//           Don’t have an account?{" "}
//           <button
//             onClick={() => router.push("/register")}
//             className="text-teal-600 hover:text-teal-700 transition-colors"
//           >
//             Sign up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("Logging in...");

  const res = await signIn("credentials", {
    redirect: false,
    email: form.email,
    password: form.password,
    callbackUrl: "/dashboard",
  });

  if (res?.error) {
    setMessage("❌ Invalid credentials");
  } else {
    setMessage("✅ Login successful! Redirecting...");
    router.push("/dashboard");
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
          <h2 className="text-xl font-semibold text-gray-800">Welcome back</h2>
          <p className="text-gray-500">Sign in to your TeamFinance workspace</p>
        </div>

        {/* Manual login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full h-11 rounded-xl px-3 mt-1 border-0 text-gray-700"
              style={{
                background: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(10px)",
              }}
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full h-11 rounded-xl px-3 mt-1 border-0 text-gray-700"
              style={{
                background: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(10px)",
              }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium shadow-lg shadow-teal-500/30 transition"
          >
            Sign in
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex justify-center my-6">
          <span
            className="px-4 text-gray-500 text-sm"
            style={{
              background: "rgba(255, 255, 255, 0.7)",
            }}
          >
            Or continue with
          </span>
        </div>

        {/* OAuth buttons */}
        <div className="grid grid-cols-2 gap-3">
          {/* Google */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="h-12 rounded-xl bg-white/70 hover:bg-white transition-all border border-gray-200 flex items-center justify-center gap-2 text-gray-700 hover:shadow-md hover:scale-[1.02]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 11h11v2H12z"
                transform="rotate(-45 12 12)"
              />
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>

          {/* GitHub */}
          <button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="h-12 rounded-xl bg-white/70 hover:bg-gray-100 transition-all border border-gray-200 flex items-center justify-center gap-2 text-gray-700 hover:shadow-md hover:scale-[1.02]"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            GitHub
          </button>
        </div>

        {message && (
          <p className="text-center mt-4 text-sm text-gray-600">{message}</p>
        )}

        <p className="text-center text-sm mt-6 text-gray-600">
          Don’t have an account?{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-teal-600 hover:text-teal-700 transition-colors"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
