// home components не е отговорен да показва всичките филми, затова го изнасяме в отделен компонент
import {
    Router
} from 'https://unpkg.com/@vaadin/router';
import {
    html,
    render
} from 'https://unpkg.com/lit-html?module';
import {
    getAllMovies
} from '../services/movieServices.js';

const template = ({
    onSearch,
    movies
}) => html `
    <h1 class="text-center">Movies</h1>
    <section>
        <a href="/add-movie" class="btn btn-warning ">Add Movie</a>
        <form class="search float-right">
            <label>Search: </label>
            <input type="text">
            <input type="submit" class="btn btn-info" value="Search" @click=${onSearch}>
        </form>
    </section>

    <div class=" mt-3 ">
        <div class="row d-flex d-wrap">
            <div class="card-deck d-flex justify-content-center">
                ${movies ? movies.map(movie => html`<movie-card .movieData=${movie}></movie-card>`) : html`<h4>There currently aren't any movies...</h4>`}
                <!-- movies.map(movie => html'<movie-card></movie-card>') -->
                <!-- to pass the current movie, one way is to bind to properties -->
            </div>
        </div>
    </div>
`;

export default class Movies extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    onSearch(e) { // doesn't work exactly correctly
        e.preventDefault();

        const queryString = document.querySelector('input[type="text"]').value;
        // this.queryString = queryString;
        Router.go(`?search=${queryString || ''}`);
        this.render();
    }

    render() {
        // tuk da naprawq turseneto pak s Route.go()
        // render(template(this.movies), this); // this points to the current component/element
        getAllMovies()
            .then(movies => {
                let queryString;
                if (location.search !== "") {
                    queryString = location.search.replace('?search=', '');
                    movies = movies.filter(obj => obj.title.toLowerCase().includes(queryString.toLowerCase()));
                }

                this.movies = movies;

                render(template(this), this, {
                    eventContext: this
                }); // this points to the current component/element
            });
    }
}