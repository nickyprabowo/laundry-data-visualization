import React, { Component } from 'react'
import moment from 'moment'

class DataList extends Component{

	constructor(props){
		super(props)
		this.state = {
			accordion: false,
			input: false,
			weight: '',
			totalPrice: ''
		}
	}

	componentDidUpdate = (prevProps) => {
		if(this.props.price !== prevProps.price){
			this.calculatePrice(this.state.weight)
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

	calculatePrice = (weight) => {

		const { data, price, url } = this.props

		this.setState({
			totalPrice: weight * data[price]
		}, () => {
			this.props.onChart({
				city: data.city,
				total_price: weight * data[price]
			})
		})
		
	}

	handleWeightChange = e => {
		const target = e.target;
	    const value = target.value;
	    const name = target.name;

		this.setState({
			[name]: value 
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
		const { weight, totalPrice, accordion, input } = this.state
		const accordionToggle = accordion ? 'active' : ''
		const inputToggle = input ? 'input-active' : ''
		// convert week number and year to first day of the week
		const dateInfo = moment().day('Sunday').week(data.week_num).year(data.year).format('MMM D, YYYY').toString()

		return(
			<React.Fragment>
				<tr>
		    		<td>
		    			<span onClick={this.handleClick} style={{marginRight: '0.5em', cursor: 'pointer'}}>
		    			{accordion ?
		    				<i class="arrow down"></i>
		    				:
		    				<i class="arrow right"></i>
		    			}
		    			</span>{data.city}
		    		</td>
		    		<td className="centered">Rp {Number(data[price]).toLocaleString('id')}</td>
		    		<td onDoubleClick={this.toggleInput} className="centered">
		    			{!inputToggle ?
		    				<p>{weight}</p> :
		    				<input name="weight" onChange={this.handleWeightChange} value={weight} onKeyPress={this.handleSubmit}/>
		    			}
		    		</td>
		    		<td className="centered">Rp {totalPrice.toLocaleString('id')}</td>
	    		</tr>
	    		<tr className={`accordion ${accordionToggle}`} >
	    			<td colSpan="4">
	    				<div className="description">
	    					<p>{data.info}</p>
	    					<p className='date-info'>{dateInfo}</p>
	    				</div>
	    			</td>
	    		</tr>
			</React.Fragment>
		)
	}

}

export default DataList