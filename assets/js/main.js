(function () {
    moment.locale('fr_FR');
    db.collection("publications").orderBy('pubDate', 'desc')
        .get()
        .then(function (querySnapshot) {
            let body = document.getElementById('pubs-body');
            let videos = document.getElementById('videos-body');
            let fake = document.getElementById('fake-body');
            body.innerHTML = '';
            videos.innerHTML = '';
            fake.innerHTML = '';
            querySnapshot.forEach(function (doc) {
                let pub = doc.data();
                let jour = moment(pub.pubDate).format("Do");
                let mois = moment(pub.pubDate).format("MMMM");
                let heure = moment(pub.pubDate).format("HH:mm");
                let item = '<div class="col mb-4"><div class="card"><figure class="snip1253"><div class="image"><img src="' + pub.image + '" alt="sample52"/></div><figcaption><div class="date"><span class="day">' + jour + '</span><span class="month">' + mois + '</span><span style="font-size: 0.6em;" class="day">' + heure + '</span></div><h3>' + pub.titre + '</h3><p class="mt-2">' + pub.description + '</p></figcaption><footer><a class="font-italic" href="' + pub.sourceLien + '">Source : ' + pub.sourceNom + '</a></footer></figure></div></div>';
                if (pub.type === 'VIDEO')
                    videos.innerHTML += item;
                else {
                    if (pub.important === 'FAKE') {
                        item = '<div><figure class="snip1171 mb-4"><img src="' + pub.image + '" alt="' + pub.titre + '"/><figcaption><p>' + pub.description + '</p><p>' + pub.contenu + '</p><a href="#">Fake News</a></figcaption></figure></div>';
                        fake.innerHTML += item;
                    } else {
                        body.innerHTML += item;
                    }
                }
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });

    // Recuperation des statistiques
    db.collection("statistiques")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                let stats = doc.data();
                let contaminations = document.querySelectorAll('.contaminations');
                let gConfrimes = document.querySelectorAll('.g_confirmes');
                let deces = document.querySelectorAll('.deces');
                let gDeces = document.querySelectorAll('.g_deces');
                let gueris = document.querySelectorAll('.gueris');
                let touches = document.querySelectorAll('.g_touches');
                contaminations[0].textContent = stats.contaminations;
                contaminations[1].textContent = stats.contaminations;
                gConfrimes[0].textContent = stats.g_confirmes;
                gConfrimes[1].textContent = stats.g_confirmes;
                deces[0].textContent = stats.deces;
                deces[1].textContent = stats.deces;
                gDeces[0].textContent = stats.g_deces;
                gDeces[1].textContent = stats.g_deces;
                gueris[0].textContent = stats.gueris;
                gueris[1].textContent = stats.gueris;
                touches[0].textContent = stats.g_touches;
                touches[1].textContent = stats.g_touches;
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
})();