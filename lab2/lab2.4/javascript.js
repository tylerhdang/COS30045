function init(){
    var w = 500;
    var h = 100;
    var barPadding = 1;

    d3.csv("Task_2.4_data.csv").then(function(data) {
        console.log(data);
        wombatSightings = data;
        barChart(wombatSightings);
    });

    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
    
    function barChart() {
        svg.selectAll("rect")
        .data(wombatSightings)
        .enter()
        .append("rect")
        .attr("x", function(d, i){
            return i * (w/wombatSightings.length); //change the amounts of data relative to the dataset
        })
        .attr("y", function(d){
            return h - (d.wombats*4); // invert y-axis to flip bars
        })
        .attr("width", (w/wombatSightings.length)-barPadding) //change the space relative to the dataset
        .attr("height", function(d){
            return d.wombats*4;
        })
        .attr("fill", function(d){
            if (d.wombats > 10) {
                return "darkblue";
            } else {
                return "lightblue";
            }
        }); // add color to bars
    }

    
}
window.onload = init;
