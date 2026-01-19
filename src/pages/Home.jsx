import { useEffect, useState } from "react";
import { BASE_API_URL } from "../config/api";

export default function Home() {
  const [stats, setStats] = useState({
    total_industries: 0,
    total_waste_types: 0,
    total_requests: 0,
    total_waste_quantity: {},
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${BASE_API_URL}/dashboard/stats`);
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        if (data.overview) {
          setStats({
            total_industries: data.overview.total_industries,
            total_waste_types: data.overview.total_waste_types,
            total_requests: data.overview.total_requests,
            total_waste_quantity: data.overview.total_waste_quantity || {},
          });
        }
      } catch (err) {
        console.error(err);
        setError("Error loading dashboard stats");
      }
    };

    fetchStats();
  }, []);

  // Convert waste quantity object to a display string
  const renderTotalWaste = () => {
    const qtys = stats.total_waste_quantity;
    if (!qtys || Object.keys(qtys).length === 0) return "0";
    return Object.entries(qtys)
      .map(([unit, value]) => `${value} ${unit}`)
      .join(" | ");
  };

  return (
    <div className="page">
      <div className="card section">
        <h1 className="card-title">Waste Management System</h1>
        <p className="muted">
          Track, manage, and optimize your industrial waste streams
        </p>
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="stats-grid section">
        <Stat title="Industries" value={stats.total_industries} />
        <Stat title="Waste Records" value={stats.total_waste_types} />
        <Stat title="Active Requests" value={stats.total_requests} />
        <Stat title="Total Waste" value={renderTotalWaste()} />
      </div>

      <div className="stats-grid">
        <Card title="Track & Monitor" text="Monitor waste streams in real time." />
        <Card title="Optimize Operations" text="Improve sustainability." />
        <Card title="Request & Share" text="Reuse waste across industries." />
        <Card title="Compliance Ready" text="Generate regulatory reports." />
      </div>
    </div>
  );
}

const Stat = ({ title, value }) => (
  <div className="card">
    <p className="muted">{title}</p>
    <p className="stat-value">{value}</p>
  </div>
);

const Card = ({ title, text }) => (
  <div className="card">
    <h3 className="card-title">{title}</h3>
    <p className="muted">{text}</p>
  </div>
);
