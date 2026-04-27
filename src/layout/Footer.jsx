
export default function footer() {

    return (

<footer className="bg-blue-700 text-white pt-16 pb-8 px-6">

<div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-2 items-start">

  {/* Brand */}
  <div>
    <h2 className="text-3xl font-semibold mb-4">
      Travel Agency
    </h2>
    <p className="text-blue-100 leading-relaxed max-w-md">
      It’s not about the trip, it’s about the experience.
      We create unforgettable journeys around the world.
    </p>
  </div>

  {/* Newsletter */}
<div className="md:justify-self-end w-full max-w-md">
  <h3 className="font-semibold text-lg mb-4">
    Subscribe to our newsletter
  </h3>

  <form className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-md w-full">
    <input
      type="email"
      placeholder="Your@email.com"
      className="flex-1 px-4 py-2 text-gray-700 outline-none w-full"
    />
    <button
      type="submit"
      className="bg-blue-600 px-5 py-2 mt-2 md:mt-0 md:ml-2 font-medium hover:bg-blue-800 transition w-full md:w-auto"
    >
      Subscribe
    </button>
  </form>
</div>


</div>


    <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-blue-500 text-center text-blue-200 text-sm"></div>

<div className="max-w-7xl mx-auto mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

  {/* Quick Links */}
  <div>
    <h3 className="text-lg font-semibold mb-4 tracking-wide">
      Quick links
    </h3>
    <ul className="space-y-2 text-blue-100 text-sm">
      <li><a href="#" className="hover:text-white transition">About Us</a></li>
      <li><a href="#" className="hover:text-white transition">Destinations</a></li>
      <li><a href="#" className="hover:text-white transition">Tours and packages</a></li>
      <li><a href="#" className="hover:text-white transition">Travel blog</a></li>
      <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
    </ul>
  </div>

  {/* Customer Support */}
  <div>
    <h3 className="text-lg font-semibold mb-4 tracking-wide">
      Customer support
    </h3>
    <ul className="space-y-2 text-blue-100 text-sm">
      <li><a href="#" className="hover:text-white transition">FAQs</a></li>
      <li><a href="#" className="hover:text-white transition">Payment options</a></li>
      <li><a href="#" className="hover:text-white transition">Travel insurance</a></li>
    </ul>
  </div>

  {/* Resources */}
  <div>
    <h3 className="text-lg font-semibold mb-4 tracking-wide">
      Resources
    </h3>
    <ul className="space-y-2 text-blue-100 text-sm">
      <li><a href="#" className="hover:text-white transition">Travel guides</a></li>
      <li><a href="#" className="hover:text-white transition">Visa information</a></li>
      <li><a href="#" className="hover:text-white transition">Tips to have a better travel</a></li>
      <li><a href="#" className="hover:text-white transition">Terms and conditions</a></li>
    </ul>
  </div>

  {/* Contact */}
  <div>
    <h3 className="text-lg font-semibold mb-4 tracking-wide">
      Contact Us
    </h3>

    <ul className="space-y-2 text-blue-100 text-sm mb-6">
      <li>Madrid, Spain</li>
      <li>+34 663 88 40 81</li>
      <li>info@travelagency.es</li>
    </ul>

    <p className="text-sm font-medium mb-3">Follow us</p>

    <div className="flex gap-4">
      
      <a href="#" className="text-blue-200 hover:text-white transition">
        
        <span className="sr-only">Facebook</span>
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        
        </svg>
      </a>
    </div>
  </div>

</div>


  {/* Bottom line */}
  <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-blue-500 text-center text-blue-200 text-sm">
    © 2024 Travel Agency. All rights reserved.
  </div>

</footer>

    )

}