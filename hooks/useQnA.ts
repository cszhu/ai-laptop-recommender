import { useState } from "react";

interface RequestBody {
  laptopBudget: string;
  selectedPrograms: string[];
  selectedUsage: string;
}

export function useQnA() {
  const [fetchingLaptop, setFetchingLaptop] = useState(false);
  const [outputText, setOutputText] = useState("");
  const [fetchingError, setFetchingError] = useState("");
  const [laptopName, setLaptopName] = useState("");

  const fetchLaptop = async ({
    laptopBudget,
    selectedPrograms,
    selectedUsage,
  }: {
    laptopBudget: string;
    selectedPrograms: string[];
    selectedUsage: string;
  }) => {
    setFetchingLaptop(true);
    try {
      const requestBody: RequestBody = {
        laptopBudget,
        selectedPrograms,
        selectedUsage,
      };
      const response = await fetch(`/api/weaviate`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        // Extract the result from the GraphQL response and set it to the state
        setFetchingError("");
        setOutputText(JSON.parse(data.outputText));
        setLaptopName(JSON.parse(data.laptopName));
      } else {
        setFetchingError(`Error finding a good laptop.`);
      }
    } catch (error) {
      setFetchingError(`Error finding a good laptop.`);
    } finally {
      setFetchingLaptop(false);
    }
  };

  return {
    outputText,
    setOutputText,
    setLaptopName,
    laptopName,
    fetchLaptop,
    fetchingLaptop,
    fetchingError,
  };
}
