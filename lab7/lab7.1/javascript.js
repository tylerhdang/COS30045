// for some reason, changing the color cause the line chart to draw itself normally
function init() {
    var w = 600;
    var h = 300;
    var padding = 55;
    
    var dataset;
  
    function lineChart(dataset) {
      var svg = d3.select("#chart")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);
  
      var xScale = d3.scaleTime()
                     .domain([
                        d3.min(dataset, function(d) { return d.date; }),
                        d3.max(dataset, function(d) { return d.date; })
                    ])
                    .range([padding, w]);
  
      var yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function(d) { return d.number; })])
                    .range([h - padding + 10, 0]);
      
      var xAxis = d3.axisBottom().ticks(10).scale(xScale);
      var yAxis = d3.axisLeft().ticks(10).scale(yScale);
      
      //creating line
      /*var line = d3.line()
                  .x(function(d) { return xScale(d.date); })
                  .y(function(d) { return yScale(d.number); });*/

      area = d3.area()
                  .x(function(d) { return xScale(d.date); })
                  //base line for area shape
                  .y0(function() { return yScale.range()[0];})
                  .y1(function(d) { return yScale(d.number); });
      
      //append line
      /*svg.append("path")
        .datum(dataset)
        .attr("class", "line")
        .attr("d", line);*/

      svg.append("path")
        .datum(dataset)
        .attr("class", "area")
        .attr("d", area);
      
      svg.append("g") //Append the x and y axis to the SVG element as groups
        .attr("transform", "translate(0, "+ (h - padding + 10) +")") //translating them to the appropriate positions
        .call(xAxis);
     
      svg.append("g")
        .attr("transform", "translate(" + (padding) + ", 0)")
        .call(yAxis);
      
      svg.append("line")
        .attr("class", "line halfMilMark")
      //start of the line
        .attr("x1", padding)
        .attr("y1", yScale(500000))
      //end of the line
        .attr("x2", w)
        .attr("y2", yScale(500000))
        .style("stroke", "red") // set stroke color to red
        .style("stroke-dasharray", "2"); // set stroke dasharray to create a dotted effect

      svg.append("text")
        .attr("class", "halfMilLabel")
        .attr("x", padding + 10)
        .attr("y", yScale(500000) - 7)
        .text("Half a million unemployed")
        .attr("fill", "red");
          
    }
  
    d3.csv("Unemployment_78-95.csv", function(d) {
      return {
        date: new Date(+d.year, +d.month - 1),
        number: +d.number
      };
    }).then(function(data) {
      dataset = data;
      lineChart(dataset);
      // console.table(dataset, ["date", "number"]); check the DOM for values of CSV
    });
  }
  
  window.onload = init;
  