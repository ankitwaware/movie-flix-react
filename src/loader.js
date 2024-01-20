import { tmdbAxios } from "./api/axiosConfig";

export async function Sidebarloader() {
  const response = await tmdbAxios.get("genre/movie/list", {
    params: { language: "en" },
  });
  const { genres } = response.data;
  return genres;
}

export async function DetailPageloader({ params }) {
  const { movieId } = params;

  const response = await tmdbAxios.get(`movie/${movieId}`, {
    params: {
      append_to_response: "casts,videos,releases,images",
    },
  });

  return response;
}

export async function MoviePageloader({ request }) {
  const params = new URL(request.url).searchParams;

  const response = await tmdbAxios.get("discover/movie", {
    params: {
      page: "1",
      include_adult: "false",
      include_video: "false",
      sort_by: "popularity.desc",
      ...(params.has("genreId") && { with_genres: params.get("genreId") }),
      ...(params.has("lang") && { with_original_language: params.get("lang") }),
    },
  });
  return response;
}

export async function SearchPageloader({ request }) {
    const queryParams = new URL(request.url).searchParams;
    const queryText = queryParams.get("query");
    const response = await tmdbAxios.get("search/movie", {
      params: {
        query: queryText,
        page: "1",
        include_adult: "false",
      },
    });
  
    return response;
  }