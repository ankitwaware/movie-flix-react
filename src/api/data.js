// exporting keys and value
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

export { imageBaseURL, languageObject , homePageSections};
