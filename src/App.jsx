import { useState } from "react";
import { FaLink, FaTwitter } from "react-icons/fa";
import { HiMoon } from "react-icons/hi";
import { IoIosSunny } from "react-icons/io";
import { IoLocationSharp, IoSearch } from "react-icons/io5";
import { PiBuildingsBold } from "react-icons/pi";

export default function App() {
  const [value, setValue] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("dark");

  const handleSubmit = (e) => {
    e.preventDefault();
    let apiLink = `https://api.github.com/users/${value}`;
    getData(apiLink);
  };

  const getData = async (api) => {
    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      setUserData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setUserData(null);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`w-full h-screen ${theme === "dark" ? "bg-darkBlue text-white" : "bg-white text-darkBlue"}`}>
      <div className="container m-auto flex items-center justify-center flex-col">
        <div className="w-2/4 pt-20 mb-8 flex items-center justify-between font-mono">
          <h1 className="text-2xl">devfinder</h1>
          <div className="flex items-center gap-4 tracking-wide">
            {theme === "dark" ? "LIGHT" : "DARK"}
           { theme === "dark" ? <IoIosSunny className="size-6 cursor-pointer" onClick={toggleTheme} /> : <HiMoon className="size-6 cursor-pointer" onClick={toggleTheme} /> }
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className={`w-2/4 h-20 flex items-center justify-between px-6 gap-4 ${theme === "dark" ? "bg-lightBlue" : "bg-gray-200"} rounded-2xl mb-8 shadow-md`}
        >
          <div className="flex items-center gap-5">
            <IoSearch className={`text-3xl cursor-pointer ${theme === "dark" ? "text-blue" : "text-gray-500"}`} />
            <input
              onChange={(e) => {
                setValue(e.target.value);
              }}
              type="text"
              placeholder="Search GitHub username…"
              className={`border-0 outline-none ${theme === "dark" ? "bg-lightBlue placeholder:text-white" : "bg-gray-200 placeholder:text-gray-500"} font-mono text-xl`}
            />
          </div>
          <button className="bg-blue px-6 py-3 rounded-xl font-mono">
            Search
          </button>
        </form>

        {error && <p>{error}</p>}

        {userData && (
          <div className={`w-2/4 h-96 ${theme === "dark" ? "bg-lightBlue" : "bg-gray-200"} rounded-2xl p-9 font-mono shadow-lg`}>
            <div className="flex items-start justify-evenly pb-10">
              <div className="w-24">
                <img
                  className="w-full rounded-full"
                  src={userData.avatar_url}
                  alt="Avatar"
                />
              </div>
              <div>
                <h1>{userData.name || "No name provided"}</h1>
                <p className={`mb-5 mt-2 ${theme === "dark" ? "text-blue" : "text-gray-500"}`}>@{userData.login}</p>
                <span className="text-xs">
                  {userData.bio || "This profile has no bio"}
                </span>
              </div>
              <p>
                Joined {new Date(userData.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="ml-40">
              <div className={`w-96 h-20 rounded-2xl p-5 flex items-center justify-between mb-6 ${theme === "dark" ? "bg-darkBlue" : "bg-gray-300"}`}>
                <ul>
                  <li className="text-sm mb-2">Repos</li>
                  <span>{userData.public_repos}</span>
                </ul>
                <ul>
                  <li className="text-sm mb-2">Followers</li>
                  <span>{userData.followers}</span>
                </ul>
                <ul>
                  <li className="text-sm mb-2">Following</li>
                  <span>{userData.following}</span>
                </ul>
              </div>
              <div className="flex flex-wrap gap-6">
                <span className="flex gap-4 items-center text-xs">
                  <IoLocationSharp className="text-xl" />
                  {userData.location || "Not Available"}
                </span>
                <span className="flex gap-4 items-center text-xs">
                  <FaLink className="text-xl" />
                  {userData.blog ? (
                    <a href={userData.blog} target="_blank" rel="noopener noreferrer">
                      {userData.blog}
                    </a>
                  ) : (
                    "Not Available"
                  )}
                </span>
                <span className="flex gap-4 items-center text-xs">
                  <FaTwitter className="text-xl" />
                  {userData.twitter_username ? (
                    <a
                      href={`https://twitter.com/${userData.twitter_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {userData.twitter_username}
                    </a>
                  ) : (
                    "Not Available"
                  )}
                </span>
                <span className="flex gap-4 items-center text-xs">
                  <PiBuildingsBold className="text-xl" />
                  {userData.company || "Not Available"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
