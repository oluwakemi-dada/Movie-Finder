class Movie {
  constructor() {
    this.key = '48eda5793105cff98965e16f004b84d8';
    this.spinner = document.querySelector('#spinner-container');
  }

  async searchMovie(movieTitle) {
    this.spinner.style.display = 'block';
    // Make the search bar visible while loading
    document.querySelector('.navbar input').style.zIndex = '4';
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?&api_key=${this.key}&query=${movieTitle}`
    );

    const movie = await movieResponse.json();
    return {
      movie,
    };
  }

  async movieDetails(movieId) {
    this.spinner.style.display = 'block';
    const movieDetails = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.key}`
    );

    const details = await movieDetails.json();

    const movieVideos = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${this.key}`
    );

    const videos = await movieVideos.json();

    return {
      details,
      videos,
    };
  }

  async popularMovies() {
    this.spinner.style.display = 'block';
    const popularMoviesResponse = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this.key}`
    );

    const popularMovies = await popularMoviesResponse.json();
    return {
      popularMovies,
    };
  }

  async topRatedMovies() {
    this.spinner.style.display = 'block';
    const topRatedMoviesResponse = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.key}`
    );

    const topRatedMovies = await topRatedMoviesResponse.json();
    return {
      topRatedMovies,
    };
  }
}
