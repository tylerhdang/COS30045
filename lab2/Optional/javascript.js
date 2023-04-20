function init() {
    var w = 500;
    var h = 150;
    var barPadding = 1;

    d3.csv("pet_ownership.csv").then(function(data) {
        console.log(data);
        Pets_2019 = data;
        Pets_2021 = data;
        Animal = data;
        barChart(Pets_2019, svg1, "pets2019");
        barChart(Pets_2021, svg2, "pets2021");
        DrawText(Animal, svg3);
        DrawText(Animal, svg4);
    });

    var svg1 = d3.select("#chart1")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    var svg2 = d3.select("#chart2")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
            
    var svg3 = d3.select("#text-container")
                .append("svg")
                .attr("width", w)
                .attr("height", h - 120);

    var svg4 = d3.select("#text-container2")
                .append("svg")
                .attr("width", w)
                .attr("height", h - 120);
    
    function barChart(data, svg, column) {
        svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d, i){
            return i * (w/data.length);
        })
        .attr("y", function(d){
            return h - (d[column]*4);
        })
        .attr("width", (w/data.length)-barPadding)
        .attr("height", function(d){
            return d[column]*4;
        })
        .attr("fill", "blue");
    }

    function DrawText(data, svg) {
        svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(function(d) {
            return d.animal;
        })
        .attr("x", function(d, i) {
            return i * (w/data.length) + ((w/data.length)-barPadding)/2;
        })
        .attr("y", 20) // set the y position to 20 to center the text vertically
        .attr("text-anchor", "middle")
        .attr("font-size", "15px")
        .attr("fill", "green");
    }
}

window.onload = init;
