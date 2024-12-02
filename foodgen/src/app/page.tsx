import SelectIngredientsForm from "@/components/generate-meal-form/select-ingredients-form";
import { Button } from "@mui/material";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 text-white">
      {/* Main Content */}
      <section className="py-12 text-center">
        <h2 className="text-5xl font-bold text-yellow-800">
          Discover Your Next Favorite Dish
        </h2>
        <p className="mt-4 text-lg text-yellow-700">
          FOODGEN helps you generate recipes and food ideas with just a few
          clicks.
        </p>
        <Link href={"/generate"}>
          <button className="mt-8 rounded-lg bg-yellow-600 px-6 py-3 text-white hover:bg-yellow-700">
            Get Started
          </button>
        </Link>
      </section>

      <section id="features" className="py-12">
        <h3 className="mb-6 text-center text-3xl font-bold text-yellow-800">
          Features
        </h3>
        <div className="flex items-center justify-center">
          <div className="rounded-lg bg-yellow-100 p-6 px-8 text-center shadow-lg">
            <h4 className="text-2xl font-bold text-yellow-800">
              AI-Powered meals
            </h4>
            <p className="mt-2 text-yellow-700">Select ingredients and cook!</p>
          </div>
        </div>
      </section>
    </div>
  );
}
