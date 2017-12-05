var topic = ["football", "baseball", "basketball", "Soccer", "tennis", "swimming"];

for (i = 0; i < topic.length; i++) {
    createButton(topic[i]);
}
addGif();
clickGifButton();

function addGif() {
    $("#find-gif").on("click", function (event) {
        event.preventDefault();

        var userGif = $("#gif-input").val().trim();
        topic.push(userGif);
        $("#gif-input").val("");
        createButton(userGif);

    });
}

function createButton(topic) {
    //        $("#gifsButtons").empty();

    var gifsButtonDiv = $("<div>");
    var gifButton = $("<button id = buttonClass>")
    gifButton.attr("data-sport", topic);
    gifButton.text(topic);
    gifsButtonDiv.append(gifButton);

    $("#gifsButtons").append(gifButton);

    clickGifButton();
    assignClickEvents();
}


function clickGifButton() {
    $("button").on("click", function () {


        var sport = $(this).attr("data-sport");

        var queryURL = "https://api.giphy.com/v1/gifs/search";
        var apiKey = "h3ZfcokVkTszyvNg8AB93XpOtTMKzM7B"
        $.ajax({
                url: queryURL,
                method: "GET",
                data: {
                    q: sport,
                    api_key: apiKey,
                    limit: 10
                }
            })
            .done(function (response) {
                var results = response.data;

                console.log(results);

                $("#gifsImages").empty();

                for (var j = 0, len = results.length; j < len; j++) {

                    var sportDiv = $("<div>");

                    var pRating = $("<p>").text("Rating: " + results[j].rating);
                    // $("p").css({
                    //     "position": "absolute",
                    //     "top": "200px",
                    //     "left": "0",
                    //     "width": "100%"
                    // });

                    var state = $(this).attr("data-state");


                    var sportImage = $("<img class = gif>");
                    // $(".gif").css({
                    //     "position": "relative",
                    //     "width": "20%"
                    // });

                    // Setting the src attribute of the image to a property pulled off the result item
                    sportImage.attr("src", results[j].images.fixed_height_still.url);
                    sportImage.attr("data-state", "stillState");
                    sportImage.attr("still-state", results[j].images.fixed_height_still.url);
                    sportImage.attr("animated-state", results[j].images.fixed_height.url);

                    // Appending the paragraph and image tag to the animalDiv
                    sportDiv.append(pRating);
                    sportDiv.append(sportImage);

                    // appending the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#gifsImages").append(sportDiv);
                }
                assignClickEvents();

            });


    });
}

function assignClickEvents() {
    $(".gif").on("click", function () {

        var state = $(this).attr("data-state");
        // var idForGif = $(this).attr("data-gifID");

        if (state === "stillState") {
            $(this).attr("src", $(this).attr("animated-state"));
            $(this).attr("data-state", "animateState");

        } else {
            $(this).attr("src", $(this).attr("still-state"));
            $(this).attr("data-state", "stillState");

        }


    });
}