import React, { Component } from 'react'
import moment from 'moment'

class DataList extends Component{

	constructor(props){
		super(props)
		this.state = {
			accordion: false,
			input: false
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

	handleSubmit = (e) => {
		if(e.key === 'Enter'){
			this.toggleInput()
		}
	}

	render(){
		const {data,price} = this.props
		const accordionToggle = this.state.accordion ? 'active' : ''
		const inputToggle = this.state.input ? 'input-active' : ''

		return(
			<React.Fragment>
				<tr>
		    		<td><span onClick={this.handleClick}> > </span>{data.city}</td>
		    		<td>{data[price]}</td>
		    		<td onDoubleClick={this.toggleInput}>
		    			<input name="surgePrice" className={`editable ${inputToggle}`} onKeyPress={this.handleSubmit}/>
		    		</td>
		    		<td></td>
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