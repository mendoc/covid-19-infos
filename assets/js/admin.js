$(document).ready(function () {
    $('input[name="type"]').click(function () {
        let target = $(this).data('target');
        $('.pubContent').addClass('hide');
        $(target).removeClass('hide');
    });

    $('form').submit(function (e) {
        e.preventDefault();
        cacher('input[type="submit"]');
        let message = $('p.message');
        message.addClass('hide');
        let publication = {};
        let fields = $('input[type="hidden"], input[type="url"], input[type="text"], input:checked, textarea[name]');
        fields.each(function () {
            let field = $(this);
            let name = field.prop('name');
            if (name) {
                publication[name] = field.val()
            }
        });
        switch (publication.type) {
            case 'TEXTE':
                publication.contenu = $('#pubContentTexte').val();
                break;
            case 'IMAGE':
                publication.contenu = $('#pubContentImage').val();
                break;
            case 'VIDEO':
                publication.contenu = $('#pubContentVideo').val();
                break;
            case 'URL':
                publication.contenu = $('#pubContentURL').val();
                break;
            case 'LOCALISATION':
                publication.contenu = {
                    latitude: $('#pubLatitude').val(),
                    longitude: $('#pubLongitude').val()
                };
                break;
        }
        publication.pubDate = Date.now();

        write('publications', publication, function (p) {
            cons(p);
            let message = $('p.message');
            message.text('La publication a été créée');
            message.removeClass('error');
            message.addClass('success');
            message.removeClass('hide');
            $('form')[0].reset();
            afficher('input[type="submit"]');
        }, function (e) {
            cons(e);
            let message = $('p.message');
            message.text('Une erreur s\'est produite lors de l\'enregistrement de la publication.');
            message.removeClass('success');
            message.addClass('error');
            message.removeClass('hide');
            afficher('input[type="submit"]');
        })
    })

});