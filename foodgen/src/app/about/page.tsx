import { Container } from "@mui/material";
import Link from "next/link";
import { FaLinkedin, FaYoutube } from "react-icons/fa";

export default function AboutPage() {
  return (
    <Container className="flex w-full flex-col items-center justify-center gap-4 text-white">
      {/* About Section */}
      <section className="py-12 text-center">
        <h2 className="text-5xl font-bold text-yellow-800">About FOODGEN</h2>
        <p className="mt-4 text-lg text-yellow-700">
          FOODGEN is your personal meal-planning assistant, designed to inspire
          creativity and save time in the kitchen. Powered by advanced AI, we
          transform your ingredients and preferences into delicious recipes.
        </p>
      </section>

      {/* Mission Section */}
      <section className="max-w-[800px] rounded-lg bg-yellow-100 px-6 py-12">
        <div className="text-center">
          <h3 className="mb-6 text-3xl font-bold text-yellow-800">
            Our Mission
          </h3>
          <p className="text-lg text-yellow-700">
            At FOODGEN, we believe cooking should be fun, easy, and accessible
            to everyone. Whether {"you're"} an experienced chef or a kitchen
            novice, our goal is to help you create meals that delight.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 text-center">
        <h3 className="mb-6 text-3xl font-bold text-yellow-800">
          Why Choose FOODGEN?
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-yellow-100 p-6 px-8 shadow-lg">
            <h4 className="text-2xl font-bold text-yellow-800">
              Custom Recipes
            </h4>
            <p className="mt-2 text-yellow-700">
              Tailor meals to your preferences, ingredients, and dietary needs.
            </p>
          </div>
          <div className="rounded-lg bg-yellow-100 p-6 px-8 shadow-lg">
            <h4 className="text-2xl font-bold text-yellow-800">
              Dietary Flexibility
            </h4>
            <p className="mt-2 text-yellow-700">
              From vegan to keto, we’ve got recipes for every lifestyle.
            </p>
          </div>
          <div className="rounded-lg bg-yellow-100 p-6 px-8 shadow-lg">
            <h4 className="text-2xl font-bold text-yellow-800">Save Time</h4>
            <p className="mt-2 text-yellow-700">
              Skip the hassle of meal planning and let us do the work.
            </p>
          </div>
        </div>
      </section>

      {/* About the Team */}
      <section className="max-w-[800px] rounded-lg bg-yellow-100 px-6 py-12">
        <div className="text-center">
          <h3 className="mb-6 text-3xl font-bold text-yellow-800">
            About the Team
          </h3>
          <p className="text-lg text-yellow-700">
            FOODGEN is proudly developed by <strong>RRK Solutions</strong>. Our
            team of dedicated engineers and designers is committed to creating
            tools that make life easier and more enjoyable. We’re passionate
            about technology, food, and innovation.
          </p>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-12 text-center">
        <h3 className="mb-6 text-3xl font-bold text-yellow-800">Follow Us</h3>
        <div className="flex justify-center gap-6">
          <a
            href="https://www.youtube.com/@RRK-solutions"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-yellow-600 px-6 py-3 text-white hover:bg-yellow-700"
          >
            <FaYoutube className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/company/rrk-solutions"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-yellow-600 px-6 py-3 text-white hover:bg-yellow-700"
          >
            <FaLinkedin className="h-6 w-6" />
          </a>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 text-center">
        <h3 className="mb-6 text-3xl font-bold text-yellow-800">
          Ready to Cook?
        </h3>
        <p className="mb-6 text-lg text-yellow-700">
          Discover personalized recipes, explore new ideas, and turn your
          ingredients into culinary masterpieces.
        </p>
        <Link href={"/generate"}>
          <button className="rounded-lg bg-yellow-600 px-6 py-3 text-white hover:bg-yellow-700">
            Get Started
          </button>
        </Link>
      </section>
    </Container>
  );
}
