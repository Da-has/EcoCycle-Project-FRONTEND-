export default function WasteList({ wastes, loading }) {
  return (
    <div className="card">
      <h2 className="card-title">Recent Waste Records</h2>

      {loading ? (
        <p className="muted">Loading waste entries...</p>
      ) : wastes.length === 0 ? (
        <p className="muted">No waste entries found.</p>
      ) : (
        <>
          <p className="muted">Showing {wastes.length} recent waste entries</p>

          <div className="waste-list">
            {wastes.map((w) => (
              <div key={w.id} className="waste-card">
                <h3 className="waste-card-title">
                  {w.name} <span className="badge">{w.wasteType}</span>
                </h3>

                <p className="waste-card-meta">
                  {w.industry?.name || "N/A"}
                </p>

                <p className="waste-card-desc">—</p>

                <div className="waste-card-footer">
                  <span className="waste-qty">
                    {w.quantity} {w.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
