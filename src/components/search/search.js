import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const Search = (props) => {
    const [ searchValue, setSearchValue ] = useState('');
    const [ disabledButton, setDisabledButton ] = useState(false);

    const handleSearchInputChanges = (e) => {
        if (e.target.value.length > 1) {
            setDisabledButton(true);
        } else {
            setDisabledButton(false);
        }
        setSearchValue(e.target.value);
    };

    const resetInputField = () => {
        setSearchValue('');
    };

    const changeSearch = (e) => {
        const page = 1;
        e.preventDefault();
        props.search(searchValue, page);
        resetInputField();
    };

    return (
        <div className='container'>
            <div className='search-panel' className='row justify-content-center my-4'>
                <div className='col-6'>
                    <InputGroup className='' value={searchValue} onChange={handleSearchInputChanges} type='text'>
                        <FormControl aria-describedby='basic-addon2' placeholder='let&#39;s find a movie' />
                        <InputGroup.Append>
                            <Button onClick={changeSearch} type='submit' variant='danger' disabled={!disabledButton}>
                                SEARCH
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            </div>
        </div>
    );
};

export default Search;
