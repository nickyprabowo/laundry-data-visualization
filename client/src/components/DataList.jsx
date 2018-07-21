import React, { Component } from 'react'
import moment from 'moment'

class DataList extends Component{

	constructor(props){
		super(props)
		this.state = {
			accordion: false,
			input: false,
			surgeFactor: '',
			totalPrice: ''
		}
	}

	componentDidUpdate = (prevProps) => {
		if(this.props.price !== prevProps.price){
			this.calculatePrice(this.state.surgeFactor)
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

		const { data, price, url } = this.props
		const message = {
			surgeFactor,
			price: data[price]
		}

		fetch(url+'/price', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(message)})
			.then(res => res.json())
			.then(result => {
				this.setState({
					totalPrice: result.price
				}, () => {
					this.props.onChart({
						city: data.city,
						total_price: result.price
					})
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
		const { surgeFactor, totalPrice, accordion, input } = this.state
		const accordionToggle = accordion ? 'active' : ''
		const inputToggle = input ? 'input-active' : ''
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
		    				<p>{surgeFactor}</p> :
		    				<input name="surgeFactor" onKeyPress={this.handleSubmit}/>
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