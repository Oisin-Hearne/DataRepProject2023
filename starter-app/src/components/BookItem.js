//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

//Displays the book passed to this component in a nice card.
//DIsplays the thumbnail, title and authors.
 function BookItem(props) {

    return (
        <div style={{ marginTop: "20px", marginLeft: "20px" }}>
            <Card style={{ width: '250px' }}>
                <Card.Img variant="top" src={props.b.thumbnailUrl} style={{ height: "250px", width: "250px" }} />
                <Card.Body>
                    <Card.Title>{props.b.title}</Card.Title>
                    <Card.Text>
                        <ul>
                            { //Makes the authors array display in a list.
                                props.b.authors.map((author) => (<li>{author}</li>))}
                        </ul>
                    </Card.Text>
                    <Link to={"/edit/" + props.b._id} className="btn btn-primary">Edit</Link>
                    
                    <Button variant="danger" onClick={(e) => {
                        //Sends a delete request to the server with the ID of the current book.
                        axios.delete('http://localhost:4000/api/books/deleteID/' + props.b._id)
                            .then((response) => {
                                //Refresh Read
                                let r = props.reload();
                            }).catch(function (error) {
                                console.log(error);
                            })
                    }}>Delete</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default BookItem;