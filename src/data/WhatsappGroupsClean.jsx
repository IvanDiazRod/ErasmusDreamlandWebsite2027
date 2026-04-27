import { whatsappLinksInfo } from "./LinksData.jsx";

const slugify = (value) =>
  value
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export const whatsappGroups = whatsappLinksInfo.map((country) => ({
  country: country.country,
  slug: slugify(country.country),
  states: country.data.map((city) => ({
    name: city.city,
    slug: slugify(city.city),
groups: [
  {
    name: `Erasmus ${city.city} 26/27`,
    link: city.whatsappLink?.split("?")[0] || null,
  },
  {
    name: `Erasmus ${city.city} 25/26`,
    link: city.whatsappLink2?.split("?")[0] || null,
  },
]
  })),
}));
