import React, { Component } from 'react'
import Book from './Book.js'

class Bookshelf extends Component {
  updateShelf = () => {
    this.props.updateBooks()
  }

  render() {
    return (
      <div className="list-books-content">
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.bookshelf}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.books
                .filter(book => book.shelf === this.props.id)
                .map(book => (
                  <Book
                    book={book}
                    key={book.id}
                    updateBook={this.updateShelf}
                  />
                ))}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default Bookshelf

// let book1 = {
//   title: "The Linux Command Line",
//   authors: ["William E. Shotts, Jr."],
//   shelf: "currentlyReading",
//   imageLinks:
//     {smallThumbnail: "http://books.google.com/books/content?id=nggnmAEAC…J&printsec=frontcover&img=1&zoom=5&source=gbs_api",
//     thumbnail: "http://books.google.com/books/content?id=nggnmAEAC…J&printsec=frontcover&img=1&zoom=1&source=gbs_api"},
//   id: "nggnmAEACAAJ",
//   categories: ["COMPUTERS"],
//   averageRating: 4,
//   allowAnonLogging: true,
//   canonicalVolumeLink: "https://market.android.com/details?id=book-nggnmAEACAAJ",
//   contentVersion: "1.2.2.0.preview.2",
//   description: "dation's Evolution of a SysAdmin",
//   industryIdentifiers: "(2) [{…}, {…}]",
//   infoLink: "https://play.google.com/store/books/details?id=nggnmAEACAAJ&source=gbs_api",
//   language: "en",
//   maturityRating: "NOT_MATURE",
//   pageCount: 480,
//   panelizationSummary:
//     {containsEpubBubbles: false,
//     containsImageBubbles: false},
//   previewLink: "http://books.google.com/books?id=nggnmAEACAAJ&dq=linux&hl=&cd=3&source=gbs_api",
//   printType: "BOOK",
//   publishedDate: "2012",
//   publisher: "No Starch Press",
//   ratingsCount: 2,
//   readingModes:
//     {text: true,
//     image: false},
//   subtitle: "A Complete Introduction",
//   }
