$(document).ready(function () {
   moment.locale('fr_FR');
   listenPubs('publications', function (pubs) {
      $("#nav-home .body").empty();
      pubs.forEach(function (pub) {
         addPub(pub);
      });
   })
});