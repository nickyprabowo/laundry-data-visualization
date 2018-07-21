import React, { Component } from 'react'

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
			basePrice: 'base_price_ride'
		}
	}

	componentDidMount = () => {
		const { url } = this.state
		fetch(url+'/report', {method: 'GET', headers: {'Content-Type': 'application/json'}})
			.then(res => res.json())
			.then(data => {
				this.setState({
					data: data
				})
			})
			.catch(err => {
				console.log(err)
			})
	}

	handleChange = (e) => {
		this.setState({
			basePrice: e.target.value
		})
	}

	render(){
		const { data, options, basePrice } = this.state
		return(
			<div>
				<h1>Tableh</h1>
				<table>
				  <tr>
				    <th>City</th>
				    <th>
				    	<select value={basePrice} onChange={this.handleChange}>
				    		{options.map(option => {
				    			return (
				    				<option value={option.value}>{option.text}</option>
				    			)
				    		})}
				        </select>
				    </th>
				    <th>Surge Factor</th>
				    <th>Total Price</th>
				  </tr>
				  
				    {data.map( item => {
				    	return (
				    		<tr>
					    		<td>{item.city}</td>
					    		<td>{item[basePrice]}</td>
					    		<td></td>
					    		<td></td>
				    		</tr>
				    	)
				    } )}
				  
				</table>
			</div>
		)
	}
}

export default Table