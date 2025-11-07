"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Bell, Moon, Sun, Briefcase, MapPin, Clock, DollarSign, 
  ExternalLink, Sparkles, Filter, RefreshCw, ChevronDown,
  CheckCircle2, XCircle, AlertCircle, Search, X, Plus,
  Target, Users, Calendar
} from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useTheme } from "@/theme/ThemeContext";
import { JobMatch, JobPosting } from "@/lib/types";

// Mock data - will be replaced with API calls later
const MOCK_JOB_MATCHES: JobMatch[] = [
  {
    id: 1,
    user: 1,
    job: {
      id: 1,
      title: "Senior React Developer",
      company: "TechCorp Inc.",
      description: "We're looking for an experienced React developer to join our team. You'll work on building scalable web applications using React, TypeScript, and modern tooling.",
      requirements: "5+ years React experience, TypeScript, Node.js, AWS",
      budget: 120,
      budget_type: "HOURLY",
      posted_date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      source: "upwork",
      source_url: "https://upwork.com/job/123",
      location: "San Francisco, CA",
      remote: true,
      skills_required: ["React", "TypeScript", "Node.js", "AWS", "GraphQL"],
      scraped_at: new Date().toISOString(),
      is_active: true,
    },
    match_score: 95,
    matching_skills: ["React", "TypeScript", "Node.js", "AWS"],
    experience_match: 0.9,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    user: 1,
    job: {
      id: 2,
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      description: "Join our fast-growing startup as a full stack engineer. You'll work on both frontend and backend, building features from concept to deployment.",
      requirements: "3+ years full stack, JavaScript, Python, Django, PostgreSQL",
      budget: 100,
      budget_type: "HOURLY",
      posted_date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      source: "linkedin",
      source_url: "https://linkedin.com/job/456",
      location: "Austin, TX",
      remote: false,
      skills_required: ["JavaScript", "Python", "Django", "PostgreSQL", "React"],
      scraped_at: new Date().toISOString(),
      is_active: true,
    },
    match_score: 88,
    matching_skills: ["JavaScript", "Python", "Django", "PostgreSQL"],
    experience_match: 0.75,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    user: 1,
    job: {
      id: 3,
      title: "Frontend Developer",
      company: "DesignCo",
      description: "We need a frontend developer to help build beautiful user interfaces. Experience with modern CSS and React is essential.",
      requirements: "2+ years frontend, React, CSS, HTML",
      budget: 70,
      budget_type: "HOURLY",
      posted_date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      source: "remoteok",
      source_url: "https://remoteok.io/job/789",
      location: "Remote",
      remote: true,
      skills_required: ["React", "CSS", "HTML", "JavaScript"],
      scraped_at: new Date().toISOString(),
      is_active: true,
    },
    match_score: 82,
    matching_skills: ["React", "CSS", "HTML", "JavaScript"],
    experience_match: 0.6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    user: 1,
    job: {
      id: 4,
      title: "Backend API Developer",
      company: "DataFlow Systems",
      description: "Looking for a backend developer to build robust APIs and microservices. Experience with Python, FastAPI, and cloud infrastructure required.",
      requirements: "4+ years backend, Python, FastAPI, Docker, Kubernetes",
      budget: 110,
      budget_type: "HOURLY",
      posted_date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      source: "upwork",
      source_url: "https://upwork.com/job/321",
      location: "New York, NY",
      remote: true,
      skills_required: ["Python", "FastAPI", "Docker", "Kubernetes", "PostgreSQL"],
      scraped_at: new Date().toISOString(),
      is_active: true,
    },
    match_score: 75,
    matching_skills: ["Python", "PostgreSQL"],
    experience_match: 0.7,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 5,
    user: 1,
    job: {
      id: 5,
      title: "Junior Frontend Developer",
      company: "SmallCo",
      description: "Entry-level position for a junior developer. Great opportunity to learn and grow with a supportive team.",
      requirements: "1+ year frontend, HTML, CSS, JavaScript basics",
      budget: 50,
      budget_type: "HOURLY",
      posted_date: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      source: "linkedin",
      source_url: "https://linkedin.com/job/654",
      location: "Chicago, IL",
      remote: false,
      skills_required: ["HTML", "CSS", "JavaScript"],
      scraped_at: new Date().toISOString(),
      is_active: true,
    },
    match_score: 65,
    matching_skills: ["HTML", "CSS", "JavaScript"],
    experience_match: 0.4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function JobsPage() {
  const { theme, toggleTheme } = useTheme();
  const [jobMatches, setJobMatches] = useState<JobMatch[]>(MOCK_JOB_MATCHES);
  const [filteredMatches, setFilteredMatches] = useState<JobMatch[]>(MOCK_JOB_MATCHES);
  const [searchQuery, setSearchQuery] = useState("");
  const [minMatchScore, setMinMatchScore] = useState(0);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"score" | "date" | "budget">("score");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobMatch | null>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter and sort jobs
  useEffect(() => {
    let filtered = [...jobMatches];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(match =>
        match.job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Match score filter
    filtered = filtered.filter(match => match.match_score >= minMatchScore);

    // Remote only filter
    if (remoteOnly) {
      filtered = filtered.filter(match => match.job.remote);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "score":
          return b.match_score - a.match_score;
        case "date":
          return new Date(b.job.posted_date || 0).getTime() - new Date(a.job.posted_date || 0).getTime();
        case "budget":
          return (b.job.budget || 0) - (a.job.budget || 0);
        default:
          return 0;
      }
    });

    setFilteredMatches(filtered);
  }, [jobMatches, searchQuery, minMatchScore, remoteOnly, sortBy]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const sortOptions = [
    { value: "score", label: "Match Score" },
    { value: "date", label: "Date Posted" },
    { value: "budget", label: "Budget" },
  ];

  const selectedSort = sortOptions.find(opt => opt.value === sortBy);

  return (
    <div className={`min-h-screen flex ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
      <DashboardSidebar />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Top bar */}
        <header className={`border-b ${theme === "light" ? "border-gray-100" : "border-gray-900"} px-6 py-3 flex items-center justify-between`}>
          <h1 className="text-lg font-semibold">Jobs</h1>
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
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Job Matches</h2>
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                {filteredMatches.length} {filteredMatches.length === 1 ? "match" : "matches"} found
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Minimal Search */}
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === "light" ? "text-gray-400" : "text-gray-500"}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-2 text-sm rounded-md border ${
                    theme === "light"
                      ? "bg-white border-gray-300 text-gray-900 focus:border-primary-500"
                      : "bg-gray-950 border-gray-700 text-gray-200 focus:border-primary-500"
                  } focus:outline-none focus:ring-1 focus:ring-primary-500 w-64`}
                  placeholder="Search jobs..."
                />
              </div>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md border transition-colors ${
                  theme === "light"
                    ? "border-gray-300 hover:bg-gray-50 text-gray-700"
                    : "border-gray-700 hover:bg-gray-900 text-gray-300"
                } ${isRefreshing ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <button
              onClick={() => setMinMatchScore(minMatchScore === 90 ? 0 : 90)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                minMatchScore === 90
                  ? theme === "light"
                    ? "bg-primary-100 text-primary-700"
                    : "bg-primary-900/30 text-primary-400"
                  : theme === "light"
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-gray-900 text-gray-300 hover:bg-gray-800"
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>90%+ Match</span>
            </button>
            <button
              onClick={() => setRemoteOnly(!remoteOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                remoteOnly
                  ? theme === "light"
                    ? "bg-primary-100 text-primary-700"
                    : "bg-primary-900/30 text-primary-400"
                  : theme === "light"
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-gray-900 text-gray-300 hover:bg-gray-800"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Remote Only</span>
            </button>
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  theme === "light"
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-gray-900 text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>{selectedSort?.label}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
              </button>
              
              {isSortOpen && (
                <div
                  className={`absolute top-full left-0 mt-1 z-50 rounded-md border shadow-lg overflow-hidden min-w-[160px] ${
                    theme === "light"
                      ? "bg-white border-gray-200"
                      : "bg-gray-950 border-gray-800"
                  }`}
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value as any);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                        sortBy === option.value
                          ? theme === "light"
                            ? "bg-primary-500 text-white"
                            : "bg-primary-600 text-white"
                          : theme === "light"
                            ? "text-gray-900 hover:bg-gray-50"
                            : "text-gray-300 hover:bg-gray-900"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Job Matches List - Card Style */}
          {filteredMatches.length === 0 ? (
            <div className={`rounded-lg border ${theme === "light" ? "border-gray-100 bg-white" : "border-gray-800 bg-gray-950"} p-12 text-center`}>
              <Briefcase className={`w-12 h-12 mx-auto mb-3 ${theme === "light" ? "text-gray-400" : "text-gray-700"}`} />
              <h3 className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-400"} mb-1`}>
                No matches found
              </h3>
              <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-600"}`}>
                Try adjusting your filters or refresh to find new matches
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMatches.map((match) => (
                <div
                  key={match.id}
                  onClick={() => setSelectedJob(match)}
                  className={`rounded-xl border cursor-pointer transition-all ${
                    theme === "light" 
                      ? "border-gray-200 bg-white hover:border-gray-300" 
                      : "border-gray-800 bg-gray-950 hover:border-gray-700"
                  }`}
                >
                  {/* Breadcrumb Header */}
                  <div className={`flex items-center justify-between px-6 py-4 border-b ${
                    theme === "light" ? "border-gray-200" : "border-gray-800"
                  }`}>
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`flex items-center gap-1.5 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                        <Briefcase className="w-4 h-4 text-purple-500" />
                        <span className="font-medium">Jobs</span>
                      </div>
                      <span className={theme === "light" ? "text-gray-400" : "text-gray-600"}>›</span>
                      <span className={theme === "light" ? "text-gray-900" : "text-gray-200"}>
                        {match.job.title}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedJob(null);
                      }}
                      className={`p-1.5 rounded-md ${theme === "light" ? "hover:bg-gray-100 text-gray-600" : "hover:bg-gray-900 text-gray-400"}`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Job Content */}
                  <div className="px-6 py-6">
                    {/* Icon and Job Title Section */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        theme === "light" ? "bg-gray-100" : "bg-gray-900"
                      }`}>
                        <Briefcase className={`w-5 h-5 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
                      </div>
                      <div className="flex-1">
                        <label className={`block text-xs font-medium mb-2 ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                          Job title
                        </label>
                        <div className={`text-2xl font-semibold ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
                          {match.job.title}
                        </div>
                      </div>
                    </div>

                    {/* Quick Info Pills */}
                    <div className="flex items-center gap-2 mb-6 flex-wrap">
                      {/* Match Score Pill */}
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                        match.match_score >= 90
                          ? theme === "light"
                            ? "bg-success-100 text-success-700"
                            : "bg-success-900/30 text-success-400"
                          : match.match_score >= 75
                          ? theme === "light"
                            ? "bg-warning-100 text-warning-700"
                            : "bg-warning-900/30 text-warning-400"
                          : theme === "light"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-gray-900 text-gray-300"
                      }`}>
                        {match.match_score >= 90 ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : match.match_score >= 75 ? (
                          <AlertCircle className="w-3.5 h-3.5" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                        <span>{match.match_score}% Match</span>
                      </div>

                      {/* Company Pill */}
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                        theme === "light"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-gray-900 text-gray-300"
                      }`}>
                        <Users className="w-3.5 h-3.5" />
                        <span>{match.job.company}</span>
                      </div>

                      {/* Location Pill */}
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                        theme === "light"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-gray-900 text-gray-300"
                      }`}>
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{match.job.remote ? "Remote" : match.job.location}</span>
                      </div>

                      {/* Budget Pill */}
                      {match.job.budget && (
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                          theme === "light"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-gray-900 text-gray-300"
                        }`}>
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>${match.job.budget}{match.job.budget_type === "HOURLY" ? "/hr" : ""}</span>
                        </div>
                      )}

                      {/* Time Posted Pill */}
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                        theme === "light"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-gray-900 text-gray-300"
                      }`}>
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatTimeAgo(match.job.posted_date || match.job.scraped_at)}</span>
                      </div>

                      {/* AI Ready Pill */}
                      {match.match_score >= 90 && (
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                          theme === "light"
                            ? "bg-primary-100 text-primary-700"
                            : "bg-primary-900/30 text-primary-400"
                        }`}>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>AI Ready</span>
                        </div>
                      )}
                    </div>

                    {/* Description Area */}
                    <div className="mb-6">
                      <textarea
                        readOnly
                        value={match.job.description}
                        className={`w-full px-4 py-3 rounded-lg border resize-none ${
                          theme === "light"
                            ? "bg-white border-gray-200 text-gray-900"
                            : "bg-gray-950 border-gray-800 text-gray-200"
                        } focus:outline-none`}
                        rows={4}
                      />
                    </div>

                    {/* Matching Skills Section */}
                    <div className={`mb-6 rounded-lg ${
                      theme === "light" ? "bg-gray-50" : "bg-gray-900"
                    }`}>
                      <div className={`flex items-center justify-between px-4 py-3 border-b ${
                        theme === "light" ? "border-gray-200" : "border-gray-800"
                      }`}>
                        <div className="flex items-center gap-2">
                          <Target className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
                          <span className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                            Matching Skills
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex flex-wrap gap-2">
                          {match.matching_skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                                theme === "light"
                                  ? "bg-primary-100 text-primary-700 border border-primary-200"
                                  : "bg-primary-900/30 text-primary-400 border border-primary-800"
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                          {match.job.skills_required.filter(s => !match.matching_skills.includes(s)).length > 0 && (
                            <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                              theme === "light"
                                ? "bg-gray-100 text-gray-600 border border-gray-200"
                                : "bg-gray-800 text-gray-500 border border-gray-700"
                            }`}>
                              +{match.job.skills_required.filter(s => !match.matching_skills.includes(s)).length} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className={`flex items-center justify-end gap-3 pt-6 border-t ${
                      theme === "light" ? "border-gray-200" : "border-gray-800"
                    }`}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(match.job.source_url, '_blank');
                        }}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                          theme === "light"
                            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            : "bg-gray-900 text-gray-300 hover:bg-gray-800"
                        }`}
                      >
                        Cancel
                      </button>
                      {match.match_score >= 90 ? (
                        <button className="px-4 py-2 text-sm font-medium rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors">
                          Review Proposal
                        </button>
                      ) : (
                        <button className="px-4 py-2 text-sm font-medium rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors">
                          View Job
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
