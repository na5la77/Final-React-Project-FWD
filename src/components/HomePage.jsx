import Shelf from './Shelf'
import { Link } from 'react-router-dom'

export default function HomePage() {

  
  return (
    <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
    
    <Shelf shelfName="Currently Reading"/>
    <Shelf shelfName="Want To Read"/>
    <Shelf shelfName="Read"/>
    </div>
    <div className="open-search">
            <Link to='/search'>Add a book</Link>
          </div>
    </div>
   
  )
}
