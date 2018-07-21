import React, { Component } from 'react'
import DataList from './DataList'
import Diagram from './Diagram'

class Table extends Component{
	constructor(props){
		super(props)
		this.state = {
			url: 'http://localhost:5000/api',
			data: [],
			options: [
				{key: 0, value: 'base_price_ride', text: 'Base Price Ride'},
				{key: 1, value: 'base_price_car', text: 'Base Price Car'},
				{key: 2, value: 'base_price_food', text: 'Base Price Food'},
			],
			basePrice: 'base_price_ride',
			chartData: []
		}
	}

	componentDidMount = () => {
		const { url } = this.state
		fetch(url+'/report', {method: 'GET', headers: {'Content-Type': 'application/json'}})
			.then(res => res.json())
			.then(data => {
				this.setState({
					data: data,
				}, () => this.buildChartData())
			})
			.catch(err => {
				console.log(err)
			})
	}

	buildChartData = () => {
		const result = this.state.data.map(item => {
			const bar = {
				city: item.city,
				total_price: ''
			}

			return bar
		})

		this.setState({
			chartData: result
		})
	}

	handleChange = (e) => {
		this.setState({
			basePrice: e.target.value
		})
	}

	drawChart = (msg) => {
		const { chartData } = this.state
		const index = chartData.findIndex(data => data.city === msg.city)

		this.setState({
			chartData: [
			   ...chartData.slice(0,index),
			   msg,
			   ...chartData.slice(index+1)
			]
		})
	}

	render(){
		const { data, options, basePrice, chartData } = this.state
		return(
			<div className="container">
				<div className="diagram-wrapper">
					<Diagram data={chartData}/>
				</div>
				<div className="table-wrapper">
					<table>
						<thead>
							<tr>
							    <th>City</th>
							    <th>
							    	<select value={basePrice} onChange={this.handleChange}>
							    		{options.map((option,index) => {
							    			return (
							    				<option key={index} value={option.value}>{option.text}</option>
							    			)
							    		})}
							        </select>
							    </th>
							    <th>Surge Factor</th>
							    <th>Total Price</th>
							</tr>
						</thead>
					 	<tbody>
					 		{data.map( (item,index) => {
						    	return (
						    		<DataList key={index} data={item} price={basePrice} onChart={this.drawChart}/>
						    	)
						    } )}
					 	</tbody>
					</table>
				</div>
			</div>
		)
	}
}

export default Table