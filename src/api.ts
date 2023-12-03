const API_KEY = "182e275fc6be813c829088e7dc9e2f7c";
const BASE_PATH = "https://api.themoviedb.org/3";
const lang = "&language=ko-KR";

interface IMovie{
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
    vote_average: number;
    vote_count: number;
}

export interface IGetMoviesResult {
    dates: {
        maximum: string;
        minimum: string;
    }
    page: number;
    results: IMovie[];
    total_page: number;
    total_results: number;
}

interface IShow{
    id: number;
    backdrop_path: string;
    poster_path: string;
    original_name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
}

export interface IGetShowResult {
    page: number;
    results: IShow[];
    total_page: number;
    total_results: number;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}${lang}`).then(
    (response) => response.json()
  );
}

export function getUpcomingMovies() {
    return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}${lang}`).then(
        (response) => response.json()
    );
}

export function getTopRatedMovies() {
    return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}${lang}`).then(
        (response) => response.json()
    );
} 

export function getOnTheAirShow() {
    return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
} 

export function getAiringTodayShow() {
    return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}

export function getPopularShow() {
    return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}

export function getTopRatedShow() {
    return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}

export function getSearchShow(keyword:string) {
    return fetch(`${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}`).then(
        (response) => response.json()
    );
}

export function getSearchMovie(keyword:string) {
    return fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`).then(
        (response) => response.json()
    );
}




/**
 * _
 * https://api.themoviedb.org/3/search/movie?query=abc
 * https://api.themoviedb.org/3/search/tv?api_key=182e275fc6be813c829088e7dc9e2f7c&query=arcane
https://api.themoviedb.org/3/tv/top_rated?api_key=182e275fc6be813c829088e7dc9e2f7c

 */