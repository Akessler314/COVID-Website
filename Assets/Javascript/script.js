$(document).ready(function () {
    var userInput;

    $('.button').click(clickSearch)

    $('.cityBtn').click(clickSearch)

    function clickSearch(event) {
        if ($(event.target).hasClass('cityBtn')) {
            userInput = $(event.target).text();
            search();
        } else if ($(event.target).hasClass('top20')) {
            return;
        } else {
            if ($('#search').val() === '') {
                alert('Field cannot be empty')
            } else {
                userInput = $('#search').val();
                search();
            }
        }
    }

    function search() {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://covid-193.p.rapidapi.com/statistics?country=${userInput}`,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": "61b6db55b3msh35943488960f57dp1ace38jsn832bfa80a52f"
            }
        }

        $.ajax(settings).then(function (response) {
            console.log(response);

            $('.newCases, .activeCases, .recovered, .todaysDeaths, .totalDeaths, testTotal').empty();

            $('#currentCases').text(`Current Cases: ${response.parameters.country}`)

            var newCases = response.response[0].cases.new;

            if (newCases === null) {
                $(".newCases").text('No new cases today');
            } else {
                $(".newCases").text("New Cases Today: " + newCases);
            }

            var activeCases = response.response[0].cases.active;

            $(".activeCases").text("Total Active Cases: " + activeCases);

            var recovered = response.response[0].cases.recovered;

            $(".recovered").text("Total Recovered: " + recovered);

            var todaysDeaths = response.response[0].deaths.new;

            if (todaysDeaths === null) {
                $(".todaysDeaths").text('No new deaths today');
            } else {
                $(".todaysDeaths").text("New Deaths Today: " + todaysDeaths);
            }

            var totalDeaths = response.response[0].deaths.total;

            $(".totalDeaths").text("Total Deaths: " + totalDeaths);

            var testTotal = response.response[0].tests.total;

            if (testTotal === null) {
                $(".testTotal").text("Amount of Tests Done: unknown");
            } else {
                $(".testTotal").text("Amount of Tests Done: " + testTotal);
            }

        });


        var date = new Date();
        var year = date.getFullYear();

        $.ajax({
            url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${userInput}+COVID19&fq=${year}&api-key=fba9vvYnRyI2O33HRL1AhwLy6ywpxVpH`,
            method: 'GET'
        }).then(function (response2) {
            console.log(response2);

            $('.articleSection').empty();

            for (var i = 0; i < 3; i++) {
                var div = $('<div>');

                var articleLink = $('<a>');

                var articleTitle = $('<h4 style="text-decoration: none; color: blue; font-size: medium">').text(response2.response.docs[i].headline.main);
                
                articleLink.append(articleTitle).attr({'href': response2.response.docs[i].web_url, 'target': '_blank'});

                div.append(articleLink);

                $('.articleSection').append(div);
            }
        })
    }

    var settings3 = {
        "async": true,
        "crossDomain": true,
        "url": "https://bloomberg-market-and-financial-news.p.rapidapi.com/stories/list?template=CURRENCY&id=usdjpy",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "bloomberg-market-and-financial-news.p.rapidapi.com",
            "x-rapidapi-key": "b2328dbcaamshe375150f85e5095p15818ejsnbf708ecc2a82"
        }
    }

    $.ajax(settings3).then(function (response3) {
        console.log(response3);
        $(".finArt1").text(response3.stories[0].title)
        $(".finArt2").text(response3.stories[1].title)
        $(".finArt3").text(response3.stories[2].title)
        $(".finArt1").attr("href", response3.stories[0].shortURL)
        $(".finArt2").attr("href", response3.stories[1].shortURL)
        $(".finArt3").attr("href", response3.stories[2].shortURL)
        // images for the articles 
        $(".finArt1img").attr("src", response3.stories[0].thumbnailImage)
        $(".finArt2img").attr("src", response3.stories[1].thumbnailImage)
        $(".finArt3img").attr("src", response3.stories[2].thumbnailImage)

    });
})



// Modal code
var modal = document.getElementById("errorModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}