"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { FiX } from "react-icons/fi";
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchChatGPTResponse } from "../api/chatgpt/route";
import FoodCard from "@/components/generate-meal-form/food-card";

// A small type for the product search results we care about
type OpenFoodFactsProduct = {
  code: string;
  product_name?: string;
  nutrition_grades?: string;
  nutriments?: Record<string, number | string>;
};

export default function FridgePage() {
  // -----------------------------
  // Fridge State
  // -----------------------------
  // Each ingredient has a name and optional nutrition info
  const [ingredients, setIngredients] = useState<
    { name: string; nutrition?: Record<string, string | number> }[]
  >([]);

  // Manually added ingredient
  const [newIngredient, setNewIngredient] = useState("");

  // -----------------------------
  // Local Storage Integration
  // -----------------------------
  useEffect(() => {
    const stored = localStorage.getItem("fridgeIngredients");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setIngredients(parsed);
        }
      } catch (error) {
        console.warn("Error parsing stored fridge ingredients:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (ingredients.length === 0) {
      return;
    }
    localStorage.setItem("fridgeIngredients", JSON.stringify(ingredients));
  }, [ingredients]);

  // -----------------------------
  // Checkbox to toggle Open Food Facts search
  // -----------------------------
  const [showOFFSearch, setShowOFFSearch] = useState(false);

  // -----------------------------
  // Open Food Facts Search (v1, free-text)
  // -----------------------------
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<OpenFoodFactsProduct[]>(
    [],
  );
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setSearchLoading(true);
    setSearchError("");
    setSearchResults([]);

    const baseUrl = "https://world.openfoodfacts.org/cgi/search.pl";

    // Build query params for v1 free-text search
    const query = new URLSearchParams({
      search_terms: searchTerm,
      search_simple: "1", // simpler full-text
      action: "process", // required param
      json: "1", // return JSON
    });

    const url = `${baseUrl}?${query.toString()}`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Search request failed with ${res.status}`);
      }
      const data = await res.json();

      if (data?.products && Array.isArray(data.products)) {
        const results = data.products.map((p: any) => ({
          code: p.code,
          product_name: p.product_name ?? "",
          nutrition_grades: p.nutrition_grades ?? "",
          nutriments: p.nutriments ?? {},
        })) as OpenFoodFactsProduct[];
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    } catch (err: any) {
      setSearchError(err.message || "Failed to fetch search results.");
    } finally {
      setSearchLoading(false);
    }
  };

  // When user selects an OFF product, add to fridge with nutrition
  const handleSelectProduct = (product: OpenFoodFactsProduct) => {
    const existingIndex = ingredients.findIndex(
      (ing) => ing.name === product.product_name,
    );
    if (existingIndex !== -1) {
      alert("This product is already in your fridge.");
      return;
    }
    const newIng = {
      name: product.product_name ?? product.code,
      nutrition: product.nutriments ?? {},
    };
    setIngredients((prev) => [...prev, newIng]);
  };

  // -----------------------------
  // Handlers
  // -----------------------------
  const handleAddIngredient = () => {
    const clean = newIngredient.trim();
    if (!clean) return;
    // For manually added ingredients, we store no nutrition data
    setIngredients((prev) => [...prev, { name: clean }]);
    setNewIngredient("");
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  // -----------------------------
  // SELECTED INGREDIENTS for generating meal
  // -----------------------------
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const handleToggleSelection = (ingredientName: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredientName)
        ? prev.filter((name) => name !== ingredientName)
        : [...prev, ingredientName],
    );
  };

  // -----------------------------
  // ChatGPT Meal Generation
  // -----------------------------
  const [response, setResponse] = useState<any>(null);
  const [loadingMeal, setLoadingMeal] = useState(false);

  const handleGenerateMeal = async () => {
    setLoadingMeal(true);
    setResponse(null);

    // Build a prompt with selected ingredients
    const prompt = `
      Generate a meal using these ingredients:
      ${selectedIngredients.join(", ")}.

      If any ingredients have known nutrition data, consider them in your suggestion.
      Provide step-by-step instructions, cooking times, and relevant nutritional info.
    `;

    try {
      const reply = await fetchChatGPTResponse(prompt);
      const parsedResponse = JSON.parse(reply);
      setResponse(parsedResponse);
    } catch (error: any) {
      setResponse({ error: error.message || "Failed to fetch response." });
    } finally {
      setLoadingMeal(false);
    }
  };

  // -----------------------------
  // Rendering
  // -----------------------------
  return (
    <Container
      maxWidth="md"
      className="flex flex-col items-center justify-center gap-4"
    >
      <section className="flex w-[100vw] flex-col items-center justify-center gap-4 rounded-lg bg-white px-6 py-8 text-center shadow sm:w-[75vw] md:max-w-[800px]">
        <Typography variant="h4" gutterBottom className="text-yellow-800">
          Fridge Page
        </Typography>

        {/* Toggle search for Open Food Facts */}
        <FormControlLabel
          control={
            <Checkbox
              checked={showOFFSearch}
              onChange={(e) => setShowOFFSearch(e.target.checked)}
            />
          }
          label="Search product on Open Food Facts"
        />

        {showOFFSearch && (
          <div className="flex w-full flex-col items-center gap-4">
            <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
              <TextField
                label="Search terms (free-text, e.g. 'milk')"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button variant="outlined" onClick={handleSearch}>
                Search
              </Button>
            </div>
            {searchLoading && <CircularProgress />}

            {searchError && (
              <Typography variant="body2" color="error">
                {searchError}
              </Typography>
            )}

            {/* Display search results */}
            {!searchLoading && !searchError && searchResults.length > 0 && (
              <div className="w-full space-y-2 rounded-md bg-gray-50 p-4 text-left shadow">
                <Typography variant="h6" gutterBottom>
                  Search Results
                </Typography>
                {searchResults.map((product) => (
                  <div
                    key={product.code}
                    className="flex items-center justify-between border-b border-gray-200 pb-2"
                  >
                    <div>
                      <strong>{product.product_name ?? product.code}</strong>
                      {product.nutrition_grades && (
                        <span className="ml-2 text-sm text-gray-600">
                          (Nutri-score: {product.nutrition_grades.toUpperCase()}
                          )
                        </span>
                      )}
                    </div>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleSelectProduct(product)}
                    >
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add Ingredient Section (manual) */}
        <div className="mt-6 flex w-full flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
          <TextField
            label="Add Ingredient Manually"
            variant="outlined"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            className="flex-1"
          />
          <Button variant="outlined" onClick={handleAddIngredient}>
            Add
          </Button>
        </div>

        {/* Fridge Ingredients List */}
        <div className="mt-6 w-full">
          <Typography variant="h6" gutterBottom className="text-yellow-800">
            Your Fridge
          </Typography>
          {ingredients.map((ingredient, index) => {
            const isSelected = selectedIngredients.includes(ingredient.name);
            return (
              <div
                key={`${ingredient.name}-${index}`}
                className="mb-2 flex items-center gap-2 border-b border-gray-200 pb-2"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={isSelected}
                    onChange={() => handleToggleSelection(ingredient.name)}
                  />
                  <strong>{ingredient.name}</strong>
                  {/* Indicate if we have nutrition data */}
                  {ingredient.nutrition && (
                    <span className="ml-2 text-xs text-gray-600">
                      (Nutrition data found)
                    </span>
                  )}
                </div>
                <div className="flex-1" />
                <IconButton
                  onClick={() => handleRemoveIngredient(index)}
                  color="error"
                >
                  <FiX />
                </IconButton>
              </div>
            );
          })}
          {ingredients.length === 0 && (
            <Typography variant="body2">No ingredients yet.</Typography>
          )}
        </div>

        <Button
          variant="outlined"
          disabled={ingredients.length === 0}
          onClick={() =>
            setSelectedIngredients(ingredients.map((ing) => ing.name))
          }
        >
          Select all ingredients
        </Button>

        {/* Generate Meal Button */}
        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          onClick={handleGenerateMeal}
          disabled={selectedIngredients.length < 3 || loadingMeal}
        >
          {loadingMeal
            ? "Generating..."
            : "Generate meal from selected ingredients"}
        </Button>

        {/* Display the ChatGPT response */}
        {response?.lunch ||
          (response?.breakfast && (
            <div className="mt-6 w-full rounded-md bg-yellow-100 p-4 text-yellow-800">
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Generated Meal:
              </Typography>
              <FoodCard meal={response.lunch ?? response?.breakfast} />
            </div>
          ))}
        {response?.error && (
          <Typography variant="body2" color="error" className="mt-4">
            {response.error}
          </Typography>
        )}
      </section>
    </Container>
  );
}
