import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/icons8-laptop-16.png" />
          <meta name="description" content="AI helps you find a laptop." />
          <meta property="og:site_name" content="AI Laptop Recommender" />
          <meta
            property="og:description"
            content="AI helps you find a laptop."
          />
          <meta
            property="og:image"
            content="https://media.discordapp.net/attachments/337455521063763982/1130183905929089084/Black__Blue_Modern_Business_Workshop_Twitter_Header.png"
          />

          <meta property="og:title" content="AI Laptop Recommender" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="AI Laptop Recommender" />
          <meta
            name="twitter:description"
            content="Don't know anything about computers? Don't worry! AI helps you find a laptop."
          />
          <meta
            name="twitter:image"
            content="https://media.discordapp.net/attachments/337455521063763982/1130183905929089084/Black__Blue_Modern_Business_Workshop_Twitter_Header.png"
          />
        </Head>
        <body className="dark:bg-black bg-gray-100 text-gray-800 dark:text-white font-sans transition-colors">
          <div className="max-w-4xl mx-auto px-4">
            <Main />
          </div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
