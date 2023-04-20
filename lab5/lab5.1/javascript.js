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

    
    
    d3.select("button")
        .on("click", function(){
            
            something()
        
        });
    
    function something() {
        var NumValues = dataset.length;

        dataset = [];

        for (var i = 0; i < NumValues; i++) {
            var NewNumber = Math.floor(Math.random()* MaxValue);
            dataset.push(NewNumber);
        }
        
        svg.selectAll("rect")
            .data(dataset)
            .attr("y", function(d){
                return h - yScale(d);
            })
            .attr("height", function(d){
                return yScale(d);
            })
            .attr("fill", "lightblue");
    }
}
window.onload = init;
