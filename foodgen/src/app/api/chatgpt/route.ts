export async function fetchChatGPTResponse(prompt: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY; // Replace with your OpenAI API Key
  const endpoint = "https://api.openai.com/v1/chat/completions";

  console.log("API Key:", apiKey);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to fetch response.");
    }

    const data = await response.json();
    return (
      data.choices[0]?.message?.content || "No response received from OpenAI."
    );
  } catch (error: any) {
    console.error("Error:", error.message || error);
    throw new Error("Failed to connect to OpenAI API.");
  }
}
