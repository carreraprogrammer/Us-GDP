const data = async () => {
    const response = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json') .then((response) => response.json());
    return response
  };

  const testArray = [['1947-01-01', 243.1], ['1947-04-01', 246.3], ['1947-07-01', 250.1]];

const width = 800;
const height = 400;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };

const svg = d3.select("#bar-chart")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
            
      svg.selectAll("rect")
         .data(testArray)
         .enter()
         .append("rect")
         .attr("x", (d, i) => {
            return i * 30
         })
         .attr("y", (d, i) => {
            return height - d[1]
         })
         .attr("width", 25)
         .attr("height", (d, i) => {
            return d[1]
         })
         .attr("fill", "red")

      svg.selectAll("text")
         .data(testArray)
         .enter()
         .append("text")
         .text((d) => d[1])
         .attr("x", (d,i) => i * 30)
         .attr("y", (d,i) => height - d[1] -10)