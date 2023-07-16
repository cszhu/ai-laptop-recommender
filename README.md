<h1 align="center">AI Laptop Recommender</h1>
<img src="https://media.discordapp.net/attachments/337455521063763982/1130183905929089084/Black__Blue_Modern_Business_Workshop_Twitter_Header.png?width=2268&height=756">
Hello! This is a simple little app that asks AI to find you a new laptop, which is useful if you don't know anything about laptops.

## 📖 How to use:

You can visit the app here on Vercel: https://laptop-recommender.vercel.app/

Simply type in your budget, how much you use your laptop, and what programs you tend to use. It will then give you a recommendation along with Amazon and Google links.

## Tech Used

#### OpenAI API (Used in the [Weaviate QnA OpenAI Module](https://weaviate.io/developers/weaviate/modules/reader-generator-modules/qna-openai))

The OpenAI API played a crucial role in the Weaviate QnA OpenAI module. It enabled the application to interact with the OpenAI GPT-3 language model, which allowed users to ask natural language questions about laptops. The responses from the API enabled the application to provide relevant laptop recommendations based on user queries.

#### Weaviate Cluster for [Vector Searching](https://weaviate.io/developers/weaviate/quickstart)

Weaviate Cluster served as the backend infrastructure for vector searching. I used Weaviate to facilitate efficient and accurate laptop recommendations based on various criteria, such as price, processor, RAM, and program compatibility. I uploaded the laptop data set into the cluster and created a schema for it. The cluster was responsible for handling data storage and retrieval tasks, making it easy to search and find laptops that met specific requirements.

#### Data set: Open source [Laptop Price Data Set](https://www.kaggle.com/datasets/juanmerinobermejo/laptops-price-dataset?resource=download)

The open source Laptop Price Data Set the main source of data for the application. It provided valuable data points for various types of laptops, including specifications like laptop names, prices, processors, RAM, and other features. This data set served as the foundation for training the Weaviate model, allowing it to understand and answer user queries effectively.

#### The frontend is forked from the [SQL translator by whoiskatrin](https://github.com/whoiskatrin/sql-translator)

The frontend and Next.js structure of the application were forked from the SQL translator project by whoiskatrin. This frontend structure provided a solid foundation for building the user interface and user interaction in this app. By leveraging existing frontend structure, I was able to focus on integrating the Weaviate QnA OpenAI module and the Weaviate Cluster. Thank you Katrin!

- <a target="_blank" href="https://icons8.com/icon/111403/laptop">Laptop</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

## 🛠️ Installation

### Local Development Environment

1. Clone the repository:

   ```bash
   git clone git@github.com:cszhu/ai-laptop-recommender.git
   ```

2. Install the required packages:

   ```bash
   npm install
   ```

3. Build the application:

   ```bash
   npm run build
   ```

4. Create a new `.env.production` file in the root folder, then add your API keys, like your OpenAI key you can get your API key [here](https://beta.openai.com/account/api-keys). You will also need your Weaviate keys and Hugging Face keys. You will have to train your Weaviate cluster on the open source Laptop dataset above though.

   ```bash
   OPENAI_API_KEY=
   HUGGING_FACE_API_KEY=
   WEAVIATE_API_KEY=
   WEAVIATE_HOST=
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. To run in production,

   ```bash
   npm start
   ```

## 🖥️ Usage

Once the development server is running, you can access the application by navigating to `http://localhost:3000` in your web browser. If you are run in development, any changes you make will auto refresh the repository.

## 📜 License

AI Laptop Recommender is released under the MIT [License](LICENSE).
