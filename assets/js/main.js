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

    function addPub(data) {
        let d = moment(data.datePub).format("dddd, Do MMMM YYYY [à] HH:mm");
        $("#home").prepend(
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
                <p>${data.contenu || "Contenu"}</p>
                <div class="pub-footer">
                    <button class="button"><i class="fa fa-share-alt"></i><span>Partager</span></button>
                    <p>Source : <a href="${data.sourceLien}">${data.sourceNom}</a></p>
                </div>
            </div>
        </div>`
        );
    }
});