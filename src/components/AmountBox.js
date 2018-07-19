import React from 'react'

const AmountBox =  ({text, type, amount}) => {
    return (
        <div className="col-sm-4">
            <div className="card text-center">
                <div className={`card-header bg-${type} text-white`}>{ text }</div>
                <div className="card-body">${ amount }</div>
            </div>
        </div>
    )
}

export default AmountBox