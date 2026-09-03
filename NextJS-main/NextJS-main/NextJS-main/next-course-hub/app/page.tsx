const siteName: string = "Student Course Hub";

const description: string =
  "เว็บไซต์รวบรวมข้อมูลรายวิชาสำหรับนักศึกษา";

export default function HomePage() {
  return (
    <main className="page">
      <h1>{siteName}</h1>

      <p>{description}</p>

      <section>
        <h2>เว็บไซต์นี้เหมาะกับใคร?</h2>

        <p>
          เว็บไซต์นี้เหมาะสำหรับนักศึกษาที่ต้องการดูข้อมูล
          และรายละเอียดของรายวิชาต่าง ๆ
        </p>
      </section>
    </main>
    
  );
}