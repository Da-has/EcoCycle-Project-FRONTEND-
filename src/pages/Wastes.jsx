import { useState, useEffect } from "react";
import { BASE_API_URL } from "../config/api";
import WasteForm from "../components/WasteForm";
import WasteList from "../components/WasteList";
import WasteRequestForm from "../components/WasteRequestForm";

export default function Wastes() {
  const [tab, setTab] = useState("records");
  const [wastes, setWastes] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch waste records
  const fetchWastes = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/wastes`);
      const data = await res.json();
      setWastes(data);
    } catch (err) { console.error(err); }
  };

  // Fetch requests
  const fetchRequests = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/dashboard/waste-requests`);
      const data = await res.json();
      setRequests(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchWastes();
    fetchRequests();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await fetch(`${BASE_API_URL}/dashboard/waste-requests/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
    
        fetchRequests();
        fetchWastes();
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Update failed");
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleAddWaste = (newWaste) => {
    setWastes((prev) => [newWaste, ...prev]);
  };

  const handleAddRequest = () => {
    fetchRequests(); 
  };

  return (
    <div className="page">
      <div className="card section">
        <h1 className="card-title">Waste Management</h1>
        <p className="muted">Track waste records and manage waste requests</p>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === "records" ? "active" : ""}`} onClick={() => setTab("records")}>Waste Records</button>
        <button className={`tab ${tab === "requests" ? "active" : ""}`} onClick={() => setTab("requests")}>Waste Requests</button>
      </div>

      {tab === "records" ? (
        <div className="flex-row">
          <div style={{ flex: 1 }}><WasteForm onAdd={handleAddWaste} /></div>
          <div style={{ flex: 2 }}><WasteList wastes={wastes} loading={loading} /></div>
        </div>
      ) : (
        <div className="flex-row">
          <div style={{ flex: 1 }}>
            <WasteRequestForm onAdd={handleAddRequest} />
          </div>
          <div style={{ flex: 2 }}>
            <div className="card">
              <h2 className="card-title">Recent Requests</h2>
              {requests.length === 0 ? (
                <p className="muted">Requests will appear here once submitted</p>
              ) : (
                <div className="request-list">
                  {requests.map((req) => (
                    <div key={req.id} className="request-item" style={{ padding: '15px 10px', borderBottom: '1px solid #eee' }}>
                      <div className="flex-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong>{req.industry?.name || "Unknown Industry"}</strong>
                        <span className={`badge status-${req.status}`}>{req.status}</span>
                      </div>
                      
                      <p style={{ margin: '8px 0' }}>
                        Requesting: <b>{req.quantity_requested} {req.waste?.unit || 'kg'}</b> of {req.waste?.name}
                      </p>
                      
                      {req.details && <p className="muted" style={{ fontSize: '0.85rem', marginBottom: '10px' }}>{req.details}</p>}

                      {/* Action Buttons: Only show if status is pending */}
                      {req.status === 'pending' && (
                        <div className="flex-row" style={{ gap: '10px', marginTop: '10px' }}>
                          <button 
                            onClick={() => handleStatusUpdate(req.id, 'approved')}
                            style={{ padding: '5px 12px', cursor: 'pointer', backgroundColor: '#e6f4ea', color: '#1e7e34', border: '1px solid #1e7e34', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(req.id, 'rejected')}
                            style={{ padding: '5px 12px', cursor: 'pointer', backgroundColor: '#fce8e6', color: '#d93025', border: '1px solid #d93025', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}