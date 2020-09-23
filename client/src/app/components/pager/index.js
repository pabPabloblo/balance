

import React from 'react';
import { Pagination } from 'react-bootstrap';
import {calculateStartAndEndPage} from '../../utils/paging-helper';

class Pager extends React.Component {

    /**@description Method that
     *  Method that renders page controls
     */
    getPaginationItems(startPage, endPage) {
        const pagingItems = [];
        //if the first pages do not show an elipisis and control to go back a page are shown
        if (startPage !== 1) {
            pagingItems.push(
                ...[<Pagination.Prev key="prev" onClick={() =>
                    this.props.onPageChangeHandler(this.props.page - 1)}>
                </Pagination.Prev>,

                <Pagination.Ellipsis key="first" onClick={() =>
                    this.props.onPageChangeHandler(1)}>
                </Pagination.Ellipsis>]);
        }

        //adds all visible page controls
        for (let page = startPage; page <= endPage; page++) {
            pagingItems.push(
                <Pagination.Item key={page} active={page === this.props.page} disabled={page === this.props.page} onClick={() =>
                    this.props.onPageChangeHandler(page)}>
                    {page}
                </Pagination.Item>
            )
        }

        //if the las pages do not show an elipisis and control to go forwar a page are shown
        if (endPage !== this.props.totalPages) {
            pagingItems.push(...[
                <Pagination.Ellipsis key="last" onClick={() =>
                    this.props.onPageChangeHandler(this.props.totalPages)}>
                </Pagination.Ellipsis>,
                <Pagination.Next key="next" onClick={() =>
                    this.props.onPageChangeHandler(this.props.page + 1)}>
                </Pagination.Next>]);
        }

        return pagingItems;
    }

    render() {

        const { startPage, endPage } = calculateStartAndEndPage(this.props.page, this.props.totalPages);
        const childrenItems = this.getPaginationItems(startPage, endPage);
        return (
            <Pagination>
                {childrenItems}
            </Pagination>);
    };
}

export default Pager;