import IndustryForm from "../components/IndustryForm";

const industries = [
  {
    name: "Manufacturing Corp",
    code: "MFG-001",
    desc: "Manufacturing plant",
    date: "1/15/2024",
  },
  {
    name: "Chemical Plants Ltd",
    code: "CHM-002",
    desc: "Chemical processing",
    date: "1/20/2024",
  },
];

export default function Industries() {
  return (
    <div className="page">
      <div className="card section">
        <h1 className="card-title">Industries</h1>
        <p className="muted">Manage industrial partners</p>
      </div>

      <div className="flex-row">
        <IndustryForm />

        <div className="card" style={{ flex: 2 }}>
          <h2 className="card-title">Registered Industries</h2>

          {industries.map((i, idx) => (
            <div key={idx} className="list-item">
              <div>
                <strong>{i.name}</strong>
                <span className="badge">{i.code}</span>
                <p className="muted">{i.desc}</p>
              </div>
              <p className="muted">{i.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
