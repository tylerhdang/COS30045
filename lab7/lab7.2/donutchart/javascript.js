function init() {
    var w = 300;
    var h = 300;
    var padding = 55;
    
    var dataset = [5, 10, 15, 20, 25, 30];

    var outerRadius = w/2;
    
    //Later you can change the value of the inner radius to generate donut charts
    var innerRadius = h/3;

    var arc = d3.arc()
                  .outerRadius(outerRadius)
                  .innerRadius(innerRadius);

    var pie = d3.pie();

    var svg = d3.select("#chart")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

    var arcs = svg.selectAll("g.arc")
                    .data(pie(dataset))
                    .enter()
                    .append("g")
                    .attr("class", "arc")
                    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
                    
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    arcs.append("path")
        .attr("fill", function(d, i) {
          return color(i)
        })
        .attr("d", function(d, i){
          return arc(d, i)
        });

    arcs.append("text")
        .text(function(d){
          return d.value
        })
        .attr("transform", function(d){
          return "translate(" + arc.centroid(d) +")";
        })
        .attr("font-size", "14px")
        .attr("font-weight", "bold");
  }
  
  window.onload = init;
  