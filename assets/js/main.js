$(document).ready(function () {
    moment.locale('fr_FR');

    // Gestion du passage d'une rubrique à une autre
    let itemsFooter = $("footer li");
    itemsFooter.click(function () {

        itemsFooter.removeClass("active");
        $(this).addClass("active");

        let section = $($(this).data("target"));
        $("section").removeClass("show");
        section.addClass("show");
    });

    // Récuperation des statistiques
    listen("statistiques", (stats) => {
        stats.forEach((stat) => {
            let data = stat.data();
            $('#contaminations').text(data.contaminations);
            $('#deces').text(data.deces);
            let d = moment(data.updateTime).format("dddd, Do MMMM YYYY");
            $('#updateTime').text(`Mis à jour le ${d}`);
        });
    });

    // Récuperation des publications
    listenPubs("publications", (pubs) => {
        loader("home");

        $("#home .body").empty();
        pubs.forEach((doc) => {
            addPub(doc.data(), "home");
        });

        // Gestion du clic sur les publications
        let elPubs = $('#home .title, #home .image, #home .content > p');
        elPubs.each(function () {
            $(this).click(function () {
                location.href = $(this).data('url');
            });
        });

        // Gestion du clic sur le bouton de partage
        let btns = $('#home .content button');
        btns.each(function () {
            addClickEvent($(this));
        });
        showBody("home");
        loader("home", false);
    });
});