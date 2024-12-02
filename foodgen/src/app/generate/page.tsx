"use client";

import { useState } from "react";
import {
  Button,
  Container,
  Input,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { fetchChatGPTResponse } from "../api/chatgpt/route";
import FoodCard from "@/components/generate-meal-form/food-card";

export const GeneratePage = () => {
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Mocked ingredients and allergies
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);

  const mockIngredients = ["Chicken", "Rice", "Broccoli", "Mushrooms", "Pasta"];
  const mockAllergies = ["Gluten", "Peanuts", "Dairy", "Shellfish", "Soy"];

  const handleIngredientChange = (ingredient: string) => {
    setIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient],
    );
  };

  const handleAllergyChange = (allergy: string) => {
    setAllergies((prev) =>
      prev.includes(allergy)
        ? prev.filter((a) => a !== allergy)
        : [...prev, allergy],
    );
  };

  const handleGenerate = async () => {
    setLoading(true);
    setResponse(null); // Clear previous response

    const prompt = `
      Generate a meal idea based on the following:
      - Description: ${description || "No specific description provided."}
      - Preferred Ingredients: ${
        ingredients.length ? ingredients.join(", ") : "None"
      }
      - Allergies: ${allergies.length ? allergies.join(", ") : "None"}
    `;

    try {
      const reply = await fetchChatGPTResponse(prompt);

      // Parse the response as JSON
      const parsedResponse = JSON.parse(reply);
      setResponse(parsedResponse);
    } catch (error: any) {
      setResponse({ error: error.message ?? "Failed to fetch response." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="md"
      className="flex flex-col items-center justify-center gap-4"
    >
      <section className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white px-24 py-12 text-center">
        <Typography variant="h4" gutterBottom className="text-yellow-800">
          Generate Meal
        </Typography>

        <div className="w-full pb-4">
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter meal description"
            className="mt-4 w-full rounded-md border border-yellow-800 p-2"
            disableUnderline
          />
        </div>

        <Typography variant="h6" gutterBottom className="mt-6 text-yellow-800">
          Select Preferred Ingredients
        </Typography>
        <FormGroup row className="flex items-center justify-center">
          {mockIngredients.map((ingredient) => (
            <FormControlLabel
              key={ingredient}
              control={
                <Checkbox
                  checked={ingredients.includes(ingredient)}
                  onChange={() => handleIngredientChange(ingredient)}
                />
              }
              label={ingredient}
            />
          ))}
        </FormGroup>

        <Typography variant="h6" gutterBottom className="mt-6 text-yellow-800">
          Select Allergies
        </Typography>
        <FormGroup row className="flex items-center justify-center">
          {mockAllergies.map((allergy) => (
            <FormControlLabel
              key={allergy}
              control={
                <Checkbox
                  checked={allergies.includes(allergy)}
                  onChange={() => handleAllergyChange(allergy)}
                />
              }
              label={allergy}
            />
          ))}
        </FormGroup>

        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </Button>

        {/* Display the response */}
        {response?.lunch && (
          <div className="mt-6 rounded-md bg-yellow-100 p-4 text-yellow-800">
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Generated Meal:
            </Typography>
            <FoodCard meal={response.lunch} />
          </div>
        )}

        {response?.error && (
          <Typography variant="body2" color="error">
            {response.error}
          </Typography>
        )}
      </section>
    </Container>
  );
};

export default GeneratePage;
