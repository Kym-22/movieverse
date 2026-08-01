export function renderMovies(movieList, moviesContainer, currentLang, i18n) {
    moviesContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();
    const t = i18n[currentLang];
    if (movieList.length === 0) {
        moviesContainer.innerHTML = `
            <h2 style="grid-column:1/-1;text-align:center;color:white;">
                No hay películas en esta categoría.
            </h2>
        `;
        return;
    }
    movieList.forEach((movie) => {
        const card = document.createElement("div");
        card.className = "movie-card";
        const poster = document.createElement("img");
        poster.className = "movie-poster";
        poster.src =
            movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=Sin+Imagen";
        poster.alt = movie.Title;
        poster.dataset.id = movie.imdbID;
        poster.style.cursor = "pointer";
        const info = document.createElement("div");
        info.className = "movie-info";
        const title = document.createElement("h2");
        title.textContent = movie.Title;
        const year = document.createElement("p");
        year.innerHTML = `📅 <strong>${t.year}:</strong> ${movie.Year}`;
        const genre = document.createElement("p");
        genre.innerHTML = `🎭 <strong>${t.genre}:</strong> ${movie.Genre}`;
        const rating = document.createElement("p");
        rating.innerHTML = `⭐ <strong>IMDb:</strong> ${movie.imdbRating}`;
        const favoriteBtn = document.createElement("button");
        favoriteBtn.className = "favoriteBtn";
        favoriteBtn.dataset.id = movie.imdbID;
        favoriteBtn.innerHTML = t.add;
        info.appendChild(title);
        info.appendChild(year);
        info.appendChild(genre);
        info.appendChild(rating);
        info.appendChild(favoriteBtn);
        card.appendChild(poster);
        card.appendChild(info);
        fragment.appendChild(card);
    });
    moviesContainer.appendChild(fragment);
}
export function openModal(movie, modal, modalBody, currentLang, i18n) {
    modal.classList.add("active");
    const t = i18n[currentLang];
    modalBody.innerHTML = `

        <img src="${movie.Poster}" class="modalPoster">

        <div class="modalInfo">

            <h2>${movie.Title}</h2>

            <p><strong>📅 ${t.year}:</strong> ${movie.Year}</p>

            <p><strong>🎭 ${t.genre}:</strong> ${movie.Genre}</p>

            <p><strong>⭐ IMDb:</strong> ${movie.imdbRating}</p>

            <p><strong>🎬 ${t.director}:</strong> ${movie.Director}</p>

            <p><strong>👥 ${t.actors}:</strong> ${movie.Actors}</p>

            <p><strong>⏱ ${t.runtime}:</strong> ${movie.Runtime}</p>

            <p><strong>🌎 ${t.country}:</strong> ${movie.Country}</p>

            <p><strong>🗣 ${t.language}:</strong> ${movie.Language}</p>

            <p><strong>📝 ${t.plot}:</strong></p>

            <p>${movie.Plot}</p>

        </div>

    `;
}
//# sourceMappingURL=render.js.map