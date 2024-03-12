import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function useCreateModel(endpoint: String, token: String) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function getModelList() {
    try {
      const response = await fetch(`${endpoint}/model_list`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log(data['model_list']); // Handle the response data here
      return data['model_list']
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return []
    }
  }

  async function createModel(modelId: String, modelDid: String, baseModel: String, prompt: String) {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await fetch(`${endpoint}/create_model`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model_id: modelId,
          model_did: modelDid,
          base_model: baseModel,
          prompt: prompt,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setIsLoading(false);
      return data; // Adjust as needed based on the response structure
    } catch (error) {
      setIsError(true);
      console.error("There was a problem with the fetch operation:", error);
      return { error: error };
    }
  }

  const createModelId = () => {
    return uuidv4();
  };

  return {
    isLoading,
    isError,
    getModelList,
    createModel,
    createModelId,
  };
}