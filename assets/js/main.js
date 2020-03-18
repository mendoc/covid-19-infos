$(document).ready(function () {

    let items_footer = $("footer li");
    items_footer.click(function () {

        items_footer.removeClass("active");
        $(this).addClass("active");

        let section = $($(this).data("target"));
        $("section").removeClass("show");
        section.addClass("show");
    });
});