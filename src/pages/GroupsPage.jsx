import { useNavigate } from "react-router-dom";

export default function GroupsPage() {

  const navigate = useNavigate();

  const cities = [
    {
      name: "Barcelona",
      slug: "barcelona",
      image: "/img/cities/barcelona/barcelona.jpg",
      description: "One of the top Erasmus destinations in Europe.",
    },
    {
      name: "Paris",
      slug: "paris",
      image: "/img/cities/paris/paris1.jpg",
      description: "Culture, nightlife and international students.",
    },
    {
      name: "Rome",
      slug: "rome",
      image: "/img/cities/rome/rome1.jpg",
      description: "History, food and unforgettable experiences.",
    },
  ];

  return (
    <section className="w-full py-16 md:py-20 px-4 sm:px-6 bg-gray-50">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-blue-600">
            WhatsApp Groups
          </h1>

          <p className="mt-3 md:mt-4 text-gray-600 text-base md:text-lg">
            Join your city group and connect with other travelers.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {cities.map((city, idx) => (

            <div
              key={idx}
              onClick={() => navigate(`/groups/${city.slug}`)}
              className="group relative overflow-hidden rounded-3xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
            >

              {/* IMAGE */}
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition"></div>

              {/* TEXT */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl md:text-2xl font-semibold">
                  {city.name}
                </h3>
                <p className="text-sm md:text-base text-gray-200 mt-1">
                  {city.description}
                </p>
              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}