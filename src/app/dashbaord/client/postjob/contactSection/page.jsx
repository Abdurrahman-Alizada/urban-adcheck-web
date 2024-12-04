'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';

function ContactSection() {
  // Form states
  const [phone, setPhone] = useState("");
  const [backupPhone, setBackupPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [errors, setErrors] = useState({}); // For validation errors

  // Prepare dropdown options
  const countries = Country.getAllCountries().map(country => ({
    value: country.isoCode,
    label: `${country.name} (${country.isoCode})`,
  }));

  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.value).map(state => ({
        value: state.isoCode,
        label: state.name,
      }))
    : [];

  const cities = selectedState
    ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map(city => ({
        value: city.name,
        label: city.name,
      }))
    : [];

  // Validation logic
  const validateForm = () => {
    const newErrors = {};

    if (!phone || !isValidPhoneNumber(phone)) {
      newErrors.phone = "Please enter a valid primary phone number.";
    }

    if (backupPhone && !isValidPhoneNumber(backupPhone)) {
      newErrors.backupPhone = "Please enter a valid backup phone number.";
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (website && !/^https?:\/\/.+/.test(website)) {
      newErrors.website = "Website URL must start with http:// or https://.";
    }

    if (!selectedCountry) {
      newErrors.country = "Please select a country.";
    }

    if (!selectedState) {
      newErrors.state = "Please select a state.";
    }

    if (!selectedCity) {
      newErrors.city = "Please select a city.";
    }

    setErrors(newErrors);

    // Return true if no errors exist
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted successfully!", {
        phone,
        backupPhone,
        email,
        website,
        country: selectedCountry.label,
        state: selectedState.label,
        city: selectedCity.label,
      });
    }
  };

  return (
    <section>
      {/* Phone Numbers */}
      <div className="flex gap-3 mt-3">
        <div className="w-[50%] flex flex-col gap-2">
          <label htmlFor="phone" className="text-[16px]">Primary Phone</label>
          <PhoneInput
            placeholder="Phone"
            className="custom-phone-input text-[15.04px] border-gray-300 outline-primary border-[1px] px-3 py-3 rounded-[5px]"
            defaultCountry="US"
            value={phone}
            onChange={setPhone}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <div className="w-[50%] flex flex-col gap-2">
          <label htmlFor="backupPhone" className="text-[16px]">Backup Phone</label>
          <PhoneInput
            placeholder="Backup Phone"
            className="custom-phone-input text-[15.04px] border-gray-300 outline-primary border-[1px] px-3 py-3 rounded-[5px]"
            defaultCountry="US"
            value={backupPhone}
            onChange={setBackupPhone}
          />
          {errors.backupPhone && <p className="text-red-500 text-sm">{errors.backupPhone}</p>}
        </div>
      </div>

      {/* Email and Website */}
      <div className="flex gap-3 mt-3">
        <div className="w-[50%] flex flex-col gap-2">
          <label htmlFor="email" className="text-[16px]">Email Address</label>
          <input
            type="email"
            placeholder="Email address"
            className="text-[15.04px] border-gray-300 outline-primary border-[1px] px-3 py-3 rounded-[5px]"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="w-[50%] flex flex-col gap-2">
          <label htmlFor="website" className="text-[16px]">Website Link (Optional)</label>
          <input
            type="text"
            placeholder="Website Link"
            className="text-[15.04px] border-gray-300 outline-primary border-[1px] px-3 py-3 rounded-[5px]"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          {errors.website && <p className="text-red-500 text-sm">{errors.website}</p>}
        </div>
      </div>

      {/* Dropdowns */}
      <div className="flex gap-3 mt-3">
        <div className="w-[33%] flex flex-col gap-2">
          <label htmlFor="country" className="text-[16px]">Country</label>
          <Select
            options={countries}
            id="country"
            value={selectedCountry}
            onChange={(country) => {
              setSelectedCountry(country);
              setSelectedState(null);
              setSelectedCity(null);
            }}
            placeholder="Select Country"
          />
          {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
        </div>

        <div className="w-[33%] flex flex-col gap-2">
          <label htmlFor="state" className="text-[16px]">State</label>
          <Select
            options={states}
            id="state"
            value={selectedState}
            onChange={(state) => {
              setSelectedState(state);
              setSelectedCity(null);
            }}
            placeholder="Select State"
            isDisabled={!selectedCountry}
          />
          {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
        </div>

        <div className="w-[33%] flex flex-col gap-2">
          <label htmlFor="city" className="text-[16px]">City</label>
          <Select
            options={cities}
            id="city"
            value={selectedCity}
            onChange={setSelectedCity}
            placeholder="Select City"
            isDisabled={!selectedState}
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-3">
        <label className="text-grayColor text-[15.03px] mt-4">
          <input type="checkbox" className="mr-2" />
          Save my contact information for faster posting
        </label>

        <div className="flex justify-end gap-3">
          <button className="text-[18px] px-6 py-2 border-grayColor border-[1px] rounded-[5px] bg-transparent">
            Previous
          </button>
          <button
            type="submit"
            className="text-[18px] px-8 py-2 bg-primary text-white rounded-[5px]"
            onClick={handleSubmit}
          >
            Post Ads
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
