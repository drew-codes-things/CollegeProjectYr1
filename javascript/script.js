document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const impactData = {
        treesPlantedThisMonth: 40,
        foundingMembers: 4,
        learningResources: 6,
        openRoles: 4
    };

    function animateCounter(el, target, duration) {
        let start = 0;
        const step = Math.ceil(target / (duration / 60));
        const timer = setInterval(() => {
            start = Math.min(start + step, target);
            el.textContent = start;
            if (start >= target) clearInterval(timer);
        }, 1000 / 60);
    }

    const counterTargets = [
        { id: 'treeCount',        value: impactData.treesPlantedThisMonth },
        { id: 'memberCount',      value: impactData.foundingMembers },
        { id: 'resourceCount',    value: impactData.learningResources },
        { id: 'roleCount',        value: impactData.openRoles }
    ];

    counterTargets.forEach(({ id, value }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(el, value, 1200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(el);
    });

    const cvInput = document.getElementById('cvUpload');
    const cvDisplay = document.getElementById('cvFileName');
    if (cvInput && cvDisplay) {
        cvInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            cvDisplay.textContent = file
                ? `${file.name} (${(file.size / 1024).toFixed(0)} KB)`
                : 'No file chosen';
        });
    }

    const closeOverlayBtn = document.getElementById('closeOverlay');
    const successOverlay  = document.getElementById('successOverlay');
    if (closeOverlayBtn && successOverlay) {
        closeOverlayBtn.addEventListener('click', () => {
            successOverlay.classList.add('d-none');
            const form = document.getElementById('applicationForm');
            if (form) form.reset();
            if (cvDisplay) cvDisplay.textContent = 'No file chosen';
        });
        successOverlay.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeOverlayBtn.click();
        });
    }

    const form = document.getElementById('applicationForm');
    if (form) {
        const errorMsg = document.getElementById('errorMsg');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            errorMsg.classList.add('d-none');
            errorMsg.innerHTML = '';

            const name           = document.getElementById('name').value.trim();
            const email          = document.getElementById('email').value.trim();
            const interest       = document.getElementById('interest').value;
            const isDonate       = interest === 'donate';
            const message        = isDonate ? 'ok' : document.getElementById('message').value.trim();
            const qualifications = isDonate ? 'ok' : document.getElementById('qualifications').value.trim();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const errors = [];

            if (!name)                        errors.push('Please enter your <strong>Full Name</strong>.');
            if (!emailRegex.test(email))      errors.push('Please enter a valid <strong>Email Address</strong>.');
            if (!interest)                    errors.push('Please select an <strong>Area of Interest</strong>.');
            if (!isDonate && !message)        errors.push('Please provide a <strong>Cover Message</strong>.');
            if (!isDonate && !qualifications) errors.push('Please enter your <strong>Qualifications</strong>.');

            if (errors.length) {
                errorMsg.innerHTML = '<ul class="mb-0 ps-3">' + errors.map(e => `<li>${e}</li>`).join('') + '</ul>';
                errorMsg.classList.remove('d-none');
                errorMsg.focus();
                return;
            }

            if (isDonate) {
                window.open('https://ko-fi.com/starlover0104', '_blank', 'noopener,noreferrer');
                return;
            }

            if (successOverlay) successOverlay.classList.remove('d-none');
            form.reset();
            if (cvDisplay) cvDisplay.textContent = 'No file chosen';
        });
    }

});
