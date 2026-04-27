import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    name: "Emily Johnson",
    country: "United Kingdom",
    image: "https://randomuser.me/api/portraits/women/40.jpg",
    rating: 5,
    text: "The trip was perfectly organized. Every detail was taken care of and the experience exceeded our expectations. We will definitely travel with them again!",
    color: "bg-blue-800",
  },
  {
    name: "Michael Chen",
    country: "Canada",
    image: "https://randomuser.me/api/portraits/men/20.jpg",
    rating: 4,
    text: "Excellent support and a very intuitive platform. I was able to set everything up in less than an hour. Highly recommended for anyone looking to scale fast.",
    color: "bg-orange-700",
  },
  {
    name: "Sofia Rodríguez",
    country: "Spain",
    image: "https://randomuser.me/api/portraits/women/74.jpg",
    rating: 5,
    text: "The attention to detail and the quality of the service exceeded my expectations. It's rare to find a team so committed to their clients' success.",
    color: "bg-green-800",
  },
];

export default function Ratings() {

  const reviewsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (reviewsRef.current) {
      observer.observe(reviewsRef.current);
    }

    return () => {
      if (reviewsRef.current) {
        observer.unobserve(reviewsRef.current);
      }
    };
  }, []);
    
  return (

    <section ref={reviewsRef} className={`w-full bg-gray-50 py-16 md:py-20 px-4 sm:px-6 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
      
      <div className="max-w-6xl mx-auto text-center mb-10 md:mb-14">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-gray-800">What our clients say</h2>
        <p className="mt-3 md:mt-4 text-gray-600 text-base md:text-lg">Real experiences from happy travelers around the world</p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-6 sm:gap-8 md:gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (<div key={index} className={`${review.color} p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between`}><div><div className="flex items-center gap-4 mb-4"><img src={review.image} alt={review.name} className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover" /><div><h3 className="font-semibold text-white text-sm md:text-base">{review.name}</h3><p className="text-xs md:text-sm text-gray-100">{review.country}</p></div></div><div className="flex gap-1 text-yellow-300 mb-3">{[...Array(review.rating)].map((_, i) => (<svg key={i} className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>))}</div><p className="text-white text-sm md:text-base leading-relaxed">{review.text}</p></div></div>))}
      </div>
    
    </section>

  )
}