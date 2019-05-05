window.onload = init;

function init() {
    document
        .getElementById("search")
        .addEventListener("click", searchYoutbe, false);
}

function searchYoutbe() {
    var searchTerm = document.getElementById("searchYoutube").value;
    searchTerm = encodeURIComponent(searchTerm);
    var url =
        "https://www.googleapis.com/youtube/v3/search/?part=snippet&key=AIzaSyCvNjJxN9hLH-JbKfTPod4w1KyZtjZNFCA&q=" +
        searchTerm +
        "&maxResults=20";

    getYoutube(url, function(data) {
        console.log(data);
        showAllData(data.items);
    });
}

function showAllData(resultdata) {
    var datashow = "";
    var output = document.getElementById("output");
    for (var data in resultdata) {
        console.log(resultdata[data]);

        datashow += `<div class="itemshow col-md-6">
            <a href="https://www.youtube.com/watch?v=${
              resultdata[data].id.videoId
            }" target="_blank"><img src="${
      resultdata[data].snippet.thumbnails.high.url
    }" class="img-fluid"/></a>
            <h3 class="youtube-title"><a href="https://www.youtube.com/watch?v=${
              resultdata[data].id.videoId
            }" target="_blank">${resultdata[data].snippet.title}</a></h3>
            <p>${resultdata[data].snippet.description}</p>
        </div>`;
    }

    output.innerHTML += datashow;
}

function getYoutube(url, youtubecall) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.responseType = "json";
    xhr.onload = function() {
        if (xhr.status == 200) {
            youtubecall(xhr.response);
        }
    };
    xhr.send();
}