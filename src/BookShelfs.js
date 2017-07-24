import React from 'react'
let ReactRouter = require('react-router-dom');
let Link = ReactRouter.Link;
import './App.css'
import Book from './Book.js'
import PropTypes from 'prop-types'

class BookShelfs extends React.Component {

    constructor(props) {
        super(props);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    handleCategoryChange(bookId, newCategory) {
        this.props.onBookCategoryChange(bookId, newCategory);
    }

    render() {
        return (
            <div className="list-books">

                <div className="list-books-title">
                    <h1>
                        MyReads
                    </h1>
                </div>

                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">
                                Currently Reading
                            </h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    { this.props.books.filter(function (book) {
                                            return book.shelf === 'currentlyReading'
                                        },this).map(function (book) {
                                            return (
                                                <li key={book.id}>
                                                    <Book bookInfo={book}
                                                          key={book.id}
                                                          onCategoryChange={this.handleCategoryChange} />
                                                </li>
                                            )
                                        },this)
                                    }
                                </ol>
                            </div>
                        </div>

                        <div className="bookshelf">
                            <h2 className="bookshelf-title">
                                Want to Read
                            </h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    { this.props.books.filter(function (book) {
                                            return book.shelf === 'wantToRead'
                                        },this).map(function (book) {
                                            return (
                                                <li key={book.id}>
                                                    <Book bookInfo={book}
                                                          key={book.id}
                                                          onCategoryChange={this.handleCategoryChange} />
                                                </li>
                                            )
                                        },this)
                                    }
                                </ol>
                            </div>
                        </div>

                        <div className="bookshelf">
                            <h2 className="bookshelf-title">
                                Read
                            </h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    { this.props.books.filter(function (book) {
                                            return book.shelf === 'read'
                                        },this).map(function (book) {
                                            return (
                                                <li key={book.id}>
                                                    <Book bookInfo={book}
                                                          key={book.id}
                                                          onCategoryChange={this.handleCategoryChange} />
                                                </li>
                                            )
                                        },this)
                                    }
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="open-search">
                    <Link to='/search' />
                </div>

            </div>
        )
    }
}

BookShelfs.propTypes = {
    books: PropTypes.array.isRequired,
    onBookCategoryChange: PropTypes.func.isRequired
};

export default BookShelfs