"use client";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-sm bg-black sticky top-0 z-50">
      <div className="text-md font-bold text-primary">Oncree<span className="text-gray-700">SaaS</span></div>
      <div className="hidden md:flex space-x-6 text-gray-400">
        <a href="#features" className="text-sm font-bold hover:text-primary transition">Features</a>
        <a href="#pricing" className="text-sm font-bold hover:text-primary transition">Pricing</a>
        <a href="#contact" className="text-sm font-bold hover:text-primary transition">Contact</a>
      </div>
      <div className="flex justify-between gap-10">
        <button>
          <a href="/auth/login" className="text-gray-400 text-sm font-bold hover:text-primary transition">Login</a>
        </button>
        <button className="bg-white text-gray-800 px-3 py-2 rounded-md hover:bg-white transition">
          <a href="#" className="text-gray-800 text-sm font-bold hover:text-primary transition">Get started</a>
        </button>
      </div>
    </nav>
  );
}
