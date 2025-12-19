import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TeamMember } from "./TeamMember";
import { ValueCard } from "./ValueCard";
import { teamMembers, values } from "./AboutUsPage.import";

export const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-linear-to-r from-[#4EA674] to-[#3d8a5d] text-white py-20 px-8">
        <div className="mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">About तपाइकोBazar</h1>
          <p className="text-xl leading-relaxed opacity-95">
            Founded in 2025, तपाइकोBazar has been dedicated to bringing you the
            finest selection of products that combine quality, innovation, and
            value. We&apos;re more than just an online store – we&apos;re your
            trusted partner in finding products that truly make a difference.
          </p>
        </div>
      </div>

      <div className="mx-auto px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              What started as a small passion project has grown into a thriving
              e-commerce platform serving thousands of satisfied customers
              worldwide. Our journey began with a simple belief: everyone
              deserves access to high-quality products without compromise.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Today, we work with trusted brands and suppliers to curate a
              collection that meets the diverse needs of our customers. From
              cutting-edge technology to everyday essentials, every item in our
              catalog is chosen with care and attention to detail.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our commitment to excellence extends beyond products. We've built
              a team of passionate individuals who share our vision of creating
              meaningful shopping experiences and building lasting relationships
              with our customers.
            </p>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop"
              alt="Our team"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <ValueCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Behind every great shopping experience is a dedicated team working
            to make it happen. Get to know the people who bring तपाइकोBazar to
            life.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
                link={member.link}
              />
            ))}
          </div>
        </div>

        <div className="bg-linear-to-r from-[#4EA674] to-[#3d8a5d] rounded-lg p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-lg mb-8 opacity-95">
            Be part of our growing community and experience shopping the way it
            should be.
          </p>
          <Link
            href={"/home"}
            className="bg-white text-[#4EA674] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};
