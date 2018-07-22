import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends Component {
  state = {
    shelf: this.props.book.shelf
  }

  updateBook(book, value) {
    BooksAPI.update(book, value)
    this.setState({shelf: value})
  }

  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <img className="book-cover" src={this.props.book.imageLinks.thumbnail} alt="{this.props.book.title}" />
            <div className="book-shelf-changer">
              <select defaultValue={this.props.book.shelf}
                onChange={(e) => { this.updateBook(this.props.book, e.target.value)}}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors.join(", ")}</div>
        </div>
      </li>
    )
  }
}

export default Book
