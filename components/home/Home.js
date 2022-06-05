import react, {useState, useEffect} from 'react'
import Header from '../shared/Header'
import BookCard from '../shared/BookCard'
import Popup from '../shared/Popup'
import BookInfo from '../shared/BookInfo'
import AddCard from '../shared/AddCard'
import CreateBookList from '../shared/CreateBookList'
import { useSession} from "next-auth/react"
import axios from 'axios'
import BookListCard from './Booklistcard'
export default function BookList() {
    const { data: session } = useSession()
    const [open, toggleOpen] = useState(false);
    const [popup, changePopup] = useState(0);
    const [booklists, setBooklists] = useState({});
    
   
    const getBookLists = () => {
        axios.get('/api/lists/getLists').then(data => {
            console.log(data.data.data);
            setBooklists(data.data.data);
        }).catch(err => console.log(err))
    }
    useEffect(() => {
        // Update the document title using the browser API
        console.log("useeff")
        getBookLists();
    }, []);


    const toggle = () => {
        console.log("hello");
        toggleOpen(!open);
    }
    
    // const showBookinfo = () => {
    //     changePopup(0);
    //     toggle();
    // }

    const showAddBook = () => {
        changePopup(0);
        toggle();
    }
    
    const popupOptions = [<CreateBookList toggle={toggle} update = {getBookLists}/>]

    
    
    return (
        <div className='px-28 pt-10 flex flex-col space-y-8'>
            
            <Popup open = {open} toggle = {toggle} Child = {popupOptions[popup]}></Popup>
            
            <Header title = {`Welcome ${session ? session.user.name : "guest"}`}></Header>
            <div className='text-3xl font-bold text-gray-700 pt-8'>
                Your Booklists
            </div>
            <div className='flex flex-row flex-wrap space-y-10 items-baseline' >
                {booklists && Object.keys(booklists).map((i) => {
                    return <BookListCard text = {booklists[i].name} key = {i} list ={booklists[i]}></BookListCard>
                })}
               <AddCard onClick = {showAddBook}></AddCard>
            </div>
            
        </div>
    )
}
