"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

type Doctor = {
  id: string;
  name: string;
  specialization: string;
  availableDates: string[];
  image: string;
};

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr CHANDRU",
    specialization: "Cardiologist",
    availableDates: ["ALL"],
    image: "/img1.jpg",
  },
  {
    id: "2",
    name: "Dr GAUTAM",
    specialization: "Dermatologist",
    availableDates: ["ALL"],
    image: "/img2.jpg",
  },
  {
    id: "3",
    name: "Dr INYAN",
    specialization: "Neurologist",
    availableDates: ["ALL"],
    image: "/img3.jpg",
  },
  {
    id: "4",
    name: "Dr GOKUL",
    specialization: "Pediatrician",
    availableDates: ["ALL"],
    image: "/img13.jpg",
  },
  {
    id: "5",
    name: "Dr SABEEK",
    specialization: "Orthopedic",
    availableDates: ["ALL"],
    image: "/img12.jpg",
  },
  {
    id: "6",
    name: "Dr RAMESH",
    specialization: "ENT Specialist",
    availableDates: ["ALL"],
    image: "/img22.jpg",
  },
  {
    id: "7",
    name: "Dr PRIYA",
    specialization: "Gynecologist",
    availableDates: ["ALL"],
    image: "/img23.jpg",
  },
  {
    id: "8",
    name: "Dr ARJUN",
    specialization: "Psychiatrist",
    availableDates: ["ALL"],
    image: "/img24.jpg",
  },
  {
    id: "9",
    name: "Dr KAVIN",
    specialization: "Dentist",
    availableDates: ["ALL"],
    image: "/img26.jpg",
  },
  {
    id: "10",
    name: "Dr SOPHIE",
    specialization: "General Physician",
    availableDates: ["ALL"],
    image: "/img27.jpg",
  },
];

export default function Doctors() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Book Doctor Appointment</h1>

      {/* ✅ Search Bar Added */}
      <input
        type="text"
        placeholder="Search doctor by name or specialization..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto 20px auto",
          display: "block",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <div className="doctor-grid">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="card"
              style={{ cursor: "pointer" }}
              onClick={() => router.push(`/book/${doc.id}`)}
            >
              <div className="image-container">
                <Image
                  src={doc.image}
                  alt={doc.name}
                  width={200}
                  height={200}
                  style={{ borderRadius: "10px", objectFit: "cover" }}
                />
              </div>

              <h3>{doc.name}</h3>
              <p>{doc.specialization}</p>
            </div>
          ))
        ) : (
          <p style={{ color: "white", textAlign: "center" }}>
            No doctor found!
          </p>
        )}
      </div>
    </div>
  );
}