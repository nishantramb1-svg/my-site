"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Users,
  Zap,
  Brain,
  ChevronRight,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, role: "assistant", content: "Hey! How can I help you today?" },
  ]);
  const [chatInput, setChatInput] = useState("");

  // Sample data
  const analytics = [
    { icon: TrendingUp, label: "Revenue", value: "$24,580", change: "+12.5%", color: "from-emerald-500 to-teal-500" },
    { icon: Users, label: "Active Users", value: "1,240", change: "+8.2%", color: "from-blue-500 to-cyan-500" },
    { icon: Zap, label: "API Calls", value: "45.2K", change: "+23.1%", color: "from-orange-500 to-red-500" },
    { icon: Brain, label: "AI Models", value: "12", change: "+2", color: "from-purple-500 to-pink-500" },
  ];

  const recentProjects = [
    { id: 1, name: "Content Analyzer", status: "active", progress: 85, date: "2 days ago" },
    { id: 2, name: "Image Generator", status: "active", progress: 60, date: "5 days ago" },
    { id: 3, name: "Chat Assistant", status: "completed", progress: 100, date: "1 week ago" },
    { id: 4, name: "Data Pipeline", status: "pending", progress: 30, date: "3 days ago" },
  ];

  const activityData = [
    { time: "00:00", value: 20 },
    { time: "04:00", value: 35 },
    { time: "08:00", value: 60 },
    { time: "12:00", value: 75 },
    { time: "16:00", value: 55 },
    { time: "20:00", value: 90 },
    { time: "24:00", value: 45 },
  ];

  const maxValue = Math.max(...activityData.map(d => d.value));

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const newMessage = {
      id: chatMessages.length + 1,
      role: "user",
      content: chatInput,
    };

    setChatMessages([...chatMessages, newMessage]);
    setChatInput("");

    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: prev.length + 1,
        role: "assistant",
        content: "That's a great question! Let me help you with that.",
      }]);
    }, 500);
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: MessageSquare, label: "Projects" },
    { icon: FileText, label: "Documents" },
    { icon: Settings, label: "Settings" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');

        * {
          font-family: 'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.5);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.7);
        }

        .gradient-glow {
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(6, 182, 212, 0.1));
          border: 1px solid rgba(124, 58, 237, 0.2);
        }

        .smooth-gradient {
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
        }

        .mesh-bg {
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%);
        }

        .glow-border {
          box-shadow: 0 0 20px rgba(124, 58, 237, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .animate-chart-bar {
          transform-origin: bottom;
        }

        .pulse-glow {
          animation: pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .message-fade {
          animation: message-fade 0.3s ease-out;
        }

        @keyframes message-fade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 0 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-white/10 overflow-hidden"
      >
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: sidebarOpen ? 1 : 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Brain size={24} />
            </div>
            <div>
              <div className="font-bold text-sm">Nexus</div>
              <div className="text-xs text-gray-500">AI Platform</div>
            </div>
          </motion.div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => (
            <motion.button
              key={index}
              variants={itemVariants}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                item.active
                  ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border border-purple-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <motion.button
            variants={itemVariants}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <Settings size={20} />
            <span className="text-sm">Settings</span>
          </motion.button>
          <motion.button
            variants={itemVariants}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            <span className="text-sm">Logout</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-white/10 z-50 flex flex-col p-4"
            >
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg"
              >
                <X size={20} />
              </button>

              <nav className="flex-1 space-y-2 mt-12">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      item.active
                        ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-xl bg-slate-950/50 sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-white/10 rounded-lg transition"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden md:flex items-center p-2 hover:bg-white/10 rounded-lg transition"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="text-xl font-bold">Dashboard</h1>
                <p className="text-sm text-gray-400">Welcome back, Creator</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm outline-none w-32 placeholder-gray-600"
                />
              </div>
              <button className="p-2 hover:bg-white/10 rounded-lg transition">
                <Clock size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Analytics Cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {analytics.map((card, index) => {
                  const Icon = card.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -4 }}
                      className="gradient-glow rounded-2xl p-6 backdrop-blur-sm hover:border-purple-500/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color} bg-opacity-20`}>
                          <Icon size={24} className={`bg-gradient-to-br ${card.color} bg-clip-text text-transparent`} />
                        </div>
                        <span className="text-xs font-semibold text-emerald-400">{card.change}</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-1">{card.label}</p>
                      <p className="text-2xl font-bold">{card.value}</p>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Activity Graph */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="gradient-glow rounded-2xl p-6 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Activity Overview</h3>
                  <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none cursor-pointer">
                    <option>Last 24 Hours</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>

                <div className="h-40 flex items-end justify-between gap-2">
                  {activityData.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${(item.value / maxValue) * 100}%` }}
                      transition={{ delay: index * 0.05, duration: 0.6 }}
                      className="flex-1 bg-gradient-to-t from-purple-500 to-cyan-500 rounded-t-lg hover:opacity-80 transition cursor-pointer group relative"
                    >
                      <div className="absolute -top-8 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition">
                        <span className="text-xs font-semibold text-gray-300">{item.value}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-between mt-6 text-xs text-gray-500">
                  {activityData.map((item, index) => (
                    <span key={index}>{item.time}</span>
                  ))}
                </div>
              </motion.div>

              {/* Recent Projects */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="gradient-glow rounded-2xl p-6 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Recent Projects</h3>
                  <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1 transition">
                    View All <ChevronRight size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  {recentProjects.map((project, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all group cursor-pointer"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-sm group-hover:text-purple-400 transition">
                            {project.name}
                          </h4>
                          {project.status === "completed" && (
                            <CheckCircle size={16} className="text-emerald-400" />
                          )}
                          {project.status === "pending" && (
                            <AlertCircle size={16} className="text-orange-400" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{project.date}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                          />
                        </div>
                        <span className="text-xs font-semibold w-10 text-right">{project.progress}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Chat Panel */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 h-fit lg:sticky lg:top-24 gradient-glow rounded-2xl p-6 backdrop-blur-sm flex flex-col"
            >
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                <Brain size={20} className="text-purple-400" />
                <h3 className="font-semibold text-sm">AI Assistant</h3>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-96">
                {chatMessages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
                          : "bg-white/10 text-gray-300"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask AI..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500/50 placeholder-gray-600 transition"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  className="p-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg hover:shadow-lg hover:shadow-purple-600/50 transition-all"
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
