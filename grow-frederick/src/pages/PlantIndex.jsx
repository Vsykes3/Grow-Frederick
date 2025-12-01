import React, { useEffect, useMemo, useState } from "react";

/**
 * Minimal, dependency-free Plant Index page.
 * - Renders without API keys
 * - If keys are present in .env (VITE_OPENWEATHER_API_KEY, VITE_TREFLE_API_KEY), shows readiness
 * - Safe: uses fetch only when user clicks and keys exist
 */

const need = (name) => !import.meta.env[name] ? `Missing ${name}` : null;

export default function PlantIndex() {
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState("");
  const [weather, setWeather] = useState(null);
  const [plantQuery, setPlantQuery] = useState("");
  const [plants, setPlants] = useState([]);

  const missing = useMemo(() => {
    return ["VITE_OPENWEATHER_API_KEY","VITE_TREFLE_API_KEY"]
      .map(need)
      .filter(Boolean);
  }, []);

  async function getWeatherByZip() {
    if (!zip) { setStatus("Enter a ZIP code."); return; }
    const key = import.meta.env.VITE_OPENWEATHER_API_KEY;
    if (!key) { setStatus("No OpenWeather API key in .env"); return; }
    setStatus("Fetching weather…");
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?zip=${encodeURIComponent(zip)}&appid=${key}&units=imperial`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`OpenWeather error ${res.status}`);
      const data = await res.json();
      setWeather(data);
      setStatus("Weather loaded.");
    } catch (e) {
      setStatus(`Weather error: ${e.message}`);
    }
  }

  async function searchPlants() {
    if (!plantQuery) { setStatus("Enter a plant name."); return; }
    const key = import.meta.env.VITE_TREFLE_API_KEY;
    if (!key) { setStatus("No Trefle API key in .env"); return; }
    setStatus("Searching plants…");
    try {
      // Trefle v1 example endpoint (adjust to your plan)
      const url = `https://trefle.io/api/v1/plants/search?token=${key}&q=${encodeURIComponent(plantQuery)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Trefle error ${res.status}`);
      const json = await res.json();
      setPlants(Array.isArray(json?.data) ? json.data.slice(0,10) : []);
      setStatus(`Found ${json?.data?.length ?? 0} result(s). Showing up to 10.`);
    } catch (e) {
      setStatus(`Plant search error: ${e.message}`);
    }
  }

  useEffect(() => {
    // announce readiness once
    if (missing.length === 0) setStatus("Plant Index ready. Add ZIP or search a plant.");
    else setStatus("Add API keys in .env to enable live data.");
  }, []);

  return (
    <div style={{maxWidth: 960, margin: "0 auto", padding: "24px", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto"}}>
      <h1 style={{fontSize: 32, marginBottom: 8}}>?? Plant Index</h1>
      <p style={{opacity: 0.8, marginBottom: 16}}>
        A lightweight, no-dependency page wired to <code>/plant</code>. Works without keys; enables live data if keys exist.
      </p>

      {missing.length > 0 && (
        <div style={{background:"#FFF7E6", border:"1px solid #FFD599", padding:12, borderRadius:8, marginBottom:16}}>
          <strong>Environment:</strong> add these to your <code>.env</code> (then restart dev server):
          <pre style={{whiteSpace:"pre-wrap", marginTop:8, marginBottom:0}}>
VITE_OPENWEATHER_API_KEY=your_key
VITE_TREFLE_API_KEY=your_key
          </pre>
        </div>
      )}

      <div style={{display:"grid", gap:16, marginTop:8}}>
        <section style={{border:"1px solid #e5e7eb", borderRadius:12, padding:16}}>
          <h2 style={{fontSize:20, marginBottom:8}}>Local Weather (ZIP)</h2>
          <div style={{display:"flex", gap:8}}>
            <input
              placeholder="Enter ZIP e.g. 21704"
              value={zip}
              onChange={(e)=>setZip(e.target.value)}
              style={{flex:1, padding:"10px 12px", border:"1px solid #d1d5db", borderRadius:8}}
            />
            <button onClick={getWeatherByZip} style={{padding:"10px 14px", borderRadius:8, border:"1px solid #111", background:"#111", color:"#fff", cursor:"pointer"}}>
              Fetch
            </button>
          </div>
          {weather && (
            <div style={{marginTop:12, lineHeight:1.5}}>
              <div><strong>Location:</strong> {weather.name}</div>
              <div><strong>Temp:</strong> {Math.round(weather.main?.temp)}°F</div>
              <div><strong>Conditions:</strong> {weather.weather?.[0]?.description}</div>
            </div>
          )}
        </section>

        <section style={{border:"1px solid #e5e7eb", borderRadius:12, padding:16}}>
          <h2 style={{fontSize:20, marginBottom:8}}>Plant Search (Trefle)</h2>
          <div style={{display:"flex", gap:8}}>
            <input
              placeholder="e.g. basil, tomato"
              value={plantQuery}
              onChange={(e)=>setPlantQuery(e.target.value)}
              style={{flex:1, padding:"10px 12px", border:"1px solid #d1d5db", borderRadius:8}}
            />
            <button onClick={searchPlants} style={{padding:"10px 14px", borderRadius:8, border:"1px solid #111", background:"#111", color:"#fff", cursor:"pointer"}}>
              Search
            </button>
          </div>
          {plants.length > 0 && (
            <ul style={{marginTop:12, paddingLeft:20}}>
              {plants.map(p => (
                <li key={p.id}>
                  <strong>{p.common_name || "Unnamed"}</strong>{p.scientific_name ? ` — ${p.scientific_name}` : ""}
                </li>
              ))}
            </ul>
          )}
        </section>

        <div style={{opacity:0.8}}>{status}</div>
      </div>
    </div>
  );
}
