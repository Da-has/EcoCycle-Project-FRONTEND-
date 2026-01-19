expor.t default function IndustryForm() {
  return (
    <div className="card" style={{ flex: 1 }}>
      <h2 className="font-semibold text-lg">Add New Industry</h2>
      <p className="text-gray-500 mb-4">
        Register a new industry for waste tracking
      </p>

  <input className="input" placeholder="Industry Name" />
  <input className="input" placeholder="Industry Code" />
  <textarea
    className="textarea"
    rows="4"
    placeholder="Describe the industry and its waste types..."
  />

  <button className="button-primary">Add Industry</button>
</div>
  );
}