import React from "react";
import { BookTile } from "./BookTile";
/**
 * Component rendering list of books passed as props
 */
class BookList extends React.Component {
  render() {
    const { books } = this.props;
    return (
      <div>
        {books.map((book, index) => {
          return <BookTile key={book.id} {...book} />;
        })}
      </div>
    );
  }
}

export { BookList };
