/* import {
    html,
    render
} from 'https://unpkg.com/lit-html?module'; */
import { html, render } from '../node_modules/lit-html/lit-html.js';

const template = ({imageUrl, title, key}) => html `
    <div class="card mb-4">
        <img class="card-img-top" src="${imageUrl}"
            alt="${title}" width="400">
        <div class="card-body">
            <h4 class="card-title">${title}</h4>
        </div>
        <div class="card-footer">
            <a href="/details/${key}"><button type="button"
                    class="btn btn-info">Details</button></a>
        </div>
    </div>
`;

export default class MovieCard extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        render(template(this.movieData), this); // the movieData gets passed by the movies.map(movie=>) in movies.js using lit-html's BIND TO PROPERTIES
    }
}