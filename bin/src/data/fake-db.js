/** Object to mock DB */
module.exports = {
    transactions: [        
        { amount: 50, id: 0, type: "credit", effectiveDate: new Date(Date.parse("1-1-2020")).toUTCString() },
        { amount: 10, id: 1, type: "debit", effectiveDate: new Date(Date.parse("1-1-2020")).toUTCString() }
    ],
    balance: 40
}

