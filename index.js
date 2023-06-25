
// test
const width = 800;
const height = 400;
const margin = { top: 50, bottom: 50, left: 50, right: 50 }

const svg = d3.select('#bar-chart')
              .append('svg')
              .attr('height', height - margin.top - margin.bottom)
              .attr('width', width - margin.left -margin.right)
              .attr('viewBox', [0, 0, width, height])

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })


