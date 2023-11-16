import React from 'react'
//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function NewCard({src,title,summary,news_site}) {
  return (
    <>
    <Card style={{ width: '18rem',border:'none' }}>
        <Card.Img variant="top" src={src} style={{height:'200px'}}/>
        <p style={{textTransform:'uppercase',fontSize:'12px'}}>{news_site}</p>
        <Card.Body style={{padding:'0px'}}>
            <Card.Title>{title}</Card.Title>
            <Card.Text style={{ maxHeight: '100px', overflow: 'hidden'}}>
                {summary}
            </Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
    </Card>
    </>
  )
}

export default NewCard