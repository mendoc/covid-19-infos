/* Les fonctions */

function cons(stuff) {
    console.log(stuff)
}

function listenPubs(path, callback) {
    //loadConseil();
    db.collection(path).orderBy('pubDate', 'desc')
        .onSnapshot(function (collection) {
            callback(collection);
        })
}

function listen(path, callback) {
    db.collection(path)
        .onSnapshot(function (collection) {
            callback(collection);
        })
}

function once(path, callback) {
    db.collection(path).get().then((querySnapshot) => {
        callback(querySnapshot)
    });
}

function write(path, value, success, error) {
    db.collection(path).add(value)
        .then(function (docRef) {
            success(docRef);
        })
        .catch(function (e) {
            error(e);
        });
}

function showBody(selector) {
    $(`#${selector} .body`).css("display", "block");
}

function cacher(selector) {
    $(selector).addClass("hide");
}

function afficher(selector) {
    $(selector).removeClass("hide");
}

function loader(rubrique, show = true) {
    let l = `#${rubrique} .loading `;
    if (show) {
        afficher(l + 'img');
        afficher(l + 'p');
    } else {
        cacher(l + 'img');
        cacher(l + 'p');
    }
}

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
                        </figcaption>
                        <footer>
                            <a class="font-italic" href="${sourceLien}">Source : ${sourceNom}</a>
                        </footer>
                    </figure>
                </div>
            </div>`;
    return item
}

function addClickEvent(el) {
    $(el).click(function () {
        el.toggleClass('button button-cancel');
        let pubSharing = el.parent().parent().find('.pub-sharing');
        if (pubSharing.hasClass('hide')) {
            el.find('i').prop('class', 'fa fa-remove');
            el.find('span').text('Annuler');
        } else {
            el.find('i').prop('class', 'fa fa-share-alt');
            el.find('span').text('Partager');
        }
        pubSharing.toggleClass('hide', '');
    });
}


/**
 * Cette fonction active une fenetre modal de l'element
 * @param pub_id
 */
function activeModal(pub_id) {
    let el = $(`#${pub_id}`);
    $('body').css('overflowY', 'hidden');
    $('header > a:first-of-type').addClass('hide');
    $('#btn-close-modal').removeClass('hide');
    el.addClass('modal');
    el.find('button:first-child').addClass('hide');
    el.find('p.contenu').removeClass('hide');
    el.find('button.btn-modal').addClass('hide');
    el.find(".pub-sharing").removeClass('hide');
}

/**
 * Cette fonction ferme la fenetre modal actuelle
 * @param {Event} event
 */
function closeModal(event) {
    let el = $(event.currentTarget);
    let modalElt = $('.modal');
    modalElt.removeClass('modal');
    $('body').css('overflowY', 'auto');
    $('header > a:first-of-type').removeClass('hide');
    $('.pub-footer button').removeClass('hide');
    $('.pub-sharing').addClass('hide');
    el.parent().parent().find('p.contenu').addClass('hide');
    el.addClass('hide');
}

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

function loadConseil() {
    let conseils = [
        "Se laver fréquemment les mains avec une solution  hydroalcoolique ou à l’eau et du savon",
        "Tousser ou éternuer dans son coude.",
        "Utiliser un mouchoir à usage unique et le jeter.",
        "Saluer sans se serrer la main , éviter les embrassades.",
        "Éviter de se toucher les yeux, le nez et la bouche.",
        "Tenez-vous informé et suivez les conseils d'hygiènes.",
        "Eviter les balades inutiles.",
        "Si vous avez les symptômes liés au coronavirus ne pas stresser appelez le 1410.",
        "Portez un masque si vous toussez ou éternuez.",
        "Ne pas laver puis réutiliser un masque.",
        "Ne pas utiliser le masque de quelqu’un d’autre.",
        "Eviter l’automédication (avoir l’avis d’un médecin).",
        "Adultes comme enfants doivent respecter les mesures d’hygiènes.",
        "Limiter les déplacements, restez chez soi autant que possible.",
        "Désinfecter les surfaces (sols, meubles, ordinateurs, téléphones…)"
    ];
    let message = $('.loading p.message')[0];
    let indice = Math.floor(Math.random() * conseils.length);
    cons(message);
    message.textContent = conseils[indice];
}

function separateur(a, b) {
    a = '' + a;
    b = b || ' ';
    let c = '',
        d = 0;
    while (a.match(/^0[0-9]/)) {
        a = a.substr(1);
    }
    for (let i = a.length-1; i >= 0; i--) {
        c = (d !== 0 && d % 3 === 0) ? a[i] + b + c : a[i] + c;
        d++;
    }
    return c;
}