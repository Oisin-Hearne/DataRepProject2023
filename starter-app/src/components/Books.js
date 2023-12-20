import BookItem from "./BookItem";

//Reads the bookData array and converts it to a map.
//For every book, also calls the BookItem component
//to display it.
function Books(props) {
    return props.myBooks.map(
        (book)=>{
            return <BookItem b={book} reload={()=>{props.Reload()}}></BookItem>
        }
    );
}
export default Books;