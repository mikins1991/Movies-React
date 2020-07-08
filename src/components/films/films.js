import React from 'react';
import './films.css';
import Card from 'react-bootstrap/Card';

const defImg = 'https://www.nicepng.com/png/full/798-7980743_as-3d-no.png';

const Films = ({ movie }) => {
    const poster = movie.Poster === 'N/A' ? defImg : movie.Poster;
    return (
        <div className='film '>
            <Card>
                <Card.Img variant='top' style={{ height: '16rem' }} src={poster} />
                <Card.Body style={{ height: '5rem' }}>
                    <Card.Title className='text-dark'>{movie.Title}</Card.Title>
                    <Card.Text className='text-dark'>({movie.Year})</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Films;
