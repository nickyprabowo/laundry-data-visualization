import React, { Component } from 'react'
import DataList from './DataList'
import Diagram from './Diagram'

class Container extends Component{
	constructor(props){
		super(props)
		this.state = {
			url: 'http://localhost:5000/api',
			data: [],
			options: [
				{key: 0, value: 'regular_price', text: 'Regular Price'},
				{key: 1, value: 'express_price', text: 'Express Price'},
				{key: 2, value: 'same_day_price', text: 'Same Day Price'},
			],
			basePrice: 'regular_price',
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
		const { data } = this.state
		const result = data.map(item => {
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
		const { data, options, basePrice, chartData, url } = this.state
		return(
			<div className="container">
				<div className="diagram-wrapper">
					<h2>Laundry Prices</h2>
					<Diagram data={chartData}/>
				</div>
				<div className="table-wrapper">
					<div className="info">
						<p>Double Click on Weight column to edit</p>
					</div>
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
							    <th>Weight</th>
							    <th>Total Price</th>
							</tr>
						</thead>
					 	<tbody>
					 		{data.map( (item,index) => {
						    	return (
						    		<DataList 
							    		key={index} 
							    		data={item} 
							    		price={basePrice} 
							    		url={url}
							    		onChart={this.drawChart}
						    		/>
						    	)
						    } )}
					 	</tbody>
					</table>
				</div>
			</div>
		)
	}
}

export default Container