// Initialize movie
const movie = new Movie();
// Initialize UI
const ui = new UI();
// Element
const movies = document.querySelector('.movies');
const searchMovie = document.querySelector('#search-movie');
const body = document.querySelector('body');
const spinner = document.querySelector('#spinner-container');

// GET MOVIE INFO FROM LS
const getMovieFromLocalStorage = () => {
  let movieInfo;

  if (localStorage.getItem('movieInfo') === null) {
    movieInfo = [];
  } else {
    movieInfo = JSON.parse(localStorage.getItem('movieInfo'));
  }
  return movieInfo;
};

// STORE MOVIE INFO IN LOCAL STORAGE
const storeMovieInLocalStorage = (info) => {
  const movieInfo = getMovieFromLocalStorage();
  movieInfo.push(info);
  localStorage.setItem('movieInfo', JSON.stringify(movieInfo));
};

// DISPLAY MOVIE FROM LOCAL STORAGE
const displayMovieFromLocalStorage = () => {
  const movieInfo = getMovieFromLocalStorage();
  ui.showFavouriteMovies(movieInfo);
};

// LOAD FAVOURITE MOVIES LIST COUNT
const updateFavMoviesCount = () => {
  const itemsInLS = getMovieFromLocalStorage();
  let favMoviesCount = itemsInLS.length;
  document.querySelector('.count').textContent = favMoviesCount;
};

// CLOSE MODAL
const closeModal = () => {
  document.querySelector('.modal').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
};

// SEARCH MOVIES
if (searchMovie) {
  searchMovie.addEventListener('keyup', (e) => {
    // Get input text
    const userText = e.target.value;
    if (userText !== '') {
      // Make http call
      movie.searchMovie(userText).then((data) => {
        spinner.style.display = 'none';

        if (data.movie.results.length === 0) {
          // Show alert
        } else {
          // Show movie
          ui.showMovies(data.movie.results);
        }
      });
    } else {
      // clear movie search
      window.location.reload();
    }
  });
}

// VIEW MOVIE DETAILS
movies.addEventListener('click', (e) => {
  if (
    e.target.className === 'movie-img' ||
    e.target.className === 'movie-img-fav'
  ) {
    // Show movie details
    movie.movieDetails(e.target.id).then((data) => {
      spinner.style.display = 'none';

      const details = {
        genres: data.details.genres,
        id: data.details.id,
        image: data.details.poster_path,
        overview: data.details.overview,
        releaseDate: data.details.release_date,
        title: data.details.title,
        videos: data.videos.results,
        voteAverage: data.details.vote_average,
      };

      ui.showMovieDetails(details);
    });
  }
});

// ADD FAVOURITE MOVIES
movies.addEventListener('click', (e) => {
  if (e.target.className === 'fas fa-star') {
    const targetID = parseInt(e.target.id);
    movie.movieDetails(targetID).then((data) => {
      spinner.style.display = 'none';

      // console.log(data);
      const details = {
        genres: data.details.genres,
        id: data.details.id,
        image: data.details.poster_path,
        overview: data.details.overview,
        releaseDate: data.details.release_date,
        title: data.details.title,
        voteAverage: data.details.vote_average,
      };
      const movieInfo = getMovieFromLocalStorage();

      if (movieInfo.length === 0) {
        storeMovieInLocalStorage(details);
        updateFavMoviesCount();
      } else {
        const LSData = movieInfo.map((currMovie) => {
          return currMovie.id;
        });

        if (LSData.indexOf(targetID) === -1) {
          storeMovieInLocalStorage(details);
          updateFavMoviesCount();
        } else {
          ui.showErrorMessage('This movie has been added already.');
        }
      }
    });
  }
});

// VIEW LIST OF FAVOURITE MOVIES
const favouriteList = document.querySelector('#favourite-list');
favouriteList.addEventListener('click', () => {
  const itemsInLS = getMovieFromLocalStorage();
  let favMoviesCount = itemsInLS.length;
  if (favMoviesCount !== 0) {
    displayMovieFromLocalStorage();
  } else {
    // Show message
    ui.showErrorMessage('Add a movie to view...');
  }
});

// REMOVE MOVIE FROM FAVOURITE LIST
movies.addEventListener('click', (e) => {
  if (e.target.className === 'btn-remove') {
    let id = parseInt(e.target.id);
    let movieInfo = getMovieFromLocalStorage();
    const filteredMovies = movieInfo.filter((movie) => {
      return id !== movie.id;
    });
    // Update Local storage, populate ui amd update count
    localStorage.setItem('movieInfo', JSON.stringify(filteredMovies));
    displayMovieFromLocalStorage();
    updateFavMoviesCount();
    // Reassign LS so as to check length of array
    movieInfo = getMovieFromLocalStorage();
    if (movieInfo.length === 0) {
      ui.showEmptyListMessage();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }
});

// REMOVE ALL MOVIES FROM FAVORITE LIST
movies.addEventListener('click', (e) => {
  if (e.target.className === 'btn-remove-all') {
    localStorage.clear();
    displayMovieFromLocalStorage();
    updateFavMoviesCount();
    // Show message
    ui.showEmptyListMessage();
    // Return to homepage after 1.5sec
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
});

// CLOSE MODAL EVENTS
// Close modal with a click on a button
body.addEventListener('click', (e) => {
  if (e.target.className === 'close-modal') {
    closeModal();
  }
});
// Close modal with a click on overlay
body.addEventListener('click', (e) => {
  if (e.target.className === 'overlay') {
    closeModal();
  }
});
// Close Modal with esc key
body.addEventListener('keyup', (e) => {
  if (
    e.key === 'Escape' &&
    !document.querySelector('.modal').classList.contains('hidden')
  ) {
    closeModal();
  }
});

// INITIALIZE APP
const init = () => {
  // Popular movies
  movie.popularMovies().then((data) => {
    spinner.style.display = 'none';
    ui.showPopularMovies(data.popularMovies.results);
  });
  // Top rated movies
  movie.topRatedMovies().then((data) => {
    spinner.style.display = 'none';
    ui.showTopRatedMovies(data.topRatedMovies.results);
  });
  // Update favourite movies count
  updateFavMoviesCount();
};

init();
