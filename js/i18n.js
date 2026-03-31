function setLanguage(lang) {
    const t = window.__i18n[lang];
    if (!t) return;

    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.innerHTML = t[key];
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    localStorage.setItem('lang', lang);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// Auto-detect: saved preference → browser language → default en
const savedLang = localStorage.getItem('lang');
const browserLang = navigator.language.startsWith('pt') ? 'pt' : 'en';
setLanguage(savedLang || browserLang);
