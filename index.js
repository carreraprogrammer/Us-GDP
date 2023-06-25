
// test

document.addEventListener("DOMContentLoaded", function() {
    let title = document.getElementById("title");
    if (title) {
      title.innerHTML = "TEST TITLE";
    }
  });

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
