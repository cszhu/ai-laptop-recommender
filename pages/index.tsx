import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import ThemeButton from "../components/ThemeButton";
import { useQnA } from "../hooks/useQnA";
import { toast } from "react-hot-toast";
import LoadingDots from "../components/LoadingDots";
import { useTheme } from "next-themes";
import { Header } from "../components/Header/Header";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAmazon, faGoogle } from "@fortawesome/free-brands-svg-icons"; // Update the import
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const programsList = [
  {
    name: "Adobe Photoshop",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/640px-Adobe_Photoshop_CC_icon.svg.png",
  },
  {
    name: "Visual Studio Code",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png",
  },
  {
    name: "Google Chrome",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg",
  },
  {
    name: "Microsoft Excel",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/2203px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png",
  },
  {
    name: "AutoCAD",
    image:
      "https://seeklogo.com/images/A/autocad-logo-69326D7728-seeklogo.com.png",
  },
  {
    name: "Unity",
    image: "https://i.redd.it/tu3gt6ysfxq71.png",
  },
  {
    name: "Zoom",
    image:
      "https://seeklogo.com/images/Z/zoom-fondo-azul-vertical-logo-8246E36E95-seeklogo.com.png",
  },
  {
    name: "Sublime Text",
    image:
      "https://ph-files.imgix.net/3edf830d-c178-4727-b575-b6655a216494.png?auto=format",
  },
  {
    name: "Stardew Valley",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg?t=1666917466",
  },
  {
    name: "League of Legends",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/LoL_icon.svg/2048px-LoL_icon.svg.png",
  },
  {
    name: "Counter-Strike: Global Offensive (CS:GO)",
    image:
      "https://static.wikia.nocookie.net/cswikia/images/0/07/Csgo_official_avatar.jpg",
  },
];
const usageOptions = [
  {
    value: "Basic Usage",
    label: "Basic Usage (Web Browsing, Email, Word Processing)",
  },
  {
    value: "Casual Multimedia",
    label: "Casual Multimedia (Streaming, Light Gaming, Photo Editing)",
  },
  {
    value: "Productivity and Creative Work",
    label:
      "Productivity and Creative Work (Video Editing, Design, Programming)",
  },
  {
    value: "Gaming and High-Performance Tasks",
    label: "Gaming and High-Performance Tasks",
  },
  {
    value: "Professional Workstations",
    label: "Professional Workstations (3D Rendering, CAD, AI, etc.)",
  },
];

export default function Home() {
  const { resolvedTheme } = useTheme();
  const isThemeDark = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);
  const {
    fetchLaptop,
    fetchingLaptop,
    outputText,
    setOutputText,
    laptopName,
    setLaptopName,
    fetchingError,
  } = useQnA();
  const [inputText, setInputText] = useState("");
  const [laptopBudget, setLaptopBudget] = useState("");
  const [hasFetched, sethasFetched] = useState(false);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [selectedUsage, setSelectedUsage] = useState("");

  useEffect(() => {
    if (inputText && hasFetched) {
      sethasFetched(false);
    }
  }, [outputText]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (fetchingError) {
      toast.error(fetchingError);
      setOutputText("We were unable to find a good laptop. :(");
      setLaptopName(" ");
    }
  }, [fetchingError]);

  if (!mounted) {
    return null;
  }

  const iconSize = {
    width: "1em", // You can adjust this value to change the icon size
    fontSize: "1em", // Adjust the size here as needed
  };

  const AmazonLink = ({ laptopName }: { laptopName: string }) => {
    const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(
      laptopName
    )}`;
    return (
      <a href={amazonSearchUrl} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon
          icon={faAmazon as IconProp}
          style={iconSize}
          className="inline-block mr-2"
        />
        Buy on Amazon
      </a>
    );
  };

  const GoogleLink = ({ laptopName }: { laptopName: string }) => {
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      laptopName
    )}`;
    return (
      <a href={googleSearchUrl} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon
          icon={faGoogle as IconProp}
          style={iconSize}
          className="inline-block mr-2"
        />
        Search on Google
      </a>
    );
  };

  const handleUsageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUsage(event.target.value);
  };

  const handleGameToggle = (gameName: string) => {
    setSelectedPrograms((prevSelectedPrograms) => {
      // Check if the game is already selected
      const isGameSelected = prevSelectedPrograms.includes(gameName);

      // If the game is already selected, remove it from the array
      if (isGameSelected) {
        return prevSelectedPrograms.filter((game) => game !== gameName);
      } else {
        // If the game is not selected, add it to the array
        return [...prevSelectedPrograms, gameName];
      }
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      fetchLaptop({ laptopBudget, selectedPrograms, selectedUsage });
      sethasFetched(true);
    } catch (error) {
      console.log(error);
      toast.error(`Error fetchingLaptop.`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header />
      <Head>
        <title className="flex justify-between items-center w-full mt-5 pb-7 sm:px-4 px-2">
          Find Me A Laptop
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeButton className="absolute top-2.5 right-2.5 text-gray-500 dark:text-gray-400 focus:outline-none hover:scale-125 transition" />
      <div className="flex flex-col md:flex-row w-full gap-6 bg-[#EEEEEE] dark:text-white dark:bg-black dark:border dark:border-white/20 rounded-2xl p-2">
        <div className="w-full">
          <form
            onSubmit={(event) => handleSubmit(event)}
            className="rounded-xl bg-white dark:bg-custom-gray container-w-gradient-border dark:dark-container-w-gradient-border p-3 h-full w-full"
          >
            <div className="flex flex-col h-full">
              <label
                htmlFor="priceLimit"
                className="block font-medium mb-2 text-gray-700 dark:text-gray-200"
              >
                Laptop Budget ($)
              </label>
              <input
                type="number"
                className={`appearance-none border-0 rounded-lg w-full py-2 px-3 bg-custom-gray-bg dark:bg-custom-dark-gray text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ${
                  isThemeDark ? "placeholder-dark" : ""
                }`}
                id="priceLimit"
                placeholder="Enter the price limit for the laptop"
                value={laptopBudget}
                onChange={(event) => setLaptopBudget(event.target.value)}
                required
              />
              <br></br>
              <div>
                <h2 className="font-medium mb-2">
                  Select your level of computer usage:
                </h2>
                <div className="space-y-2">
                  {usageOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        value={option.value}
                        checked={selectedUsage === option.value}
                        onChange={handleUsageChange}
                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <br></br>
              <label
                htmlFor="programsList"
                className="block font-medium mt-4 mb-2 text-gray-700 dark:text-gray-200"
              >
                What programs do you like to use?
              </label>
              <div className="grid grid-cols-1 gap-4">
                {programsList.map((game) => (
                  <div key={game.name} className="flex items-center">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-8 h-8 mr-2"
                    />
                    <input
                      type="checkbox"
                      id={`game-${game.name}`}
                      onChange={() => handleGameToggle(game.name)}
                      checked={selectedPrograms.includes(game.name)}
                      className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <label htmlFor={`game-${game.name}`} className="ml-2">
                      {game.name}
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between my-3 last:mb-0 space-x-10">
                <button
                  type="submit"
                  className={`cursor-pointer py-2 px-4 rounded-full blue-button-w-gradient-border [text-shadow:0_0_1px_rgba(0,0,0,0.25)] shadow-2xl flex flex-row items-center justify-start ${
                    fetchingLaptop && "opacity-50 pointer-events-none"
                  }`}
                  disabled={fetchingLaptop}
                >
                  <img src="/stars.svg"></img>&nbsp;
                  <div className="relative text-sm font-semibold font-inter text-white text-center inline-block mx-auto">
                    {fetchingLaptop ? (
                      <>
                        Finding...
                        <LoadingDots color="white" />
                      </>
                    ) : (
                      `Find me a laptop!`
                    )}
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="w-full">
          <div className="flex flex-col rounded-xl bg-white container-w-gradient-border dark:dark-container-w-gradient-border dark:bg-custom-gray p-3 h-full w-full custom-width sm:w-auto">
            <div className="flex flex-col flex-1">
              <label
                htmlFor="outputText"
                className="block mb-2 font-medium  text-gray-700 dark:text-gray-200"
              >
                {"Laptop Recommendation Here"}
              </label>
              {laptopName && (
                <div>
                  <h1>{laptopName}</h1>
                  <br></br>
                  <span>{outputText}</span>
                  <br></br>
                  <br></br>
                  {laptopName.length > 1 && (
                    <div>
                      <p>Check it out on:</p>
                      <AmazonLink laptopName={laptopName} />
                      <br />
                      <GoogleLink laptopName={laptopName} />
                    </div>
                  )}
                </div>
              )}
            </div>

            <textarea
              className="hidden"
              id="outputText"
              value={outputText}
              readOnly
            />
          </div>
        </div>
      </div>

      <Analytics />
    </div>
  );
}
