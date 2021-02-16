export default class SkillCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<li>${this.getAttribute('name')}</li>`;
  }
}
