"use client"
import React, { useState, useEffect } from 'react'
import GNews from '@gnews-io/gnews-io-js'
import { Calendar, Clock, ExternalLink, Globe, Search } from 'lucide-react'
import ProfessionalFooter from '@/app/footer'
import ProfessionalNavbar from '@/app/navbar'

const WorldNewsPage = () => {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredNews, setFilteredNews] = useState([])

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true)
                const Client = new GNews(process.env.NEXT_PUBLIC_API_KEY)
                
                const response = await Client.topHeadlines({
                    lang: "en",
                    country: "world",
                    category: "world"
                })
                
                if (response.articles && response.articles.length > 0) {
                    setNews(response.articles)
                    setFilteredNews(response.articles)
                } else {
                    setError("No news articles found.")
                }
            } catch (err) {
                console.error("Error fetching news:", err)
                setError("Failed to load news. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        fetchNews()
    }, [])

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredNews(news)
        } else {
            const filtered = news.filter(article => 
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (article.description && article.description.toLowerCase().includes(searchQuery.toLowerCase()))
            )
            setFilteredNews(filtered)
        }
    }, [searchQuery, news])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const formatTime = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-lg text-slate-600">Loading world news...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
                    <div className="text-red-500 mb-4">
                        <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Error Loading News</h2>
                    <p className="text-slate-600 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
        <ProfessionalNavbar/>
         <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center mb-6 md:mb-0">
                            <div className="bg-blue-600 p-3 rounded-lg mr-4">
                                <Globe className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-800">World News</h1>
                                <p className="text-slate-600">Latest global news and events from around the world</p>
                            </div>
                        </div>
                        
                        <div className="relative w-full md:w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search world news..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

         

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Results Count */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold text-slate-800">
                        {searchQuery ? `Search Results for "${searchQuery}"` : 'Latest World News'}
                    </h2>
                    <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                        {filteredNews.length} article{filteredNews.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {/* No Results Message */}
                {filteredNews.length === 0 && (
                    <div className="text-center py-12">
                        <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-600 mb-2">No articles found</h3>
                        <p className="text-gray-500">
                            {searchQuery ? `No results found for "${searchQuery}". Try different keywords.` : 'No news articles available at the moment.'}
                        </p>
                    </div>
                )}

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNews.map((article, index) => (
                        <article key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={article.image || '/api/placeholder/300/200'}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    onError={(e) => {
                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0jOTM5N2E2IHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4='
                                    }}
                                />
                                <div className="absolute top-4 right-4">
                                    <span className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                                        {article.source?.name || 'Unknown Source'}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="p-5">
                                <div className="flex items-center text-xs text-slate-500 mb-3">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    <span>{formatDate(article.publishedAt)}</span>
                                    <Clock className="h-3 w-3 ml-3 mr-1" />
                                    <span>{formatTime(article.publishedAt)}</span>
                                </div>
                                
                                <h3 className="font-semibold text-lg text-slate-800 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                                    {article.title}
                                </h3>
                                
                                <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                                    {article.description || 'No description available.'}
                                </p>
                                
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                                >
                                    Read Full Article
                                    <ExternalLink className="h-4 w-4 ml-1" />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </main>
        </div>
        <ProfessionalFooter/>
        </>
       
    )
}

export default WorldNewsPage