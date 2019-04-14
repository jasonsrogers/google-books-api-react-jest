import React from "react";
import Collapse from "react-bootstrap/Collapse";
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
  /**
   * Load image of the thumbnail
   * This would usually not be necessary as they would be served from
   * a server but in this case we have the images as a local asset
   */
  componentDidMount() {
    // this.setState({ imageLink: require("../" + this.props.imageLink) });
  }
  toggle() {
    this.setState(state => ({ open: !state.open }));
  }
  render() {
    const {
      volumeInfo: {
        title,
        subtitle,
        imageLinks = {},
        authors = [],
        description
      },
      volumeInfo
    } = this.props;

    return (
      <div className="book-thumbnail">
        <div className="image-wrapper">
          <img
            src={imageLinks.thumbnail}
            className="book-thumbnail-img"
            alt="book thumbnail"
          />
        </div>
        <div className={`book-information`}>
          <div className="book-information_title">{title}</div>
          <div className="book-information_subtitle">{subtitle}</div>
          <div className="book-information_author">{authors.join(", ")}</div>
        </div>
        <button
          className="book-information_more-info"
          onClick={() => {
            this.toggle();
          }}
        />
        <Collapse in={this.state.open}>
          <div className="book-information_description">{description}</div>
        </Collapse>
      </div>
    );
  }
}

export { BookTile };
