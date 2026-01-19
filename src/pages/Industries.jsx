import { useState, useEffect } from "react";
import IndustryForm from "../components/IndustryForm";

const BASE_API_URL = "http://127.0.0.1:5555/api";

export default function Industries() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIndustries = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/industries`);
      const data = await res.json();
      setIndustries(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching industries:", err);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  const handleAddIndustry = (newIndustry) => {
    setIndustries((prev) => [...prev, newIndustry]);
  };

  const handleDeleteIndustry = async (id) => {
    try {
      const res = await fetch(`${BASE_API_URL}/industries/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setIndustries((prev) => prev.filter((i) => i.id !== id));
      }
    } catch (err) {
      console.error("Error deleting industry:", err);
    }
  };

  return (
    <div className="page">
      <div className="card section">
        <h1 className="card-title">Industries</h1>
        <p className="muted">Manage industrial partners</p>
      </div>

      <div className="flex-row">

        <IndustryForm onSuccess={handleAddIndustry} />

        <div className="card" style={{ flex: 2 }}>
          <h2 className="card-title">Registered Industries</h2>

          {loading ? (
            <p>Loading industries...</p>
          ) : industries.length === 0 ? (
            <p>No industries registered yet.</p>
          ) : (
            industries.map((i) => (
              <div key={i.id} className="list-item">
                <div>
                  <strong>{i.name}</strong>
                  <span className="badge">{i.industry_code}</span>
                  <p className="muted">{i.description}</p>
                </div>
                <button
                  className="btn btn-red"
                  onClick={() => handleDeleteIndustry(i.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
