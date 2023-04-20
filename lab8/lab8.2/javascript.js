function init() {
  var w = 500;
  var h = 300;

  var projection = d3.geoMercator()
      .center([145, -36.5])
      .translate([w / 2, h / 2])
      .scale(2450);

  var color = d3.scaleQuantize().range(['#f2f0f8', '#ccc9e4', '#9f99cc', '#7869b6', "#cccccc", '#5b1f95' ]);

  var path = d3.geoPath().projection(projection);

  var svg = d3.select("#chart")
      .append("svg")
      .attr("width", w)
      .attr("height", h)

  d3.csv("VIC_LGA_unemployment.csv", function (d) {
      return {
          LGA: d.LGA,
          unemployed: +d.unemployed
      };
  }).then(function(data) {
      d3.json("LGA_VIC.json").then(function(json) {
          // merge the data from VIC_LGA_unemployment.csv and LGA_VIC.json
          // loop through once for each LGA value
          for (var i = 0; i < data.length; i++) {
              //grab LGA name
              var dataState = data[i].LGA;
              // grab data LGA, and convert from string to float
              var dataValue = parseFloat(data[i].unemployed);
              // find the corresponding LGA inside the LGA_VIC.json
              for(var j = 0; j < json.features.length; j++){
                var jsonState = json.features[j].properties.LGA_name;
                if(dataState == jsonState){
                    // copy the LGA data value into JSON
                    json.features[j].properties.unemployed = dataValue;
                    break; // stop looking through the JSON
                }
              }
          }
          // set the domain of the color scale based on the unemployment data
          color.domain([d3.min(json.features, function(d) { return d.properties.unemployed; }), d3.max(json.features, function(d) { return d.properties.unemployed; })]);

          // create the path elements and set the fill color based on the unemployment data
          svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("fill", "#cccccc") //color range didn't work, so use this in the svg to fix it
            .style("fill", function(d) { return color(d.properties.unemployed); })
            .attr("d", path);

          // load VIC_city.csv data and create heatmap
          d3.csv("VIC_city.csv", function (d) {
              return {
                  place: d.place, //for string
                  lat: +d.lat, //for int
                  lon: +d.lon
              };
          }).then(function(data) {
            svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function(d){
              return projection([d.lon, d.lat])[0]; //take the first set in the csv
            })
            .attr("cy", function(d){
              return projection([d.lon, d.lat])[1]; ////take the second set in the csv
            })
            .attr("r", 2)
            .style("fill", "red");

            //text for victorian town and city
            svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("x", function(d){
                return projection([d.lon, d.lat])[0];
            })
            .attr("y", function(d){
                return projection([d.lon, d.lat])[1];
            })
            .style("fill", "black")
            //iterate over each text svg
            .text(function(d){ 
              return d.place;
            });
          });
      });
  });
}

window.onload = init;

