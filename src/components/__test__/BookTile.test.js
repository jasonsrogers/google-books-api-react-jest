import React from "react";
// import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { BookTile } from "../BookTile";
// import { BookService } from '../../services/bookService'

const bookSample = {
  kind: "books#volume",
  id: "aGjaBTbT0o0C",
  etag: "JbJsH/fCA5s",
  selfLink: "https://www.googleapis.com/books/v1/volumes/aGjaBTbT0o0C",
  volumeInfo: {
    title: "HTML and CSS",
    subtitle: "Design and Build Websites",
    authors: ["Jon Duckett"],
    publisher: "John Wiley & Sons",
    publishedDate: "2011-11-08",
    description:
      "Presents information on using HTML and CSS to create Web pages, covering such topics as lists, links, images, tables, forms, color, layout, and video and audio.",
    industryIdentifiers: [
      {
        type: "ISBN_13",
        identifier: "9781118008188"
      },
      {
        type: "ISBN_10",
        identifier: "1118008189"
      }
    ],
    readingModes: {
      text: false,
      image: true
    },
    pageCount: 490,
    printType: "BOOK",
    categories: ["Computers"],
    averageRating: 4.5,
    ratingsCount: 6,
    maturityRating: "NOT_MATURE",
    allowAnonLogging: false,
    contentVersion: "0.4.2.0.preview.1",
    panelizationSummary: {
      containsEpubBubbles: false,
      containsImageBubbles: false
    },
    imageLinks: {
      smallThumbnail:
        "http://books.google.com/books/content?id=aGjaBTbT0o0C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      thumbnail:
        "http://books.google.com/books/content?id=aGjaBTbT0o0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    language: "en",
    previewLink:
      "http://books.google.co.uk/books?id=aGjaBTbT0o0C&printsec=frontcover&dq=css&hl=&cd=1&source=gbs_api",
    infoLink:
      "http://books.google.co.uk/books?id=aGjaBTbT0o0C&dq=css&hl=&source=gbs_api",
    canonicalVolumeLink:
      "https://books.google.com/books/about/HTML_and_CSS.html?hl=&id=aGjaBTbT0o0C"
  },
  saleInfo: {
    country: "GB",
    saleability: "NOT_FOR_SALE",
    isEbook: false
  },
  accessInfo: {
    country: "GB",
    viewability: "PARTIAL",
    embeddable: true,
    publicDomain: false,
    textToSpeechPermission: "ALLOWED",
    epub: {
      isAvailable: false
    },
    pdf: {
      isAvailable: false
    },
    webReaderLink:
      "http://play.google.com/books/reader?id=aGjaBTbT0o0C&hl=&printsec=frontcover&source=gbs_api",
    accessViewStatus: "SAMPLE",
    quoteSharingAllowed: false
  },
  searchInfo: {
    textSnippet:
      "This book is for Web designers and programmers Online editors and content editors Marketing &amp; e-commerce managers Bloggers and hobbyists You&#39;ll learn to Write HTML and CSS3 Structure web pages and sites Prepare images, audio, and video ..."
  }
};

test("BookTile", () => {
  const book = Object.assign({}, bookSample);
  const {
    volumeInfo: { title, subtitle, imageLinks, authors, description },
    volumeInfo
  } = book;
  const wrapper = shallow(<BookTile key={book.id} {...book} />);
  expect(wrapper.find(".book-information_title").text()).toEqual(title);
  expect(wrapper.find(".book-information_subtitle").text()).toEqual(subtitle);
  expect(wrapper.find(".book-information_author").text()).toEqual(authors[0]);
  expect(wrapper.find(".book-thumbnail-img").html()).toContain(
    "http://books.google.com/books/content?id=aGjaBTbT0o0C&amp;printsec=frontcover&amp;img=1&amp;zoom=1&amp;edge=curl&amp;source=gbs_api"
  );
  expect(
    wrapper.find(".book-thumbnail-img").filterWhere(item => {
      return item.prop("src") === imageLinks.thumbnail;
    })
  ).toHaveLength(1);
});

test("BookTile", () => {
  const book = Object.assign({}, bookSample);
  const {
    volumeInfo: { description }
  } = book;
  const wrapper = shallow(<BookTile key={book.id} {...book} />);
  wrapper.find(".book-information_more-info").simulate("click");
  expect(wrapper.find(".book-information_description").text()).toEqual(
    description
  );
});