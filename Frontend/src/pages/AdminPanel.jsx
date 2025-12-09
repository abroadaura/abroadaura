import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { ref, onValue, remove, update } from "firebase/database";
import {
  Search,
  Filter,
  Trash2,
  CheckCircle,
  Circle,
  Eye,
  X,
  Download,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen
} from "lucide-react";

const AdminPanel = () => {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });

  useEffect(() => {
    const consultationsRef = ref(db, "consultations");

    onValue(consultationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatted = Object.keys(data).map((id) => ({
          id,
          ...data[id],
        }));
        setLeads(formatted);
      } else {
        setLeads([]);
      }
    });
  }, []);

  // Sorting function
  const sortLeads = (leads) => {
    if (!sortConfig.key) return leads;
    
    return [...leads].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
    }));
  };

  // Filter leads
  const filteredLeads = sortLeads(leads.filter((item) => {
    const matchSearch =
      search === "" ||
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase()) ||
      item.phone?.includes(search) ||
      item.course?.toLowerCase().includes(search.toLowerCase());

    const matchCountry = countryFilter ? item.country === countryFilter : true;
    const matchStatus = statusFilter ? item.status === statusFilter : true;

    return matchSearch && matchCountry && matchStatus;
  }));

  // Delete lead
  const handleDelete = (id) => {
    remove(ref(db, `consultations/${id}`));
    setDeleteConfirm(null);
  };

  // Toggle status
  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "checked" ? "unchecked" : "checked";
    update(ref(db, `consultations/${id}`), { status: newStatus });
  };

  // Get unique countries
  const uniqueCountries = [...new Set(leads.map((item) => item.country).filter(Boolean))];

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Country", "Course", "Date", "Status"];
    const csvContent = [
      headers.join(","),
      ...filteredLeads.map(lead => [
        `"${lead.name || ""}"`,
        `"${lead.email || ""}"`,
        `"${lead.phone || ""}"`,
        `"${lead.country || ""}"`,
        `"${lead.course || ""}"`,
        `"${new Date(lead.createdAt).toLocaleString()}"`,
        `"${lead.status || "unchecked"}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  // Stats
  const stats = {
    total: leads.length,
    checked: leads.filter(l => l.status === "checked").length,
    unchecked: leads.filter(l => l.status !== "checked").length,
    today: leads.filter(l => {
      const today = new Date().toDateString();
      const leadDate = new Date(l.createdAt).toDateString();
      return today === leadDate;
    }).length
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-4 px-7 md:p-6 md:px-10">
      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Confirm Delete</h3>
              <button onClick={() => setDeleteConfirm(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the lead for <span className="font-semibold">{deleteConfirm.name}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Trash2 size={16} />
                Delete Lead
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Applicants Details</h3>
              <button onClick={() => setSelectedLead(null)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{selectedLead.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedLead.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{selectedLead.phone || "Not provided"}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Country</p>
                      <p className="font-medium">{selectedLead.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Course</p>
                      <p className="font-medium">{selectedLead.course || "Not specified"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="text-gray-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Submitted</p>
                      <p className="font-medium">{new Date(selectedLead.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              {selectedLead.message && (
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-500 mb-2">Additional Message</p>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedLead.message}</p>
                </div>
              )}
            </div>
            <div className="border-t px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  toggleStatus(selectedLead.id, selectedLead.status || "unchecked");
                  setSelectedLead(null);
                }}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  selectedLead.status === "checked"
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {selectedLead.status === "checked" ? <Circle size={16} /> : <CheckCircle size={16} />}
                {selectedLead.status === "checked" ? "Mark as Unchecked" : "Mark as Checked"}
              </button>
              <button
                onClick={() => {
                  setDeleteConfirm(selectedLead);
                  setSelectedLead(null);
                }}
                className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Consultation Requests</h1>
          <p className="text-gray-600 mt-2">Manage and track all the Applicants in one place</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Applicants</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <User className="text-blue-500" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Checked</p>
                <p className="text-2xl font-bold text-green-600">{stats.checked}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="text-green-500" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Unchecked</p>
                <p className="text-2xl font-bold text-amber-600">{stats.unchecked}</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <Circle className="text-amber-500" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Today's Applicants</p>
                <p className="text-2xl font-bold text-purple-600">{stats.today}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Calendar className="text-purple-500" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow mb-6 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or course..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Filter size={18} />
                Filters
                {showFilters && <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">2</span>}
              </button>
              
              <button
                onClick={exportToCSV}
                className="px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2"
              >
                <Download size={18} />
                Export CSV
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Countries</option>
                  {uniqueCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="checked">Checked</option>
                  <option value="unchecked">Unchecked</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setCountryFilter("");
                    setStatusFilter("");
                    setSearch("");
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 w-full"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="p-4 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("name")}
                  >
                    Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-900">Phone</th>
                  <th 
                    className="p-4 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("country")}
                  >
                    Country {sortConfig.key === "country" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-900">Course</th>
                  <th 
                    className="p-4 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("createdAt")}
                  >
                    Date {sortConfig.key === "createdAt" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-8 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <User size={48} className="mb-3" />
                        <p className="text-lg font-medium">No leads found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-gray-900">{item.name}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-gray-600">{item.email}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-gray-600">{item.phone || "-"}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-gray-600">{item.country}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-gray-600">{item.course || "-"}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-500">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleStatus(item.id, item.status || "unchecked")}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                            item.status === "checked"
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          }`}
                        >
                          {item.status === "checked" ? (
                            <>
                              <CheckCircle size={12} />
                              Checked
                            </>
                          ) : (
                            <>
                              <Circle size={12} />
                              Unchecked
                            </>
                          )}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedLead(item)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(item)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer */}
          {filteredLeads.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium">{filteredLeads.length}</span> of <span className="font-medium">{leads.length}</span> leads
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-green-600">{stats.checked} checked</span> •{" "}
                <span className="font-medium text-amber-600">{stats.unchecked} unchecked</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;