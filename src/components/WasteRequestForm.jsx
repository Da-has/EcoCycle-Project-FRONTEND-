export default function WasteForm() {
  return (
    <div className="card" style={{ flex: 1 }}>
      <h2 className="font-semibold text-lg">Record Waste</h2>
      <p className="text-gray-500 mb-4">
        Log new waste entries into the system
      </p>

      <select className="select">
        <option>Select an industry</option>
      </select>

      <input className="input" placeholder="e.g., Plastic Bottles" />

      <select className="select">
        <option>Select waste type</option>
        <option>Plastic</option>
        <option>Hazardous</option>
      </select>

      <div className="flex gap-3 mb-3">
        <input type="number" className="input w-1/2" value="0" />
        <select className="select w-1/2">
          <option>kg</option>
          <option>liters</option>
        </select>
      </div>

      <textarea
        className="textarea"
        placeholder="Add any notes about this waste entry..."
      />

      <button className="button-primary">Record Waste</button>
    </div>
  );
}
