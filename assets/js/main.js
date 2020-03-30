(function () {
    db.collection("publications").orderBy('pubDate', 'desc')
        .get()
        .then(function (querySnapshot) {
            let body = document.getElementById('pubs-body');
            let videos = document.getElementById('videos-body');
            body.innerHTML = '';
            videos.innerHTML = '';
            querySnapshot.forEach(function (doc) {
                let pub = doc.data();
                let item = addPub(pub)
                if (pub.type === 'VIDEO')
                    videos.innerHTML += item;
                else
                    body.innerHTML += item;
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
})();


$('#article-body').on('show.bs.modal', function (e) {
    const article = $(e.relatedTarget.parentElement.parentElement)
    const modal = $(e.target)
    let modalHeader = modal.find('.modal-header')
    let articleTitle = article.find('h3').text()
    let articleImage = article.find('img').attr('src')
    let articleContent = article.find('p').text()

    // Insertion du contenu
    modal.find("#article-title").text(articleTitle)
    modalHeader.css({backgroundImage:`linear-gradient(to bottom right,#0c0c0cbd,#0c0b0bc4),url('${articleImage}')`})
    modal.find('.modal-body').text(articleContent)
})


/**
 * Ajoute une publication dans une section
 * @param {Object}pub
 * @param {string} section
 * @return {string} - retourne une publication
 */
function addPub({image , description, pubDate , sourceLien , sourceNom , titre}) {
    let jour = moment(pubDate).get('date');
    let mois = moment(pubDate).format("MMM");
    let item = `<div class="col mb-4">
                <div class="card">
                    <figure class="article">
                        <div class="image"><img src="${image}" alt="${titre}"/></div>
                        <figcaption>
                            <div class="date">
                                <span class="day">${jour}</span><span class="month">${mois}</span>
                            </div>
                            <h3>${titre}</h3>
                            <p>${description}</p>
                            <button class="btn btn-primary rounded-circle" data-toggle="modal" data-target="#article-body">
                                <i class="fa fa-eye" aria-hidden="true"></i>
                            </button>
                        </figcaption>
                        <footer>
                            <a class="font-italic" href="${sourceLien}">Source : ${sourceNom}</a>
                        </footer>
                    </figure>
                </div>
            </div>`;
    return item
}