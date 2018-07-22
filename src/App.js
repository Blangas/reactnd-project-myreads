import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf.js'

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false,
    query: ''
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

  // clearQuery =

  render() {
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            {this.state.showSearchPage && (
              <div className="search-books">
                <div className="search-books-bar">
                  <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                  <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author"/>
                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid"></ol>
                </div>
              </div>
            )}
            <Bookshelf
              id="currentlyReading"
              bookshelf="Currently Reading"
              books={this.state.books}
              updateBooks={this.getBooks}
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
            {!this.state.showSearchPage && (
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
            )}
          </div>
      </div>
    )
  }
}

export default BooksApp
