import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as api from '../api'

class Record extends Component{
    constructor(props){
        super(props)
        this.state = {
            edit:false
        }
    }

    toggleEdit(){
        this.setState({
            edit:!this.state.edit
        })
    }
    handleEdit(){
        let data = {
            date:this.refs.date.value,
            title:this.refs.title.value,
            amount:this.refs.amount.value
        }

        api.edit(this.props.id,data)
            .then(res => {
                this.toggleEdit()
                this.props.handleEditRecord(res.data)
            })

    }

    handleDelete() {
        api.deleteOne(this.props.id)
            .then(res => {
                this.props.handleDeleteRecord(res.data.id)
            })
    }

    render() {
        let recordComponent;
        if(this.state.edit){
            recordComponent = (
                <tr>
                    <td><input type="text" defaultValue={ this.props.date } ref="date"/></td>
                    <td><input type="text" defaultValue={ this.props.title } ref="title"/></td>
                    <td><input type="text" defaultValue={ this.props.amount } ref="amount"/></td>
                    <td>
                        <button type="button" className="btn btn-success mr-3" onClick={() => this.handleEdit()}>Confirm</button>
                        <button type="button" className="btn btn-warning" onClick={() => this.toggleEdit()}>Cancel</button>
                    </td>
                </tr>
            )
        }else{
            recordComponent = (
                <tr>
                    <td>{ this.props.date }</td>
                    <td>{ this.props.title }</td>
                    <td>{ this.props.amount }</td>
                    <td>
                        <button type="button" className="btn btn-primary mr-3" onClick={() => this.toggleEdit()}>Edit</button>
                        <button type="button" className="btn btn-danger" onClick={() => this.handleDelete()}>Delete</button>
                    </td>
                </tr>
            )
        }
        return recordComponent
    }
}

Record.propTypes = {
    id:PropTypes.string,
    date:PropTypes.string,
    title:PropTypes.string,
    amount:PropTypes.string,
    handleEditRecord:PropTypes.func,
    handleDeleteRecord:PropTypes.func
}

export default Record