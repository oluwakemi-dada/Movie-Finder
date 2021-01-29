class UI {
  constructor() {
    this.movies = document.querySelector('.movies');
    this.baseURL = 'https://image.tmdb.org/t/p';
    this.fileSize = '/w500';
  }

  prepareMovies(movies) {
    let output = '';
    let i;
    for (i = 0; i <= movies.length; i++) {
      if (i === 8) {
        break;
      }
      output += `
          <div >
            <div class="popular-movies-img-container">
              <img id=${movies[i].id} class="movie-img" src='${this.baseURL}${this.fileSize}${movies[i].poster_path}'>
            </div>
            <div class="movie-title-search">${movies[i].original_title}</div>
            <div class="movie-date-search">${movies[i].release_date}</div>
          </div>
      `;
    }
    return output;
  }

  showMovies(movies) {
    // console.log(movies);
    this.movies.innerHTML = `<div class='search-result'></div>`;
    const searchResult = document.querySelector('.search-result');
    let output = '';
    movies.forEach((movie) => {
      if (movie.poster_path !== null) {
        output += `
          <div>
            <div class="search-img-container">
              <img id=${movie.id} class="movie-img" src='${this.baseURL}${this.fileSize}${movie.poster_path}'>
            </div>
            <div class="movie-title-search">${movie.original_title}</div>
            <div class="movie-date-search">${movie.release_date}</div>
          </div>
      `;
      }
    });
    searchResult.innerHTML = output;
  }

  showMovieDetails(details) {
    // console.log(details);
    let genres = [];
    details.genres.forEach((genre) => {
      genres.push(genre.name);
    });

    const movieGenres = genres.join(' / ');

    document.querySelector('.movies').innerHTML = `
      <div class="movie-details">
        <div>
        <img class="movie-img" src='${this.baseURL}${this.fileSize}${details.image}'>
        </div>
        <div class="movie-details-text">
          <div>${details.title}</div>
          <div>${movieGenres}</div>
          <div>${details.releaseDate}</div>
          <div>${details.overview}</div>
          <div class="fav-and-back-btn">
            <a class="go-back" href="index.html"><span>&#8592;</span> Go back</a>
            <div class="favourite">
              <i id='${details.id}' class="fas fa-star">
                <span class="add-to-favourites">Add to favourites</span>
              </i>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  showPopularMovies(movies) {
    // console.log(movies);
    const output = this.prepareMovies(movies);
    document.querySelector('.popular-movies').innerHTML = output;
  }

  showTopRatedMovies(movies) {
    const output = this.prepareMovies(movies);
    document.querySelector('.top-rated-movies').innerHTML = output;
  }

  showFavouriteMovies(movies) {
    let favouriteMoviesList = [];
    let newData;
    let movieGenres;
    movies.forEach((movie) => {
      let genres = [];
      movie.genres.forEach((genre) => {
        genres.push(genre.name);
      });
      movieGenres = genres.join(' / ');
      newData = {
        genres: movieGenres,
        id: movie.id,
        image: movie.image,
        overview: movie.overview,
        releaseDate: movie.releaseDate,
        title: movie.title,
      };
      favouriteMoviesList.push(newData);
    });

    // Populate UI
    // console.log(favouriteMoviesList);
    let output = '';
    const container = `
      <div class="fav-container"></div>
    `;

    const backDelBtns = `
      <div class="back-del-btns">
        <a class="go-back" href="index.html"><span>&#8592;</span> Go back</a>
        <button class="btn-remove-all">Remove All</button>
      </div>
    `;

    favouriteMoviesList.forEach((movie) => {
      output += `
      <div class="movie-details">
        <div>
        <img class="movie-img" src='${this.baseURL}${this.fileSize}${movie.image}'>
        </div>
        <div class="movie-details-text">
          <div>${movie.title}</div>
          <div>${movie.genres}</div>
          <div>${movie.releaseDate}</div>
          <div>${movie.overview}</div>
          <div class="btn-remove-div">
            <button id='${movie.id}' class="btn-remove">Remove</button>
          </div>
        </div>
      </div>
    `;
    });
    this.movies.innerHTML = container;

    document
      .querySelector('.fav-container')
      .insertAdjacentHTML('afterbegin', backDelBtns);

    document
      .querySelector('.fav-container')
      .insertAdjacentHTML('beforeend', output);
  }

  showEmptyListMessage() {
    const message = `
      <div class="empty-list-msg">Your List is now empty!</div>
    `;

    document
      .querySelector('.fav-container')
      .insertAdjacentHTML('beforeend', message);
  }

  showErrorMessage(msg) {
    const errorMessage = `
      <div class="modal">
        <p>${msg}</p>
        <button class="close-modal">Okay</button>
      </div>
    `;
    document
      .querySelector('.navbar')
      .insertAdjacentHTML('afterend', errorMessage);

    const overlay = `
      <div class="overlay"></div>
    `;

    document.querySelector('.modal').insertAdjacentHTML('afterend', overlay);
  }
}
