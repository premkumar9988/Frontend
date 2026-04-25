"use client";
import { useBooks } from "@/context/BooksContext";
import { useState, useEffect } from "react";
import { 
  BookOpenIcon, 
  ShoppingCartIcon, 
  UsersIcon, 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const { books } = useBooks();
  const [stats, setStats] = useState({
    totalBooks: 0,
    pendingOrders: 0,
    activeUsers: 0,
    totalRevenue: 0,
    avgRating: 0,
    newBooksThisMonth: 0
  });

  useEffect(() => {
    const totalBooks = books.length;
    const newBooksThisMonth = books.filter(book => 
      new Date(book.createdAt).getMonth() === new Date().getMonth()
    ).length;
    const avgRating = books.reduce((sum, book) => sum + (book.rating || 0), 0) / totalBooks || 0;

    setStats({
      totalBooks,
      pendingOrders: 45, 
      activeUsers: 1234,
      totalRevenue: 12567.89,
      avgRating: avgRating.toFixed(1),
      newBooksThisMonth
    });
  }, [books]);

  const recentBooks = books.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 text-lg">Welcome back! Here's what's happening with your library.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Total Books" 
          value={stats.totalBooks.toLocaleString()} 
          change="+12.5%"
          icon={<BookOpenIcon className="w-8 h-8 text-indigo-500" />}
          color="bg-indigo-500"
        />
        <StatCard 
          title="Pending Orders" 
          value={stats.pendingOrders.toLocaleString()} 
          change="-3.2%"
          icon={<ShoppingCartIcon className="w-8 h-8 text-emerald-500" />}
          color="bg-emerald-500"
        />
        <StatCard 
          title="Active Users" 
          value={stats.activeUsers.toLocaleString()} 
          change="+8.7%"
          icon={<UsersIcon className="w-8 h-8 text-purple-500" />}
          color="bg-purple-500"
        />
        <StatCard 
          title="Total Revenue" 
          value={`$${stats.totalRevenue.toLocaleString()}`}
          change="+24.1%"
          icon={<CurrencyDollarIcon className="w-8 h-8 text-amber-500" />}
          color="bg-amber-500"
        />
        <StatCard 
          title="Avg Rating" 
          value={stats.avgRating}
          change="+0.3"
          icon={<ChartBarIcon className="w-8 h-8 text-blue-500" />}
          color="bg-blue-500"
        />
        <StatCard 
          title="New This Month" 
          value={stats.newBooksThisMonth}
          change="+15%"
          icon={<ArrowTrendingUpIcon className="w-8 h-8 text-pink-500" />}
          color="bg-pink-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Books</h2>
            <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
              View All →
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 text-sm font-semibold text-gray-700">Title</th>
                  <th className="text-left py-4 text-sm font-semibold text-gray-700">Author</th>
                  <th className="text-left py-4 text-sm font-semibold text-gray-700">Rating</th>
                  <th className="text-left py-4 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBooks.map((book, index) => (
                  <tr key={book.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4">
                      <div className="font-medium text-gray-900 truncate max-w-xs">{book.title}</div>
                    </td>
                    <td className="py-4 text-gray-600">{book.author}</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <span className="text-sm font-semibold text-indigo-600">{book.rating || 0}</span>
                        <span className="ml-1 text-sm text-gray-500">/ 5</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        book.status === 'available' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {book.status || 'Available'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Chart / Quick Stats */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Activity Overview</h2>
          
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                <p className="text-sm text-gray-600">Books Read Today</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                <p className="text-sm text-gray-600">New Users</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="h-64 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
              <div className="text-center text-gray-500">
                <ChartBarIcon className="w-12 h-12 mx-auto mb-2 opacity-40" />
                <p className="text-lg font-semibold">Analytics Chart</p>
                <p className="text-sm">Coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon, color }) {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 hover:border-gray-100 p-8 cursor-pointer hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}/10 group-hover:${color}/20 transition-colors`}>
          {icon}
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
          isPositive 
            ? 'bg-emerald-100 text-emerald-700' 
            : 'bg-amber-100 text-amber-700'
        }`}>
          {change}
        </span>
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}