(function () {
    db.collection('publications').orderBy('pubDate', 'desc')
        .onSnapshot(function (pubs) {
            let body = document.getElementById('pub-body');
            body.innerHTML = '';
            pubs.forEach(function (doc) {
                let pub = doc.data();
                let item = '<div class="col mb-4"> <div class="card"> <figure class="snip1253"> <div class="image"><img src="' + pub.image + '" alt="sample52"/></div> <figcaption> <div class="date"><span class="day">28</span><span class="month">Oct</span></div> <h3>' + pub.titre + '</h3> <p>' + pub.description + '</p> </figcaption> <footer> <a class="font-italic" href="' + pub.sourceLien + '">Source : ' + pub.sourceNom + '</a></footer></figure></div></div>';
                body.innerHTML += item;
            });
        });
})();