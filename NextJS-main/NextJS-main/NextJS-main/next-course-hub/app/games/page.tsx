"use client";

import { useEffect, useState } from "react";

type Game = { id: number; name: string; platform: string; hours: number; status: string };

const initialGames: Game[] = [
  { id: 1, name: "ROV", platform: "Mobile", hours: 200, status: "กำลังเล่น" },
  { id: 2, name: "PUBG Mobile", platform: "Mobile", hours: 150, status: "กำลังเล่น" },
  { id: 3, name: "Block Blast!", platform: "Mobile", hours: 30, status: "เล่นจบแล้ว" },
  { id: 4, name: "Minecraft", platform: "PC / Mobile", hours: 300, status: "กำลังเล่น" },
  { id: 5, name: "Genshin Impact", platform: "PC / Mobile", hours: 250, status: "กำลังเล่น" },
];

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("");
  const [hours, setHours] = useState("");
  const [status, setStatus] = useState("ยังไม่เริ่ม");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("games");
    setGames(saved ? JSON.parse(saved) : initialGames);
  }, []);

  useEffect(() => {
    if (games.length > 0) localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !platform || !hours) return alert("กรอกข้อมูลให้ครบถ้วน");

    if (editingId !== null) {
      setGames(games.map((g) => (g.id === editingId ? { ...g, name, platform, hours: Number(hours), status } : g)));
      setEditingId(null);
    } else {
      setGames([...games, { id: Date.now(), name, platform, hours: Number(hours), status }]);
    }
    setName(""); setPlatform(""); setHours(""); setStatus("ยังไม่เริ่ม");
  };

  const handleEdit = (g: Game) => {
    setEditingId(g.id); setName(g.name); setPlatform(g.platform); setHours(String(g.hours)); setStatus(g.status);
  };

  return (
    <div className="page-bg">
      <div className="container">
        <header className="header">
          <span className="badge">GAMING LOG</span>
          <h1>MY GAME VAULT</h1>
        </header>

        {/* ฟอร์มเพิ่ม/แก้ไข */}
        <form onSubmit={handleSubmit} className="form-card">
          <h2>⚡ {editingId ? "EDIT GAME DETAILS" : "ADD NEW GAME"}</h2>
          <div className="form-grid">
            <input placeholder="ชื่อเกม" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="แพลตฟอร์ม (เช่น Mobile, PC)" value={platform} onChange={(e) => setPlatform(e.target.value)} />
            <input type="number" placeholder="ชั่วโมงที่เล่น" value={hours} onChange={(e) => setHours(e.target.value)} />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
              <option value="กำลังเล่น">กำลังเล่น</option>
              <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">
            {editingId ? "บันทึกการแก้ไข" : "เพิ่มรายการเกม"}
          </button>
        </form>

        {/* รายการเกม */}
        <div className="list-section">
          <div className="list-header">
            <h2>คลังเกมทั้งหมด</h2>
            <span className="count-badge">{games.length} ITEMS</span>
          </div>
          <div className="cards-grid">
            {games.map((g) => (
              <div key={g.id} className="game-card">
                <div>
                  <div className="card-top">
                    <span className="platform">{g.platform}</span>
                    <span className={`status ${g.status === "กำลังเล่น" ? "playing" : g.status === "เล่นจบแล้ว" ? "done" : "pending"}`}>
                      {g.status}
                    </span>
                  </div>
                  <h3>{g.name}</h3>
                  <p className="hours">⏱️ {g.hours} ชั่วโมง</p>
                </div>
                <div className="card-actions">
                  <button onClick={() => handleEdit(g)} className="btn-edit">แก้ไข</button>
                  <button onClick={() => setGames(games.filter((item) => item.id !== g.id))} className="btn-delete">ลบ</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-bg { min-height: 100vh; background: #0d0a1a; color: #f3e8ff; padding: 40px 20px; font-family: sans-serif; }
        .container { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 32px; }
        .header { text-align: center; }
        .badge { background: rgba(244, 63, 94, 0.15); color: #fb7185; border: 1px solid rgba(244, 63, 94, 0.3); font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 4px; letter-spacing: 1px; }
        .header h1 { font-size: 32px; font-weight: 900; margin: 8px 0 0; background: linear-gradient(135deg, #fff 0%, #c084fc 50%, #f43f5e 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        
        .form-card { background: rgba(23, 15, 38, 0.8); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 16px; padding: 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
        .form-card h2 { font-size: 13px; color: #c084fc; font-weight: 800; letter-spacing: 1px; margin: 0 0 16px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
        @media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } }
        
        input, select { width: 100%; box-sizing: border-box; background: #130a24; border: 1px solid #3b1d54; color: #fff; padding: 10px 14px; border-radius: 8px; font-size: 14px; outline: none; }
        input:focus, select:focus { border-color: #f43f5e; }
        
        .submit-btn { width: 100%; background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%); color: #fff; font-weight: 800; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-size: 14px; }
        .submit-btn:hover { opacity: 0.9; }

        .list-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .list-header h2 { font-size: 20px; font-weight: 800; margin: 0; }
        .count-badge { background: #2a1b3d; color: #c084fc; border: 1px solid #4a2b6b; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 20px; }

        .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
        .game-card { background: rgba(23, 15, 38, 0.6); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between; gap: 16px; }
        .game-card:hover { border-color: #f43f5e; transform: translateY(-2px); transition: all 0.2s; }
        
        .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .platform { font-size: 11px; font-weight: 700; color: #38bdf8; background: rgba(56, 189, 248, 0.1); padding: 2px 6px; border-radius: 4px; }
        .status { font-size: 11px; font-weight: 700; padding: 2px 6px; border-radius: 4px; }
        .status.playing { background: rgba(250, 204, 21, 0.15); color: #facc15; }
        .status.done { background: rgba(74, 222, 128, 0.15); color: #4ade80; }
        .status.pending { background: rgba(148, 163, 184, 0.15); color: #cbd5e1; }

        .game-card h3 { margin: 0 0 4px; font-size: 18px; color: #fff; }
        .hours { margin: 0; font-size: 12px; color: #a855f7; }

        .card-actions { display: flex; gap: 8px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 12px; }
        .btn-edit, .btn-delete { flex: 1; padding: 6px; border-radius: 6px; border: none; font-size: 12px; font-weight: 700; cursor: pointer; }
        .btn-edit { background: rgba(168, 85, 247, 0.15); color: #c084fc; }
        .btn-delete { background: rgba(244, 63, 94, 0.15); color: #fb7185; }
      `}</style>
    </div>
  );
}