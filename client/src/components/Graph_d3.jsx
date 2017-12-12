import React from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';


class Graph extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data : {
        username: 'jacob',
        budget: 1000,
        onetime: [
          {expense: 'chipotle', amount: 14, date: '20171110', category: 'food'},
          {expense: 'Hmart', amount: 129, date: '20171111', category: 'groceries'},
          {expense: 'AMC Ragnarok', amount: 20, date: '20171113', category: 'entertainment'},
          {expense: 'autobody shop', amount: 180, date: '20171114', category: 'car'},
          {expense: 'TGIF', amount: 18.25, date: '20171115', category: 'food'},
          {expense: 'computer monitor', amount: 220, date: '20171116', category: 'electronics'},
          {expense: 'outback steakhouse', amount: 48, date: '20171119', category: 'food'},
          {expense: 'deck painting', amount: 180, date: '20171120', category: 'painting'},
          {expense: 'beer', amount: 17, date: '20171122', category: 'drink'},
          {expense: 'basketball ticket', amount: 200, date:'20171123', category: 'entertainment'},
          {expense: 'gas', amount: 47, date: '20171128', category: 'transportation'},
        ],
        recurring: []
      }
    }
  }

  render(){
    const width = 800;
    const height = 200;
    const margin = { top: 20, bottom: 70, left: 60, right: 300 };

    // console.log('this: ', this.state.data.onetime)
    const onetimeData = this.state.data.onetime;
    onetimeData.forEach( d => {
      d.date = d3.timeParse("%Y%m%d")(d.date);
      d.date = new Date(d.date);
    })
    // let dateform = this.state.data.onetime.map(function(element) {
    //   return new Date(element.date)
    // })
    // console.log(onetimeData)
    let xExtent = d3.extent(onetimeData, d => d.date)
    // console.log(xExtent)
    // const budget = this.state.data.budget;
    let xScale = d3.scaleTime()
      .domain(xExtent)
      .range([margin.left, width - margin.right])

    const yMax = d3.max(onetimeData, d => d.amount);
    var yScale = d3.scaleLinear()
        .domain([0, yMax])
        .range([height - margin.bottom, margin.top]);
    var heightScale = d3.scaleLinear()
        .domain([0, yMax])
        .range([0, height - margin.top - margin.bottom]);

    let line = d3.line()
      .x(function(d) { return xScale(d.date)})
      .y(function(d) { return yScale(d.amount)})

    let div = new ReactFauxDOM.createElement('div');
    // let svg = d3.select('div').append('svg');
    let svg = d3.select('div').replaceWith('svg')

    // let svg = d3.select('svg');

    // let rect = svg.selectAll('rect')
    //   .data(onetimeData)
    //   .enter().append('rect')
    //   .attr('width', 2)
    //   .attr('height', function(d) {
    //     return heightScale(d.amount);
    //   })
    //   .attr('x', function(d) {return xScale(d.date)})
    //   .attr('y', function(d) {return yScale(d.amount)})
    //   .attr('fill', 'blue')
    //   .attr('stroke', 'white');

    svg.append('path')
      .attr('d', line(onetimeData))
      .attr('fill', 'none')
      .attr('stroke', 'blue')

    let xAxis = d3.axisBottom()
      .scale(xScale)
        .tickFormat(d => d3.timeFormat('%m/%d/%Y')(d))
      .tickFormat(d3.timeFormat('%m/%d/%Y'));
    let yAxis = d3.axisLeft()
      .scale(yScale);

    svg.append('g')
      .attr('transform', 'translate(' + [0, height - margin.bottom] + ')')
      .call(xAxis);
    svg.append('g')
        .attr('transform', 'translate(' + [margin.left, 0] + ')')
        .call(yAxis);

    return div.toReact()
    // return(
    //   <div>
    //     D3 graph will go here
    //   </div>
    // )
  }
}

export default Graph;