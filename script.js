// Search Button
const searchButton = document.querySelector('.search-button')
searchButton.addEventListener('click', async function () {
    try {
        const searchKeyword = document.querySelector('.input-keyword')
        const movies = await getApiMovies(searchKeyword.value);
        updateUi(movies);
    } 
    catch(err){
        alert(err);
    }
})

function getApiMovies(m) {
    return fetch(`http://www.omdbapi.com/?apikey=516b9b0&s=${m}`)
        .then(response => {
            if(!response.ok){
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(response => {
            if(response.Response === "False"){
                throw new Error(response.Error);
            }
            return response.Search;
        })
}

function updateUi(movies) {
    let cards = '';
    movies.forEach(m => cards += getMovies(m));
    const moviesCard = document.querySelector('.movies-container');
    moviesCard.innerHTML = cards;
}

function getMovies(m) {
    return `<div class="col-md-4 my-5">
                <div class="card bg-white p-2 text-dark bg-opacity-50">
                    <img src="${m.Poster}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
                        <a href="#" class="btn btn-primary movie-modal-detail" data-bs-toggle="modal" data-bs-target="#moviesDetail" data-imdbid="${m.imdbID}"
                        >Show Detail</a>
                    </div>
                </div>
            </div>`
}


// Show Detail Button
document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('movie-modal-detail')) {
        try {
            const imdbid = e.target.dataset.imdbid
            const moviesDetail = await getApiMoviesDetail(imdbid)
            updateUiDetail(moviesDetail)
        } catch (err){
            alert(err)
        }
    }
})

function updateUiDetail(m){
    const movieDetail = getMoviesDetail(m)
    const modalBody = document.querySelector('.modal-body')
    modalBody.innerHTML = movieDetail;
}

function getApiMoviesDetail(data) {
    return fetch(`http://www.omdbapi.com/?apikey=516b9b0&i=${data}`)
        .then(response => {
            if(!response.ok){
                throw new Error(response.statusText);
            }
            return response.json();
        })
}

function getMoviesDetail(m) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                            <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                            <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                            <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                            <li class="list-group-item"><strong>Plot : </strong> <br>${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`
}