const data = async () => {
    const response = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json') .then((response) => response.json());
    return response
  };

const testArray = [['1947-01-01', 243.1], ['1947-04-01', 246.3], ['1947-07-01', 250.1], ['1947-01-01', 243.1], ['1947-04-01', 246.3], ['1947-07-01', 250.1]];

const width = 800;
const height = 400;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };

const svg = d3.select("#bar-chart")
              .append("svg")
              .attr("width", width)
              .attr("height", height);

           svg.selectAll("rect")
              .data(testArray)
              .enter()
              .append("rect")
              .attr("x", (d, i) => i * 30)
              .attr("y", (d, i) => height - d[1])
              .attr("width", 25)
              .attr("height", (d, i) => d[1])
              .attr("fill", "red")
              .attr("class", "bar");

            svg.selectAll("foreignObject")
              .data(testArray)
              .enter()
              .append("foreignObject")
              .attr("x", (d, i) => i * 10 + 50)
              .attr("y", (d, i) => (height - d[1] - 100))
              .attr("width", 200)
              .attr("height", 80)
              .html((d) => `<div class="text-container">${d[1]}</div>`)
              .attr("class", "no-show");

            d3.select("svg")
              .append("style")
              .text(`
                .text-container {
                  height: 100%;
                  width: 100%;
                  border: 2px solid black;
                  background-color: rgba(0, 0, 255, 0.149);
                  color: black;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-radius: 5px
                }
              `);

        
let bars = document.getElementsByClassName("bar");
let tags = document.getElementsByClassName("no-show");


Array.from(bars).forEach((bar, index) => {
  bar.addEventListener("mouseover", () => {

    let tag = tags[index];
    tag.classList.add("show");
  });

  bar.addEventListener("mouseout", () => {

    let tag = tags[index];
    
    tag.classList.remove("show");
  });
});