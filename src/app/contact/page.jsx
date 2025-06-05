"use client"
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Contact = () => {
  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    message: Yup.string().min(10, 'Message must be at least 10 characters').required('Message is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Form Submitted:', values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className='w-full min-h-[60vh] flex items-center justify-center' style={{
        backgroundImage: "url('/bg-about-hero.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-[30px] text-center md:text-[35px] lg:text-[60px] font-bold font-NotoSans text-black leading-[50px] md:leading-[70px]">
          Get In Touch!
        </h2>
        <p className="text-center text-gray-600 mt-4 text-lg">
          Have questions or need assistance? We’re here to help! Fill out the form, and our team will get back to you within 24 hours.
        </p>
        <div className="grid lg:grid-cols-2 gap-16 mt-10">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Headquarters</h3>
              <p className="text-gray-600 text-sm">Toronto, Ontario, Canada</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Email</h3>
              <p className="text-gray-600 text-sm">UrbanAdCheck@protonmail.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <Formik
              initialValues={{ name: '', email: '', message: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <Field type="text" id="name" name="name" className="w-full p-2 border rounded font-nunitosans" />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <Field type="email" id="email" name="email" className="w-full p-2 border rounded font-nunitosans" />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <Field as="textarea" id="message" name="message" rows="4" className="w-full p-2 border rounded font-nunitosans" />
                    <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-2 rounded font-nunitosans hover:bg-primary/90 transition"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
