const drawChart = async () => {
  const response = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json');
  const data = await response.json();

  const width = 900;
  const height = 400;
  const padding = 30;

  const yScale = d3.scaleLinear()
                   .domain([0, d3.max(data.data, (d) => d[1])])
                   .range([height - padding, padding]);

  const xScale = d3.scaleLinear()
                   .domain([0, data.data.length])
                   .range([padding, width - padding])

  const svg = d3.select("#bar-chart")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

  svg.selectAll("rect")
     .data(data.data)
     .enter()
     .append("rect")
     .attr("x", (d, i) => xScale(i))
     .attr("y", (d, i) => yScale(d[1]) + padding)
     .attr("width", 3)
     .attr("height", (d, i) => height - yScale(d[1]))
     .attr("fill", "red")
     .attr("class", "bar");

  svg.selectAll("foreignObject")
     .data(data.data)
     .enter()
     .append("foreignObject")
     .attr("x", (d, i) => i * 2 + 5)
     .attr("y", 170)
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
};

drawChart();
