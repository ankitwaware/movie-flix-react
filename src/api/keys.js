// exporting keys and value

const api_key = "5abed1d77ecac13dcfddc58836b0c088";
const imageBaseURL = "https://image.tmdb.org/t/p/";

const languageObject = { hi: "Hindi", en: "English", bn: "Bengali" };

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
