// Language filter for /books/. Without JS every book stays visible.
(function () {
    var chips = document.querySelectorAll('.chip[data-filter]');
    var cards = document.querySelectorAll('.book-card');
    var sections = document.querySelectorAll('.book-section');
    var status = document.getElementById('filter-status');
    var names = {all: 'all languages', de: 'Deutsch', en: 'English', es: 'Español', fr: 'Français'};

    // Remember each card's default edition so "All" can restore it.
    cards.forEach(function (card) {
        var first = card.querySelector('.edition-chips a');
        card._default = first;
    });

    function showEdition(card, link) {
        var title = card.querySelector('.book-card-title');
        var subtitle = card.querySelector('.book-card-subtitle');
        var series = card.querySelector('.book-series');
        var cover = card.querySelector('.book-card-cover');
        var lang = link.getAttribute('data-lang');
        title.textContent = link.getAttribute('data-title');
        title.href = link.href;
        subtitle.textContent = link.getAttribute('data-subtitle');
        series.textContent = link.getAttribute('data-series');
        series.hidden = !link.getAttribute('data-series');
        cover.href = link.href;
        cover.querySelector('img').src = link.getAttribute('data-cover');
        [title.parentNode, subtitle, series].forEach(function (el) { el.lang = lang; });
        card.querySelectorAll('.edition-chips a').forEach(function (a) {
            a.classList.toggle('is-active', a === link);
        });
    }

    function apply(lang) {
        var visible = 0;
        chips.forEach(function (c) {
            c.setAttribute('aria-pressed', String(c.getAttribute('data-filter') === lang));
        });
        cards.forEach(function (card) {
            var match = lang === 'all'
                ? card._default
                : card.querySelector('.edition-chips a[data-lang="' + lang + '"]');
            card.hidden = !match;
            if (match) {
                showEdition(card, match);
                if (lang === 'all') {
                    match.classList.remove('is-active');
                }
                visible += 1;
            }
        });
        sections.forEach(function (s) {
            s.hidden = !s.querySelector('.book-card:not([hidden])');
        });
        if (status) {
            status.textContent = visible + ' books in ' + names[lang];
        }
        var url = new URL(window.location.href);
        if (lang === 'all') {
            url.searchParams.delete('lang');
        } else {
            url.searchParams.set('lang', lang);
        }
        history.replaceState(null, '', url);
    }

    chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
            apply(chip.getAttribute('data-filter'));
        });
    });

    var initial = new URL(window.location.href).searchParams.get('lang');
    if (initial && names[initial]) {
        apply(initial);
    }
})();
