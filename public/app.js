// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  var urlBase = "http://www.newsweek.com";
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<h3 data-id='" + data[i]._id + "'>" + "<a href='" + urlBase + data[i].link + "'>" + data[i].title + "</a></h3>");
    $("#articles").append("<p>" + data[i].title + "</p>");
  }
});


$("#scrapeButton").on("click", function() {
  alert("add route '/scrape' into address bar");
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
