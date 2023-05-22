  function init() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const range = [10, 1000, 5000, 10000, 20000, 100000, 500000, 1000000];
    const color = d3.scaleThreshold()
      .domain(range)
      .range(d3.schemeBlues[8]);

    var projection = d3.geoMercator()
      .center([0, 0])
      .translate([w / 2, h / 2])
      .scale(120);

    var path = d3.geoPath().projection(projection);

    var svg = d3.select("#chart")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("fill", "#cccccc");
    


    var zoomLevel = 1;
    var maxZoom = 8;
    var minZoom = 0;
    var current = 1996;

    // Create the legends
    var legendData = [0, 25000, 100000, 500000, 1000000];
    
    var legendsContainer = d3.select("#legends");

    var legendSize = 20; // Size of each legend square

    var legends = legendsContainer
      .selectAll(".legend")
      .data(legendData)
      .enter()
      .append("div")
      .attr("class", "legend");

    legends
      .append("div")
      .style("width", legendSize + "px")
      .style("height", legendSize + "px")
      .style("background-color", function (d) {
        return color(d);
      });

    legends
      .append("span")
      .text(function (d, i) {
        if (i === 0) {
          return "< " + legendData[i + 1];
        } else if (i === legendData.length - 1) {
          return "> " + legendData[i];
        } else {
          return legendData[i] + " - " + legendData[i + 1];
        }
      });
    
    d3.csv("data/AUS.csv", function (d) {
      return {
        Countryofbirth: d.Countryofbirth,
        year: +d[current]
      };
    }).then(function (data) {
      d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function (json) {
        for (var i = 0; i < data.length; i++) {
          var dataCountryofbirth = data[i].Countryofbirth;
          var dataValue = parseFloat(data[i].year);
          for (var j = 0; j < json.features.length; j++) {
            var jsonCountryofbirth = json.features[j].properties.name;
            if (dataCountryofbirth === jsonCountryofbirth) {
              json.features[j].properties.year = dataValue;
              break;
            }
          }
        } 


    svg.selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", function (d) {
      return color(d.properties.year);
    })
    .style("stroke", function (d) {
      return d.properties.name === "Australia" ? "red" : "black";
    })
    .style("stroke-width", function (d) {
      return d.properties.name === "Australia" ? "2" : "0.4";
    })
    .on("mouseover", function (d) {
      d3.select(this)
        .transition()
        .duration(100)
        .style("fill", "#ffffaa");

       d3.select("#tooltip")
        .style("opacity", 1)
        .html("<strong>" + d.properties.name + "</strong><br/>" + d.properties.year)
        .style("left", (d3.event.pageX + 10) + "px")
        .style("top", (d3.event.pageY - 10) + "px");
    })
    .on("mouseout", function (d) {
      d3.select(this)
        .transition()
        .duration(100)
        .style("fill", function (d) {
          return color(d.properties.year);
        });

      d3.select("#tooltip")
        .style("opacity", 0);

    });

        d3.select("#zoomin")
          .on("click", function () {
            if (zoomLevel < maxZoom) {
              zoomLevel++;
              updateZoom();
            }
          });

        d3.select("#zoomout")
          .on("click", function () {
            if (zoomLevel > minZoom) {
              zoomLevel--;
              updateZoom();
            }
          });

        d3.select("#slider")
          .on("input", function () {
            current = this.value;
            updateYear();
          });

        function updateZoom() {
          var scaleFactor = Math.pow(1.2, zoomLevel);
          projection.scale(scaleFactor * 120);
          svg.selectAll("path")
            .attr("d", path);
        }

        function updateYear() {
          d3.csv("data/AUS.csv", function (d) {
            return {
              Countryofbirth: d.Countryofbirth,
              year: +d[current]
            };
          }).then(function (data) {
            for (var i = 0; i < data.length; i++) {
              var dataCountryofbirth = data[i].Countryofbirth;
              var dataValue = parseFloat(data[i].year);
              for (var j = 0; j < json.features.length; j++) {
                var jsonCountryofbirth = json.features[j].properties.name;
                if (dataCountryofbirth === jsonCountryofbirth) {
                  json.features[j].properties.year = dataValue;
                  break;
                }
              }
            }

            svg.selectAll("path")
              .style("fill", function (d) {
                return color(d.properties.year);
              });
          });
        }
      });
    });
  }

  window.onload = init;
