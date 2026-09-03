import Image from "next/image";

export type Course = {
  id: number;
  code: string;
  title: string;
  credits: number;
  isOpen: boolean;
};

export type Member = {
  id: number;
  name: string;
  role: string;
};

export type Band = {
  id: number;
  name: string;
  genre: string;
  imageUrl?: string;
  members: Member[];
};

type CourseCardProps = {
  course?: Course;
  band?: Band;
};

export default function CourseCard({ course, band }: CourseCardProps) {
  if (course) {
    return (
      <article className="course-card">
        <h2>{course.title}</h2>
        <p>รหัสวิชา: {course.code}</p>
        <p>{course.credits} หน่วยกิต</p>
        <p>{course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}</p>
      </article>
    );
  }

  if (band) {
    return (
      <article className="course-card">
        {band.imageUrl && (
          <div style={{ position: "relative", width: "100%", height: "180px", marginBottom: "1rem" }}>
            <Image
              src={band.imageUrl}
              alt={band.name}
              fill
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </div>
        )}
        <h2>{band.name}</h2>
        <p>แนวเพลง: {band.genre}</p>
        <div style={{ marginTop: "0.5rem", paddingTop: "0.5rem", borderTop: "1px solid #eee" }}>
          <h3>สมาชิกในวง:</h3>
          <ul>
            {band.members.map((m) => (
              <li key={m.id}>{m.name} — {m.role}</li>
            ))}
          </ul>
        </div>
      </article>
    );
  }

  return null;
}