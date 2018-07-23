import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'

class SearchPage extends Component {
  state = {
    searchQuery: []
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

  render() {
    return (
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
                    bookList={this.props.books}
                    key={book.id}
                    updateBook={this.props.getBooks}
                  />
                ))
            ) : (
              <li>Search doesn't have any results...</li>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage
