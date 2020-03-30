(function () {
    db.collection("publications").orderBy('pubDate', 'desc')
        .get()
        .then(function (querySnapshot) {
            let body = document.getElementById('pubs-body');
            let videos = document.getElementById('videos-body');
            body.innerHTML = '';
            videos.innerHTML = '';
            querySnapshot.forEach(function (doc) {
                let pub = doc.data();
                let item = '<div class="col mb-4"> <div class="card"> <figure class="snip1253"> <div class="image"><img src="' + pub.image + '" alt="sample52"/></div> <figcaption> <div class="date"><span class="day">28</span><span class="month">Mars</span></div> <h3>' + pub.titre + '</h3> <p>' + pub.description + '</p> </figcaption> <footer> <a class="font-italic" href="' + pub.sourceLien + '">Source : ' + pub.sourceNom + '</a></footer></figure></div></div>';
                if (pub.type === 'VIDEO')
                    videos.innerHTML += item;
                else
                    body.innerHTML += item;
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
})();