$(document).ready(function () {

    let itemsFooter = $("footer li");
    itemsFooter.click(function () {

        itemsFooter.removeClass("active");
        $(this).addClass("active");

        let section = $($(this).data("target"));
        $("section").removeClass("show");
        section.addClass("show");
    });

    listen("publications", function (pubs) {
        pubs.forEach((doc) => {
            addPub(doc.data());
        });
    });


    function addPub(data, section = 'home') {
        let d = moment(data.datePub).format("dddd, Do MMMM YYYY [à] HH:mm");
        $(`#${section}`).prepend(
            `<div class="publication">
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
        </div>`
        );
    }


    // Recuperation des flux rss
    const RSS_URL = `https://www.mediapart.fr/articles/feed`;

    /**
     * Place une information provenant d'une url dans l'acceuil
     * @param {string} RSS_URL
     */
    function GetInfoCovid19(RSS_URL) {

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
                            addPub(params, "ailleurs");
                        }
                    })
            }
        })
    }
    GetInfoCovid19(RSS_URL);

});