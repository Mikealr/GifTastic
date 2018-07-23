// Create array named "topics" for random objects to send api calls for
// Topics will be fun adverbs
var topics = ["reckless", "effortless", "brisk", "stylish", "sloppy", "quick", "happy", "absentminded"];

// Here we take the objects in the array, make buttons for each of them, and print them to the page

function printButtons() {
    // First we empty the element
    $("#animalButtons").empty();
    // Then we use a for loop at the length of the array to print buttons for each item in the array.
    for (i = 0; i < topics.length; i++) {
        var topicButton = $("<button>");
        topicButton.text(topics[i]);
        topicButton.attr("data-name", topics[i]);
        $("#animalButtons").append(topicButton);
    }

}



function buttonClick (){

// On click function for each of the buttons, grab 10 static non-animated gif images from the giphy api and place them on them on the page. Make sure to display ratings for every gif under the gif.
$("button").on("click", function () {

    // Giphy API ajax
    var url = "https://api.giphy.com/v1/gifs/search";
    url += '?' + $.param({
        'api_key': "NPLkrgEQNcR23e4mvCSNYV37FYbI1g7u",
        'limit': 10,
        'q': $(this).attr("data-name")
    });
    $.ajax({
        url: url,
        method: 'GET'
    }).then(function (response) {


        // Clears content before sending out more. This avoids the page getting very long when you push many different buttons or the same button repeatedly.
        $("#animals").empty();
        for (i = 0; i < response.data.length; i++) {
            // Create gif Images (10)
            var gifImages = $("<img>");
            gifImages.attr("id", "gif");
            gifImages.attr("src", response.data[i].images.fixed_height_still.url);
            // Giving images attributes of still and animate so I can trigger them when clicked
            gifImages.attr("data-still", response.data[i].images.fixed_height_still.url)
            gifImages.attr("data-animate", response.data[i].images.original.url);
            gifImages.attr("data-state", "still");
            // Creates paragraph with rating
            var gifRating = $("<p>");
            gifRating.text("Rating: " + response.data[i].rating);

            // Appends both of these to the page
            $("#animals").append(gifImages);
            $("#animals").append(gifRating);

        }

        // Calling this function like this because in order for the $("img") to pull from images, the images have to be on the page before this function is called.
        imageOnClick();

    });

});


}

// Gets buttons on the page initially
printButtons();
buttonClick();

// Logic here for when a user clicks the images that they will become animated and revert to still if clicked again

// Calling this function like this because in order for the $("img") to pull from images, the images have to be on the page before this function is called.
function imageOnClick() {


    $("img").on("click", function () {


        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

}



// Create a function that captures input from the input form element and add it to the "topics" array. 
// Then this same function remakes the buttons on the page including hte most recent one pushed to the array.

// function for onclick when button is pressed
$("#addAnimal").on("click", function () {

    // This prevents page from resetting when submit is pushed
    event.preventDefault();
    // capture search input
    var userInput = $("#animanl-input").val().trim();
    // add input to array
    topics.push(userInput);
    // re display array
    printButtons();
    buttonClick();
})