"use client"
import React from 'react'
import GNews from '@gnews-io/gnews-io-js'
import { useState, useEffect } from 'react'
import ProfessionalFooter from '@/app/footer'
import ProfessionalNavbar from '@/app/navbar'

const TechnologyNews = () => {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    const Client = new GNews(process.env.NEXT_PUBLIC_API_KEY)

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true)
                const response = await Client.topHeadlines({
                    lang: "en",
                    category:"technology",
                    country: "in"
                })
                setNews(response.articles || [])
            } catch (err) {
                setError("Failed to fetch technology news. Please try again later.")
                console.error("Error fetching news:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchNews()
    }, [])

    // Format date to a readable format
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (
        <>
            <ProfessionalNavbar/>
            <div className="min-h-screen bg-gray-50">
                <main className="container mx-auto px-4 py-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Technology Headlines</h1>
                        <p className="text-gray-600">Latest technology news from India</p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
                            {error}
                        </div>
                    ) : news.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">No technology news articles found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {news.map((article, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    {article.image && (
                                        <img 
                                            src={article.image} 
                                            alt={article.title} 
                                            className="w-full h-48 object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none'
                                            }}
                                        />
                                    )}
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                                            {article.title}
                                        </h2>
                                        <p className="text-gray-600 text-sm mb-4">
                                            {article.description && article.description.length > 120 
                                                ? `${article.description.substring(0, 120)}...` 
                                                : article.description
                                            }
                                        </p>
                                        <div className="flex justify-between items-center mt-4">
                                            <span className="text-xs text-gray-500">
                                                {formatDate(article.publishedAt)}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {article.source?.name}
                                            </span>
                                        </div>
                                        <a 
                                            href={article.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium text-sm"
                                        >
                                            Read More →
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
            <ProfessionalFooter/>
        </>
    )
}

export default TechnologyNews