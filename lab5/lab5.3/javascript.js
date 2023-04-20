function init(){

    var w = 500;
    var h = 100;
    var MaxValue = 25;
    var dataset = [14, 5, 26, 23, 9, 20, 25, 29, 15];

    //ordinal data
    var xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length))
                    .rangeRound([0,w])
                    .paddingInner(0.05);
    //quantitive data
    var yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset)])
                    .range([h, 0]); 

    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
    
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i){
            return xScale(i); //change the amounts of data relative to the dataset
        })
        .attr("y", function(d){
            return yScale(d);
        })
        .attr("width", xScale.bandwidth()) //change the space relative to the dataset
        .attr("height", function(d){
            return h - yScale(d);
        })
        .attr("fill", "lightblue"); // add color to bars 

    
    d3.select("#ButtonZero")
        .on("click", function(){
            UpdateAdd()
        });

    d3.select("#FirstButton")
        .on("click", function(){
            
            UpdateRemove()
        });

    function UpdateAdd() {
        var NewNumber = Math.floor(Math.random()* MaxValue);
        dataset.push(NewNumber);

        xScale.domain(d3.range(dataset.length));

        var bars = svg.selectAll("rect")
                        .data(dataset)
                        bars.enter()
                        .append("rect")
                        .attr("x", w)
                        .attr("y", function(d) {
                            return h - yScale(d);
                        })
                        .merge(bars)
                        .transition()
                        .duration(500)
                        .attr("x", function(d, i){
                                return xScale(i); //change the amounts of data relative to the dataset
                        })
                        .attr("y", function(d){
                                return yScale(d);
                        })
                        .attr("width", xScale.bandwidth()) //change the space relative to the dataset
                        .attr("height", function(d){
                                return h - yScale(d);
                        })
                        .attr("fill", "lightblue"); // add color to bars 
    }

    function UpdateRemove() {
        dataset.shift();
        var bars = svg.selectAll("rect")
                        .data(dataset)
                        bars.exit()
                        .transition()
                        .duration(500)
                        .attr("x", w)
                        .remove();
    }
}

window.onload = init;