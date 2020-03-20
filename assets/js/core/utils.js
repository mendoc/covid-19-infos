/* Les fonctions */

function cons(stuff) {
    console.log(stuff)
}

function listen(path, callback, err) {
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

function getKey() {
    return firebase.database().ref().push().key;
}

function getNotificationPermissionAsked() {
    return (window.Notification && Notification.permission !== "granted" && Notification.permission !== "denied");
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
 * @param {string} data
 * @param {string} section
 * @return void
 */
function addPub(data, section = 'home', asc = true) {
    let d = moment(data.datePub).format("dddd, Do MMMM YYYY [à] HH:mm");
    let item = `<div class="publication">
            <h1 class="title">${data.titre}</h1>
            <div class="image">
                <img src="${data.image}" alt="Image de ${data.titre}">
            </div>
            <div class="content">
                <div class="pub-date">
                    <i class="fa fa-clock-o"></i>
                    <time datetime="2020-03-16"> publié le ${d}</time>
                </div>
                <p>${data.description || "Contenu"}</p>
                <div class="pub-footer">
                    <button class="button"><i class="fa fa-share-alt"></i><span>Partager</span></button>
                    <p>Source : <a href="${data.sourceLien}">${data.sourceNom}</a></p>
                </div>
            </div>
        </div>`;
    if (asc) $(`#${section} .body`).prepend(item);
    else $(`#${section} .body`).append(item);
}


/**
 * Place une information provenant d'une url dans l'acceuil
 * @param {string} RSS_URL
 */
function getCovidRSS(RSS_URL) {

    const covidRegex = /(covid-19|coronavirus)/gmi;

    $.ajax(RSS_URL, {
        accepts: {
            xml: "application/rss+xml"
        },
        dataType: "xml",
        success: function (data) {
            // On retient le nom de la source
            const source = $(data).find("channel").find("title").get()[0].textContent;

            $(data)
                .find("item")
                .each(function () {
                    const el = $(this);
                    const title = el.find("title").text();
                    const description = el.find("description").text();
                    const subjectCovidTabs = [...title.matchAll(covidRegex), ...description.matchAll(covidRegex)];

                    if (subjectCovidTabs && subjectCovidTabs.length > 0) {

                        const imageUrl = el.get()[0].querySelector('content') ? el.get()[0].querySelector('content').getAttribute('url') : `https://fcw.com/-/media/GIG/EDIT_SHARED/Health-IT/covid19.jpg`;
                        const date = new Date(el.find("pubDate").text());

                        const params = {
                            titre: title,
                            image: imageUrl,
                            datePub: date,
                            description: description,
                            sourceNom: source,
                            sourceLien: el.find("link").text()
                        };
                        addPub(params, "ailleurs", false);
                    }
                });
            loader("ailleurs", false);
            showBody("ailleurs");
        }
    })
}