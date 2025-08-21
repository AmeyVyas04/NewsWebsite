"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"  // to highlight active link
import { 
  Search, Bell, User, Globe, Menu, X, ChevronDown,
  Sun, Settings, Bookmark, Share2 
} from "lucide-react"

const ProfessionalNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchFocus, setSearchFocus] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [navsearch, setnavsearch] = useState("india")

  const pathname = usePathname()

  const categories = [
    { id: "search", name: "Search", path: "/search" },
    
    { id: "world", name: "World", path: "/navcomponents/world" },
   
    { id: "business", name: "Business", path: "/navcomponents/business", badge: "📈" },
    { id: "tech", name: "Technology", path: "/navcomponents/technology" },
    { id: "sports", name: "Sports", path: "/navcomponents/sports" },
    { id: "entertainment", name: "Entertainment", path: "/navcomponents/entertainment" },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? "shadow-2xl backdrop-blur-lg bg-white/95" : "bg-white shadow-lg"
    }`}>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-medium">LIVE</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Mumbai, India</span>
            </div>
            <div className="hidden lg:block">
              {currentTime.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full">
              <Sun className="h-4 w-4 text-yellow-400" />
              <span>28°C Mumbai</span>
            </div>
            <div className="text-sm">
              {currentTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-xl shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
                  NewsHub Pro
                </h1>
              
              </div>
            </Link>

            {/* Desktop Categories */}
            <div className="hidden lg:flex items-center space-x-1">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.path}
                  className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center space-x-1 ${
                    pathname === cat.path
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105"
                      : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  }`}
                >
                  <span>{cat.name}</span>
                  {cat.badge && <span className="text-xs">{cat.badge}</span>}
                  {pathname === cat.path && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Search + Actions */}
            <div className="flex items-center space-x-3">
              <div className={`relative hidden md:block transition-all duration-300 ${searchFocus ? "w-80" : "w-64"}`}>
                <div className={`relative flex items-center ${
                  searchFocus ? "bg-blue-50 border-2 border-blue-200" : "bg-gray-50 border border-gray-200"
                } rounded-xl transition-all duration-200`}>
                  <Search className={`h-5 w-5 ml-3 ${searchFocus ? "text-blue-600" : "text-gray-400"}`} />
                  <input
                    type="text"
                    placeholder="Search breaking news, topics..."
                    className="w-full px-3 py-2.5 bg-transparent text-sm focus:outline-none placeholder-gray-500"
                    onFocus={() => setSearchFocus(true)}
                    onBlur={() => setSearchFocus(false)}
                    value={navsearch}
                    onChange={(e) => setnavsearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                  <Bookmark className="h-5 w-5" />
                </button>
                <button className="p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                  <Share2 className="h-5 w-5" />
                </button>
                <div className="w-px h-6 bg-gray-300"></div>
                <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500 hidden sm:block" />
                </button>
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Breaking News Ticker */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 overflow-hidden">
        <div className="flex items-center">
          <div className="bg-yellow-400 text-red-800 px-4 py-1 font-bold text-xs whitespace-nowrap">BREAKING</div>
          <div className="flex-1 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap py-1 px-4 text-sm font-medium">
              🔴 Global Climate Summit reaches historic agreement • 🚀 New AI breakthrough in medical diagnostics • 💼 Stock markets reach all-time highs • 🌍 International space mission launches successfully
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-xl">
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`p-3 rounded-lg text-left font-medium transition-colors ${
                    pathname === cat.path ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>{cat.name}</span>
                    {cat.badge && <span className="text-xs">{cat.badge}</span>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default ProfessionalNavbar
