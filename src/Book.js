import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends Component {
  updateBook(book, value) {
    BooksAPI.update(book, value)
    this.props.updateBook()
  }

  defaultValue = () => {
    if (this.props.book.shelf) {
      return this.props.book.shelf
    } else {
      const inAList = this.props.bookList.filter(book => book.id === this.props.book.id)
      if (inAList.length > 0) {
        return inAList[0].shelf
      } else {
        return "none"
      }
    }
  }

  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            {this.props.book.imageLinks ? (
              <img className="book-cover" src={this.props.book.imageLinks.thumbnail} alt="{this.props.book.title}" />
            ) : (
              <div>No Image</div>
            )}
            <div className="book-shelf-changer">
              <select defaultValue={this.defaultValue()}
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
          <div className="book-authors">{this.props.book.authors ? this.props.book.authors.join(', ') : "Authors unknown"}</div>
        </div>
      </li>
    )
  }
}

export default Book
