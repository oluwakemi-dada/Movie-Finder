// const searchURL = `https://api.themoviedb.org/3/search/movie?&api_key=48eda5793105cff98965e16f004b84d8&query=${movieTitle}`;

// const movieDetails = `https://api.themoviedb.org/3/movie/{movie_id}?api_key=48eda5793105cff98965e16f004b84d8`;

// const popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=48eda5793105cff98965e16f004b84d8`;

// const topRatedURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=48eda5793105cff98965e16f004b84d8`;

// const similarURL = `https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=48eda5793105cff98965e16f004b84d8`;

class Movie {
  constructor() {
    this.key = '48eda5793105cff98965e16f004b84d8';
  }

  async searchMovie(movieTitle) {
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?&api_key=${this.key}&query=${movieTitle}`
    );

    const movie = await movieResponse.json();
    return {
      movie,
    };
  }

  async movieDetails(movieId) {
    const movieDetails = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.key}`
    );

    const details = await movieDetails.json();
    return {
      details,
    };
  }

  async popularMovies() {
    const popularMoviesResponse = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this.key}`
    );

    const popularMovies = await popularMoviesResponse.json();
    return {
      popularMovies,
    };
  }

  async topRatedMovies() {
    const topRatedMoviesResponse = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.key}`
    );

    const topRatedMovies = await topRatedMoviesResponse.json();
    return {
      topRatedMovies,
    };
  }
}
