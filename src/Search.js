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
        // this.props.onBookCategoryChange(newCategory, bookId);

        this.props.onBookCategoryChange(bookId,newCategory);
    }


    searchBooks = (query, maxResults) => {

        let onSearchResults = this.props.onSearchResults;

        BooksAPI.search(query, maxResults).then((function (books) {
            books === undefined && onSearchResults({bookResults: []})
            query.length > 0 && (
                books.error ?
                    (onSearchResults({bookResults: []})) :
                    (onSearchResults({bookResults: books}))
            )
        }));
    };

    handleSearch(event)  {
        this.searchBooks(event.target.value, 10);
    }

    render() {
        return (

            <div className="search-books">
                <div className="search-books-bar">
                    {/*<a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>*/}

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