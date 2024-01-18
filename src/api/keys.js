// exporting keys and value

const api_key = "9ae6fabb0127d400b50c64d71f7c049c";
const imageBaseURL = "https://image.tmdb.org/t/p/";

const languageObject = { hi: "Hindi", en: "English", bn: "Bengali" };

// todo recreate a page section
const homePageSections = [
  {
    title: "Upcoming Movies",
    path: "/movie/upcoming",
  },
  {
    title: "Weekly Trending Movies",
    path: "/trending/movie/week",
  },
  {
    title: "Top Rated Movies",
    path: "/movie/top_rated",
  },
];

export { api_key, imageBaseURL, languageObject , homePageSections};
