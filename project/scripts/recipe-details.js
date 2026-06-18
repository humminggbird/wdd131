document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

            
                btn.classList.add('active');
                const targetId = `tab-${btn.dataset.tab}`;
                document.getElementById(targetId).classList.add('active');
            });
        });
    }

    const btnMealPlan = document.getElementById('btnAddToMealPlan');
    const mealPlanMessage = document.getElementById('mealPlanMessage');

    if (btnMealPlan && mealPlanMessage) {
        btnMealPlan.addEventListener('click', () => {
            mealPlanMessage.classList.remove('hidden');
            setTimeout(() => {
                mealPlanMessage.classList.add('hidden');
            }, 3000);
        });
    }

    const btnFav = document.getElementById('btnAddToFavorites');
    if (btnFav) {
        btnFav.addEventListener('click', () => {
            const icon = btnFav.querySelector('.fav-icon');
            if (icon.textContent === '♡') {
                icon.textContent = '♥';
                icon.style.color = 'var(--primary-gold)';
            } else {
                icon.textContent = '♡';
                icon.style.color = 'inherit';
            }
        });
    }
    
    const gridFavs = document.querySelectorAll('.btn-favorite');
    gridFavs.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            btn.classList.toggle('saved');
            const svg = btn.querySelector('svg');
            if (btn.classList.contains('saved')) {
                svg.style.fill = 'var(--primary-gold)';
            } else {
                svg.style.fill = 'none';
            }
        });
    });
});
