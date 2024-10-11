// Search JS related.

// Caixinha de pesquisa
const searchInput = document.querySelector('#search-input');
var searchQuery = "";

searchInput.addEventListener("keypress", function(e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
        searchQuery = getSearchQuery(this);
        search(searchQuery);
    }
});

const searchButton = document.querySelector('#search-button');
searchButton.addEventListener("click", function(e) {
    e.preventDefault();
    searchQuery = getSearchQuery(searchInput);
    search(searchQuery);
});

function getSearchQuery(po_searchInput) {
    return po_searchInput.value.trim();
}


function search(ps_searchQuery) {
    if (ps_searchQuery.length) {
        var documentLang = document.documentElement.lang;
        var searchURL = "";
        if (documentLang == "en-US" || documentLang == "en") {
            searchURL = "/search/?q=" + encodeURIComponent(ps_searchQuery);
        } else {
            searchURL = "/" + documentLang + "/search/?q=" + encodeURIComponent(ps_searchQuery);
        }

        window.location = searchURL;
    }

    return false;
}


// if (elem === document.activeElement) {
//     console.log('Element has focus!');
// } else {
//     console.log(`Element is not focused.`);
// }

// var searchInput = $('#search-input');
// $(window).keydown(function(e) {
//     // enter pressionado.
//     if (e.keyCode === 13) {
//         // O foco está dentro da caixinha?
//         if (searchInput.is(':focus')) {
//             // Foca na caixa e seleciona o conteúdo para ser substituido.
//             search();
//         }
//     }
// });

const resultsReady = function(name, q, promos, results, resultsDiv) {
    document.getElementById("searching").style.display = "none";
    document.getElementById("searchQuery").textContent = q;
    document.getElementById("searchResults").style.display = "block";
    // const h1Elem = document.querySelector("h1");
    // h1Elem.textContent = "Search results for \"" + q + "\"";
};

window.__gcse || (window.__gcse = {});
window.__gcse.searchCallbacks = {
    web: {
        ready: resultsReady,
    },
};