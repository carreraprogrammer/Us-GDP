const drawChart = async () => {
  const response = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json');
  const data = await response.json();

  const width = 1200;
  const height = 700;
  const padding = 85;

  const toYear = (string) => {
    const date = new Date(string)
    const year = date.getFullYear()
    return year
  }

  const yScale = d3.scaleLinear()
                   .domain([0, d3.max(data.data, (d) => d[1])])
                   .range([height - padding, padding]);

  const xScale = d3.scaleLinear()
                   .domain([d3.min(data.data, (d) => toYear(d[0])), d3.max(data.data, (d) => toYear(d[0]))])
                   .range([padding, width - padding]);

  const svg = d3.select("#bar-chart")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

  svg.selectAll("rect")
     .data(data.data)
     .enter()
     .append("rect")
     .attr("x", (d, i) => xScale(1946 + i/3.98))
     .attr("y", (d, i) => yScale(d[1]))
     .attr("width", 3.5)
     .attr("height", (d, i) => height - yScale(d[1]) - padding)
     .attr("fill", "rgb(0, 136, 255)")
     .attr("class", "bar");

  svg.selectAll("foreignObject")
     .data(data.data)
     .enter()
     .append("foreignObject")
     .attr("x", (d, i) => i * 2)
     .attr("y", 300)
     .attr("width", 200)
     .attr("height", 80)
     .html((d) => `<div class="text-container">
                    <p> $ ${d[1]} BILLION</p>
                    <br>
                    <p><b>DATE:</b> ${d[0]}</p>
                   </div>`)
     .attr("class", "no-show");

  d3.select("svg")
    .append("style")
    .text(`
      .text-container {
        height: 100%;
        width: 100%;
        border: 2px solid black;
        background-color: rgba(0, 0, 255, 0.749);
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px
      }
    `);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    
    svg.append("g")
       .attr("transform", "translate(0," + (height - padding) + ")")
       .call(xAxis);
    
    svg.append("g")
       .attr("transform", "translate(" + padding + ",0)")
       .call(yAxis);
    
    svg.append("text")
       .attr("transform", "rotate(-90)")
       .attr("x", - height / 2)
       .attr("y", padding / 5)
       .attr("text-anchor", "middle")
       .text("GDP (USD)")
       .attr("class", "axis-name");

    svg.append("text")
       .attr("x", width / 2)
       .attr("y", height - padding/4 )
       .attr("text-anchor", "middle")
       .text("YEAR")
       .attr("class", "axis-name");
    
    

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
