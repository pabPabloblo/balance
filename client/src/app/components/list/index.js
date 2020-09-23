import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Transaction from '../transaction';


const List = (props) => {
    return (
        <Container className="pb-5" >
            <Row>
                <Col className="float-left p-0 font-italic">
                    <h1>{props.title}</h1>
                    <br />
                </Col>
            </Row>
            <Row>
               
            </Row>
            <Row>
                <Col >
                    {props.transactions.map((transaction) =>
                        (
                            <Transaction key={transaction.id} transaction={transaction} ></Transaction>
                        )
                    )
                    }
                </Col>
            </Row>
        </Container>
    )
};

export default List;