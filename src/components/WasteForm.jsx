import { useState, useEffect } from "react";
import { BASE_API_URL } from "../config/api";

export default function WasteForm({ onAdd }) {
  const [industries, setIndustries] = useState([]);
  const [industryId, setIndustryId] = useState("");
  const [name, setName] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("kg");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${BASE_API_URL}/industries`)
      .then((res) => res.json())
      .then((data) => setIndustries(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load industries");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!industryId || !name || !wasteType) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${BASE_API_URL}/wastes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry_id: industryId,
          name,
          wasteType,
          quantity: Number(quantity),
          unit,
          details: notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to record waste");
      } else {
      
        setName("");
        setWasteType("");
        setQuantity(0);
        setNotes("");
        setIndustryId("");
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
      <h2 className="font-semibold text-lg">Record Waste</h2>
      <p className="text-gray-500 mb-4">
        Log new waste entries into the system
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

      <input
        className="input mb-2"
        placeholder="e.g., Plastic Bottles"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        className="select mb-2"
        value={wasteType}
        onChange={(e) => setWasteType(e.target.value)}
      >
        <option value="">Select waste type</option>
        <option value="Plastic">Plastic</option>
        <option value="Hazardous">Hazardous</option>
        <option value="Metal">Metal</option>
        <option value="Glass">Glass</option>
        <option value="Organic">Organic</option>
      </select>

      <div className="flex gap-3 mb-3">
        <input
          type="number"
          className="input w-1/2"
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
        placeholder="Add any notes about this waste entry..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button
        className="button-primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Recording..." : "Record Waste"}
      </button>
    </div>
  );
}
