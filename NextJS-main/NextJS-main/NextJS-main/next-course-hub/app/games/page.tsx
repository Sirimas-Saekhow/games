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
    if (!name || !platform || !hours) return alert("กรอกข้อมูลให้ครบ");

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
    <div className="min-h-screen bg-[#0d0a1a] text-purple-100 p-6 md:p-12 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <span className="bg-rose-500/10 text-rose-400 text-xs font-bold tracking-widest px-3 py-1 rounded border border-rose-500/30">GAMING LOG</span>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-rose-400">MY GAME VAULT</h1>
        </header>

        {/* ฟอร์มเพิ่ม/แก้ไข */}
        <form onSubmit={handleSubmit} className="bg-[#170f26]/80 border border-purple-500/30 p-6 rounded-2xl space-y-4 backdrop-blur shadow-xl">
          <h2 className="text-sm font-bold text-purple-300 tracking-wider">⚡ {editingId ? "EDIT GAME DETAILS" : "ADD NEW GAME"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="bg-[#130a24] border border-purple-900/60 p-2.5 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500 transition" placeholder="ชื่อเกม" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="bg-[#130a24] border border-purple-900/60 p-2.5 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500 transition" placeholder="แพลตฟอร์ม (เช่น Mobile, PC)" value={platform} onChange={(e) => setPlatform(e.target.value)} />
            <input className="bg-[#130a24] border border-purple-900/60 p-2.5 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500 transition" type="number" placeholder="ชั่วโมงที่เล่น" value={hours} onChange={(e) => setHours(e.target.value)} />
            <select className="bg-[#130a24] border border-purple-900/60 p-2.5 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500 transition" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
              <option value="กำลังเล่น">กำลังเล่น</option>
              <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-500 hover:to-rose-400 text-white font-bold py-2.5 rounded-lg shadow-lg shadow-purple-500/20 transition">
            {editingId ? "บันทึกการแก้ไข" : "เพิ่มรายการเกม"}
          </button>
        </form>

        {/* รายการเกมทั้ง 5 รายการ */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">คลังเกมทั้งหมด</h2>
            <span className="text-xs font-extrabold bg-[#2a1b3d] text-purple-300 border border-purple-800 px-3 py-1 rounded-full">{games.length} ITEMS</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {games.map((g) => (
              <div key={g.id} className="bg-[#170f26]/60 border border-purple-500/20 p-4 rounded-xl flex flex-col justify-between space-y-3 hover:border-rose-500/60 hover:-translate-y-1 transition duration-200">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded">{g.platform}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${g.status === "กำลังเล่น" ? "bg-amber-500/10 text-amber-300" : g.status === "เล่นจบแล้ว" ? "bg-emerald-500/10 text-emerald-300" : "bg-slate-500/10 text-slate-300"}`}>{g.status}</span>
                  </div>
                  <h3 className="font-extrabold text-lg text-white">{g.name}</h3>
                  <p className="text-xs text-purple-300/70 mt-1">⏱️ {g.hours} ชั่วโมง</p>
                </div>
                <div className="flex gap-2 pt-3 border-t border-purple-900/40">
                  <button onClick={() => handleEdit(g)} className="flex-1 text-xs bg-purple-500/15 hover:bg-purple-500/30 text-purple-300 py-1.5 rounded font-bold transition">แก้ไข</button>
                  <button onClick={() => setGames(games.filter((item) => item.id !== g.id))} className="flex-1 text-xs bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 py-1.5 rounded font-bold transition">ลบ</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}