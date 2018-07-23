import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage.js'
import Bookshelf from './Bookshelf.js'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  getBooks = () => {
    BooksAPI.getAll()
      .then(books => {
        console.log(books)
        this.setState({ books })
      })
  }

  componentDidMount() {
    this.getBooks()
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchPage
            books={this.state.books}
            getBooks={this.getBooks}
          />
        )}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <Bookshelf
              id="currentlyReading"
              bookshelf="Currently Reading"
              books={this.state.books}
              updateBooks={this.getBooks.bind(this)}
            />
            <Bookshelf
              id="wantToRead"
              bookshelf="Want to Read"
              books={this.state.books}
              updateBooks={this.getBooks.bind(this)}
            />
            <Bookshelf
              id="read"
              bookshelf="Read"
              books={this.state.books}
              updateBooks={this.getBooks.bind(this)}
            />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
