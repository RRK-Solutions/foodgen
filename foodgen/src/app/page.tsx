import SelectIngredientsForm from "@/components/generate-meal-form/select-ingredients-form";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bubbles flex h-[100vh] items-center justify-center text-white">
      <p className="text-5xl font-bold">FOODGEN</p>
      <SelectIngredientsForm />
    </main>
  );
}
