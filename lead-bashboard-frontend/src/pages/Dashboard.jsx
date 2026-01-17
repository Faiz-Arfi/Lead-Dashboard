import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import authService from '../services/authService';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // State for Data
  const [leads, setLeads] = useState([]);
  const [analytics, setAnalytics] = useState({ total_leads: 0, converted_leads: 0 });
  const [loading, setLoading] = useState(true);

  // State for Filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch Analytics (Once on mount)
  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Fetch Leads (Whenever filters change)
  useEffect(() => {
    fetchLeads();
  }, [page, search, status]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/leads`, {
        params: { page, size: 10, search, status }
      });
      setLeads(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      if (error.response && error.response.status === 401) handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/leads/analytics');
      setAnalytics(response.data);
    } catch (error) {
      console.error("Failed to fetch analytics");
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  // Helper for Status Badge Colors
  const getStatusBadge = (status) => {
    const styles = {
      'NEW': 'bg-blue-100 text-blue-800 border-blue-200',
      'CONTACTED': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'QUALIFIED': 'bg-purple-100 text-purple-800 border-purple-200',
      'CONVERTED': 'bg-green-100 text-green-800 border-green-200',
      'LOST': 'bg-red-100 text-red-800 border-red-200',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-muted/20">
      
      {/* Navbar */}
      <nav className="border-b bg-card sticky top-0 z-30">
        <div className="container flex h-16 items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-primary">LeadCRM</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:inline">Welcome, Admin</span>
            <button onClick={handleLogout} className="btn btn-outline h-9">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container py-8 space-y-8">
        
        {/* Analytics Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="card">
            <div className="card-header pb-2">
              <h4 className="text-sm font-medium text-muted-foreground">Total Leads</h4>
            </div>
            <div className="card-content">
              <div className="text-2xl font-bold">{analytics.total_leads}</div>
            </div>
          </div>
          <div className="card">
            <div className="card-header pb-2">
              <h4 className="text-sm font-medium text-muted-foreground">Conversion Rate</h4>
            </div>
            <div className="card-content">
              <div className="text-2xl font-bold text-green-600">
                {analytics.total_leads > 0 
                  ? ((analytics.converted_leads / analytics.total_leads) * 100).toFixed(1) + '%' 
                  : '0%'}
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header pb-2">
              <h4 className="text-sm font-medium text-muted-foreground">Converted Leads</h4>
            </div>
            <div className="card-content">
              <div className="text-2xl font-bold">{analytics.converted_leads}</div>
            </div>
          </div>
        </div>

        {/* Filters & Table Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="input max-w-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select 
              className="input max-w-[200px]"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="CONVERTED">Converted</option>
              <option value="LOST">Lost</option>
            </select>
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Source</th>
                    <th className="px-6 py-3 text-right">Value</th>
                    <th className="px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-muted-foreground">
                        Loading leads...
                      </td>
                    </tr>
                  ) : leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-medium">
                        {lead.name}
                        <div className="text-xs text-muted-foreground">{lead.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`badge border ${getStatusBadge(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{lead.source}</td>
                      <td className="px-6 py-4 text-right font-medium">
                        Rs {lead.value?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <button 
              className="btn btn-outline" 
              disabled={page === 0} 
              onClick={() => setPage(p => p - 1)}
            >
              Previous
            </button>
            <span className="text-sm text-muted-foreground">
              Page {page + 1} of {totalPages}
            </span>
            <button 
              className="btn btn-outline" 
              disabled={page + 1 >= totalPages} 
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;