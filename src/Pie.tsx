import React,{useRef,useEffect} from "react";
import * as d3 from "d3";
import "./App.css"


type Datum = number|{valueOf():number};
type input = {
    array: number[],
    legend: string[]
}
const Pie = ({array,legend}:input) => {
    const svgRef = useRef<SVGSVGElement|null>(null);

    useEffect(() => {
        
        const w = 500;
        const h = 420;

        const svg = d3.select(svgRef.current)
                    .attr("width","500px")
                    .attr("height","420px")
                    .style("margin-top","80")
                    .style("overflow","visible")

        const g = svg.append("g")
                    .attr("transform","translate("+ w/2 +","+ (h/2+10) +")");

        const radius = Math.min(w,h)/2 - 15;

        const colorArr = ["#4daf4a","#377eb8","#ff7f00","#984ea3","#e41a1c","0000ff","#F0FFF0","#C0C0C0","DAA520","FFFF00","ADFF2F"];

        let pie = d3.pie();

        const path = d3.arc<d3.PieArcDatum<Datum>>()
                        .innerRadius(0)
                        .outerRadius(radius-15);

        const arcs = g.selectAll(".arc")
                        .data(pie(array))
                        .enter()
                        .append("g")
                        .attr("class","arc");

        arcs.append("path")
            .attr("d",path)
            .attr("fill",(d:any,i:any)=>colorArr[i]);

        svg.selectAll("mydots")
            .data(legend)
            .enter()
            .append("circle")
            .attr("cx",-40)
            .attr("cy", function(d:any,i:any){ return -80 + i*25 }) // -80 is where 1st dot appears, 25is the distance betn dots
            .attr("r",7)
            .style("fill",(d,i)=>colorArr[i]);

        svg.selectAll("mylabels")
            .data(legend)
            .enter()
            .append("text")
            .attr("x",-10)
            .attr("y", function(d:any,i:any){ return -80 + i*25 }) // -80 is where 1st dot appears, 25is the distance betn dots
            .style("fill",(d:any,i:any)=>colorArr[i])
            .text(function(d:any){ return d })
            .attr("text-anchor","left")
            .style("alignment-baseline","middle");

    }, [array,legend])
    


  return (
    <div className="pie">
        <svg ref={svgRef}/>
    </div>
  )
}

export default Pie;