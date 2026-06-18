document.addEventListener('DOMContentLoaded', () => {

    const STORAGE_KEY = 'chopbetterUserProfile';

    function getProfile() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            console.error("Profile error:", e);
            return null;
        }
    }

    function renderDashboard(profile) {

        const state = {
            userName: profile?.fullName?.split(' ')[0] || 'User',

            goalProgress: profile?.dashboard?.goalProgress ?? 0,
            mealsThisWeek: profile?.dashboard?.mealsThisWeek ?? 0,
            caloriesThisWeek: profile?.dashboard?.caloriesThisWeek ?? 0,
            healthyStreak: profile?.dashboard?.healthyStreak ?? 0
        };

       
        const nameEl = document.getElementById('userName');
        if (nameEl) nameEl.textContent = state.userName;

       
        const circle = document.querySelector('.circular-progress .fill');
        const text = document.querySelector('.progress-text');

        if (circle && text) {
            const r = 50;
            const c = 2 * Math.PI * r;

            const offset = c - (state.goalProgress / 100) * c;

            circle.style.strokeDashoffset = offset;
            text.textContent = state.goalProgress + '%';
        }

        
        document.querySelectorAll('.big-num').forEach(el => {
            const val = parseInt(el.dataset.target, 10) || 0;
            animateCounter(el, 0, val, 1200);
        });
    }

    function load() {
        renderDashboard(getProfile());
    }

    window.addEventListener("profileUpdated", load);

    window.addEventListener("storage", (e) => {
        if (e.key === STORAGE_KEY) load();
    });

    function animateCounter(el, start, end, duration) {
        const t0 = performance.now();

        function tick(t) {
            const p = Math.min((t - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const val = Math.round(start + (end - start) * eased);

            el.textContent = val;

            if (p < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }

    load();
});