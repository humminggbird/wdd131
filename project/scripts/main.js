const UIRenderer = {
    state: {
        region: 'all'
    },

    init() {
        console.log('ChopBetter application loaded.');

        this.setupNavigation();
        this.setupSidebarNav();
        this.setupRegions();
        this.setupHomeRegions();
        this.setupFilterChips();
        this.filterRecipes();
        this.updateFooter();
    },

    setupNavigation() {
        const ctaButton = document.querySelector('.cta-button');

        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                console.log('CTA clicked: Get Recommendation');
            });
        }
    },

    

    setupSidebarNav() {
        const items = document.querySelectorAll('.sidebar-nav li');

        items.forEach(item => {
            item.addEventListener('click', () => {
                const page = item.dataset.page;

                console.log('Sidebar clicked:', page);

                items.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                if (page === 'coming-soon') {
                    window.location.href = 'comingsoon.html';
                }
            });
        });
    },

    setupHomeRegions() {
        const items = document.querySelectorAll('.region-item');

        items.forEach(item => {
            item.addEventListener('click', () => {
                const region = item.dataset.region;

                console.log('Homepage region clicked:', region);

                window.location.href = `recipes.html?region=${region}`;
            });
        });

        document.getElementById("profileBtn").addEventListener("click", () => {
            window.location.href = "profile-setup.html";
        });
    },

    setupRegions() {
        const regions = document.querySelectorAll('.region-menu li');

        regions.forEach(region => {
            region.addEventListener('click', () => {

                regions.forEach(r => r.classList.remove('active'));
                region.classList.add('active');

                const selectedRegion = region.dataset.region;

                console.log('Selected region:', selectedRegion);

                this.state.region = selectedRegion;

                this.filterRecipes();
            });
        });
    },

    filterRecipes() {
        const recipes = document.querySelectorAll('.recipe-grid-card');

        recipes.forEach(recipe => {
            const recipeRegion = recipe.dataset.region || '';

            const match =
                this.state.region === 'all' ||
                recipeRegion.includes(this.state.region);

            recipe.style.display = match ? 'block' : 'none';
        });
    },

    setupFilterChips() {
        const chips = document.querySelectorAll('.chip');

        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                chip.classList.toggle('active');
                console.log('Filter clicked:', chip.textContent.trim());
            });
        });
    },

    updateFooter() {
        const yearSpan = document.getElementById('currentYear');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }

        const lastModifiedP = document.getElementById('lastModified');
        if (lastModifiedP) {
            lastModifiedP.textContent =
                "Last Modified: " + document.lastModified;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    UIRenderer.init();
});