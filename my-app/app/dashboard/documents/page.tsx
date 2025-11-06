"use client";

import { useState, useRef } from "react";
import { Bell, Upload, FileText, Trash2, Eye, Download, Sun, Moon } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useTheme } from "@/theme/ThemeContext";

export default function DocumentsPage() {
  const { theme, toggleTheme } = useTheme();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock documents data
  const [documents, setDocuments] = useState([
    { id: 1, name: "John_Doe_Resume.pdf", type: "Resume", size: "245 KB", uploaded_at: "2025-11-05 14:30", status: "Processed" },
    { id: 2, name: "Jane_Smith_CV.pdf", type: "Resume", size: "312 KB", uploaded_at: "2025-11-04 10:15", status: "Processed" },
    { id: 3, name: "Contract_Template.docx", type: "Contract", size: "128 KB", uploaded_at: "2025-11-03 16:45", status: "Pending" },
    { id: 4, name: "Project_Proposal.pdf", type: "Proposal", size: "890 KB", uploaded_at: "2025-11-02 09:20", status: "Processed" },
  ]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log("Files selected:", files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      console.log("Files dropped:", files);
    }
  };

  const handleDelete = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className={`min-h-screen flex ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
      <DashboardSidebar />

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className={`border-b ${theme === "light" ? "border-gray-200" : "border-gray-900"} px-6 py-3 flex items-center justify-between`}>
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-semibold">Documents</h1>
            <p className="text-xs text-gray-500">{documents.length} files</p>
          </div>

          <div className="flex items-center gap-2">
            <button className={`p-1.5 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-neutral-900"} rounded-md`}>
              <Bell className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} />
            </button>
            <button onClick={toggleTheme} className={`flex-1 ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-900"} p-1.5 rounded-md`}>
              {theme === "light" ? <Moon className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`} /> : <Sun className={`w-4 h-4 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />}
            </button>
          </div>
        </header>

        {/* Upload Area */}
        <div className={`border-b ${theme === "light" ? "border-gray-200" : "border-gray-900"} px-6 py-6`}>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              isDragging
                ? theme === "light" ? "border-blue-400 bg-blue-50" : "border-blue-600 bg-blue-950/20"
                : theme === "light" ? "border-gray-300 hover:border-gray-400" : "border-gray-800 hover:border-gray-700"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className={`w-8 h-8 mx-auto mb-3 ${theme === "light" ? "text-gray-400" : "text-gray-600"}`} />
            <p className={`text-sm font-medium mb-1 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
              Drop files here or click to browse
            </p>
            <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
              Supports PDF, DOC, DOCX up to 10MB
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        {/* Documents List */}
        <div className="flex-1 overflow-auto">
          <div className="space-y-0">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className={`group border-b ${theme === "light" ? "border-gray-200 hover:bg-gray-50" : "border-gray-900 hover:bg-gray-950"} transition-colors px-6 py-3`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${theme === "light" ? "bg-gray-100" : "bg-gray-900"}`}>
                      <FileText className={`w-4 h-4 ${theme === "light" ? "text-gray-600" : "text-gray-500"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-gray-200"} truncate`}>
                          {doc.name}
                        </h3>
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          doc.status === "Processed" ? "bg-green-500" : "bg-yellow-500"
                        }`} />
                      </div>
                      <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}>
                        {doc.type} · {doc.size} · {doc.uploaded_at}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      className={`p-1.5 rounded-md transition-colors ${theme === "light" ? "hover:bg-gray-200 text-gray-700" : "hover:bg-gray-800 text-gray-300"}`}
                      title="View"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      className={`p-1.5 rounded-md transition-colors ${theme === "light" ? "hover:bg-gray-200 text-gray-700" : "hover:bg-gray-800 text-gray-300"}`}
                      title="Download"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(doc.id)}
                      className={`p-1.5 rounded-md transition-colors ${theme === "light" ? "hover:bg-red-100 text-red-600" : "hover:bg-red-950 text-red-400"}`}
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
