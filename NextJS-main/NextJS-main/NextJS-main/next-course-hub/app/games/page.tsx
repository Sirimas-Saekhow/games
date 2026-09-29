"use client";

import { useEffect, useState } from "react";

type Game = {
  id: number;
  name: string;
  platform: string;
  hours: number;
  status: string;
};

const initialGames: Game[] = [
  { id: 1, name: "ROV", platform: "Mobile", hours: 200, status: "กำลังเล่น" },
  { id: 2, name: "Free Fire", platform: "Mobile", hours: 150, status: "กำลังเล่น" },
  { id: 3, name: "Minecraft", platform: "PC / Mobile", hours: 300, status: "กำลังเล่น" },
  { id: 4, name: "Genshin Impact", platform: "PC / Mobile", hours: 250, status: "กำลังเล่น" },
  { id: 5, name: "Valorant", platform: "PC", hours: 180, status: "เล่นจบแล้ว" },
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
      alert("กรุณากรอกข้อมูลให้ครบ");
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
    if (confirm("ต้องการลบเกมนี้หรือไม่?")) {
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
    <main className="games-page">
      <div className="game-container">
        <header className="header-section">
          <div className="game-icon">🎮</div>
          <h2>Game Backlog Tracker</h2>
        </header>

        <section className="game-form">
          <h1>{editingId !== null ? "✏️ แก้ไขข้อมูลเกม" : "➕ เพิ่มเกมใหม่"}</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>ชื่อเกม</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="เช่น Cyberpunk 2077"
              />
            </div>

            <div className="input-group">
              <label>แพลตฟอร์ม</label>
              <input
                type="text"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                placeholder="เช่น PC, PS5, Switch, Mobile"
              />
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>ชั่วโมงที่คาดว่าจะเล่น</label>
                <input
                  type="number"
                  min="0"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="0"
                />
              </div>

              <div className="input-group">
                <label>สถานะ</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
                  <option value="กำลังเล่น">กำลังเล่น</option>
                  <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
                </select>
              </div>
            </div>

            <div className="form-buttons">
              <button type="submit" className="save-button">
                {editingId !== null ? "บันทึกการแก้ไข" : "เพิ่มลงคลัง"}
              </button>
              {editingId !== null && (
                <button type="button" className="cancel-button" onClick={clearForm}>
                  ยกเลิก
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="game-list">
          <div className="list-header">
            <h3>คลังเกมของคุณ ({games.length})</h3>
          </div>

          {games.length === 0 ? (
            <div className="empty-state">ยังไม่มีรายการเกมในคลังของคุณ</div>
          ) : (
            games.map((game) => (
              <div className="game-card" key={game.id}>
                <div className="game-info">
                  <h2>{game.name}</h2>
                  <div className="game-details">
                    <span className="platform-tag">{game.platform}</span>
                    <span className="bullet">•</span>
                    <span className="hours-text">⏱️ {game.hours} ชม.</span>
                    <span className="bullet">•</span>
                    <span
                      className={`status-badge ${
                        game.status === "กำลังเล่น"
                          ? "status-playing"
                          : game.status === "เล่นจบแล้ว"
                          ? "status-finished"
                          : "status-not-started"
                      }`}
                    >
                      {game.status}
                    </span>
                  </div>
                </div>

                <div className="game-actions">
                  <button className="edit-button" onClick={() => handleEdit(game)}>
                    แก้ไข
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(game.id)}>
                    ลบ
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </div>

      <style jsx>{`
        .games-page {
          min-height: 100vh;
          background: #0b0f19;
          background-image: 
            radial-gradient(at 0% 0%, rgba(139, 92, 246, 0.15) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(236, 72, 153, 0.1) 0px, transparent 50%);
          padding: 40px 20px 80px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #f3f4f6;
        }

        .game-container {
          width: 100%;
          max-width: 680px;
          margin: 0 auto;
        }

        .header-section {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .game-icon {
          font-size: 32px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8px 12px;
          border-radius: 12px;
          backdrop-filter: blur(8px);
        }

        .header-section h2 {
          font-size: 22px;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .game-form {
          background: rgba(17, 24, 39, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
          margin-bottom: 32px;
        }

        .game-form h1 {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 20px;
          color: #e5e7eb;
        }

        .input-group {
          margin-bottom: 16px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .game-form label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 6px;
          color: #9ca3af;
        }

        .game-form input,
        .game-form select {
          width: 100%;
          box-sizing: border-box;
          background: rgba(31, 41, 55, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #f9fafb;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
          transition: all 0.2s ease;
        }

        .game-form input:focus,
        .game-form select:focus {
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
          background: rgba(31, 41, 55, 0.9);
        }

        .form-buttons {
          display: flex;
          gap: 10px;
          margin-top: 24px;
        }

        .save-button {
          flex: 1;
          background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
          color: white;
          border: none;
          padding: 11px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
        }

        .save-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(124, 58, 237, 0.4);
        }

        .cancel-button {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #d1d5db;
          padding: 11px 20px;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cancel-button:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .list-header {
          margin-bottom: 16px;
        }

        .list-header h3 {
          font-size: 16px;
          font-weight: 600;
          color: #9ca3af;
          margin: 0;
        }

        .game-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .game-card {
          background: rgba(17, 24, 39, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          transition: all 0.2s ease;
        }

        .game-card:hover {
          border-color: rgba(139, 92, 246, 0.3);
          background: rgba(17, 24, 39, 0.8);
          transform: translateY(-2px);
        }

        .game-info h2 {
          color: #f3f4f6;
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 8px;
        }

        .game-details {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #9ca3af;
          flex-wrap: wrap;
        }

        .platform-tag {
          background: rgba(255, 255, 255, 0.06);
          padding: 2px 8px;
          border-radius: 4px;
          color: #d1d5db;
        }

        .bullet {
          color: #4b5563;
        }

        .status-badge {
          font-weight: 500;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
        }

        .status-playing {
          background: rgba(245, 158, 11, 0.1);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        .status-finished {
          background: rgba(16, 185, 129, 0.1);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .status-not-started {
          background: rgba(156, 163, 175, 0.1);
          color: #9ca3af;
          border: 1px solid rgba(156, 163, 175, 0.2);
        }

        .game-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .edit-button,
        .delete-button {
          border: none;
          border-radius: 6px;
          padding: 7px 12px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .edit-button {
          background: rgba(245, 158, 11, 0.1);
          color: #fbbf24;
        }

        .edit-button:hover {
          background: rgba(245, 158, 11, 0.2);
        }

        .delete-button {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
        }

        .delete-button:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        .empty-state {
          text-align: center;
          padding: 40px;
          color: #6b7280;
          background: rgba(17, 24, 39, 0.3);
          border-radius: 12px;
          border: 1px dashed rgba(255, 255, 255, 0.08);
        }

        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .game-card {
            align-items: flex-start;
            flex-direction: column;
          }

          .game-actions {
            width: 100%;
            margin-top: 8px;
          }

          .edit-button,
          .delete-button {
            flex: 1;
          }
        }
      `}</style>
    </main>
  );
}