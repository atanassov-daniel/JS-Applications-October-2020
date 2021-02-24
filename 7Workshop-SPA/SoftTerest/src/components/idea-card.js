import {
    html,
    render
} from 'lit-html';

const template = ({
    title,
    imageUrl,
    key
}) => html `
    <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
        <div class="card-body">
            <p class="card-text">${title}</p>
        </div>
        <img class="card-image" src="${imageUrl}" alt="Card image cap">
        <a class="btn" href="/details/${key}">Details</a>
    </div>
`;

export default class IdeaCardComponent extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        render(template(this.ideaData), this);
    }
}