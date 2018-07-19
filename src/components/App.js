import React, { Component } from 'react'
import * as api from '../api'
import Record from './Record'
import RecordForm from './RecordForm'
import AmountBox from './AmountBox'

class App extends Component{
    constructor(){
        super()

        this.state = {
            isLoading:false,
            error:null,
            data:[]
        }
    }
    componentDidMount(){
        api.getAll()
            .then(res => {
                this.setState({
                    isLoading:false,
                    error:null,
                    data:res.data
                })
            })
    }
    handleCreate(data){
        this.setState({
            data:[
                ...this.state.data,
                data
            ]
        })
    }
    handleEdit(data){
        let newState = this.state.data.map(item => {
            if(data.id !== item.id){
                return item
            }
            return {
                ...item,
                ...data
            }
        })

        this.setState({data:newState})
    }
    handleDelete(id){
        let newState = this.state.data.filter(item => id !== item.id)
        this.setState({data:newState})
    }
    receive() {
        let records = this.state.data.filter(item => +item.amount >= 0)
        return records.reduce((prev,curr)=>{
            return prev + (+curr.amount)
        },0)
    }
    out() {
        let records = this.state.data.filter(item => +item.amount < 0)
        return records.reduce((prev,curr)=>{
            return prev + (+curr.amount)
        },0)
    }
    amount() {
        return this.receive() + this.out()
    }
    render() {
        return (
            <div className="container" style={{padding:'20px'}}>
                <h1>Records</h1>
                <div className="row mb-3">
                    <AmountBox text="Receive" type="primary" amount={ this.receive()}/>
                    <AmountBox text="Out" type="danger" amount={ this.out()}/>
                    <AmountBox text="Amount" type="success" amount={ this.amount()}/>
                </div>
                <RecordForm handleCreateRecord={data => this.handleCreate(data)}/>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map(item =>
                                <Record
                                    key={ item.id }
                                    {...item}
                                    handleEditRecord={data => this.handleEdit(data)}
                                    handleDeleteRecord={id => this.handleDelete(id)}

                                />
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App