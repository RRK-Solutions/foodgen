"use client";

import { useState } from "react";
import { Button, Container, Input } from "@mui/material";
import { fetchChatGPTResponse } from "../api/chatgpt/route";

export const GeneratePage = () => {
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResponse(""); // Clear previous response

    try {
      const reply = await fetchChatGPTResponse(
        `Generate a meal idea based on the following description: ${description}`,
      );
      setResponse(reply);
    } catch (error: any) {
      setResponse(error.message ?? "Failed to fetch response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="flex items-center justify-center">
      <section className="py-12 text-center">
        <h2 className="text-5xl font-bold text-yellow-800">Generate meal</h2>
        <div>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter meal description"
            className="mt-4 w-full"
          />
        </div>
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
        {response && (
          <div className="mt-6 rounded-md bg-yellow-100 p-4 text-yellow-800">
            <p className="font-bold">Response:</p>
            <p>{response}</p>
          </div>
        )}
      </section>
    </Container>
  );
};

export default GeneratePage;
