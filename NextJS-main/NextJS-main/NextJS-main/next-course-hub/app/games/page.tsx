"use client";

import { useEffect, useState } from "react";

type Game = {
  id: number;
  name: string;
  platform: string;
  hours: number;
  status: string;
};

// รายการเกมเริ่มต้นครบทั้ง 5 เกม
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
    const savedGames = localStorage.getItem("games");
    if (savedGames) {
      setGames(JSON.parse(savedGames));
    } else {
      setGames(initialGames);
      localStorage.setItem("games", JSON.stringify(initialGames));
    }
  }, []);

  useEffect(() => {
    if (games.length > 0) {
      localStorage.setItem("games", JSON.stringify(games));
    }
  }, [games]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !platform || !hours) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (editingId !== null) {
      setGames(
        games.map((game) =>
          game.id === editingId
            ? { ...game, name, platform, hours: Number(hours), status }
            : game
        )
      );
      setEditingId(null);
    } else {
      const newGame: Game = {
        id: Date.now(),
        name,
        platform,
        hours: Number(hours),
        status,
      };
      setGames([...games, newGame]);
    }
    clearForm();
  };

  const handleDelete = (id: number) => {
    if (confirm("ต้องการลบรายการเกมนี้ใช่หรือไม่?")) {
      setGames(games.filter((game) => game.id !== id));
    }
  };

  const handleEdit = (game: Game) => {
    setEditingId(game.id);
    setName(game.name);
    setPlatform(game.platform);
    setHours(String(game.hours));
    setStatus(game.status);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearForm = () => {
    setName("");
    setPlatform("");
    setHours("");
    setStatus("ยังไม่เริ่ม");
    setEditingId(null);
  };

  return (
    <div className="cyber-wrapper">
      <main className="cyber-container">
        {/* Header */}
        <header className="cyber-header">
          <div className="neon-tag">GAMING LOG</div>
          <h1 className="cyber-title">MY GAME VAULT</h1>
          <p className="cyber-subtitle">ระบบบันทึกและติดตามสถานะเกมส่วนตัว</p>
        </header>

        {/* Form Input Section */}
        <section className="cyber-card form-section">
          <h2 className="card-title">
            {editingId !== null ? "⚡ EDIT GAME DETAILS" : "⚡ ADD NEW GAME"}
          </h2>

          <form onSubmit={handleSubmit} className="cyber-form">
            <div className="input-group">
              <label>ชื่อเกม (Game Title)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ระบุชื่อเกม..."
              />
            </div>

            <div className="input-group">
              <label>แพลตฟอร์ม (Platform)</label>
              <input
                type="text"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                placeholder="เช่น Mobile, PC, PS5, Switch"
              />
            </div>

            <div className="form-grid-2">
              <div className="input-group">
                <label>เวลาที่เล่น (ชั่วโมง)</label>
                <input
                  type="number"
                  min="0"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="0"
                />
              </div>

              <div className="input-group">
                <label>สถานะ (Status)</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
                  <option value="กำลังเล่น">กำลังเล่น</option>
                  <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="cyber-btn primary">
                {editingId !== null ? "บันทึกการแก้ไข" : "เพิ่มรายการเกม"}
              </button>
              {editingId !== null && (
                <button type="button" className="cyber-btn secondary" onClick={clearForm}>
                  ยกเลิก
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Display Games List */}
        <section className="games-display-section">
          <div className="display-header">
            <h2>คลังเกมทั้งหมด</h2>
            <span className="badge-count">{games.length} ITEMS</span>
          </div>

          {games.length === 0 ? (
            <div className="empty-state">ไม่มีรายการเกมในระบบขณะนี้</div>
          ) : (
            <div className="games-grid">
              {games.map((game) => (
                <div key={game.id} className="game-card">
                  <div className="game-card-content">
                    <div className="card-top">
                      <span className="platform-tag">{game.platform}</span>
                      <span
                        className={`status-chip ${
                          game.status === "กำลังเล่น"
                            ? "status-playing"
                            : game.status === "เล่นจบแล้ว"
                            ? "status-finished"
                            : "status-pending"
                        }`}
                      >
                        {game.status}
                      </span>
                    </div>

                    <h3 className="game-title">{game.name}</h3>

                    <div className="game-hours">
                      <span className="icon">⏱️</span>
                      <span className="val">{game.hours} ชั่วโมง</span>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button className="btn-edit" onClick={() => handleEdit(game)}>
                      แก้ไข
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(game.id)}>
                      ลบ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <style jsx>{`
        .cyber-wrapper {
          min-height: 100vh;
          background-color: #0d0a1a;
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 90% 80%, rgba(244, 63, 94, 0.15) 0%, transparent 40%);
          color: #f1f5f9;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          padding: 40px 20px 80px;
        }

        .cyber-container {
          max-width: 860px;
          margin: 0 auto;
        }

        .cyber-header {
          text-align: center;
          margin-bottom: 36px;
        }

        .neon-tag {
          display: inline-block;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
          color: #f43f5e;
          background: rgba(244, 63, 94, 0.1);
          border: 1px solid rgba(244, 63, 94, 0.3);
          padding: 4px 12px;
          border-radius: 4px;
          margin-bottom: 12px;
        }

        .cyber-title {
          font-size: 32px;
          font-weight: 900;
          letter-spacing: 1px;
          margin: 0 0 8px;
          background: linear-gradient(135deg, #ffffff 0%, #c084fc 50%, #f43f5e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .cyber-subtitle {
          color: #94a3b8;
          font-size: 14px;
          margin: 0;
        }

        .cyber-card {
          background: rgba(23, 15, 38, 0.8);
          border: 1px solid rgba(168, 85, 247, 0.25);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(12px);
          border-radius: 16px;
          padding: 28px;
          margin-bottom: 40px;
        }

        .card-title {
          font-size: 16px;
          font-weight: 800;
          letter-spacing: 0.5px;
          color: #e9d5ff;
          margin: 0 0 24px;
          border-bottom: 1px solid rgba(168, 85, 247, 0.15);
          padding-bottom: 12px;
        }

        .input-group {
          margin-bottom: 18px;
        }

        .input-group label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #a855f7;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .input-group input,
        .input-group select {
          width: 100%;
          box-sizing: border-box;
          background: #130a24;
          border: 1px solid #3b1d54;
          color: #f8fafc;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
          transition: all 0.2s ease;
        }

        .input-group input:focus,
        .input-group select:focus {
          border-color: #f43f5e;
          box-shadow: 0 0 12px rgba(244, 63, 94, 0.3);
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .cyber-btn {
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cyber-btn.primary {
          flex: 1;
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4);
        }

        .cyber-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(168, 85, 247, 0.6);
        }

        .cyber-btn.secondary {
          background: #2a1b3d;
          color: #cbd5e1;
          border: 1px solid #4a2b6b;
        }

        .cyber-btn.secondary:hover {
          background: #3b2554;
        }

        .display-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .display-header h2 {
          font-size: 20px;
          font-weight: 800;
          margin: 0;
          color: #f1f5f9;
        }

        .badge-count {
          background: #2a1b3d;
          color: #c084fc;
          border: 1px solid #4a2b6b;
          font-size: 11px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 20px;
        }

        .games-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }

        .game-card {
          background: rgba(23, 15, 38, 0.6);
          border: 1px solid rgba(168, 85, 247, 0.2);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.25s ease;
        }

        .game-card:hover {
          transform: translateY(-4px);
          border-color: #f43f5e;
          box-shadow: 0 8px 25px rgba(244, 63, 94, 0.25);
          background: rgba(23, 15, 38, 0.9);
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .platform-tag {
          font-size: 11px;
          font-weight: 700;
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.1);
          padding: 3px 8px;
          border-radius: 4px;
        }

        .status-chip {
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .status-playing {
          background: rgba(250, 204, 21, 0.15);
          color: #facc15;
        }

        .status-finished {
          background: rgba(74, 222, 128, 0.15);
          color: #4ade80;
        }

        .status-pending {
          background: rgba(148, 163, 184, 0.15);
          color: #cbd5e1;
        }

        .game-title {
          font-size: 18px;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 12px;
        }

        .game-hours {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #94a3b8;
          margin-bottom: 20px;
        }

        .card-actions {
          display: flex;
          gap: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 14px;
        }

        .btn-edit,
        .btn-delete {
          flex: 1;
          padding: 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-edit {
          background: rgba(168, 85, 247, 0.15);
          color: #c084fc;
        }

        .btn-edit:hover {
          background: rgba(168, 85, 247, 0.3);
        }

        .btn-delete {
          background: rgba(244, 63, 94, 0.15);
          color: #fb7185;
        }

        .btn-delete:hover {
          background: rgba(244, 63, 94, 0.3);
        }

        .empty-state {
          text-align: center;
          padding: 40px;
          background: rgba(23, 15, 38, 0.4);
          border: 1px dashed rgba(168, 85, 247, 0.2);
          border-radius: 12px;
          color: #64748b;
        }

        @media (max-width: 600px) {
          .form-grid-2 {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .games-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}