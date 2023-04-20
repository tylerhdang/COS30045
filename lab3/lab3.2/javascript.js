function init()
{
    var w = 700; // subtracting 40px for padding
    var h = 400; // subtracting 20px for padding
    var padding = 50;
    var dataset = [
                    [5, 20],
                    [480, 90],
                    [250, 50],
                    [100, 33],
                    [330, 95],
                    [410, 12],
                    [475, 44],
                    [25, 67],
                    [85, 21],
                    [220, 88],
                            ];
    
    var xScale = d3.scaleLinear()
                .domain([d3.min(dataset, function(d){
                    return d[0];
                }),
                d3.max(dataset, function(d){
                    return d[0];
                })])
                .range([padding, w - padding]);

    var yScale = d3.scaleLinear()
                .domain([d3.min(dataset, function(d){
                    return d[1];
                }),
                d3.max(dataset, function(d){
                    return d[1];
                })])
                .range([h - padding, padding]);
    var xAxis = d3.axisBottom().ticks(5).scale(xScale);
    var yAxis = d3.axisLeft().ticks(5).scale(yScale);

    var svg = d3.select("#scatter-pot")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
    
    
    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d, i){
            return xScale(d[0]); //assign the cx to the second value of the 2d array
        })
        .attr("cy", function(d){
            return yScale(d[1]); //assign cy to the second value of the 2d array
        })
        .attr("r", 5) //the radius
        .attr("fill", function(d){
            if (d[0] === 480 && d[1] === 90) {
                return "red"; //for the highest value
            } else {
                return "grey";
            }
        });

    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d){
            return d[0] + "," + d[1];
        })
        .attr("x", function(d){
            return xScale(d[0]);
        })
        .attr("y", function(d){
            return yScale(d[1]) - 10; // adjust the y position to center the text vertically
        })
        .attr("text-anchor", "left") // center the text horizontally
        .attr("fill", "green");
    
    svg.append("g") //Append the x and y axis to the SVG element as groups
        .attr("transform", "translate(0, "+ (h - padding + 10) +")") //translating them to the appropriate positions
        .call(xAxis);
    
    svg.append("g")
        .attr("transform", "translate(" + (padding) + ", 10)")
        .call(yAxis);
        
}
window.onload = init;