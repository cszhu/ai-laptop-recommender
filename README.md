<h1 align="center">AI Laptop Recommender</h1>
Hello! This is a simple little app that asks AI to find you a new laptop, which is useful if you don't know anything about laptops.

## 📖 How to use:

You can visit the app here on Vercel: 

Simply type in your budget, how much you use your laptop, and what programs you tend to use. It will then give you a recommendation along with Amazon and Google links. 

## Tech Used

- OpenAI API (Used in the [Weaviate QnA OpenAI Module](https://weaviate.io/developers/weaviate/modules/reader-generator-modules/qna-openai)
- Weaviate Cluster for [Vector Searching](https://weaviate.io/developers/weaviate/quickstart)
- Open source [Laptop Price Data Set](https://www.kaggle.com/datasets/juanmerinobermejo/laptops-price-dataset?resource=download)
  - This is where I got the data points for the kinds of laptops, etc, from, and what I trained the Weaviate model on.
- The frontend and Next.js structure of the application is forked from the [SQL translator by whoiskatrin](https://github.com/whoiskatrin/sql-translator)
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

4. Input your OPENAI API key in the .env file, you can get your API key [here](https://beta.openai.com/account/api-keys). You will also need your Weaviate keys and Hugging Face keys.

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
