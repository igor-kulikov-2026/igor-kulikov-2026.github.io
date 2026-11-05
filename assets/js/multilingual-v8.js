/* Portfolio V8: language switching with scroll position preservation. */
(() => {
  const sectionIds = [
    'home', 'about', 'skills',
    'experience', 'projects', 'contact'
  ];

  const links = document.querySelectorAll('[data-lang-target]');
  if (!links.length) return;

  const currentLanguage =
      document.documentElement.lang === 'he' ? 'he' : 'en';

  const englishUrl = new URL(
      currentLanguage === 'he' ? '../index.html' : './index.html',
      window.location.href
  );

  const hebrewUrl = new URL(
      currentLanguage === 'he' ? './index.html' : './he/index.html',
      window.location.href
  );

  function getCurrentPosition() {
    const threshold = 120;
    let current = 'home';

    for (const id of sectionIds) {
      const element = document.getElementById(id);

      if (element &&
          element.getBoundingClientRect().top <= threshold) {
        current = id;
      }
    }

    const element = document.getElementById(current);
    const height = element?.offsetHeight || 1;

    const offset = element
        ? Math.max(0, window.scrollY -
            (element.getBoundingClientRect().top + window.scrollY))
        : 0;

    return {
      section: current,
      progress: Math.min(1, offset / height)
    };
  }

  links.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();

      const targetLanguage = link.dataset.langTarget;

      if (targetLanguage === currentLanguage) return;

      const position = getCurrentPosition();

      const target = new URL(
          targetLanguage === 'he' ? hebrewUrl : englishUrl
      );

      target.hash = position.section === 'home'
          ? ''
          : position.section;

      sessionStorage.setItem(
          'portfolio-language-position',
          JSON.stringify({
            section: position.section,
            progress: position.progress
          })
      );

      window.location.assign(target.href);
    });
  });

  const saved = sessionStorage.getItem(
      'portfolio-language-position'
  );

  if (saved) {
    sessionStorage.removeItem('portfolio-language-position');

    try {
      const position = JSON.parse(saved);

      window.addEventListener('load', () => {
        const element =
            document.getElementById(position.section);

        if (!element) return;

        const top =
            element.getBoundingClientRect().top +
            window.scrollY;

        const offset =
            element.offsetHeight * position.progress;

        window.scrollTo({
          top: top + offset,
          behavior: 'instant'
        });
      });
    } catch (error) {
      console.warn('Cannot restore language position', error);
    }
  }
})();