import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf.js'
import Book from './Book.js'
import SearchList from './SearchList.js'

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
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
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
                {this.state.searchQuery
                  .map(book => (
                    <Book
                      book={book}
                      key={book.id}
                      updateBook={this.getBooks}
                    />
                  ))}
              </ol>
            </div>
          </div>
        ) : (
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
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
