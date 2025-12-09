import { useEffect, useState, useMemo } from "react";
import { db } from "../../firebase/config";
import { ref, onValue, remove } from "firebase/database";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, LineChart, Line
} from "recharts";
import {
  CalendarDays, Filter, Globe, MapPin, RefreshCw, Trash2,
  Users, Clock, Globe as GlobeIcon, Download, UserCheck, TrendingUp, Eye
} from "lucide-react";

const AdminVisitors = () => {
  const [visitors, setVisitors] = useState([]);
  const [filteredVisitors, setFilteredVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    country: "",
    city: "",
    dateRange: "",
    search: ""
  });

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    uniqueVisitors: 0,
    uniqueCountries: 0,
    todayCount: 0,
    topCountry: "",
    returningVisitors: 0
  });

  useEffect(() => {
    const visitorsRef = ref(db, "visitors");

    const unsubscribe = onValue(visitorsRef, (snapshot) => {
      const data = snapshot.val();
      setLoading(false);

      if (!data) {
        setVisitors([]);
        setFilteredVisitors([]);
        return;
      }

      const list = Object.entries(data).map(([id, val]) => ({
        id,
        ...val,
        timestamp: val.timestamp || Date.now()
      })).reverse();

      setVisitors(list);
      setFilteredVisitors(list);
      calculateStats(list);
    });

    return () => unsubscribe();
  }, []);

  // Calculate statistics with unique visitor tracking
  const calculateStats = (data) => {
    // Unique IPs
    const uniqueIPs = [...new Set(data.map(v => v.ip))];
    
    // Unique countries
    const uniqueCountries = [...new Set(data.map(v => v.country))];
    
    // Today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayVisitors = data.filter(v => 
      new Date(v.timestamp) >= today
    ).length;

    // Count visits per IP to find returning visitors
    const ipCounts = data.reduce((acc, v) => {
      acc[v.ip] = (acc[v.ip] || 0) + 1;
      return acc;
    }, {});

    const returningVisitors = Object.values(ipCounts).filter(count => count > 1).length;

    // Find top country
    const countryCounts = data.reduce((acc, v) => {
      acc[v.country] = (acc[v.country] || 0) + 1;
      return acc;
    }, {});

    const topCountry = Object.entries(countryCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || "N/A";

    setStats({
      total: data.length,
      uniqueVisitors: uniqueIPs.length,
      uniqueCountries: uniqueCountries.length,
      todayCount: todayVisitors,
      topCountry,
      returningVisitors
    });
  };

  // Apply filters
  useEffect(() => {
    let result = visitors;

    if (filters.country) {
      result = result.filter(v => 
        v.country.toLowerCase().includes(filters.country.toLowerCase())
      );
    }

    if (filters.city) {
      result = result.filter(v => 
        v.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(v => 
        v.ip.toLowerCase().includes(searchLower) ||
        v.city.toLowerCase().includes(searchLower) ||
        v.country.toLowerCase().includes(searchLower) ||
        v.region.toLowerCase().includes(searchLower)
      );
    }

    // Date range filter
    if (filters.dateRange) {
      const now = new Date();
      const cutoff = new Date(now);
      
      switch(filters.dateRange) {
        case "today":
          cutoff.setHours(0, 0, 0, 0);
          break;
        case "week":
          cutoff.setDate(now.getDate() - 7);
          break;
        case "month":
          cutoff.setMonth(now.getMonth() - 1);
          break;
        case "year":
          cutoff.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      result = result.filter(v => new Date(v.timestamp) >= cutoff);
    }

    setFilteredVisitors(result);
  }, [visitors, filters]);

  // Prepare chart data
  const chartData = useMemo(() => {
    const countryCounts = filteredVisitors.reduce((acc, v) => {
      acc[v.country] = (acc[v.country] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(countryCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [filteredVisitors]);

  // Daily visitor trend data for area chart
  const dailyTrendData = useMemo(() => {
    const daysData = {};
    
    filteredVisitors.forEach(v => {
      const date = new Date(v.timestamp);
      const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
      
      if (!daysData[dateKey]) {
        daysData[dateKey] = {
          date: dateKey,
          total: 0,
          unique: 0
        };
      }
      daysData[dateKey].total++;
    });

    // Calculate unique visitors per day
    const dailyUniqueIPs = {};
    filteredVisitors.forEach(v => {
      const date = new Date(v.timestamp);
      const dateKey = date.toISOString().split('T')[0];
      
      if (!dailyUniqueIPs[dateKey]) {
        dailyUniqueIPs[dateKey] = new Set();
      }
      dailyUniqueIPs[dateKey].add(v.ip);
    });

    // Merge unique counts
    Object.keys(daysData).forEach(dateKey => {
      daysData[dateKey].unique = dailyUniqueIPs[dateKey]?.size || 0;
    });

    // Convert to array and sort by date
    return Object.values(daysData)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-30); // Last 30 days
  }, [filteredVisitors]);

  // Hourly distribution data
  const hourlyData = useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, i) => ({
      hour: `${i.toString().padStart(2, '0')}:00`,
      count: 0,
      unique: 0
    }));

    const hourlyUniqueIPs = Array.from({ length: 24 }, () => new Set());

    filteredVisitors.forEach(v => {
      const date = new Date(v.timestamp);
      const hour = date.getHours();
      hours[hour].count++;
      hourlyUniqueIPs[hour].add(v.ip);
    });

    // Add unique counts
    hours.forEach((hourData, idx) => {
      hourData.unique = hourlyUniqueIPs[idx].size;
    });

    return hours;
  }, [filteredVisitors]);

  // Visitor type breakdown
  const visitorTypeData = useMemo(() => {
    const ipCounts = filteredVisitors.reduce((acc, v) => {
      acc[v.ip] = (acc[v.ip] || 0) + 1;
      return acc;
    }, {});

    const newVisitors = Object.values(ipCounts).filter(count => count === 1).length;
    const returningVisitors = Object.values(ipCounts).filter(count => count > 1).length;

    return [
      { name: 'New Visitors', value: newVisitors, color: '#3B82F6' },
      { name: 'Returning Visitors', value: returningVisitors, color: '#10B981' }
    ];
  }, [filteredVisitors]);

  const deleteVisitor = (id) => {
    if (window.confirm("Are you sure you want to delete this visitor?")) {
      const visitorRef = ref(db, `visitors/${id}`);
      remove(visitorRef);
    }
  };

  const clearFilters = () => {
    setFilters({
      country: "",
      city: "",
      dateRange: "",
      search: ""
    });
  };

  const exportData = () => {
    const csv = [
      ["IP", "City", "Region", "Country", "Timestamp", "Date"],
      ...filteredVisitors.map(v => [
        v.ip,
        v.city,
        v.region,
        v.country,
        v.timestamp,
        new Date(v.timestamp).toISOString()
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `visitors_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Visitor Analytics Dashboard</h1>
          <p className="text-gray-600">Monitor and analyze website visitors in real-time</p>
        </div>
        <button
          onClick={exportData}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Stats Cards - Now 6 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Visits</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <Eye className="text-blue-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Unique Visitors</p>
              <p className="text-2xl font-bold">{stats.uniqueVisitors}</p>
            </div>
            <UserCheck className="text-green-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Unique Countries</p>
              <p className="text-2xl font-bold">{stats.uniqueCountries}</p>
            </div>
            <GlobeIcon className="text-purple-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Today's Visits</p>
              <p className="text-2xl font-bold">{stats.todayCount}</p>
            </div>
            <Clock className="text-yellow-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Returning Visitors</p>
              <p className="text-2xl font-bold">{stats.returningVisitors}</p>
            </div>
            <TrendingUp className="text-red-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-indigo-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Top Country</p>
              <p className="text-2xl font-bold truncate" title={stats.topCountry}>
                {stats.topCountry.length > 10 ? stats.topCountry.substring(0, 10) + '...' : stats.topCountry}
              </p>
            </div>
            <MapPin className="text-indigo-500" size={24} />
          </div>
        </div>
      </div>

      {/* Charts Section - Three columns for charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
        {/* Daily Trend Area Chart */}
        <div className="bg-white p-4 rounded-xl shadow lg:col-span-2 xl:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Daily Visitor Trend (Last 30 Days)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => {
                    const d = new Date(date);
                    return `${d.getDate()}/${d.getMonth() + 1}`;
                  }}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(date) => {
                    const d = new Date(date);
                    return d.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
                  }}
                  formatter={(value, name) => {
                    if (name === 'total') return [`${value} visits`, 'Total Visits'];
                    if (name === 'unique') return [`${value} visitors`, 'Unique Visitors'];
                    return value;
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  name="Total Visits" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="unique" 
                  name="Unique Visitors" 
                  stroke="#82ca9d" 
                  fill="#82ca9d" 
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Visitor Type Breakdown */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Visitor Type Breakdown</h2>
          <div className="h-72 flex flex-col justify-center">
            <div className="space-y-4">
              {visitorTypeData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold">{item.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${(item.value / Math.max(1, stats.uniqueVisitors)) * 100}%`,
                        backgroundColor: item.color 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-800">{stats.uniqueVisitors}</p>
                <p className="text-sm text-gray-600 mt-1">Total Unique Visitors</p>
                <p className="text-xs text-gray-500 mt-2">
                  New vs Returning: {Math.round((visitorTypeData[0].value / Math.max(1, stats.uniqueVisitors)) * 100)}% new
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hourly Distribution */}
        <div className="bg-white p-4 rounded-xl shadow lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Hourly Visitor Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#3B82F6" name="Total Visits" radius={[2, 2, 0, 0]} />
                <Bar dataKey="unique" fill="#10B981" name="Unique Visitors" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Countries */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Top Countries</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  width={80}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip />
                <Bar 
                  dataKey="count" 
                  fill="#8B5CF6" 
                  name="Visits" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Filter size={20} />
            Filters & Search
          </h2>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">
              Showing <span className="font-bold">{filteredVisitors.length}</span> of <span className="font-bold">{visitors.length}</span> records
            </div>
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition"
            >
              <RefreshCw size={16} />
              Clear Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Search IP/City/Country</label>
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Country</label>
            <select
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.country}
              onChange={(e) => setFilters({...filters, country: e.target.value})}
            >
              <option value="">All Countries</option>
              {[...new Set(visitors.map(v => v.country))].sort().map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">City</label>
            <input
              type="text"
              placeholder="Filter by city..."
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.city}
              onChange={(e) => setFilters({...filters, city: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Date Range</label>
            <select
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.dateRange}
              onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
            >
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Visitors Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            Visitor Details ({filteredVisitors.length} records)
          </h2>
          <div className="flex items-center gap-4">
            {loading && (
              <div className="text-sm text-gray-500">Loading...</div>
            )}
            <div className="text-sm text-gray-600">
              <span className="font-bold text-blue-600">{stats.uniqueVisitors}</span> unique visitors
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">IP Address</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Location</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Country</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Visit Date & Time</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisitors.map((v) => {
                // Check if this IP has multiple visits
                const ipVisitCount = visitors.filter(visitor => visitor.ip === v.ip).length;
                const isReturning = ipVisitCount > 1;

                return (
                  <tr key={v.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-mono text-sm">{v.ip}</div>
                      {isReturning && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                          Returning ({ipVisitCount} visits)
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{v.city}</div>
                        <div className="text-sm text-gray-500">{v.region}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Globe size={14} className="text-gray-400" />
                        {v.country}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div className="font-medium">{new Date(v.timestamp).toLocaleDateString()}</div>
                        <div className="text-gray-500">
                          {new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => deleteVisitor(v.id)}
                        className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-sm hover:bg-red-100 transition"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredVisitors.length === 0 && (
                <tr>
                  <td className="p-8 text-center text-gray-500" colSpan="5">
                    {loading ? "Loading visitors..." : "No visitors found with current filters"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminVisitors;