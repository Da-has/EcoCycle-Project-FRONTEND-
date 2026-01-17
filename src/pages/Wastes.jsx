import { useState } from "react";
import WasteForm from "../components/WasteForm";
import WasteList from "../components/WasteList";
import WasteRequestForm from "../components/WasteRequestForm";

export default function Wastes() {
  const [tab, setTab] = useState("records");

  return (
    <div className="page">
      {/* Header */}
      <div className="card section">
        <h1 className="card-title">Waste Management</h1>
        <p className="muted">Track waste records and manage waste requests</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${tab === "records" ? "active" : ""}`}
          onClick={() => setTab("records")}
        >
          Waste Records
        </button>
        <button
          className={`tab ${tab === "requests" ? "active" : ""}`}
          onClick={() => setTab("requests")}
        >
          Waste Requests
        </button>
      </div>

      {/* Content */}
      {tab === "records" ? (
        <div className="flex-row">
          <div style={{ flex: 1 }}>
            <WasteForm />
          </div>
          <div style={{ flex: 2 }}>
            <WasteList />
          </div>
        </div>
      ) : (
        <WasteRequestForm />
      )}
    </div>
  );
}
