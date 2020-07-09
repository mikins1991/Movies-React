import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import './showMore.css';

const ShowMore = (props) => {
    const [ calcPage, setCalcPage ] = useState(2);

    if (!props.total || props.total <= 10) {
        return null;
    }

    const showNext = (e) => {
        e.preventDefault();
        setCalcPage((prevPage) => prevPage + 1);
        changeProps(calcPage);
    };
    const changeProps = (calc) => {
        props.next(calc);
    };

    return (
        <div className='show-more'>
            <Button className='show-more-button' type='submit' variant='danger' onClick={showNext}>
                Show more
            </Button>
        </div>
    );
};

export default ShowMore;
