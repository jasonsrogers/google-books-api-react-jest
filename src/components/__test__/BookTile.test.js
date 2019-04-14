import React from "react";
import { shallow } from "enzyme";
import { BookTile } from "../BookTile";

import { Book } from "./testData";

test("BookTile", () => {
  const book = Object.assign({}, Book);
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
  const book = Object.assign({}, Book);
  const {
    volumeInfo: { description }
  } = book;
  const wrapper = shallow(<BookTile key={book.id} {...book} />);
  wrapper.find(".book-information_more-info").simulate("click");
  expect(wrapper.find(".book-information_description").text()).toEqual(
    description
  );
});
