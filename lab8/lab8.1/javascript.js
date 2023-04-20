function init() {
    var w = 500;
    var h = 300;
    
    var projection = d3.geoMercator()
                      .center([145, -36.5])
                      .translate([w/2, h/2])
                      .scale(2450);

    var path = d3.geoPath().projection(projection)

    var svg = d3.select("#chart")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h)
                  .attr("fill", "grey");

    d3.json("LGA_VIC.json").then(function(json) {

      svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path);

    });

}
  
  window.onload = init;
  