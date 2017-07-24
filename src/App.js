import React from 'react'
let ReactRouter = require('react-router-dom');
let Router = ReactRouter.BrowserRouter;
let Route = ReactRouter.Route;
let Switch = ReactRouter.Switch;
import './App.css'
import * as BooksAPI from './BooksAPI'
import BookShelfs from './BookShelfs'
import Search from "./Search";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books:[],
            bookResults: []
        };

        this.handleSearchResults = this.handleSearchResults.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.updateBookCategory = this.updateBookCategory.bind(this);
    }

    handleSearchResults(books) {
        this.setState (books);
    }

    getAllBooks() {
        BooksAPI.getAll().then(books => {
            books === undefined && this.setState({books: []})
            books.error ? (this.setState({books: []})) :
                (this.setState({books: books}))
        })
    };

    updateBookCategory(bookId, shelf) {
        BooksAPI.update({id:bookId}, shelf).then((function (books) {
            this.getAllBooks();
        }).bind(this));
    }

    handleCategoryChange(bookId, newCategory) {
        this.updateBookCategory(bookId, newCategory);
    }

    componentDidMount() {
        this.getAllBooks();
    }

    render() {
        return (
            <Router>
                <div className="app">
                    <Switch>
                        <Route exact path='/'>
                            <BookShelfs books={this.state.books}
                                        onBookCategoryChange={this.handleCategoryChange} />
                        </Route>
                        <Route path='/search'>
                            <Search books={this.state.books}
                                    bookResults={this.state.bookResults}
                                    onSearchResults={this.handleSearchResults}
                                    onBookCategoryChange={this.handleCategoryChange} />
                        </Route>
                        <Route render={function () {
                            return <p>Not Found</p>
                        }}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App
