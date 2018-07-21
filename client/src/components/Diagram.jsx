import React, { Component } from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

class Diagram extends Component {

	constructor(props){
		super(props)
	}

	render(){

		const { data } = this.props

		return(
			<BarChart width={600} height={300} data={data}
	            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
		       	<CartesianGrid strokeDasharray="3 3"/>
		       	<XAxis dataKey="city"/>
		       	<YAxis/>
		       	<Tooltip/>
		       	<Legend />
		       	<Bar dataKey="total_price" fill="#8884d8" />
	      	</BarChart>
		)
	}
}

export default Diagram