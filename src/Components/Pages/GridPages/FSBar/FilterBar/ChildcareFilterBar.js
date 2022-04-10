// import './FilterBar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

//Change values to queries
const ChildcareFilterBar = ({sendQuery}) => {
    const [form, setForm] = useState({
        'AddressFilter': '', 
        'CountyFilter': '', 
        'DaysFilter': '', 
        'HoursFilterStarting': '',
        'HoursFilterEnding': '', 
        'AgesFilter': ''
    });

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    useEffect(() => {
        let isNotEmpty = form['AddressFilter'] !== '';
        let filterQuery = form['AddressFilter'];

        if ( isNotEmpty && form['CountyFilter'] !== '') {
            filterQuery += '&';
        }
        filterQuery += form['CountyFilter'];
        isNotEmpty = isNotEmpty || form['CountyFilter'] !== '';

        if (isNotEmpty && form['DaysFilter'] !== '') {
            filterQuery += '&';
        }
        filterQuery += form['DaysFilter'];
        isNotEmpty = isNotEmpty || form['DaysFilter'] !== '';

        if (isNotEmpty && form['HoursFilterStarting'] !== '') {
            filterQuery += '&';
        }
        filterQuery += form['HoursFilterStarting'];
        isNotEmpty = isNotEmpty || form['HoursFilterStartin'] !== '';

        if (isNotEmpty && form['HoursFilterEnding'] !== '') {
            filterQuery += '&';
        }
        filterQuery += form['HoursFilterEnding'];
        isNotEmpty = isNotEmpty || form['HoursFilterEnding'] !== '';

        if ( isNotEmpty && form['AgesFilter'] !== '') {
            filterQuery += '&';
        }
        filterQuery += form['AgesFilter'];
        
        sendQuery(filterQuery);
    }, [form])

    return (
        <div style={{ textAlign:'center' }}>
            <h3>Filters:</h3>
            <Form>
                <Row className="g-3 justify-content-center" xs='auto'>
                    <Form.Group controlId='AddressFilter' as={Col}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Find center near'
                            className='filter_text'
                            // From https://stackoverflow.com/questions/34223558/enter-key-event-handler-on-react-bootstrap-input-component
                            onKeyPress={e => {
                                if (e.key === "Enter") {
                                    setField('AddressFilter', e.target.value);
                                }
                            }}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='CountyFilter' as={Col}>
                        <Form.Label>County</Form.Label>
                        <Form.Select
                            className='filter_select'
                            onChange={e => setField('CountyFilter', e.target.value)}
                        >
                            <option value=''>Select County</option>
                            <option value='Bastrop'>Bastrop</option>
                            <option value='Caldwell'>Caldwell</option>
                            <option value='Hays'>Hays</option>
                            <option value='Travis'>Travis</option>
                            <option value='Williamson'>Williamson</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId='DaysFilter' as={Col}>
                        <Form.Label>Days of Operation</Form.Label>
                        <Form.Select
                            className='filter_select'
                            onChange={e => setField('DaysFilter', e.target.value)}
                        >
                            <option value=''>Select Days</option>
                            <option value='Weekdays Only'>Weekdays Only</option>
                            <option value='Full Week'>Full Week</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId='HoursFilter' as={Col}>
                        <Form.Label>Hours of Operation</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control 
                                    type='text'
                                    placeholder='Starting'
                                    className='filter_text'
                                    // From https://stackoverflow.com/questions/34223558/enter-key-event-handler-on-react-bootstrap-input-component
                                    onKeyPress={e => {
                                        if (e.key === "Enter") {
                                            setField('HoursFilterStarting', e.target.value);
                                        }
                                    }}
                                />
                            </Col>
                            <Col>
                                <Form.Control 
                                    type='text'
                                    placeholder='Ending'
                                    className='filter_text'
                                    // From https://stackoverflow.com/questions/34223558/enter-key-event-handler-on-react-bootstrap-input-component
                                    onKeyPress={e => {
                                        if (e.key === "Enter") {
                                            setField('HoursFilterEnding', e.target.value);
                                        }
                                    }}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId='AgesFilter' as={Col}>
                        <Form.Label>Age Group</Form.Label>
                        <Form.Select 
                            className='filter_select'
                            onChange={e => setField('AgesFilter', e.target.value)}
                        >
                            <option value=''>Select Age Group</option>
                            <option value='Infant'>Infant</option>
                            <option value='Todler'>Todler</option>
                            <option value='Pre-Kindergarten'>Pre-Kindergarten</option>
                            <option value='School'>School</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
            </Form>
        </div>
    );
}

export default ChildcareFilterBar;