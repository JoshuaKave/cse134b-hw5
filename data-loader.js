(function() {
    const JSONBIN_BIN_ID = '69328c08d0ea881f401426c7';
    const JSONBIN_API_KEY = '$2a$10$ijcHpPjL41apgI8PrAfaG.pnuxBAMAReZ/muVlyANrS6DBR1ZQyU2';
    const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`;

    const LOCAL_PROJECTS_KEY = 'portfolio-projects';
    const LOCAL_EXPERIENCE_KEY = 'portfolio-experience';

    const localProjectsData = [
        {
            title: "Craft AI (Local)",
            imgSrc: "images/craftAI_icon.png",
            imgSrcSmall: "images/craftAI_icon_small.png",
            imgSrcWebp: "images/craftAI_icon.webp",
            imgSrcSmallWebp: "images/craftAI_icon_small.webp",
            imgAlt: "CraftAI Logo - An AI brain icon representing machine learning",
            description: "AI-powered crafting bot for Path of Exile using reinforcement learning. [Loaded from localStorage]",
            keywords: "Python, Machine Learning, Reinforcement Learning",
            progress: "20",
            link: "projects/project1.html",
            linkText: "View Project"
        },
        {
            title: "Portfolio Website (Local)",
            imgSrc: "images/profile_icon.png",
            imgSrcSmall: "images/profile_icon_small.png",
            imgSrcWebp: "images/profile_icon.webp",
            imgSrcSmallWebp: "images/profile_icon_small.webp",
            imgAlt: "Portfolio Website Icon - A profile icon representing personal branding",
            description: "A responsive portfolio website built with semantic HTML and CSS. [Loaded from localStorage]",
            keywords: "HTML, CSS, JavaScript, Web Accessibility",
            progress: "55",
            link: "projects/project2.html",
            linkText: "View Project"
        },
        {
            title: "Path of Investing (Local)",
            imgSrc: "images/invest_logo.png",
            imgSrcSmall: "images/invest_logo_small.png",
            imgSrcWebp: "images/invest_logo.webp",
            imgSrcSmallWebp: "images/invest_logo_small.webp",
            imgAlt: "Path of Investing Logo - A chart icon representing market analysis",
            description: "Investment tracking platform for Path of Exile economy. [Loaded from localStorage]",
            keywords: "JavaScript, API Integration, Data Visualization",
            progress: "75",
            link: "projects/project3.html",
            linkText: "View Project"
        }
    ];

    const localExperienceData = [
        {
            title: "ServiceNow - Fullstack Engineer (Local)",
            imgSrc: "images/coding_picture.jpg",
            imgSrcSmall: "images/coding_picture_small.jpg",
            imgSrcWebp: "images/coding_picture.webp",
            imgSrcSmallWebp: "images/coding_picture_small.webp",
            imgAlt: "Software engineering workspace representing fullstack development",
            description: "Fullstack engineer intern working on enterprise solutions. [Loaded from localStorage]",
            keywords: "JavaScript, Seismic, Node.js, Cloud Services",
            date: "June 2025 - August 2025"
        },
        {
            title: "ServiceNow - DevOps Engineer (Local)",
            imgSrc: "images/coding_picture.jpg",
            imgSrcSmall: "images/coding_picture_small.jpg",
            imgSrcWebp: "images/coding_picture.webp",
            imgSrcSmallWebp: "images/coding_picture_small.webp",
            imgAlt: "DevOps engineering workspace with CI/CD pipelines",
            description: "DevOps engineer intern focused on automating deployment pipelines. [Loaded from localStorage]",
            keywords: "CI/CD, Docker, Kubernetes, Infrastructure",
            date: "June 2024 - August 2024"
        },
        {
            title: "Computer Science Tutor (Local)",
            imgSrc: "images/tutor.png",
            imgSrcSmall: "images/tutor_small.png",
            imgSrcWebp: "images/tutor.webp",
            imgSrcSmallWebp: "images/tutor_small.webp",
            imgAlt: "Tutoring session icon representing educational support",
            description: "CS Tutor helping students master programming concepts. [Loaded from localStorage]",
            keywords: "Java, C, Python, Teaching, Mentorship",
            date: "September 2023 - Present"
        },
        {
            title: "Resident Assistant (Local)",
            imgSrc: "images/ra.png",
            imgSrcSmall: "images/ra_small.png",
            imgSrcWebp: "images/ra.webp",
            imgSrcSmallWebp: "images/ra_small.webp",
            imgAlt: "Community building icon representing residential life",
            description: "RA at Eleanor Roosevelt College fostering inclusive community. [Loaded from localStorage]",
            keywords: "Leadership, Community Building, Event Planning",
            date: "September 2024 - Present"
        }
    ];

    function initializeLocalStorage() {
        if (!localStorage.getItem(LOCAL_PROJECTS_KEY)) {
            localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(localProjectsData));
        }
        if (!localStorage.getItem(LOCAL_EXPERIENCE_KEY)) {
            localStorage.setItem(LOCAL_EXPERIENCE_KEY, JSON.stringify(localExperienceData));
        }
    }

    function renderCards(container, data) {
        container.innerHTML = '';
        
        data.forEach(item => {
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
            if (item.date) card.setAttribute('date', item.date);
            
            container.appendChild(card);
        });
    }

    function loadLocal() {
        const projectsContainer = document.getElementById('projects-container');
        const experienceContainer = document.getElementById('experience-container');

        if (projectsContainer) {
            const data = JSON.parse(localStorage.getItem(LOCAL_PROJECTS_KEY)) || [];
            renderCards(projectsContainer, data);
            console.log('Loaded projects from localStorage:', data);
        }

        if (experienceContainer) {
            const data = JSON.parse(localStorage.getItem(LOCAL_EXPERIENCE_KEY)) || [];
            renderCards(experienceContainer, data);
            console.log('Loaded experience from localStorage:', data);
        }
    }
    async function loadRemote() {
        const projectsContainer = document.getElementById('projects-container');
        const experienceContainer = document.getElementById('experience-container');

        try {
            const response = await fetch(JSONBIN_URL, {
                method: 'GET',
                headers: {
                    'X-Access-Key': JSONBIN_API_KEY
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            const data = result.record;

            if (projectsContainer && data.projects) {
                renderCards(projectsContainer, data.projects);
                console.log('Loaded projects from JSONBin:', data.projects);
            }

            if (experienceContainer && data.experience) {
                renderCards(experienceContainer, data.experience);
                console.log('Loaded experience from JSONBin:', data.experience);
            }

        } catch (error) {
            console.error('Error fetching remote data:', error);
            alert('Failed to load remote data. Check console for details.');
        }
    }

    function init() {
        initializeLocalStorage();

        loadLocal();

        const loadLocalBtn = document.getElementById('load-local');
        const loadRemoteBtn = document.getElementById('load-remote');

        if (loadLocalBtn) {
            loadLocalBtn.addEventListener('click', loadLocal);
        }

        if (loadRemoteBtn) {
            loadRemoteBtn.addEventListener('click', loadRemote);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();