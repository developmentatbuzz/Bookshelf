import react, {useState} from 'react'
import axios, { Axios } from 'axios'
export default function AddBook() {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const findBook = () => {
        setMessage("Loading");
        setLoading(true);
        let text = document.getElementById('search').value;
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${text}&maxResults=1`).then(data => {
            if(data.data.items){
                setLoading(false);
                setBook(data.data.items[0]);
                console.log(data.data.items[0]);
            }
            else{
                setMessage("No Results Found");
            }
        }).catch(error => {
            console.log(error);
            setMessage("No Results Found");
        })
    }
    const handleKeyDown = (event) => {
        //findBook();
        if (event.key === 'Enter') {
            findBook();
        }
    }
    const post = () => {

    }
    return (
        <div className="flex flex-col space-y-4">
            <div className="text-3xl font-bold text-gray-700">
                    Add Book
            </div>
            <div className="text-2xl text-gray-700">
                    Search By Title: 
            </div>
            <input type={"text"} id="search" placeholder="Search" className="w-auto p-2 border-2 border-gray-200 rounded-md shadow-sm" onKeyDown = {handleKeyDown}></input>
            <div>
                {loading ?
                    message === "Loading" ? <div>Loading</div> : <div>{message}</div>
                : 
                    <div className='flex flex-row space-x-4'>
                        {book.volumeInfo.imageLinks ? 
                        <img src={book.volumeInfo.imageLinks.thumbnail} className = "w-48 h-72 object-contain rounded-md shadow-md"/> 
                        :
                        <div className="flex-shrink-0 h-72 w-48 bg-gray-300 rounded-sm shadow-md flex flex-col items-center justify-center">
                            <div className="text-gray-500">No Image</div>
                        </div>
                        }
                    
                    <div>
                         <div className="text-3xl font-bold text-gray-700">
                         {book.volumeInfo.title}
                        </div>
                        <div className="text-xl text-gray-500 font-bold">
                        {book.volumeInfo.authors ? book.volumeInfo.authors[0] : "No Author"}
                        </div>
                        <div className="py-2">
                            {book.volumeInfo.description ?
                                book.volumeInfo.description.slice(0,500) + ' ...'
                            :
                                "No Description"
                            }
                        </div>
                        <hr className='my-4'></hr>
                        <div className='flex flex-col py-2 space-y-4'>
                            <div className='flex flex-row'>
                                <div>PDF Link: </div>
                                <input type={'text'} className='border-2 border-gray-200 ml-2 rounded-md'></input>
                            </div>
                            <div className='flex flex-row'>
                                <div>Number of Pages: </div>
                                <input type={'number'} className='border-2 border-gray-200 ml-2 rounded-md'></input>
                            </div>
                            
                            <button className='bg-blue-200 rounded-sm text-gray-900 w-auto float-left hover:shadow-md hover:bg-blue-400 transition-all duration-500 '>
                                Add Book</button>
                        </div>
                    </div>
                    </div>
                }
                
            </div>
        </div>
    )
}