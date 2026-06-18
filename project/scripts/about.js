
document.addEventListener('DOMContentLoaded', () => {

  
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            const answer = question.nextElementSibling;

            
            faqQuestions.forEach(q => {
                q.setAttribute('aria-expanded', 'false');
                const a = q.nextElementSibling;
                if (a) a.classList.remove('open');
            });

            
            if (!isExpanded) {
                question.setAttribute('aria-expanded', 'true');
                if (answer) answer.classList.add('open');
            }
        });
    });

    

    const welcomeEl = document.getElementById('aboutWelcomeMsg');

    if (welcomeEl) {
        try {
            
            const raw = localStorage.getItem('userProfile');
            if (raw) {
                const profile = JSON.parse(raw);
                const name = profile.name || profile.firstName || null;
                if (name) {
                    welcomeEl.textContent = `Welcome back, ${name}! 👋`;
                    welcomeEl.style.display = 'inline-block';
                }
            }
        } catch (e) {
        }
    }

});