import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf.js'
import Book from './Book.js'

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false,
    query: '',
    searchQuery: []
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

  searchQuery = (query) => {
    if (query) {
      BooksAPI.search(query.trim())
      .then(response => {
        console.log(response)
        this.setState({ searchQuery: response })
      })
    } else {
      this.setState({ searchQuery: []})
    }
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  onChange={(e) => this.searchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.searchQuery.length ? (
                  this.state.searchQuery
                    .map(book => (
                      <Book
                        book={book}
                        bookList={this.state.books}
                        key={book.id}
                        updateBook={this.getBooks}
                      />
                    ))
                ) : (
                  <li>Search doesn't have any results...</li>
                )}
              </ol>
            </div>
          </div>
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
