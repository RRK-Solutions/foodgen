"use client";

import { useState } from "react";
import {
  Button,
  Container,
  Typography,
  TextField,
  Autocomplete,
  IconButton,
} from "@mui/material";
import { fetchChatGPTResponse } from "../api/chatgpt/route";
import FoodCard from "@/components/generate-meal-form/food-card";
import { FiX } from "react-icons/fi";

export const GeneratePage = () => {
  // Meal description
  const [description, setDescription] = useState("");

  // ChatGPT response
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Dynamic ingredient fields (start with 4 blank)
  const [ingredients, setIngredients] = useState(["", "", "", ""]);

  // Multiple-select (Autocomplete) for allergies
  const [allergies, setAllergies] = useState<string[]>([]);
  const mockAllergies = [
    "Gluten",
    "Dairy",
    "Soy",
    "Peanuts",
    "Eggs",
    "Shellfish",
    "Fish",
    "Wheat",
    "Tree Nuts",
    "Lactose",
    "Celery",
    "Mustard",
    "Sesame",
    "Sulfites",
    "Molluscs",
    "Lupin",
    "Legumes",
    "Corn",
    "Avocado",
    "Bananas",
    "Kiwi",
    "Apples",
    "Peaches",
    "Carrots",
    "Garlic",
    "Almonds",
    "Hazelnuts",
    "Pecans",
    "Walnuts",
    "Cashews",
    "Macadamia Nuts",
    "Brazil Nuts",
    "Pistachios",
    "Sunflower Seeds",
    "Pumpkin Seeds",
    "Buckwheat",
    "Rye",
    "Barley",
    "Oats",
    "Tomatoes",
    "Eggplant",
    "Bell Peppers",
    "Potatoes",
    "Strawberries",
    "Chocolate",
    "Citrus Fruits",
    "Soya Lecithin",
  ];

  // Handle dynamic ingredient fields
  const handleIngredientChange = (index: number, value: string) => {
    setIngredients((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const addIngredientField = () => {
    setIngredients((prev) => [...prev, ""]);
  };

  const removeIngredientField = (index: number) => {
    setIngredients((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  // Handle Autocomplete for allergies
  const handleAllergiesChange = (event: any, newValue: string[]) => {
    setAllergies(newValue);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setResponse(null); // Clear previous response

    // Build a prompt based on description, ingredients, and allergies
    const prompt = `
    Generate a complete meal idea based on the following requirements:
    1. Use the metric system for any measurements (grams, liters, Celsius, etc.).
    2. Incorporate and use all the provided ingredients exactly as listed.
    3. Provide clear, step-by-step instructions with estimated cooking times and temperatures.
    4. Include recommended portion sizes and any special cooking equipment needed.
    5. Maximize flavor, considering any dietary restrictions or allergies.
    
    Details to consider:
    - Description: ${description || "No specific description provided."}
    - Preferred Ingredients: ${
      ingredients.filter(Boolean).length ? ingredients.join(", ") : "None"
    }
    - Allergies: ${allergies.length ? allergies.join(", ") : "None"}
    `;

    try {
      // Request ChatGPT
      const reply = await fetchChatGPTResponse(prompt);
      // Parse and store JSON response
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
      <section className="flex w-[100vw] flex-col items-center justify-center gap-4 rounded-lg bg-white px-6 py-8 text-center shadow sm:w-[75vw] md:max-w-[800px]">
        <Typography variant="h4" gutterBottom className="text-yellow-800">
          Generate Meal
        </Typography>

        {/* Description Input */}
        <TextField
          fullWidth
          label="Enter Meal Description"
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-4"
        />

        {/* Ingredients Section */}
        <Typography variant="h6" gutterBottom className="mt-6 text-yellow-800">
          Ingredients
        </Typography>
        <div className="flex w-full flex-col gap-4">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center gap-2">
              <TextField
                label={`Ingredient ${index + 1}`}
                variant="outlined"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="flex-1"
              />
              {/* Remove button: only enabled if we have more than 4 ingredients */}
              <IconButton
                onClick={() => removeIngredientField(index)}
                disabled={ingredients.length <= 3}
                color="error"
              >
                <FiX />
              </IconButton>
            </div>
          ))}
          <Button variant="outlined" onClick={addIngredientField}>
            Add Ingredient
          </Button>
        </div>

        {/* Allergies Section with Autocomplete */}
        <Typography variant="h6" gutterBottom className="mt-6 text-yellow-800">
          Allergies
        </Typography>
        <Autocomplete
          multiple
          freeSolo
          options={mockAllergies}
          value={allergies}
          onChange={handleAllergiesChange}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Type or select allergies"
              placeholder="Search allergies"
            />
          )}
          className="w-full"
        />

        {/* Generate Button */}
        <Button
          variant="contained"
          color="primary"
          className="mt-6"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </Button>

        {/* Display the response */}
        {response?.lunch && (
          <div className="mt-6 w-full rounded-md bg-yellow-100 p-4 text-yellow-800">
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Generated Meal:
            </Typography>
            <FoodCard meal={response.lunch} />
          </div>
        )}

        {response?.error && (
          <Typography variant="body2" color="error" className="mt-4">
            {response.error}
          </Typography>
        )}
      </section>
    </Container>
  );
};

export default GeneratePage;
