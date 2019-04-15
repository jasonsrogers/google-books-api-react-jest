import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { pageSize } from "../services/booksService";
/**
 * Component to render the thumbnail of a book
 */
class PaginationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentDidMount() {}

  render() {
    const { page, totalItems } = this.props;

    let active = page;
    let totalPages = Math.floor(totalItems / pageSize) + 1;
    // TODO figure out why high values for startIndex causes back end error

    // NOTE: as google API has problems when querying high start indexes,
    // I opted for a simple left right pagination and commented out first/last etc
    return (
      <Pagination size="sm" className="pagination-component">
        {/* <Pagination.First
          onClick={() => {
            this.props.onPageChanged(0);
          }}
        /> */}
        {active ? (
          <Pagination.Prev
            onClick={() => {
              this.props.onPageChanged(active - 1);
            }}
          />
        ) : (
          ""
        )}
        {/* <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis /> */}

        {/* <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item> */}
        <Pagination.Item active>
          {active + 1}/{totalPages}
        </Pagination.Item>
        {/* <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item disabled>{14}</Pagination.Item> */}

        {/* <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item> */}
        {active < totalPages ? (
          <Pagination.Next
            onClick={() => {
              this.props.onPageChanged(active + 1);
            }}
          />
        ) : (
          ""
        )}
        {/* <Pagination.Last
          onClick={() => {
            this.props.onPageChanged(totalPages - 1);
          }}
        /> */}
      </Pagination>
    );
  }
}

export { PaginationComponent };
