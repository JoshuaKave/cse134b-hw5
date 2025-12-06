const LOCAL_PROJECTS_KEY = 'portfolio-projects';

function getProjectsData() {
    return JSON.parse(localStorage.getItem(LOCAL_PROJECTS_KEY)) || [];
}

function renderRelatedProjects(container, excludeTitle) {
    const allProjects = getProjectsData();
    const relatedProjects = allProjects.filter(project => project.title !== excludeTitle).slice(0, 2);


    container.innerHTML = '';

    relatedProjects.forEach(item => {
        const card = document.createElement('project-card');
        
        card.setAttribute('title', item.title);
        if (item.imgSrc) card.setAttribute('img-src', item.imgSrc);
        if (item.imgSrcSmall) card.setAttribute('img-src-small', item.imgSrcSmall);
        if (item.imgSrcWebp) card.setAttribute('img-src-webp', item.imgSrcWebp);
        if (item.imgSrcSmallWebp) card.setAttribute('img-src-small-webp', item.imgSrcSmallWebp);
        if (item.imgAlt) card.setAttribute('img-alt', item.imgAlt);
        if (item.description) card.setAttribute('description', item.description);
        if (item.keywords) card.setAttribute('keywords', item.keywords);
        if (item.progress) card.setAttribute('progress', item.progress);
        if (item.link) card.setAttribute('link', item.link);
        if (item.linkText) card.setAttribute('link-text', item.linkText);
        
        container.appendChild(card);
    });
}

function init() {
    const container = document.getElementById('related-projects-container');
    const currentProjectTitle = document.querySelector('main article h1')?.textContent;

    if (container && currentProjectTitle) {
        renderRelatedProjects(container, currentProjectTitle);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}