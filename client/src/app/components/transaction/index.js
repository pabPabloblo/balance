import React, { useState } from 'react';
import { Card, Collapse, Button } from 'react-bootstrap';

const Transaction =  (props) => {
    const [open, setOpen] = useState(false);

    const trans = props.transaction;

    return (
        <Card className={trans.type} key={trans.id}>
            <Card.Body className="remove-decoration" as={Button} variant="link" onClick={() => setOpen(!open)} aria-controls="example-collapse-text"
                aria-expanded={open} >
                <label>Type: {trans.type} </label><br />
                <label>Amount: ${trans.amount} </label>
                <Collapse className="class" in={open}>
                    <div>
                        <label>Id: {trans.id} </label><br />
                        <label>Effective date: {trans.effectiveDate} </label>
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    )
}

export default Transaction;