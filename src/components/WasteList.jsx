WasteList.jsx
const wastes = [
  {
    name: "Plastic Bottles",
    type: "Plastic",
    industry: "Manufacturing Corp",
    desc: "Collected plastic bottles from production line",
    qty: "500 kg",
    date: "1/25/2024",
  },
  {
    name: "Chemical Sludge",
    type: "Hazardous",
    industry: "Chemical Plants Ltd",
    desc: "Residual sludge from chemical processing",
    qty: "250 liters",
    date: "1/24/2024",
  },
  {
    name: "Metal Scraps",
    type: "Recyclable",
    industry: "Steel Works",
    desc: "Scrap metal from cutting process",
    qty: "1,200 kg",
    date: "1/22/2024",
  },
];

export default function WasteList() {
  return (
    <div className="card">
      <h2 className="card-title">Recent Waste Records</h2>
      <p className="muted">Showing {wastes.length} recent waste entries</p>

      <div className="waste-list">
        {wastes.map((w, index) => (
          <div key={index} className="waste-card">
            <h3 className="waste-card-title">
              {w.name} <span className="badge">{w.type}</span>
            </h3>

            <p className="waste-card-meta">{w.industry}</p>
            <p className="waste-card-desc">{w.desc}</p>

            <div className="waste-card-footer">
              <span className="waste-qty">{w.qty}</span>
              <span className="waste-date">{w.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
