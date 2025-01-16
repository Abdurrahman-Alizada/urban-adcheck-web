import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

// Shared ContactIcon Component
const ContactIcon = ({ icon, text }) => (
  <div className="flex items-center gap-4">
    <FontAwesomeIcon icon={icon} color="#068179" size="lg" />
    <p className="text-black font-nunitosans font-normal text-[17px]">{text}</p>
  </div>
);

// Main Contact Component
function Contact() {
  const contactDetails = [
    { icon: faLocationDot, text: 'Address: 123 Street, City, Country' },
    { icon: faPhone, text: '+123 456 789' },
    { icon: faEnvelope, text: 'Email: info@domain.com' },
  ];

  return (
    <section className="w-full min-h-auto  flex flex-col md:flex-row gap-3 mt-24 mb-10 px-3 md:px-10 lg:px-16">
      {/* Left Side */}
      <div className="w-full md:w-1/2">
        <div className="mb-5 md:mb-8">
          <h2 className="text-[24px] md:text-[34px] lg:text-[48px] font-extrabold font-Archivoo">Get In Touch!</h2>
          <p className="text-black max-w-[400px] font-nunitosans font-normal text-[17px]">
            Fill up the form and our Team will get back to you within 24 hours.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {contactDetails.map((item, index) => (
            <ContactIcon key={index} icon={item.icon} text={item.text} />
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2">
       {/* contact form */}
        <form className="p-4 bg-[#068179] bg-opacity-40 shadow-md rounded-3xl">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Write your message here"
              required
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-secondary text-white py-2 px-4 rounded-md font-bold hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
