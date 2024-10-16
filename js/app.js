// A função Lazy existe nesse escopo?
if (typeof $.Lazy !== "undefined") {
    loadImages();
    loadYTVideo();
}

// Carrega imagens e pictures de forma dinâmica para não sobrecarregar a página.
function loadImages() {
    $('.lazy-img').Lazy({
        // imageBase: '/assets/img/',
        effect: 'fadeIn',
        effectTime: 1000
    });
}

// Carrega de forma dinâmica vídeos do youtube.
function loadYTVideo() {
    $('iframe.lazy-yt').lazy({
        effect: 'fadeIn',
        effectTime: 1000
    });
}

function updateDate() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const formattedDate = now.toLocaleDateString(undefined, options);

    document.getElementById('datetime').textContent = formattedDate;
}

// Initial call to display the date immediately
updateDate();
