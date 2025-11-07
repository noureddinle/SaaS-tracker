"use client";

import { useState, useRef, useEffect } from "react";
import { Mail, ArrowLeft, X, LogIn, Eye, EyeOff } from "lucide-react";
import { FaGithub, FaGoogle, FaMicrosoft, FaApple } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/theme/ThemeContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup?: () => void;
}

export default function LoginModal({ isOpen, onClose, onSwitchToSignup }: LoginModalProps) {
  const { theme } = useTheme();
  const [step, setStep] = useState<"select" | "email" | "password">("select");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const variants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.98 },
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep("select");
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLogin = async () => {
    console.log("Login:", { email, password });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={`w-full max-w-md rounded-xl border shadow-2xl ${
          theme === "light" ? "border-gray-200 bg-white" : "border-gray-800 bg-gray-950"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Breadcrumb Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${
          theme === "light" ? "border-gray-200" : "border-gray-800"
        }`}>
          <div className="flex items-center gap-2 text-sm">
            <div className={`flex items-center gap-1.5 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
              <div className="h-4 w-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <div className="h-2 w-2 border-b border-r border-white rotate-45" />
              </div>
              <span className="font-medium">Interlud</span>
            </div>
            <span className={theme === "light" ? "text-gray-400" : "text-gray-600"}>›</span>
            <span className={theme === "light" ? "text-gray-900" : "text-gray-200"}>
              Log in
            </span>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-md ${theme === "light" ? "hover:bg-gray-100 text-gray-600" : "hover:bg-gray-900 text-gray-400"}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-6">
          <AnimatePresence mode="wait">
            {/* Step 1 — Choose auth method */}
            {step === "select" && (
              <motion.div
                key="select"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className={`text-lg font-semibold mb-6 ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
                  Log in to your workspace
                </h2>

                <div className="space-y-3">
                  <button className={`w-full border rounded-lg py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                    theme === "light"
                      ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      : "bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800"
                  }`}>
                    <FaGithub size={16} />
                    Continue with Github
                  </button>

                  <button
                    onClick={() => setStep("email")}
                    className={`w-full border rounded-lg py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                      theme === "light"
                        ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                        : "bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    <Mail size={16} />
                    Continue with email
                  </button>

                  <button className={`w-full border rounded-lg py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                    theme === "light"
                      ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      : "bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800"
                  }`}>
                    <FaMicrosoft size={16} />
                    Continue with Microsoft
                  </button>

                  <button className={`w-full border rounded-lg py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                    theme === "light"
                      ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      : "bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800"
                  }`}>
                    <FaApple size={16} />
                    Continue with Apple
                  </button>
                </div>

                <p className={`text-xs font-medium mt-6 leading-relaxed ${
                  theme === "light" ? "text-gray-500" : "text-gray-500"
                }`}>
                  Don't have an account?{" "}
                  <button
                    onClick={onSwitchToSignup}
                    className={`underline ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}
                  >
                    Sign up
                  </button>
                </p>
              </motion.div>
            )}

            {/* Step 2 — Enter email */}
            {step === "email" && (
              <motion.div
                key="email"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className={`text-lg font-medium mb-6 ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
                  What's your email address?
                </h2>

                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && email) {
                      setStep("password");
                    }
                  }}
                  className={`w-full border rounded-lg px-4 py-3 text-sm mb-3 ${
                    theme === "light"
                      ? "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-primary-500"
                      : "bg-gray-950 border-gray-700 text-gray-200 placeholder-gray-600 focus:border-primary-500"
                  } focus:outline-none focus:ring-1 focus:ring-primary-500`}
                  autoFocus
                />

                <button
                  onClick={() => setStep("password")}
                  disabled={!email}
                  className={`w-full rounded-lg py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                    email
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : theme === "light"
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-gray-800 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  Continue
                </button>

                <button
                  onClick={() => setStep("select")}
                  className={`mt-6 text-sm inline-flex items-center gap-1 ${
                    theme === "light" ? "text-gray-500 hover:text-gray-700" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <ArrowLeft size={14} />
                  Back
                </button>
              </motion.div>
            )}

            {/* Step 3 — Enter password */}
            {step === "password" && (
              <motion.div
                key="password"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className={`text-lg font-medium mb-6 ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
                  Enter your password
                </h2>

                <div className="relative mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && password) {
                        handleLogin();
                      }
                    }}
                    className={`w-full border rounded-lg px-4 py-3 pr-10 text-sm ${
                      theme === "light"
                        ? "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-primary-500"
                        : "bg-gray-950 border-gray-700 text-gray-200 placeholder-gray-600 focus:border-primary-500"
                    } focus:outline-none focus:ring-1 focus:ring-primary-500`}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 ${
                      theme === "light" ? "text-gray-400 hover:text-gray-600" : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <button
                  onClick={handleLogin}
                  disabled={!password}
                  className={`w-full rounded-lg py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                    password
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : theme === "light"
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-gray-800 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  <LogIn size={16} />
                  Log in
                </button>

                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => setStep("email")}
                    className={`text-sm inline-flex items-center gap-1 ${
                      theme === "light" ? "text-gray-500 hover:text-gray-700" : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    <ArrowLeft size={14} />
                    Back
                  </button>
                  <button
                    className={`text-sm ${
                      theme === "light" ? "text-gray-500 hover:text-gray-700" : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    Forgot password?
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

