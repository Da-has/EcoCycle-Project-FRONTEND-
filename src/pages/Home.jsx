ages/Home.jsx
export default function Home() {
  return (
    <div className="page">
      <div className="card section">
        <h1 className="card-title">Waste Management System</h1>
        <p className="muted">
          Track, manage, and optimize your industrial waste streams
        </p>
      </div>

      <div className="stats-grid section">
        <Stat title="Industries" value="12" />
        <Stat title="Waste Records" value="847" />
        <Stat title="Active Requests" value="23" />
        <Stat title="Total Waste" value="2.4K tons" />
      </div>

      <div className="stats-grid">
        <Card
          title="Track & Monitor"
          text="Monitor waste streams in real time."
        />
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
