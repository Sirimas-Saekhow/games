import CourseCard, { Band } from "@/components/CourseCard";

const favoriteBands: Band[] = [
  {
    id: 1,
    name: "Cocktail",
    genre: "Classic Rock / Pop Rock",
    imageUrl: "/images/bands/cocktail.jpg",
    members: [
      { id: 101, name: "โอม (ปัณฑพล ประสารราชกิจ)", role: "ร้องนำ" },
      { id: 102, name: "เชาว์ (ชวรัตน์ หริตวรณ์)", role: "กีตาร์" },
      { id: 103, name: "ปาร์ค (เกริกเกียรติ สว่างวงศ์)", role: "เบส" },
      { id: 104, name: "ฟิลิปส์ (ฟิลิปส์ เปรมสิริถาวร)", role: "กลอง" },
    ],
  },
  {
    id: 2,
    name: "Slot Machine",
    genre: "Hard Rock / Psychedelic Rock",
    imageUrl: "/images/bands/slotmachine.jpg",
    members: [
      { id: 201, name: "เฟิด (คาริญญ์ยวัฒ ดุรงค์จิรกานต์)", role: "ร้องนำ" },
      { id: 202, name: "แก๊ก (อธิราช ตันติเวชกุล)", role: "เบส" },
      { id: 203, name: "วิทย์ (เจนวิทย์ จันทร์อุไร)", role: "กีตาร์" },
    ],
  },
  {
    id: 3,
    name: "Tilly Birds",
    genre: "Alternative Rock / Post-Punk",
    imageUrl: "/images/bands/tillybirds.jpg",
    members: [
      { id: 301, name: "เติร์ด (อนุสรณ์ ณ เมืองศรี)", role: "ร้องนำ" },
      { id: 302, name: "บิลลี่ (ณัฐดนัย ชูชาติ)", role: "กีตาร์ / คีย์บอร์ด" },
      { id: 303, name: "ไมโล (ธุวชิต วิไลกุล)", role: "กลอง" },
    ],
  },
];

export default function BandsPage() {
  return (
    <main className="page">
      <h1>วงดนตรีที่ชื่นชอบ (Favorite Bands)</h1>
      <section className="courseGrid">
        {favoriteBands.map((band) => (
          <CourseCard key={band.id} band={band} />
        ))}
      </section>
    </main>
  );
}