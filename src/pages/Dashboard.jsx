import React from 'react';
import './Dashboard.css'; // Make sure this CSS file is imported
import Map from '../components/Map';

// Import icons from react-icons
import { FiThermometer, FiDroplet, FiWind } from 'react-icons/fi';
import { FaShip } from 'react-icons/fa';

const Dashboard = () => {
  // Dummy data
  const deployments = [
    { id: 'ARG001', ocean: 'Pacific Ocean', depth: 2000, status: 'Active', time: '2 hours ago' },
    { id: 'ARG002', ocean: 'Atlantic Ocean', depth: 1500, status: 'Active', time: '5 hours ago' },
    { id: 'ARG003', ocean: 'Indian Ocean', depth: 1800, status: 'Collecting', time: '1 day ago' },
    { id: 'ARG004', ocean: 'Arctic Ocean', depth: 1200, status: 'Surfaced', time: '2 days ago' },
  ];

  const regionalCoverage = [
    { region: 'North Pacific', floats: 1247, coverage: 92 },
    { region: 'North Atlantic', floats: 856, coverage: 89 },
    { region: 'South Pacific', floats: 743, coverage: 85 },
    { region: 'Indian Ocean', floats: 621, coverage: 87 },
    { region: 'Southern Ocean', floats: 380, coverage: 78 },
  ];

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'status-active';
      case 'collecting': return 'status-collecting';
      case 'surfaced': return 'status-surfaced';
      default: return '';
    }
  };

  return (
    // ✅ CRITICAL: Make sure the main div has this className
    <div className="dashboard-container">
      {/* Section 1: Ocean Data Overview */}
      <div className="dashboard-header">
        <h1>Ocean Data Dashboard</h1>
        <p>Real-time insights from the global ARGO float network</p>
      </div>
      <div className="stats-grid">
        {/* ... all your stat cards ... */}
        <div className="stat-card"><div className="stat-icon"><FiThermometer /></div><div className="stat-info"><span className="stat-label">Global Temperature</span><span className="stat-value">15.2°C</span></div><span className="stat-trend positive">+0.3°C</span></div>
        <div className="stat-card"><div className="stat-icon"><FiDroplet /></div><div className="stat-info"><span className="stat-label">Average Salinity</span><span className="stat-value">34.7 PSU</span></div><span className="stat-trend negative">-0.1 PSU</span></div>
        <div className="stat-card"><div className="stat-icon"><FiWind /></div><div className="stat-info"><span className="stat-label">Sea Pressure</span><span className="stat-value">1013 hPa</span></div><span className="stat-trend positive">+5 hPa</span></div>
        <div className="stat-card"><div className="stat-icon"><FaShip /></div><div className="stat-info"><span className="stat-label">Active Floats</span><span className="stat-value">3,847</span></div><span className="stat-trend positive">+23</span></div>
      </div>

      {/* Section 2: Global Map */}
      <div className="card full-width-card">
        <h2>Global Coverage Map</h2>
        <Map />
      </div>
      
      {/* Section 3: Deployments and Regional Coverage */}
      <div className="content-grid">
        {/* ... your deployment and coverage cards ... */}
        <div className="card">
          <h2>Recent Float Deployments</h2>
          <div className="deployment-list">{deployments.map((deploy) => (<div key={deploy.id} className="deployment-item"><div className="deployment-info"><span className="deployment-id">{deploy.id}</span><span className="deployment-location">{deploy.ocean} • {deploy.depth}m</span></div><div className="deployment-status"><span className={`status-pill ${getStatusClass(deploy.status)}`}>{deploy.status}</span><span className="deployment-time">{deploy.time}</span></div></div>))}</div>
          <button className="view-all-btn">View All Deployments</button>
        </div>
        <div className="card">
          <h2>Regional Coverage</h2>
          <div className="coverage-list">{regionalCoverage.map((region) => (<div key={region.region} className="coverage-item"><div className="coverage-header"><span>{region.region}</span><span>{region.floats} floats</span></div><div className="progress-bar-container"><div className="progress-bar" style={{ width: `${region.coverage}%` }}></div></div><span className="coverage-percent">{region.coverage}% coverage</span></div>))}</div>
        </div>
      </div>

      {/* Section 4: Data Quality & Trends */}
      <div className="trends-grid">
        {/* ... your trends cards ... */}
        <div className="card trend-card"><span className="trend-label">Data Quality Score</span><span className="trend-value large-green">98.7%</span></div>
        <div className="card trend-card"><span className="trend-label">Update Frequency</span><span className="trend-value">24h</span></div>
        <div className="card trend-card"><span className="trend-label">Total Data Volume</span><span className="trend-value">156TB</span></div>
      </div>
    </div>
  );
};

export default Dashboard;