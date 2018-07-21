import React, { Component } from 'react'
import moment from 'moment'

class DataList extends Component{

	constructor(props){
		super(props)
		this.state = {
			url: 'http://localhost:5000/api',
			accordion: false,
			input: false,
			surgeFactor: '',
			totalPrice: ''
		}
	}

	handleClick = () => {
		this.setState({
			accordion: !this.state.accordion
		})
	}

	toggleInput = () => {
		this.setState({
			input: !this.state.input
		})
	}

	calculatePrice = (surgeFactor) => {

		const { url } = this.state
		const { data,price } = this.props
		const message = {
			surgeFactor,
			price: data[price]
		}

		fetch(url+'/price', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(message)})
			.then(res => res.json())
			.then(data => {
				this.setState({
					totalPrice: data.price
				})
			})
			.catch(err => {
				console.log(err)
			})
	}

	handleSubmit = (e) => {
		if(e.key === 'Enter'){
			this.toggleInput()
			this.setState({
				[e.target.name]: e.target.value
			},this.calculatePrice(e.target.value))
		}
	}

	render(){
		const { data,price } = this.props
		const { surgeFactor, totalPrice } = this.state
		const accordionToggle = this.state.accordion ? 'active' : ''
		const inputToggle = this.state.input ? 'input-active' : ''

		return(
			<React.Fragment>
				<tr>
		    		<td><span onClick={this.handleClick}> > </span>{data.city}</td>
		    		<td>{data[price]}</td>
		    		<td onDoubleClick={this.toggleInput}>
		    			<p className={`${!inputToggle}`}>{surgeFactor}</p>
		    			<input name="surgeFactor" className={`editable ${inputToggle}`} onKeyPress={this.handleSubmit}/>
		    		</td>
		    		<td>{totalPrice}</td>
	    		</tr>
	    		<tr className={`accordion ${accordionToggle}`} >
	    			<td colSpan="4">
	    				<div className="description">
	    					{data.info}
	    					{moment().day('Sunday').week(data.week_num).year(data.year).format('MMM D, YYYY').toString()}
	    				</div>
	    			</td>
	    		</tr>
			</React.Fragment>
		)
	}

}

export default DataList