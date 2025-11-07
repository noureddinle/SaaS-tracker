"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Plus, Download, MoreHorizontal, Moon, Sun, TrendingUp, TrendingDown, ChevronDown } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useTheme } from "@/theme/ThemeContext";

export default function InvoicesPage() {
  const { theme, toggleTheme } = useTheme();
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PAID" | "PENDING" | "OVERDUE">("ALL");
  const [dateRange, setDateRange] = useState("Last 7 days");
  const [compareView, setCompareView] = useState("Previous period");
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const dateRangeRef = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);

  const dateRangeOptions = ["Last 7 days", "Last 30 days", "Last 90 days", "This year"];
  const compareOptions = ["Previous period", "Previous year", "No comparison"];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateRangeRef.current && !dateRangeRef.current.contains(event.target as Node)) {
        setIsDateRangeOpen(false);
      }
      if (compareRef.current && !compareRef.current.contains(event.target as Node)) {
        setIsCompareOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mock invoice data
  const invoices = [
    { id: 1, invoice_number: "INV-001", client_name: "Acme Corp", amount: 5000, currency: "USD", status: "PAID", created_at: "2025-11-01", due_date: "2025-11-15" },
    { id: 2, invoice_number: "INV-002", client_name: "Tech Solutions", amount: 3500, currency: "USD", status: "PENDING", created_at: "2025-11-03", due_date: "2025-11-20" },
    { id: 3, invoice_number: "INV-003", client_name: "Design Studio", amount: 2800, currency: "EUR", status: "OVERDUE", created_at: "2025-10-15", due_date: "2025-10-30" },
    { id: 4, invoice_number: "INV-004", client_name: "Marketing Agency", amount: 4200, currency: "USD", status: "PAID", created_at: "2025-11-05", due_date: "2025-11-18" },
    { id: 5, invoice_number: "INV-005", client_name: "Startup Inc", amount: 1500, currency: "USD", status: "PENDING", created_at: "2025-11-08", due_date: "2025-11-25" },
  ];

  const filteredInvoices = statusFilter === "ALL" 
    ? invoices 
    : invoices.filter(inv => inv.status === statusFilter);

  const stats = {
    total: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    paid: invoices.filter(inv => inv.status === "PAID").reduce((sum, inv) => sum + inv.amount, 0),
    pending: invoices.filter(inv => inv.status === "PENDING").reduce((sum, inv) => sum + inv.amount, 0),
    overdue: invoices.filter(inv => inv.status === "OVERDUE").reduce((sum, inv) => sum + inv.amount, 0),
  };

  // Mock chart data points for the line chart
  const chartData = [
    { date: "Nov 1", value: 5000 },
    { date: "Nov 2", value: 5000 },
    { date: "Nov 3", value: 8500 },
    { date: "Nov 4", value: 8500 },
    { date: "Nov 5", value: 12700 },
    { date: "Nov 6", value: 12700 },
    { date: "Nov 7", value: 14200 },
    { date: "Nov 8", value: 17000 },
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));
  const minValue = Math.min(...chartData.map(d => d.value));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID": return "bg-green-500";
      case "PENDING": return "bg-yellow-500";
      case "OVERDUE": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className={`min-h-screen flex ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
      <DashboardSidebar />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Top bar */}
        <header className={`border-b ${theme === "light" ? "border-gray-100" : "border-gray-900"} px-6 py-3 flex items-center justify-between`}>
          <h1 className="text-lg font-semibold">Invoices</h1>
          <div className="flex items-center gap-2">
            <button className={`p-1.5 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} rounded-md`}>
              <Bell className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
            </button>
            <button onClick={toggleTheme} className={`flex-1 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-900"} p-1.5 rounded-md`}>
              {theme === "light" ? <Moon className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} /> : <Sun className={`w-4 h-4 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />}
            </button>
          </div>
        </header>

        <div className="flex-1 px-6 py-6">
          {/* Today Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Today</h2>
            
            {/* Gross Volume Chart */}
            <div className={`rounded-lg border ${theme === "light" ? "border-gray-100 bg-white" : "border-gray-800 bg-gray-950"} p-6 mb-4`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className={`text-sm font-medium mb-1 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Gross volume</h3>
                  <p className="text-3xl font-semibold">${stats.total.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-500 font-medium">+12.5%</span>
                  <span className={theme === "light" ? "text-gray-500" : "text-gray-500"}>vs last period</span>
                </div>
              </div>
              
              {/* Line Chart */}
              <div className="relative h-48 w-full">
                <svg className="w-full h-full" viewBox="0 0 800 192" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <g className={theme === "light" ? "stroke-gray-200" : "stroke-gray-800"} strokeWidth="1">
                    <line x1="0" y1="0" x2="800" y2="0" />
                    <line x1="0" y1="48" x2="800" y2="48" />
                    <line x1="0" y1="96" x2="800" y2="96" />
                    <line x1="0" y1="144" x2="800" y2="144" />
                    <line x1="0" y1="192" x2="800" y2="192" />
                  </g>
                  
                  {/* Line path */}
                  <path
                    d={chartData.map((point, i) => {
                      const x = (i / (chartData.length - 1)) * 800;
                      const y = 192 - ((point.value - minValue) / (maxValue - minValue)) * 192;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke={theme === "light" ? "#3b82f6" : "#6366f1"}
                    strokeWidth="2"
                    className="drop-shadow-sm"
                  />
                  
                  {/* Area under line */}
                  <path
                    d={`${chartData.map((point, i) => {
                      const x = (i / (chartData.length - 1)) * 800;
                      const y = 192 - ((point.value - minValue) / (maxValue - minValue)) * 192;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }).join(' ')} L 800 192 L 0 192 Z`}
                    fill={theme === "light" ? "rgba(59, 130, 246, 0.1)" : "rgba(99, 102, 241, 0.1)"}
                  />
                  
                  {/* Data points */}
                  {chartData.map((point, i) => {
                    const x = (i / (chartData.length - 1)) * 800;
                    const y = 192 - ((point.value - minValue) / (maxValue - minValue)) * 192;
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="3"
                        fill={theme === "light" ? "#3b82f6" : "#6366f1"}
                        className="hover:r-5 transition-all"
                      />
                    );
                  })}
                </svg>
              </div>
              
              {/* Chart labels */}
              <div className="flex justify-between mt-3">
                {chartData.map((point, i) => (
                  <span key={i} className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                    {point.date}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className={`rounded-lg border ${theme === "light" ? "border-gray-100 bg-white" : "border-gray-800 bg-gray-950"} p-4`}>
                <p className={`text-xs mb-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>USD balance</p>
                <p className="text-2xl font-semibold">${stats.paid.toLocaleString()}</p>
              </div>
              <div className={`rounded-lg border ${theme === "light" ? "border-gray-100 bg-white" : "border-gray-800 bg-gray-950"} p-4`}>
                <p className={`text-xs mb-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Pending</p>
                <p className="text-2xl font-semibold">${stats.pending.toLocaleString()}</p>
              </div>
              <div className={`rounded-lg border ${theme === "light" ? "border-gray-100 bg-white" : "border-gray-800 bg-gray-950"} p-4`}>
                <p className={`text-xs mb-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Overdue</p>
                <p className="text-2xl font-semibold text-red-500">${stats.overdue.toLocaleString()}</p>
              </div>
            </div>
          </section>

          {/* Your Overview Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Your overview</h2>
              <div className="flex items-center gap-2">
                <button className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-black hover:bg-gray-800 text-white border ${theme === "light" ? "border-gray-300 hover:bg-gray-50" : "border-gray-700 hover:bg-gray-900"}`}>
                  <Plus className="w-4 h-4" />
                  Add
                </button>
                <button className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-blue-900 text-white border ${theme === "light" ? "border-gray-300 hover:bg-gray-50" : "border-gray-700 hover:bg-gray-900"}`}>
                  <MoreHorizontal className="w-4 h-4" />
                  Edit
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Date range</span>
                
                {/* Custom Select Menu */}
                <div className="relative" ref={dateRangeRef}>
                  <button
                    onClick={() => setIsDateRangeOpen(!isDateRangeOpen)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border ${
                      theme === "light"
                        ? "bg-white border-gray-300 text-gray-900 hover:border-gray-400"
                        : "bg-gray-950 border-gray-700 text-gray-300 hover:border-gray-600"
                    } focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200 min-w-[140px] justify-between`}
                  >
                    <span>{dateRange}</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isDateRangeOpen ? "rotate-180" : ""
                      }`} 
                    />
                  </button>
                  
                  {/* Dropdown Menu with Animations */}
                  <div
                    className={`absolute top-full left-0 mt-1 z-50 rounded-md border shadow-lg overflow-hidden ${
                      theme === "light"
                        ? "bg-white border-gray-200"
                        : "bg-gray-950 border-gray-800"
                    } ${
                      isDateRangeOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    } transition-all duration-200 ease-out min-w-[140px]`}
                  >
                    {dateRangeOptions.map((option, index) => (
                      <button
                        key={option}
                        onClick={() => {
                          setDateRange(option);
                          setIsDateRangeOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm transition-all duration-150 ${
                          dateRange === option
                            ? theme === "light"
                              ? "bg-blue-500 text-white"
                              : "bg-blue-600 text-white"
                            : theme === "light"
                              ? "text-gray-900 hover:bg-gray-50"
                              : "text-gray-300 hover:bg-gray-900"
                        } ${
                          isDateRangeOpen
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                        style={{
                          transitionDelay: isDateRangeOpen ? `${index * 30}ms` : "0ms"
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Compare</span>
                
                {/* Custom Select Menu */}
                <div className="relative" ref={compareRef}>
                  <button
                    onClick={() => setIsCompareOpen(!isCompareOpen)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border ${
                      theme === "light"
                        ? "bg-white border-gray-300 text-gray-900 hover:border-gray-400"
                        : "bg-gray-950 border-gray-700 text-gray-300 hover:border-gray-600"
                    } focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200 min-w-[160px] justify-between`}
                  >
                    <span>{compareView}</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isCompareOpen ? "rotate-180" : ""
                      }`} 
                    />
                  </button>
                  
                  {/* Dropdown Menu with Animations */}
                  <div
                    className={`absolute top-full left-0 mt-1 z-50 rounded-md border shadow-lg overflow-hidden ${
                      theme === "light"
                        ? "bg-white border-gray-200"
                        : "bg-gray-950 border-gray-800"
                    } ${
                      isCompareOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    } transition-all duration-200 ease-out min-w-[160px]`}
                  >
                    {compareOptions.map((option, index) => (
                      <button
                        key={option}
                        onClick={() => {
                          setCompareView(option);
                          setIsCompareOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm transition-all duration-150 ${
                          compareView === option
                            ? theme === "light"
                              ? "bg-blue-500 text-white"
                              : "bg-blue-600 text-white"
                            : theme === "light"
                              ? "text-gray-900 hover:bg-gray-50"
                              : "text-gray-300 hover:bg-gray-900"
                        } ${
                          isCompareOpen
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                        style={{
                          transitionDelay: isCompareOpen ? `${index * 30}ms` : "0ms"
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button 
                  onClick={() => setStatusFilter("ALL")}
                  className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                    statusFilter === "ALL" 
                      ? theme === "light" ? "bg-gray-200 text-black" : "bg-gray-800 text-white"
                      : theme === "light" ? "text-gray-600 hover:bg-gray-100" : "text-gray-400 hover:bg-gray-900"
                  }`}
                >
                  All
                </button>
                <button 
                  onClick={() => setStatusFilter("PAID")}
                  className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                    statusFilter === "PAID" 
                      ? theme === "light" ? "bg-gray-200 text-black" : "bg-gray-800 text-white"
                      : theme === "light" ? "text-gray-600 hover:bg-gray-100" : "text-gray-400 hover:bg-gray-900"
                  }`}
                >
                  Paid
                </button>
                <button 
                  onClick={() => setStatusFilter("PENDING")}
                  className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                    statusFilter === "PENDING" 
                      ? theme === "light" ? "bg-gray-200 text-black" : "bg-gray-800 text-white"
                      : theme === "light" ? "text-gray-600 hover:bg-gray-100" : "text-gray-400 hover:bg-gray-900"
                  }`}
                >
                  Pending
                </button>
                <button 
                  onClick={() => setStatusFilter("OVERDUE")}
                  className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                    statusFilter === "OVERDUE" 
                      ? theme === "light" ? "bg-gray-200 text-black" : "bg-gray-800 text-white"
                      : theme === "light" ? "text-gray-600 hover:bg-gray-100" : "text-gray-400 hover:bg-gray-900"
                  }`}
                >
                  Overdue
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className={`rounded-lg border ${theme === "light" ? "border-gray-100 bg-white" : "border-gray-800 bg-gray-950"} p-6`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-sm font-medium ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Total invoices</h3>
                  <span className={`text-xs px-2 py-1 rounded ${theme === "light" ? "bg-gray-100 text-gray-600" : "bg-gray-900 text-gray-400"}`}>
                    {invoices.length}
                  </span>
                </div>
                <p className="text-3xl font-semibold mb-1">${stats.total.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-green-500 font-medium">8.2%</span>
                  <span className={theme === "light" ? "text-gray-500" : "text-gray-500"}>from last period</span>
                </div>
              </div>

              <div className={`rounded-lg border ${theme === "light" ? "border-gray-100 bg-white" : "border-gray-800 bg-gray-950"} p-6`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-sm font-medium ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Payment rate</h3>
                  <span className={`text-xs px-2 py-1 rounded ${theme === "light" ? "bg-green-100 text-green-700" : "bg-green-950 text-green-400"}`}>
                    Healthy
                  </span>
                </div>
                <p className="text-3xl font-semibold mb-1">
                  {Math.round((stats.paid / stats.total) * 100)}%
                </p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-red-500 font-medium">-2.1%</span>
                  <span className={theme === "light" ? "text-gray-500" : "text-gray-500"}>from last period</span>
                </div>
              </div>
            </div>

            {/* Invoices List */}
            <div className={`rounded-lg border ${theme === "light" ? "border-gray-100 bg-white" : "border-gray-800 bg-gray-950"} overflow-hidden`}>
              <div className={`px-6 py-4 border-b ${theme === "light" ? "border-gray-100" : "border-gray-800"}`}>
                <h3 className="text-sm font-semibold">Recent invoices</h3>
              </div>
              
              <div className={`${theme === "light" ? "divide-y divide-gray-100" : "divide-y divide-gray-900"}`}>
                {filteredInvoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className={`group px-6 py-4 ${theme === "light" ? "hover:bg-gray-50" : "hover:bg-gray-900"} transition-colors`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getStatusColor(invoice.status)}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3">
                            <span className={`text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                              {invoice.invoice_number}
                            </span>
                            <span className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                              {invoice.client_name}
                            </span>
                          </div>
                          <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"} mt-0.5`}>
                            Due {new Date(invoice.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-semibold ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>
                            {invoice.currency} ${invoice.amount.toLocaleString()}
                          </p>
                          <p className={`text-xs capitalize ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                            {invoice.status.toLowerCase()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                        <button className={`p-1.5 rounded-md transition-colors ${theme === "light" ? "hover:bg-gray-200 text-gray-700" : "hover:bg-gray-800 text-gray-300"}`}>
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button className={`p-1.5 rounded-md transition-colors ${theme === "light" ? "hover:bg-gray-200 text-gray-700" : "hover:bg-gray-800 text-gray-300"}`}>
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
