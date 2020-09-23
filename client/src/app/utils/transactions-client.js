
import { defaultPageSize, apiBaseUrl, enviroments } from '../../constants';
const baseUrl = process.env.NODE_ENV === enviroments.development ? apiBaseUrl : "";


/**@description Retrieves transactions from
 *     the serverside API
 * @returns {Promise} a promise that resolves to an object containing
 *  a collection named transactions and a number numbed balance and the number total pages 
 */
const getData = () => {
    return new Promise((resolve) => {
    fetch(`${process.env.BASE_URL || baseUrl}/api/transaction`)
        .then(transactionsData => transactionsData.json())
        .then(transactionsData => {        

            fetch(`${process.env.BASE_URL || baseUrl}/api/`)
            .then(balanceData => balanceData.json())
            .then(balanceData => {
                const totalPages =  Math.ceil(transactionsData.transactions.length / defaultPageSize);
                resolve({ ...transactionsData, balance: balanceData.balance.toFixed(2) , ...{ totalPages } });
            }

            );
        }
        );
    });
}


export {getData};
