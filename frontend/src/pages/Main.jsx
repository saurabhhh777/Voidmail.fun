import React, { useState, useEffect } from "react";
import { Copy, RefreshCw, Mail, Edit2, Share2, Forward } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { userAuthStore } from "../../store/userAuthStore";
import Footer from "../components/Footer";
import CtaSection from "../components/CtaSection";
import Navbar from "../components/Navbar";

const Main = () => {
  const { createSession, createEmail, getAllEmails } = userAuthStore();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [inbox, setInbox] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [autorefresh, setAutorefresh] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("create"); // Changed default to "create"

  // Restore session from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedToken = localStorage.getItem("token");
    if (savedEmail) setEmail(JSON.parse(savedEmail));
    if (savedToken) setToken(savedToken);
  }, []);

  // Initialize session and email
  useEffect(() => {
    const initSession = async () => {
      if (!token) {
        setIsLoading(true);
        try {
          const res = await createSession();
          const newToken = res?.data?.token;
          if (newToken) {
            setToken(newToken);
            localStorage.setItem("token", newToken);
            const emailRes = await createEmail(newToken);
            setEmail(emailRes);
            localStorage.setItem("email", JSON.stringify(emailRes));
          }
        } catch (err) {
          setError("Failed to create session. Please try again.");
          console.error("Session creation failed:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    initSession();
  }, [token]);

  // Autorefresh timer
  useEffect(() => {
    const interval = setInterval(() => {
      setAutorefresh((prev) => (prev === 1 ? 10 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch inbox emails
  useEffect(() => {
    const fetchInbox = async () => {
      if (email && token) {
        setIsLoading(true);
        try {
          const res = await getAllEmails(email);
          if (Array.isArray(res)) {
            setInbox(res);
            if (!selectedMail && res.length > 0) {
              setSelectedMail(res[0]);
            }
          }
        } catch (err) {
          setError("Failed to fetch emails. Please refresh.");
          console.error("Fetching inbox failed:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (autorefresh === 10) fetchInbox();
  }, [autorefresh, email, token]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard", {
      style: {
        background: "#151517",
        color: "white",
        border: "1px solid #ffffff08",
      },
    });
  };

  const handleRefresh = () => {
    setAutorefresh(10);
    setError(null);
  };

  const handleChangeEmail = async () => {
    setIsLoading(true);
    try {
      const newEmail = await createEmail(token);
      setEmail(newEmail);
      setInbox([]);
      setSelectedMail(null);
      localStorage.setItem("email", JSON.stringify(newEmail));
      toast.success("New email generated", {
        style: {
          background: "#151517",
          color: "white",
          border: "1px solid #ffffff08",
        },
      });
    } catch (err) {
      setError("Failed to change email. Please try again.");
      console.error("Changing email failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e10] text-gray-100">
      <Toaster position="bottom-right" />
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-[#10B981]/10 blur-[120px] -top-32 left-1/2 -translate-x-1/2" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">
              Create it.
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>
      </section>

        {/* Main Card */}
        <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] overflow-hidden shadow-lg">
          {/* Tab Navigation */}
          <div className="flex border-b border-[#ffffff08]">
            <button
              className={`flex-1 py-4 font-medium flex items-center justify-center gap-2 ${
                activeTab === "inbox"
                  ? "text-[#10B981] border-b-2 border-[#10B981]"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("inbox")}
            >
              <Mail size={18} />
              Inbox
            </button>
            <button
              className={`flex-1 py-4 font-medium flex items-center justify-center gap-2 ${
                activeTab === "create"
                  ? "text-[#10B981] border-b-2 border-[#10B981]"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("create")}
            >
              <Edit2 size={18} />
              Create Email
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "inbox" ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Inbox Panel */}
                <div className="lg:col-span-1">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold flex items-center gap-2 text-[#10B981]">
                      <Mail size={18} />
                      Inbox
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-[#10B981]/10 text-[#10B981] px-2 py-1 rounded-full">
                        {inbox.length} {inbox.length === 1 ? "email" : "emails"}
                      </span>
                      <button
                        onClick={handleRefresh}
                        disabled={isLoading}
                        className="p-2 bg-[#ffffff08] hover:bg-[#ffffff12] rounded-lg disabled:opacity-50 transition-colors"
                        title="Refresh inbox"
                      >
                        <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
                      </button>
                    </div>
                  </div>

                  {inbox.length === 0 ? (
                    <div className="p-6 text-center text-gray-500 rounded-lg bg-[#0e0e10] border border-[#ffffff08]">
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <RefreshCw size={16} className="animate-spin" />
                          Loading emails...
                        </div>
                      ) : (
                        "Your inbox is empty. Share your temporary email to receive messages."
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                      {inbox.map((mail, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg cursor-pointer transition-colors flex flex-col ${
                            selectedMail === mail
                              ? "bg-[#10B981]/10 border border-[#10B981]/30"
                              : "bg-[#0e0e10] hover:bg-[#ffffff05] border border-[#ffffff08]"
                          }`}
                          onClick={() => setSelectedMail(mail)}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium truncate">
                              {mail.from || "Unknown Sender"}
                            </h4>
                            <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                              {new Date(mail.date).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-[#3B82F6] truncate mt-1">
                            {mail.subject || "No Subject"}
                          </p>
                          <p className="text-xs text-gray-400 truncate mt-1">
                            {mail.text?.substring(0, 60) || mail.body?.substring(0, 60) || "No preview available"}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Email Viewer Panel */}
                <div className="lg:col-span-2">
                  {selectedMail ? (
                    <div className="bg-[#0e0e10] rounded-lg border border-[#ffffff08] h-full flex flex-col">
                      <div className="p-4 border-b border-[#ffffff08]">
                        <h3 className="text-xl font-semibold mb-1">
                          {selectedMail.subject}
                        </h3>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-400">
                            From: <span className="text-white">{selectedMail.from}</span>
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(selectedMail.date).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="p-4 flex-1 overflow-auto">
                        <pre className="whitespace-pre-wrap font-sans text-gray-300">
                          {selectedMail.text || selectedMail.body}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#0e0e10] rounded-lg border border-[#ffffff08] p-8 text-center text-gray-500 h-full flex items-center justify-center">
                      <div>
                        <Mail size={48} className="mx-auto mb-4 text-[#ffffff08]" />
                        <h3 className="text-lg font-medium mb-2">No email selected</h3>
                        <p className="text-sm">
                          {inbox.length > 0
                            ? "Select an email from your inbox to view"
                            : "Your inbox is currently empty"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-semibold mb-6">Create Temporary Email</h3>
                  
                  <div className="bg-[#0e0e10] rounded-xl p-6 mb-6 border border-[#ffffff08]">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-300">Your Temporary Email</h4>
                      <button
                        onClick={handleChangeEmail}
                        disabled={isLoading}
                        className="flex items-center gap-1 px-3 py-1 bg-[#10B981] hover:bg-[#10B981]/90 rounded-lg text-sm disabled:opacity-50 transition-colors"
                      >
                        <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
                        {isLoading ? "Generating..." : "New Email"}
                      </button>
                    </div>
                    
                    <div className="relative">
                      <input
                        type="text"
                        value={email || ""}
                        readOnly
                        className="w-full px-4 py-3 bg-[#151517] border border-[#ffffff08] rounded-lg pr-12 focus:outline-none focus:ring-1 focus:ring-[#10B981] text-white"
                        placeholder="Generating email..."
                      />
                      <button
                        onClick={copyToClipboard}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-[#10B981] transition-colors"
                        title="Copy to clipboard"
                      >
                        <Copy size={18} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-left">
                      Automatically expires after 24 hours of inactivity
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      onClick={handleRefresh}
                      className="flex items-center justify-center gap-2 p-4 bg-[#0e0e10] hover:bg-[#ffffff05] rounded-lg border border-[#ffffff08] transition-colors"
                    >
                      <RefreshCw size={18} />
                      Refresh Inbox
                    </button>
                    <div className="flex items-center justify-center gap-2 p-4 bg-[#0e0e10] rounded-lg border border-[#ffffff08]">
                      <span className="text-gray-400">Refreshing in:</span>
                      <span className="font-mono text-[#10B981]">{autorefresh}s</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <CtaSection />
        <Footer />
      </div>
    </div>
  );
};

export default Main;