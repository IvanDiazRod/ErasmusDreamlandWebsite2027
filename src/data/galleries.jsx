const carnivalImages = Object.values(
  import.meta.glob("/public/carnival-2026/*.{jpg,jpeg,png}", { eager: true })
).map((img) => img.default);

const croaciaDiaUnoImages = Object.values(
  import.meta.glob("/public/croacia-dia1/*.{jpg,jpeg,png}", { eager: true })
).map((img) => img.default);

const croaciaDiaDosImages = Object.values(
  import.meta.glob("/public/croacia-dia2/*.{jpg,jpeg,png}", { eager: true })
).map((img) => img.default);

export const galleries = [
  {
    id: 1,
    title: "Carnival 2026",
    slug: "carnival-2026",
    cover: "/carnival-2026/CSHT4455.jpg",
    description: "Momentos del Carnival 2026",
    images: carnivalImages,
  },
  {
    id: 2,
    title: "Croacia Día 1",
    slug: "croacia-dia1",
    cover: "/croacia-dia1/ALV_2675-Mejorado-NR.jpg",
    description: "Viaje a Croacia - Día 1",
    images: croaciaDiaUnoImages,
  },
  {
    id: 3,
    title: "Croacia Día 2",
    slug: "croacia-dia2",
    cover: "/croacia-dia2/ALV_3100-Mejorado-NR.jpg",
    description: "Viaje a Croacia - Día 2",
    images: croaciaDiaDosImages,
  },
];