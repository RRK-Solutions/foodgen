import SelectIngredientsForm from "@/components/generate-meal-form/select-ingredients-form";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="fluent-gradient flex h-[100vh] flex-col items-center justify-center gap-4 text-white">
      <p className="text-5xl font-bold">FOODGEN</p>
      <SelectIngredientsForm />
    </main>
  );
}
