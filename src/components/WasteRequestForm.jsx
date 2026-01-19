import { useState, useEffect } from "react";
import { BASE_API_URL } from "../config/api";

export default function WasteRequestForm({ onAdd }) {
  const [industries, setIndustries] = useState([]);
  const [wastes, setWastes] = useState([]);
  const [industryId, setIndustryId] = useState("");
  const [wasteId, setWasteId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [notes, setNotes] = useState("");
  const [unit, setUnit] = useState("kg");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchIndustries();
    fetchWastes();
  }, []);

  const fetchIndustries = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/industries`);
      const data = await res.json();
      setIndustries(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load industries");
    }
  };

  const fetchWastes = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/wastes`);
      const data = await res.json();
      setWastes(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load wastes");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!industryId || !wasteId || quantity <= 0) {
      setError("Please fill all required fields with valid values");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BASE_API_URL}/dashboard/waste-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry_id: industryId,
          waste_id: wasteId,
          quantity_requested: Number(quantity),
          details: notes,
          unit,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to submit waste request");
      } else {
  
        setIndustryId("");
        setWasteId("");
        setQuantity(0);
        setNotes("");

        if (onAdd) onAdd(data);
      }
    } catch (err) {
      console.error(err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ flex: 1 }}>
      <h2 className="font-semibold text-lg">Request Waste</h2>
      <p className="text-gray-500 mb-4">
        Submit a request to receive or share waste materials
      </p>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <select
        className="select mb-2"
        value={industryId}
        onChange={(e) => setIndustryId(e.target.value)}
      >
        <option value="">Select an industry</option>
        {industries.map((ind) => (
          <option key={ind.id} value={ind.id}>
            {ind.name}
          </option>
        ))}
      </select>

      <select
        className="select mb-2"
        value={wasteId}
        onChange={(e) => setWasteId(e.target.value)}
      >
        <option value="">Select waste type</option>
        {wastes.map((w) => (
          <option key={w.id} value={w.id}>
            {w.name} ({w.wasteType})
          </option>
        ))}
      </select>

      <div className="flex gap-3 mb-3">
        <input
          type="number"
          className="input w-1/2"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <select
          className="select w-1/2"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option value="kg">kg</option>
          <option value="liters">liters</option>
        </select>
      </div>

      <textarea
        className="textarea mb-2"
        placeholder="Add any notes about this request..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button
        className="button-primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Request"}
      </button>
    </div>
  );
}
