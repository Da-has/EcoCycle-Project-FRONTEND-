import { useState } from "react";
import { BASE_API_URL } from "../config/api";

export default function IndustryForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [industryCode, setIndustryCode] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !industryCode) {
      setError("Name and Industry Code are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_API_URL}/industries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          industry_code: parseInt(industryCode),
          description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to add industry");
      } else {
      
        setName("");
        setIndustryCode("");
        setDescription("");
        if (onSuccess) onSuccess(data);
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
      <h2 className="font-semibold text-lg mb-2">Add New Industry</h2>
      <p className="text-gray-500 mb-4">
        Register a new industry for waste tracking
      </p>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="input"
          placeholder="Industry Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input"
          placeholder="Industry Code"
          type="number"
          value={industryCode}
          onChange={(e) => setIndustryCode(e.target.value)}
        />
        <textarea
          className="textarea"
          rows="4"
          placeholder="Describe the industry and its waste types..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          className="button-primary mt-2"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Industry"}
        </button>
      </form>
    </div>
  );
}
