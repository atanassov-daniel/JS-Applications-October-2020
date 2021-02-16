import './MessageComponent.css';

export default class MessageComponent extends HTMLElement {
  constructor() {
    super();

    this.skills = [
      'fast learner',
      'team player',
      'creative person',
      'work under pressure',
      'communicative skills',
    ];
  }

  template(skills) {
    return `
      <div class="message-component-container">
        <h3>List of skills</h3>
        <ul>
          ${skills.map(skill => `<skill-card name="${skill}"></skill-card>`).join('')}
        </ul>
      <div>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.template(this.skills);
  }
}