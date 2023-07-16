import weaviate, { WeaviateClient, ApiKey } from "weaviate-ts-client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function myRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // For environment variables, and setting up the Weaviate client
  require("dotenv").config({ path: ".env.production" });
  const client: WeaviateClient = weaviate.client({
    scheme: "https",
    host: process.env.WEAVIATE_HOST || "",
    apiKey: new ApiKey(process.env.WEAVIATE_API_KEY || ""),
    headers: {
      "X-HuggingFace-Api-Key": process.env.HUGGING_FACE_API_KEY || "",
      "X-OpenAI-Api-Key": process.env.OPENAI_API_KEY || "",
    },
  });

  // Getting the information the user submitted in the request body
  const { laptopBudget, selectedPrograms, selectedUsage } = req.body;

  /*
   * The final Laptop schema I decided to go with (5th iteration)
   */
  const classObj = {
    class: "Laptop5",
    description: "A class representing laptops 5",
    vectorizer: "text2vec-openai",
    moduleConfig: {
      "qna-openai": {
        model: "text-davinci-002",
        maxTokens: 1000,
        temperature: 0.2,
      },
      "generative-openai": {
        model: "gpt-3.5-turbo", // For OpenAI
      },
    },
    properties: [
      {
        dataType: ["text"],
        description: "The unique identifier or model name of the laptop",
        name: "laptopName",
      },
      {
        dataType: ["text"],
        description: "The laptop brand",
        name: "brand",
      },
      {
        dataType: ["text"],
        description: "The laptop brand model",
        name: "model",
      },
      {
        dataType: ["text"],
        description: "The CPU of the laptop",
        name: "cpu",
      },
      {
        dataType: ["text"],
        description: "The GPU of the laptop",
        name: "gpu",
      },
      {
        dataType: ["number"],
        description: "The amount of RAM in the laptop (in GB)",
        name: "ram",
      },
      {
        dataType: ["string"],
        description: "The type of storage in the laptop",
        name: "storageType",
      },
      {
        dataType: ["text"],
        description: "The storage capacity of the laptop",
        name: "storage",
      },
      {
        dataType: ["text"],
        description: "The screen size of the laptop",
        name: "screen",
      },
      {
        dataType: ["text"],
        description: "Indicates whether the laptop has touch functionality",
        name: "touch",
      },
      {
        dataType: ["text"],
        description: "The status of the laptop (new or not)",
        name: "status",
      },
      {
        dataType: ["number"],
        description: "The cost of the laptop in the respective currency",
        name: "price",
      },
    ],
  };

  /*
   * Some functions to remake, add, and view my schema for sanity reasons.
   * I used these a lot when I was setting up my Weaviate instance.
   */
  async function addSchema() {
    const resSchemaAdd = await client.schema
      .classCreator()
      .withClass(classObj)
      .do();
    console.log(resSchemaAdd);
  }

  async function viewSchema() {
    const resViewSchema = await client.schema.getter().do();
    console.log(JSON.stringify(res, null, 2));
    console.log(resViewSchema);
  }

  /*
   * This part of the code is just for importing the free dataset of laptop data
   */
  const csv = require("csv-parser");
  const fs = require("fs");
  const path = require("path");

  type LaptopData = {
    Laptop: string;
    Status: string;
    Brand: string;
    Model: string;
    CPU: string;
    RAM: string;
    Storage: string;
    StorageType: string;
    GPU: string;
    Screen: string;
    Touch: string;
    "Final Price": string;
  };

  async function getLaptopData(): Promise<LaptopData[]> {
    return new Promise((resolve, reject) => {
      const laptops: LaptopData[] = [];
      const filePath = "pages/api/laptops.csv";
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data: LaptopData) => laptops.push(data))
        .on("end", () => resolve(laptops))
        .on("error", (error: Error) => reject(error));
    });
  }

  async function importLaptops() {
    const data = await getLaptopData();

    // Prepare a batcher
    let batcher = client.batch.objectsBatcher();
    let counter = 0;
    const batchSize = 100;

    for (const laptop of data) {
      // Construct an object with the laptop class and properties
      const obj = {
        class: "Laptop5",
        properties: {
          laptopName: laptop.Laptop,
          brand: laptop.Brand,
          model: laptop.Model,
          cpu: laptop.CPU,
          gpu: laptop.GPU,
          ram: parseFloat(laptop.RAM),
          storageType: laptop.StorageType,
          storage: laptop.Storage,
          screen: laptop.Screen,
          touch: laptop.Touch,
          status: laptop.Status,
          price: parseFloat(laptop["Final Price"]),
        },
      };

      // Add the object to the batch queue
      batcher = batcher.withObject(obj);

      // When the batch counter reaches batchSize, push the objects to Weaviate
      if (++counter === batchSize) {
        // Flush the batch queue
        const resBatcher = await batcher.do();
        console.log(resBatcher);

        // Restart the batch queue
        counter = 0;
        batcher = client.batch.objectsBatcher();
      }
    }

    // Flush the remaining objects
    const resBatcher = await batcher.do();
    console.log(resBatcher);
  }

  /*
   * I had to remake the schemas a few times, so I had these just in case I need to rerun them.
   */
  // await addSchema();
  // await viewSchema();
  // await importLaptops();

  try {
    const resSuccess = await client.graphql
      .get()
      .withClassName("Laptop5")
      .withAsk({
        question: `Can you recommend me a laptop that is under the price of $${laptopBudget}? 
        It should be able to run the following programs: ${selectedPrograms.join(
          ", "
        )} and the laptop should be suitable for ${selectedUsage}.
        Can you thoroughly explain why this laptop is a good choice, accounting for the gpu, cpu and ram?`,
      })
      .withWhere({
        path: ["price"],
        operator: "LessThan",
        valueNumber: Number(laptopBudget),
      })
      .withFields(
        "laptopName _additional { answer { hasAnswer property result startPosition endPosition } }"
      )
      .withLimit(1)
      .do();

    /*
     * We pass back the QnA answer along with the laptop name
     */
    if (
      resSuccess.data.Get.Laptop5[0]?._additional &&
      resSuccess.data.Get.Laptop5[0]?._additional?.answer.hasAnswer
    ) {
      res.status(200).json({
        outputText: JSON.stringify(
          resSuccess.data.Get.Laptop5[0]._additional.answer.result,
          null,
          2
        ),
        laptopName: JSON.stringify(resSuccess.data.Get.Laptop5[0].laptopName),
      });
    } else {
      res.status(500).json({
        error: "We did not get an answer from the QnA module.",
      });
    }
  } catch (errMessage) {
    res.status(500).json({
      error: "An error occurred while fetching data from Weaviate.",
    });
  }
}
