document.addEventListener('DOMContentLoaded', () => {

    const STORAGE_KEY = 'chopbetterUserProfile';

    const form = document.getElementById('profileForm');
    const toast = document.getElementById('profileToast');
    const welcomeBanner = document.getElementById('welcomeBackBanner');
    const welcomeName = document.getElementById('welcomeBackName');
    const btnReset = document.getElementById('btnResetForm');

    function getCheckedValues(name) {
        return Array.from(form.querySelectorAll(`input[name="${name}"]:checked`))
            .map(el => el.value);
    }

    function getRadioValue(name) {
        const el = form.querySelector(`input[name="${name}"]:checked`);
        return el ? el.value : '';
    }

    function showToast(msg, isError = false) {
        toast.textContent = msg;
        toast.classList.toggle('toast-error', isError);
        toast.classList.remove('hidden');

        clearTimeout(showToast._t);
        showToast._t = setTimeout(() => toast.classList.add('hidden'), 2500);
    }

    function validateForm() {
        const name = document.getElementById('fullName');

        if (!name.value.trim()) {
            showToast('Please enter your full name', true);
            return false;
        }
        return true;
    }

    function buildProfile() {
        return {
            fullName: document.getElementById('fullName').value.trim(),
            age: document.getElementById('age').value || null,
            weight: document.getElementById('weight').value || null,
            height: document.getElementById('height').value || null,
            gender: document.getElementById('gender').value || null,

            healthGoal: getRadioValue('healthGoal'),
            foodPreferences: getCheckedValues('foodPreferences'),
            preferredRegions: getCheckedValues('preferredRegions'),

            allergySpecify: document.getElementById('allergySpecify').value.trim(),
            likesForeignDishes: document.getElementById('likesForeignDishes').checked,
            mealsPerDay: document.getElementById('mealsPerDay').value || null,
            cookingSkill: getRadioValue('cookingSkill'),
            budgetRange: getRadioValue('budgetRange'),

            dashboard: {
                goalProgress: 0,
                mealsThisWeek: 0,
                caloriesThisWeek: 0,
                healthyStreak: 0,
                proteinPct: 0,
                carbsPct: 0,
                fatsPct: 0,
                fiberPct: 0
            },

            savedAt: new Date().toISOString()
        };
    }

    function saveProfile(e) {
        e.preventDefault();

        if (!validateForm()) return;

        const profile = buildProfile();

        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));

        window.dispatchEvent(new Event("profileUpdated"));

        showToast('Profile saved successfully ✓');

        acknowledgeUser(profile);

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 600);
    }

    function acknowledgeUser(profile) {
        if (!profile?.fullName) return;

        welcomeName.textContent = profile.fullName.split(' ')[0];
        welcomeBanner.classList.remove('hidden');
    }

    function resetForm() {
        if (!confirm('Clear profile?')) return;

        localStorage.removeItem(STORAGE_KEY);

        window.dispatchEvent(new Event("profileUpdated"));

        form.reset();
        welcomeBanner.classList.add('hidden');

        showToast('Profile cleared');
    }

    form.addEventListener('submit', saveProfile);
    btnReset.addEventListener('click', resetForm);
});