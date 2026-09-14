"use client";

import { useState } from "react";
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
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

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
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "180px",
              marginBottom: "1rem",
            }}
          >
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

        {/* ปุ่มถูกใจและติดตาม */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px",
            marginBottom: "15px",
          }}
        >
          <button
            onClick={() => {
              setIsLiked(!isLiked);
              setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
            }}
            style={{
              padding: "8px 15px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              background: isLiked ? "#ffe5e5" : "white",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            {isLiked ? "❤️ ถูกใจแล้ว" : "♡ ถูกใจ"} {likeCount}
          </button>

          <button
            onClick={() => setIsFollowed(!isFollowed)}
            style={{
              padding: "8px 15px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              background: isFollowed ? "#222" : "white",
              color: isFollowed ? "white" : "black",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            {isFollowed ? "✓ ติดตามแล้ว" : "+ ติดตาม"}
          </button>
        </div>

        <div
          style={{
            marginTop: "0.5rem",
            paddingTop: "0.5rem",
            borderTop: "1px solid #eee",
          }}
        >
          <h3>สมาชิกวง</h3>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {band.members.map((m) => {
              let memberImage = "";

              if (m.id === 101) {
                memberImage = "/images/bands/member/cocktail-101.jpg";
              } else if (m.id === 102) {
                memberImage = "/images/bands/member/cocktail-102.jpg";
              } else if (m.id === 103) {
                memberImage = "/images/bands/member/cocktail-103.jpg";
              } else if (m.id === 104) {
                memberImage = "/images/bands/member/cocktail-104.jpg";
              } else if (m.id === 201) {
                memberImage = "/images/bands/member/slotmachine-201.jpg";
              } else if (m.id === 202) {
                memberImage = "/images/bands/member/slotmachine-202.jpg";
              } else if (m.id === 203) {
                memberImage = "/images/bands/member/slotmachine-203.jpg";
              } else if (m.id === 301) {
                memberImage = "/images/bands/member/tillybirds-301.jpg";
              } else if (m.id === 302) {
                memberImage = "/images/bands/member/tillybirds-302.jpg";
              } else if (m.id === 303) {
                memberImage = "/images/bands/member/tillybirds-303.jpg";
              }

              return (
                <li
                  key={m.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "12px",
                    padding: "8px",
                    borderRadius: "8px",
                    background: "#f8f8f8",
                  }}
                >
                  {/* รูปสมาชิก */}
                  {memberImage && (
                    <Image
                      src={memberImage}
                      alt={m.name}
                      width={60}
                      height={60}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  )}

                  {/* ชื่อและตำแหน่ง */}
                  <div>
                    <div
                      style={{
                        fontWeight: "600",
                        marginBottom: "4px",
                      }}
                    >
                      {m.name}
                    </div>

                    <div
                      style={{
                        color: "#666",
                        fontSize: "14px",
                      }}
                    >
                      {m.role}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </article>
    );
  }

  return null;
}