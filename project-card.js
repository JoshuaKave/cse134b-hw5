class ProjectCard extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['title', 'img-src', 'img-src-small', 'img-src-webp', 'img-src-small-webp', 
                'img-alt', 'description', 'link', 'link-text', 'date', 'keywords', 'progress'];
    }

    attributeChangedCallback() {
        if (this.isConnected) this.render();
    }

    render() {
        const title = this.getAttribute('title') || 'Untitled Project';
        const imgSrc = this.getAttribute('img-src') || '';
        const imgSrcSmall = this.getAttribute('img-src-small') || imgSrc;
        const imgSrcWebp = this.getAttribute('img-src-webp') || '';
        const imgSrcSmallWebp = this.getAttribute('img-src-small-webp') || imgSrcWebp;
        const imgAlt = this.getAttribute('img-alt') || title;
        const description = this.getAttribute('description') || '';
        const link = this.getAttribute('link') || '';
        const linkText = this.getAttribute('link-text') || 'View More';
        const date = this.getAttribute('date') || '';
        const keywords = this.getAttribute('keywords') || '';
        const progress = this.getAttribute('progress');

        this.innerHTML = `
            <article class="project-card">
                <h2>${title}</h2>
                ${imgSrc ? `
                    <picture class="project-card__image">
                        ${imgSrcWebp ? `<source srcset="${imgSrcWebp}" media="(min-width: 501px)" type="image/webp">` : ''}
                        ${imgSrcSmallWebp ? `<source srcset="${imgSrcSmallWebp}" media="(max-width: 500px)" type="image/webp">` : ''}
                        ${imgSrc ? `<source srcset="${imgSrc}" media="(min-width: 501px)">` : ''}
                        <img src="${imgSrcSmall}" alt="${imgAlt}" loading="lazy">
                    </picture>
                ` : ''}
                ${description ? `<p class="project-card__description">${description}</p>` : ''}
                ${keywords ? `
                    <div class="project-card__keywords">
                        ${keywords.split(',').map(k => `<span class="project-card__keyword">${k.trim()}</span>`).join('')}
                    </div>
                ` : ''}
                ${date ? `<p class="project-card__date">${date}</p>` : ''}
                ${progress !== null && progress !== '' ? `
                    <div class="project-card__progress">
                        <span>Progress:</span>
                        <progress value="${progress}" max="100">${progress}%</progress>
                        <span>${progress}%</span>
                    </div>
                ` : ''}
                ${link ? `<a href="${link}" class="project-card__link">${linkText}</a>` : ''}
            </article>
        `;
    }
}

customElements.define('project-card', ProjectCard);
