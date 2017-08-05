import React from 'react'
import PropTypes from 'prop-types'
let ReactRouter = require('react-router-dom');
let Link = ReactRouter.Link;
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'

class Search extends React.Component{

    constructor(props) {
        super(props);

        this.handleSearch = this.handleSearch.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.searchBooks = this.searchBooks.bind(this);
    }

    handleCategoryChange (bookId,newCategory) {
        this.props.onBookCategoryChange(bookId,newCategory);
    }

    searchBooks = (query, maxResults) => {

        let onSearchResults = this.props.onSearchResults;

        // BooksAPI.search(query, maxResults).then((function (books) {
        //     books === undefined && onSearchResults({bookResults: []})
        //     query.length > 0 && (
        //         books.error ?
        //             (onSearchResults({bookResults: []})) :
        //             (onSearchResults({bookResults: books}))
        //     )
        // }));

        BooksAPI.search(query, maxResults)
            .then((response) => {

                // Catch API response errors
                if (!query.length || typeof response === 'undefined' || response.error) {
                    onSearchResults({bookResults: []});

                } else {

                    // Set all the books from the search to have default shelf of 'none'
                    response = response.map(b => {
                        b.shelf = 'none';
                        return b
                    });

                    // Check the books in the main page and set the shelf
                    for (let book of this.props.books) {
                        response = response.map(b => {
                            if (book.id === b.id) {
                                b.shelf = book.shelf
                            }
                            return b
                        });
                    }

                    // Finally set the state on the search results
                    onSearchResults({bookResults: response})
                }
            });


    };

    handleSearch(event)  {
        this.searchBooks(event.target.value, 10);
    }

    render() {
        return (

            <div className="search-books">
                <div className="search-books-bar">

                    <Link to='/' className="close-search">
                        Close
                    </Link>


                    <div className="search-books-input-wrapper">

                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={this.handleSearch}
                        />

                    </div>
                </div>

            <div className="search-books-results">
                <ol className="books-grid">

                    { this.props.bookResults.map(function (book) {
                        return (
                            <li key={book.id}>
                                <Book
                                    bookInfo={book}
                                    key={book.id}
                                    onCategoryChange={this.handleCategoryChange}
                                />
                            </li>
                            )
                    },this) }

             </ol>
            </div>
            </div>

        )
    }
}

Search.propTypes = {
    books: PropTypes.array.isRequired,
    bookResults: PropTypes.array.isRequired,
    onSearchResults: PropTypes.func.isRequired,
    onBookCategoryChange: PropTypes.func.isRequired
};

export default Search