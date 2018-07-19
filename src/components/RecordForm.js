import React, { Component } from 'react'
import * as api from '../api'
import PropTypes from 'prop-types'

class RecordForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            date:'',
            title:'',
            amount:''
        }
    }
    create(e) {
        e.preventDefault()
        api.create(this.state)
            .then(res => {
                this.setState({
                    date:'',
                    title:'',
                    amount:''
                })
                this.props.handleCreateRecord(res.data)
            })
    }
    valid() {
        return this.state.date && this.state.title && this.state.amount
    }

    handleChange(e) {
        let name,obj
        name = e.target.name
        this.setState((
            obj = {},
            obj[name] = e.target.value,
            obj
        ))
    }
    render() {
        return (
            <form className="form-inline mb-3" onSubmit={(e) => this.create(e)}>
                <div className="form-group mr-2">
                    <label htmlFor="date" className="mr-1">Date</label>
                    <input type="text" className="form-control" id="date" name="date" onChange={(e) => this.handleChange(e)} value={ this.state.date } placeholder="2015-10-01"/>
                </div>
                <div className="form-group mr-2">
                    <label htmlFor="title" className="mr-1">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={(e) => this.handleChange(e)} value={ this.state.title } placeholder="John"/>
                </div>
                <div className="form-group mr-2">
                    <label htmlFor="amount" className="mr-1">Amount</label>
                    <input type="text" className="form-control" id="amount" name="amount" onChange={(e) => this.handleChange(e)} value={ this.state.amount } placeholder="155"/>
                </div>
                <button type="submit" className="btn btn-success" disabled={ !this.valid() }>Create</button>
            </form>
        )
    }

}

RecordForm.propTypes = {
    handleCreateRecord:PropTypes.func
}

export default RecordForm