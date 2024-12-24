"use client";

import React, { useState, useEffect } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';

const ContactSection = ({
  values,
  errors,
  touched,
  onContactDataChange,
  handleChange,
  handleBlur,
}) => {
  // Handle country, state, and city dropdowns
  const countries = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: `${country.name} (${country.isoCode})`,
  }));

  const states = values.country
    ? State.getStatesOfCountry(values.country.value).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }))
    : [];

  const cities = values.state
    ? City.getCitiesOfState(values.country.value, values.state.value).map((city) => ({
        value: city.name,
        label: city.name,
      }))
    : [];

  // Handle updates for the parent component
  const handleFieldChange = (field, value) => {
    onContactDataChange({
      ...values,
      [field]: value,
    });
  };

  return (
    <section>
      {/* Phone Number Fields */}
      <div className="flex gap-3 mt-3">
        <div className="w-[50%] flex flex-col gap-2">
          <label htmlFor="phone" className="text-[16px]">Primary Phone</label>
          <PhoneInput
            placeholder="Phone"
            defaultCountry="US"
            value={values.phone}
            onChange={(value) => handleFieldChange("phone", value)}
            onBlur={handleBlur}
            name="phone"
          />
          {touched.phone && errors.phone && (
            <div className="text-red-500 text-sm">{errors.phone}</div>
          )}
        </div>

        <div className="w-[50%] flex flex-col gap-2">
          <label htmlFor="backupPhone" className="text-[16px]">Backup Phone</label>
          <PhoneInput
            placeholder="Backup Phone"
            defaultCountry="US"
            value={values.backupPhone}
            onChange={(value) => handleFieldChange("backupPhone", value)}
            onBlur={handleBlur}
            name="backupPhone"
          />
          {touched.backupPhone && errors.backupPhone && (
            <div className="text-red-500 text-sm">{errors.backupPhone}</div>
          )}
        </div>
      </div>

      {/* Email Field */}
      <div className="flex gap-3 mt-3">
        <div className="w-[50%] flex flex-col gap-2">
          <label htmlFor="email" className="text-[16px]">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            className="text-[15.04px] border-gray-300 outline-primary border-[1px] px-3 py-3 rounded-[5px]"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}
        </div>

        {/* Website Field */}
        <div className="w-[50%] flex flex-col gap-2">
          <label htmlFor="website" className="text-[16px]">Website (Optional)</label>
          <input
            type="text"
            id="website"
            name="website"
            placeholder="Website URL"
            className="text-[15.04px] border-gray-300 outline-primary border-[1px] px-3 py-3 rounded-[5px]"
            value={values.website}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.website && errors.website && (
            <div className="text-red-500 text-sm">{errors.website}</div>
          )}
        </div>
      </div>

      {/* Country, State, and City Dropdowns */}
      <div className="flex gap-3 mt-3">
        <div className="w-[33%] flex flex-col gap-2">
          <label htmlFor="country" className="text-[16px]">Country</label>
          <Select
            options={countries}
            value={values.country}
            onChange={(value) => handleFieldChange("country", value)}
            onBlur={handleBlur}
            name="country"
          />
          {touched.country && errors.country && (
            <div className="text-red-500 text-sm">{errors.country}</div>
          )}
        </div>

        <div className="w-[33%] flex flex-col gap-2">
          <label htmlFor="state" className="text-[16px]">State</label>
          <Select
            options={states}
            value={values.state}
            onChange={(value) => handleFieldChange("state", value)}
            onBlur={handleBlur}
            name="state"
            isDisabled={!values.country}
          />
          {touched.state && errors.state && (
            <div className="text-red-500 text-sm">{errors.state}</div>
          )}
        </div>

        <div className="w-[33%] flex flex-col gap-2">
          <label htmlFor="city" className="text-[16px]">City</label>
          <Select
            options={cities}
            value={values.city}
            onChange={(value) => handleFieldChange("city", value)}
            onBlur={handleBlur}
            name="city"
            isDisabled={!values.state}
          />
          {touched.city && errors.city && (
            <div className="text-red-500 text-sm">{errors.city}</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
