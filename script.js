// Set up the SVG canvas
const svg = d3.select("#network")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

const nodes = [
    { id: 1, x: 100, y: 100 },
    { id: 2, x: 300, y: 100 }
];

const links = [
    { source: 1, target: 2 }
];

// Create lines for the links
const link = svg.selectAll(".link")
    .data(links)
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("stroke", "black")
    .attr("stroke-width", 2);

// Create groups for the nodes
const node = svg.selectAll(".node")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x},${d.y})`)
    .call(d3.drag()
        .on("drag", (event, d) => {
            d.x = event.x;
            d.y = event.y;
            d3.select(event.sourceEvent.target.parentNode)
                .attr("transform", `translate(${d.x},${d.y})`);
            updateLinks();
        })
    );

// Append rectangles to the nodes
node.append("rect")
    .attr("width", 50)
    .attr("height", 50)
    .attr("fill", "#3498db");

// Append text to the nodes
node.append("text")
    .attr("x", 25)
    .attr("y", 25)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text(d => `Node ${d.id}`);

// Function to update link positions
function updateLinks() {
    link.attr("x1", d => nodes.find(n => n.id === d.source).x + 25)
        .attr("y1", d => nodes.find(n => n.id === d.source).y + 25)
        .attr("x2", d => nodes.find(n => n.id === d.target).x + 25)
        .attr("y2", d => nodes.find(n => n.id === d.target).y + 25);
}

// Initial link positions
updateLinks();
