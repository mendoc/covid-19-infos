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
            $('#gueris').text(data.gueris);
            $('#g-confirmes').text(data.g_confirmes);
            $('#g-deces').text(data.g_deces);
            $('#g-touches').text(data.g_touches);
            let d = moment(data.updateTime).format("dddd, Do MMMM YYYY");
            let gd = moment(data.g_updateTime).format("dddd, Do MMMM YYYY");
            $('#updateTime').text(`Mis à jour le ${d}`);
            $('#g-updateTime').text(`Mis à jour le ${gd}`);
        });
    });

    // Récuperation des publications
    listenPubs("publications", (pubs) => {
        loader("home");

        $("#home .body").empty();
        pubs.forEach((doc) => {
            addPub(doc, "home");
        });

        // Gestion du clic sur les publications
        let elPubs = $('#home .title, #home .image, #home .content > p');
        elPubs.each(function () {
            $(this).click(function () {
                activeModal($(this).data('pub'));
            });
        });

        // Gestion du clic sur le bouton de partage
        let btns = $('#home .content button:first-child');
        btns.each(function () {
            addClickEvent($(this));
        });
        showBody("home");
        loader("home", false);

    });
    const bgDarkStyle = 'darkbg';
    const textWhiteStyle = 'text-white';
    const bgDarkImgStyle = 'darkbg_img';
    $('#btn-night-mode').click(function () {
        $('.compteur').toggleClass(`${bgDarkStyle} ${textWhiteStyle}`);
        $('body').toggleClass(bgDarkStyle);
        $('header').toggleClass(`${bgDarkStyle} ${textWhiteStyle}`);
        $(".publication .content").toggleClass('bg-dark-2 text-white');
        $("#symptomes .remark").toggleClass(`${bgDarkStyle} ${textWhiteStyle}`);
        $("#symptomes .box").toggleClass(`${bgDarkImgStyle} ${textWhiteStyle}`);
        $("#cartes .cartes").toggleClass(`${bgDarkStyle} ${textWhiteStyle}`);
        $("footer").toggleClass(`${bgDarkStyle} ${textWhiteStyle}`);
    });

    let btnCloseModal = $('#btn-close-modal');
    btnCloseModal.click(closeModal);
});