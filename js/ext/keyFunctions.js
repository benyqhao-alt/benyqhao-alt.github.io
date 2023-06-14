let layerGroup
let stopFlag

// ------------------------------------------------------------
// Functions
// ------------------------------------------------------------
function clearMap() {
    try {
        map.removeLayer(layerGroup);
    } catch (err) {
        console.log(err)
    }
}

async function zoomHandler(e) {
    if (stopFlag) {
        return;
    } else {
        try {
            sidebar.open('home');
        } catch (err) { }

        stopFlag = true
    }
}

async function updateSidebar(suburb) {
    setTimeout(() => {
        document.getElementById("home-header").innerHTML = suburb
            + '<span class="leaflet-sidebar-close" onclick="sidebar.close();"><i class="fa fa-caret-left"></i></span>';
        // Call additional values
        fetchSuburbDetails(suburb);
    }, 325);
}

function overviewGraphs(data, divID, color) {
    // Sort the data based on value in descending order
    data.sort((a, b) => b.item_value - a.item_value);
    
    // Create an SVG element
    const svg = d3.select(divID)
        .append('svg')
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 960 1000");

    // Create scales for x and y axes
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.item_value)])
        .range([0, 600]);
    
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.item_title))
        .range([0, 1000])
        .padding(0.1);

    // Create bars
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", d => yScale(d.item_title))
        .attr("width", d => xScale(d.item_value))
        .attr("height", yScale.bandwidth())
        .attr("fill", color);

    // Add labels to the bars
    svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(d => (d.item_title + ' (' + d.item_value + ')'))
    .attr("x", d => xScale(d.item_value) + 5)
    .attr("y", d => yScale(d.item_title) + yScale.bandwidth() / 2)
    .attr("dy", "0.35em")
    .attr("fill", "black")
    .attr('font-size', '30px');

    svg.node();
    console.log(data)
}