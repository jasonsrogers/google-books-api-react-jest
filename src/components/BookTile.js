import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";

/**
 * Component to render the thumbnail of a book
 */
class BookTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    const {
      volumeInfo: {
        title,
        subtitle,
        imageLinks = {},
        authors = [],
        description
      }
    } = this.props;

    return (
      <div className="book-tile">
        <div className="image-wrapper">
          <img
            src={imageLinks.thumbnail}
            className="book-tile-img"
            alt="book thumbnail"
          />
        </div>
        <div className={`book-information`}>
          <div className="book-information_title">{title}</div>

          <div className="book-information_subtitle">{subtitle}</div>
          <div className="book-information_author">{authors.join(", ")}</div>
          {description ? (
            <OverlayTrigger
              trigger="click"
              key="bottom"
              placement="bottom"
              rootClose={true}
              overlay={
                <Popover id={`popover-positioned-bottom`} title="description">
                  <div className="book-information_description">
                    {description}
                  </div>
                </Popover>
              }
            >
              <Button className="book-information_more-info">More info</Button>
            </OverlayTrigger>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export { BookTile };
