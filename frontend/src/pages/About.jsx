import React from 'react';
import Navbar from '../components/Navbar';
const About = () => {
  return (
    <>
      <Navbar/>
      <div className="min-h-screen mt-15 bg-white p-8">
        <section className="max-w-4xl mx-auto text-red-600">
          <h1 className="text-4xl font-bold mb-6">About Our Blog</h1>
          <p className="mb-4 text-lg">
            Welcome to our blog! We are passionate about sharing insights, stories, and knowledge
            across a wide range of topics including technology, lifestyle, travel, and more.
          </p>
          <p className="mb-4 text-lg">
            Our mission is to provide valuable content that educates, inspires, and entertains our
            readers. Every article is carefully researched and crafted by our dedicated team of
            writers.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Our Team</h2>
          <p className="mb-4 text-lg">
            Our team consists of experienced writers, designers, and developers who collaborate to
            bring high-quality content to our audience. We value creativity, accuracy, and user
            engagement.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside mb-4 text-lg">
            <li>Authentic and well-researched content</li>
            <li>Regularly updated blog posts</li>
            <li>Focus on reader engagement and feedback</li>
            <li>Visually appealing and easy-to-read articles</li>
          </ul>
          <p className="mb-4 text-lg">
            We are committed to creating a blog that not only informs but also connects with our
            readers. Thank you for being part of our journey!
          </p>
        </section>
      </div>
    </>
  );
};

export default About;
