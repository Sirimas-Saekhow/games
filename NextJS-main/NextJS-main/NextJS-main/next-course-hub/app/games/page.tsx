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
  {
    id: 1,
    name: "ROV",
    platform: "Mobile",
    hours: 200,
    status: "กำลังเล่น",
  },
  {
    id: 2,
    name: "Free Fire",
    platform: "Mobile",
    hours: 150,
    status: "กำลังเล่น",
  },
  {
    id: 3,
    name: "Minecraft",
    platform: "PC / Mobile",
    hours: 300,
    status: "กำลังเล่น",
  },
  {
    id: 4,
    name: "Genshin Impact",
    platform: "PC / Mobile",
    hours: 250,
    status: "กำลังเล่น",
  },
  {
    id: 5,
    name: "Valorant",
    platform: "PC",
    hours: 180,
    status: "เล่นจบแล้ว",
  },
];

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("");
  const [hours, setHours] = useState("");
  const [status, setStatus] = useState("ยังไม่เริ่ม");

  const [editingId, setEditingId] = useState<number | null>(null);

  // โหลดข้อมูลเกม
  useEffect(() => {
    const savedGames = localStorage.getItem("games");

    if (savedGames) {
      setGames(JSON.parse(savedGames));
    } else {
      setGames(initialGames);
      localStorage.setItem("games", JSON.stringify(initialGames));
    }
  }, []);

  // บันทึกข้อมูลเกม
  useEffect(() => {
    if (games.length > 0) {
      localStorage.setItem("games", JSON.stringify(games));
    }
  }, [games]);

  // เพิ่ม / แก้ไขเกม
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
            ? {
                ...game,
                name,
                platform,
                hours: Number(hours),
                status,
              }
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

  // ลบเกม
  const handleDelete = (id: number) => {
    const confirmDelete = confirm("ต้องการลบเกมนี้หรือไม่?");

    if (confirmDelete) {
      setGames(games.filter((game) => game.id !== id));
    }
  };

  // แก้ไขเกม
  const handleEdit = (game: Game) => {
    setEditingId(game.id);
    setName(game.name);
    setPlatform(game.platform);
    setHours(String(game.hours));
    setStatus(game.status);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ล้างข้อมูลในฟอร์ม
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

        {/* ไอคอนเกม */}
        <div className="game-icon">🎮</div>

        {/* ฟอร์มเพิ่มเกม */}
        <section className="game-form">

          <h1>
            {editingId !== null ? "แก้ไขเกม" : "เพิ่มเกมใหม่"}
          </h1>

          <form onSubmit={handleSubmit}>

            <label>ชื่อเกม</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>แพลตฟอร์ม</label>

            <input
              type="text"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              placeholder="เช่น PC, PS5, Switch"
            />

            <label>ชั่วโมงที่คาดว่าจะเล่น</label>

            <input
              type="number"
              min="0"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />

            <label>สถานะ</label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="ยังไม่เริ่ม">
                ยังไม่เริ่ม
              </option>

              <option value="กำลังเล่น">
                กำลังเล่น
              </option>

              <option value="เล่นจบแล้ว">
                เล่นจบแล้ว
              </option>
            </select>

            <div className="form-buttons">

              <button
                type="submit"
                className="save-button"
              >
                {editingId !== null
                  ? "บันทึกการแก้ไข"
                  : "บันทึก"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="cancel-button"
                  onClick={clearForm}
                >
                  ยกเลิก
                </button>
              )}

            </div>

          </form>
        </section>

        {/* รายการเกม */}
        <section className="game-list">

          {games.map((game) => (
            <div
              className="game-card"
              key={game.id}
            >

              <div className="game-info">

                <h2>{game.name}</h2>

                <p>
                  {game.platform} • {game.hours} ชม. •{" "}

                  <span
                    className={
                      game.status === "กำลังเล่น"
                        ? "status-playing"
                        : game.status === "เล่นจบแล้ว"
                        ? "status-finished"
                        : "status-not-started"
                    }
                  >
                    {game.status}
                  </span>

                </p>

              </div>

              <div className="game-actions">

                <button
                  className="edit-button"
                  onClick={() => handleEdit(game)}
                >
                  แก้ไข
                </button>

                <button
                  className="delete-button"
                  onClick={() => handleDelete(game.id)}
                >
                  ลบ
                </button>

              </div>

            </div>
          ))}

        </section>

      </div>

      <style jsx>{`

        .games-page {
          min-height: 100vh;
          background: white;
          padding: 30px 20px 60px;
        }

        .game-container {
          width: 100%;
          max-width: 620px;
          margin: 0 auto;
        }

        .game-icon {
          font-size: 30px;
          margin-bottom: 18px;
        }

        .game-form {
          background: #11182c;
          border-radius: 8px;
          padding: 16px;
          color: white;
          margin-bottom: 20px;
        }

        .game-form h1 {
          font-size: 20px;
          margin: 0 0 15px;
        }

        .game-form label {
          display: block;
          font-size: 13px;
          font-weight: bold;
          margin: 12px 0 6px;
        }

        .game-form input,
        .game-form select {
          width: 100%;
          box-sizing: border-box;
          background: #202d43;
          border: 1px solid #33415c;
          color: white;
          padding: 9px;
          border-radius: 4px;
          font-size: 14px;
          outline: none;
        }

        .game-form input:focus,
        .game-form select:focus {
          border-color: #9b22ff;
        }

        .form-buttons {
          display: flex;
          gap: 8px;
          margin-top: 16px;
        }

        .save-button {
          background: #9b16ff;
          color: white;
          border: none;
          padding: 9px 16px;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
        }

        .save-button:hover {
          background: #7d00d8;
        }

        .cancel-button {
          background: #555;
          color: white;
          border: none;
          padding: 9px 16px;
          border-radius: 4px;
          cursor: pointer;
        }

        .game-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .game-card {
          background: #202d43;
          border-radius: 8px;
          padding: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .game-info h2 {
          color: #c56cff;
          font-size: 18px;
          margin: 0 0 5px;
        }

        .game-info p {
          color: #8fa3c2;
          font-size: 13px;
          margin: 0;
        }

        .status-playing {
          color: #ffc400;
        }

        .status-finished {
          color: #00d084;
        }

        .status-not-started {
          color: #aaa;
        }

        .game-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .edit-button {
          background: #ff9800;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 12px;
          cursor: pointer;
          font-weight: bold;
        }

        .delete-button {
          background: #ff1744;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 12px;
          cursor: pointer;
          font-weight: bold;
        }

        .edit-button:hover {
          background: #e68900;
        }

        .delete-button:hover {
          background: #d50032;
        }

        @media (max-width: 600px) {

          .game-card {
            align-items: flex-start;
            flex-direction: column;
          }

          .game-actions {
            width: 100%;
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