import React from 'react';
import { Card, Button } from 'react-bootstrap';
import List from '../../components/list'
import { defaultPageSize, listTitle } from '../../../constants';
import Pager from  '../../components/pager'
import {getData} from '../../utils/transactions-client';


class Balance extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            page: 1,
            totalPages: 0,
            pagedTransactions: []
        };
        this.onRefresh = this.onRefresh.bind(this);
        this.onPageChangeHandler = this.onPageChangeHandler.bind(this);
    }

    componentDidMount() {
        this.setData();
    }

    /**@description Retrieves data and updates pagedData
     */
    setData() {
        getData().then(data =>
            this.setState(state => {
                return { ...state, ...data, pagedTransactions: this.getPagedData(state.page, data.transactions) };
            }));
    }

    /**@description Updates state when
     * transactions data gets a refresh request
     */
    onRefresh() {
        this.setData();
    }

    /**@description calculates the new page of data
     */
    getPagedData(page, transactions) {
        return transactions.slice((page - 1) * defaultPageSize, (page * defaultPageSize));
    }

    onPageChangeHandler(page) {
        this.setState(state => {
            return { ...state, page, pagedTransactions: this.getPagedData(page, state.transactions) };
        });

    }

    render() {
        return (
            <Card>
                <Card.Header className="shadow font-italic sticky-top badge-dark py-0" >
                    <label>Your account's Balance:</label><br />
                    ${this.state.balance}
                    <Button className="float-right" onClick={() => this.onRefresh()}>
                    Refresh!
                    </Button>
                </Card.Header>
                <Card.Body className="back-balance">
                    <List title={listTitle} transactions={this.state.pagedTransactions}>
                    </List>
                </Card.Body>
                <Card.Footer className="bg-secondary fixed-bottom py-0">
                    <Pager totalPages={this.state.totalPages}
                        page={this.state.page}
                        onPageChangeHandler={this.onPageChangeHandler}
                    ></Pager>
                </Card.Footer>
            </Card>
        );

    }
}

export default Balance;