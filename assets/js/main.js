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

// Recuperation des flux rss
const homeSection = document.getElementById('home')
const RSS_URL = `https://www.mediapart.fr/articles/feed`

/**
 * Place une information provenant d'une url dans l'acceuil
 * @param {string} RSS_URL 
 */
function GetInfoCovid19(RSS_URL) {

    const covidRegex = /(covid-19|coronavirus)/gmi;

    $.ajax(RSS_URL,{
        accepts:{
            xml:"application/rss+xml"
        },
        headers:{
            'Access-Control-Allow-Origin': 'https://practical-liskov-571032.netlify.com/'
        },
        dataType:"xml",
        success:function (data) {
            // On retient le nom de la source
            const source = $(data).find("channel").find("title").get()[0].textContent

            $(data)
                .find("item")
                    .each(function () {
                        const el = $(this)
                        const title = el.find("title").text()
                        const description = el.find("description").text()
                        const subjectCovidTabs = [...title.matchAll(covidRegex),...description.matchAll(covidRegex)]

                        if (subjectCovidTabs && subjectCovidTabs.length > 0) {

                            const imageUrl = el.get()[0].querySelector('content') ? el.get()[0].querySelector('content').getAttribute('url'): `https://fcw.com/-/media/GIG/EDIT_SHARED/Health-IT/covid19.jpg`
                            const date = new Date(el.find("pubDate").text()).toLocaleDateString()

                            const params = {
                                title:title,
                                imageUrl:imageUrl,
                                date:date,
                                description:description,
                                source:source,
                                link:el.find("link").text()
                            }
                            const publication = createPublication(params)
                            homeSection.insertAdjacentHTML('beforeend',publication)
                        }

                    })
        }
    })

    function createPublication({title,imageUrl,date,description,source,link}) {
        return`
            <div class="publication">
                <h1 class="title">${title}</h1>
                <div class="image">
                    <img src="${imageUrl}" alt="">
                </div>
                <div class="content">
                    <div class="pub-date">
                        <i class="fa fa-clock-o"></i>
                        <time datetime=${date.replace(/\//g,'-')}>Publié le ${date}</time>
                    </div>
                    <p>${description}</p>
                    <div class="pub-footer">
                        <button class="button"><i class="fa fa-share-alt"></i><span>Partager</span></button>
                        <p>Source : <a href="${link}">${source}</a></p>
                    </div>
                </div>
            </div>`
    }

}

GetInfoCovid19(RSS_URL)
GetInfoCovid19(`https://www.gabonactu.com/feed/`)