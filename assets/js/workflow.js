const steps = document.querySelectorAll('.step-section');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.06 });
    steps.forEach(s => obs.observe(s));

    const secObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const link = document.querySelector('.toc-link[href="#' + e.target.id + '"]');
        if (link) link.classList.toggle('active', e.isIntersecting);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    steps.forEach(s => secObs.observe(s));