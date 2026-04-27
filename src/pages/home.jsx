import Hero from "./Hero.jsx";
import TravelForm from "./TravelForm.jsx";
import PopularDestinations from "./PopularDestinations.jsx";
import TravelReasons from "./TravelReasons.jsx";
import Ratings from "./Ratings.jsx";

export default function Home() {

  return (
    <>
      <Hero />
      <TravelForm />
      <PopularDestinations />
      <TravelReasons />
      <Ratings />
    </>
  );
}