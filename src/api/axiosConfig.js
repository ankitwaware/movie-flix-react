import axios from "axios";

const tmdbAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "5abed1d77ecac13dcfddc58836b0c088",
    language: "en-US",
  },
});

export { tmdbAxios };
