"use client";

import { useState } from "react";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import { FaGithub, FaMicrosoft, FaApple } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useRegister } from "@/hooks/useUsers";
import { RegisterSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AuthSteps() {
  const [step, setStep] = useState<"select" | "email" | "password" | "email-verification">("select");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerMutation = useRegister();
  const router = useRouter();

  const variants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.98 },
  };

  const handlePasswordSubmit = async () => {
    const validation = RegisterSchema.safeParse({
      name: email.split("@")[0],
      email,
      password,
    });
    if (!validation.success) {
      toast.error(validation.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    try {
      await registerMutation.mutateAsync(validation.data);
      toast.success("Verification email sent");
      setStep("email-verification");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-8">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-700 flex items-center justify-center">
            <div className="h-4 w-4 border-b-2 border-r-2 border-white rotate-45" />
          </div>
        </div>

        <AnimatePresence>
          {step === "select" && (
            <motion.div
              key="select"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-lg font-semibold mb-6">Create your workspace</h2>
              <div className="space-y-3">
                <button className="w-full bg-white hover:bg-neutral-800 text-gray-700 hover:text-white border border-neutral-800 rounded-lg py-3 text-sm font-semibold flex items-center justify-center gap-2 transition">
                  <FaGithub size={16} />
                  Continue with GitHub
                </button>
                <button
                  onClick={() => setStep("email")}
                  className="w-full bg-white hover:bg-neutral-800 text-gray-700 hover:text-white border border-neutral-800 rounded-lg py-3 text-sm font-semibold flex items-center justify-center gap-2 transition"
                >
                  <Mail size={16} />
                  Continue with email
                </button>
                <button className="w-full bg-white hover:bg-neutral-800 text-gray-700 hover:text-white border border-neutral-800 rounded-lg py-3 text-sm font-semibold flex items-center justify-center gap-2 transition">
                  <FaMicrosoft size={16} />
                  Continue with Microsoft
                </button>
                <button className="w-full bg-white hover:bg-neutral-800 text-gray-700 hover:text-white border border-neutral-800 rounded-lg py-3 text-sm font-semibold flex items-center justify-center gap-2 transition">
                  <FaApple size={16} />
                  Continue with Apple
                </button>
              </div>
              <p className="text-xs font-semibold text-gray-400 mt-6 leading-relaxed">
                By signing up, you agree to our{" "}
                <a href="#" className="underline">Terms of Service</a> and{" "}
                <a href="#" className="underline">Data Processing Agreement</a>.
              </p>
              <p className="text-sm font-semibold text-gray-400 mt-6">
                Already have an account?{" "}
                <a href="/auth/login/" className="text-white hover:underline">Log in</a>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step === "email" && (
            <motion.div
              key="email"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-lg font-medium mb-6">What’s your email address?</h2>
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-sm mb-3 text-gray-300 focus:border-neutral-600 outline-none"
              />
              <button
                onClick={() => setStep("password")}
                className="w-full bg-neutral-900 hover:bg-neutral-800 rounded-lg py-3 text-sm font-medium flex items-center justify-center gap-2 transition"
              >
                Continue
              </button>
              <button
                onClick={() => setStep("select")}
                className="mt-6 text-gray-400 hover:text-white text-sm inline-flex items-center gap-1"
              >
                <ArrowLeft size={14} />
                Back
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step === "password" && (
            <motion.div
              key="password"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-lg font-medium mb-6">Enter your password</h2>
              <input
                type="password"
                placeholder="Enter your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-sm mb-3 text-gray-300 focus:border-neutral-600 outline-none"
              />
              <button
                onClick={handlePasswordSubmit}
                disabled={registerMutation.isPending}
                className="w-full bg-neutral-900 hover:bg-neutral-800 disabled:opacity-60 disabled:cursor-not-allowed rounded-lg py-3 text-sm font-medium flex items-center justify-center gap-2 transition"
              >
                {registerMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  "Continue"
                )}
              </button>
              <button
                onClick={() => setStep("email")}
                className="mt-6 text-gray-400 hover:text-white text-sm inline-flex items-center gap-1"
              >
                <ArrowLeft size={14} />
                Back
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step === "email-verification" && (
            <motion.div
              key="email-verification"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-lg font-medium mb-6">Email verification</h2>
              <p className="text-sm text-gray-400 mb-6">
                We've sent a verification email to{" "}
                <span className="font-semibold text-white">{email}</span>. Once you confirm it, you’ll be redirected to your dashboard.
              </p>
              <button
                onClick={() => setStep("select")}
                className="w-full bg-neutral-900 hover:bg-neutral-800 rounded-lg py-3 text-sm font-medium transition"
              >
                Back to options
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
