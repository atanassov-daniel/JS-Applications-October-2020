import {
    html
} from 'https://unpkg.com/lit-html?module';

export const navFunc = (authData) => html `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
        <a class="navbar-brand text-light" href="/">Movies</a>
        <ul class="navbar-nav ml-auto">
            ${authData.isAuthenticated ?
                html`
                    <li class="nav-item">
                        <a class="nav-link">Welcome, ${authData.email}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/logout">Logout</a>
                    </li>
                `
                :
                html`
                    <li class="nav-item">
                        <a class="nav-link" href="/login">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">Register</a>
                    </li>
                `
            }
        </ul>
    </nav>`;