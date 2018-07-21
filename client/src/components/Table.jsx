import React, { Component } from 'react'

class Table extends Component{
	render(){
		return(
			<div>
				<h1>Tableh</h1>
				<table>
				  <tr>
				    <th>City</th>
				    <th>Base Price</th>
				    <th>Surge Factor</th>
				    <th>Total Price</th>
				  </tr>
				  <tr>
				    <td>Alfreds Futterkiste</td>
				    <td>Maria Anders</td>
				    <td>Germany</td>
				  </tr>
				  <tr>
				    <td>Centro comercial Moctezuma</td>
				    <td>Francisco Chang</td>
				    <td>Mexico</td>
				  </tr>
				  <tr>
				    <td>Ernst Handel</td>
				    <td>Roland Mendel</td>
				    <td>Austria</td>
				  </tr>
				  <tr>
				    <td>Island Trading</td>
				    <td>Helen Bennett</td>
				    <td>UK</td>
				  </tr>
				  <tr>
				    <td>Laughing Bacchus Winecellars</td>
				    <td>Yoshi Tannamuri</td>
				    <td>Canada</td>
				  </tr>
				  <tr>
				    <td>Magazzini Alimentari Riuniti</td>
				    <td>Giovanni Rovelli</td>
				    <td>Italy</td>
				  </tr>
				</table>
			</div>
		)
	}
}

export default Table