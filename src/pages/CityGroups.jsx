import { useParams, useNavigate, Link } from "react-router-dom";

export default function CityGroups() {

  const { city } = useParams();
  const navigate = useNavigate();

  const cities = [
    {
      name: "Barcelona",
      slug: "barcelona",
      groups: [
        {
          name: "Erasmus Barcelona 25/26",
          link: "https://chat.whatsapp.com/",
        },
        {
          name: "Erasmus Barcelona 26/27",
          link: "https://chat.whatsapp.com/",
        },
      ],
    },
    {
      name: "Paris",
      slug: "paris",
      groups: [
        {
          name: "Erasmus Paris 25/26",
          link: "https://chat.whatsapp.com/",
        },
      ],
    },
  ];

  const selectedCity = cities.find(c => c.slug === city);

  if (!selectedCity) {
    return (
      <div className="p-10 text-center">
        <p>City not found</p>
        <button
          onClick={() => navigate("/groups")}
          className="text-blue-600 underline mt-2"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">

      <div className="max-w-5xl mx-auto">

        {/* 🔗 BREADCRUMB */}
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:underline">Home</Link>
          {" / "}
          <Link to="/groups" className="hover:underline">Groups</Link>
          {" / "}
          <span className="text-gray-700">{selectedCity.name}</span>
        </div>

        {/* 🏙️ HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            {selectedCity.name} Groups
          </h1>
          <p className="text-gray-600 mt-2">
            Join your city community and meet other travelers ✈️
          </p>
        </div>

        {/* 📦 GROUPS */}
        <div className="grid gap-6">

          {selectedCity.groups.map((group, idx) => (

            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-lg transition"
            >

              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {group.name}
                </h3>
                <p className="text-gray-500 text-sm">
                  Active community • Join now
                </p>
              </div>

              <button
                onClick={() => window.open(group.link, "_blank")}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl transition font-medium"
              >
                Join WhatsApp
              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}