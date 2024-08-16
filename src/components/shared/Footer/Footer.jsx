import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-wrap justify-between">
          {/* Company Information */}
          <div className="w-full md:w-1/4 mb-6">
            <h2 className="text-xl font-bold mb-4">Your Company</h2>
            <p className="text-sm mb-4">
              123 Main Street, Suite 100<br />
              City, State 12345<br />
              Phone: (123) 456-7890<br />
              Email: info@starplus.com
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-500"><FaFacebookF /></a>
              <a href="#" className="text-white hover:text-blue-500"><FaTwitter /></a>
              <a href="#" className="text-white hover:text-pink-500"><FaInstagram /></a>
              <a href="#" className="text-white hover:text-blue-700"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/4 mb-6">
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-blue-500">Home</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-500">About Us</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-500">Services</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-500">Contact Us</a></li>
              <li className="mb-2"><a href="#" className="hover:text-blue-500">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="w-full md:w-1/4 mb-6">
            <h2 className="text-xl font-bold mb-4">Newsletter</h2>
            <p className="text-sm mb-4">Subscribe to our newsletter to stay updated on our latest products and offers.</p>
            <form className="flex">
              <input
                type="email"
                className="w-full px-4 py-2 rounded-l-md text-gray-800"
                placeholder="Enter your email"
              />
              <button type="submit" className="bg-blue-500 px-4 py-2 rounded-r-md text-white hover:bg-blue-600">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright and Terms */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Star Plus. All Rights Reserved.</p>
          <p className="mt-2">
            <a href="#" className="hover:text-blue-500">Privacy Policy</a> | <a href="#" className="hover:text-blue-500">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
