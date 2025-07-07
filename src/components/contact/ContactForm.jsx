import React from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const ContactForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <Button type="submit">
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;