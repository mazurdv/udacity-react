import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onCategoryChange(this.props.bookInfo.id, event.target.value);
    }

    render() {

        let categories = [
            ['currentlyReading', 'Currently reading'],
            ['wantToRead', 'Want to read'],
            ['read', 'Read'],
            ['none', 'None']
        ];

        let book = this.props.bookInfo;

        let url, imageUrl;

        url = book.imageLinks ? book.imageLinks.smallThumbnail : "''";
        imageUrl = "url('" + url + "')";

        return (

            <div className="book">
                <div className="book-top">

                    <div className="book-cover"
                         style={{width: 128,
                                height: 193,
                                backgroundImage: imageUrl }}>
                    </div>

                    <div className="book-shelf-changer">
                        <select value={book.shelf}
                                onChange={this.handleChange}>
                            <option value="moveTo" disabled>Move to...</option>
                                {categories.map(function (category){
                                            return (
                                                <option key={category[0]}
                                                        value={category[0]}>
                                                    {category[1]}
                                                </option>
                                            )
                                        } )
                                }
                        </select>
                    </div>
                </div>

                <div className="book-title">
                    {book.title}
                </div>

                <div className="book-authors">
                    {book.authors && book.authors.join(', ')}
                </div>

            </div>
        )
    }
}

Book.propTypes = {
    bookInfo: PropTypes.object.isRequired,
    onCategoryChange: PropTypes.func.isRequired
};

export default Book

