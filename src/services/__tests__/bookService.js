import { BookService, orderByValues, filterValues } from "../booksService";
describe("Validate basics of book service", () => {
  test("it gets books default", async () => {
    const mockFn = jest.fn(() => {
      var p = new Promise((resolve, reject) => {
        resolve({
          json: () => {
            return new Promise((resolve, reject) => {
              resolve("a response");
            });
          }
        });
      });
      return p;
    });

    global.fetch = mockFn;
    expect(mockFn).toHaveBeenCalledTimes(0);

    expect(BookService._getBooks()).resolves.toBe("a response");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test("bookService: buildUrl", () => {
    const url = BookService.buildUrl("basicurl.com", {
      param1: "aParam",
      param2: "something encoded"
    });
    expect(url).toBe("basicurl.com?param1=aParam&param2=something%20encoded");
  });

  test("bookService: areParamsValid", () => {
    let validation = BookService.areParamsValid(
      "something",
      orderByValues[0],
      filterValues[0]
    );
    expect(validation.isValid).toBe(true);

    validation = BookService.areParamsValid("something wrong", filterValues[0]);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.length).toEqual(1);
    expect(validation.errorMessages).toEqual("Order By not valid");

    validation = BookService.areParamsValid(
      "something",
      orderByValues[0],
      "something wrong"
    );
    expect(validation.isValid).toBe(false);
    expect(validation.errors.length).toEqual(1);
    expect(validation.errorMessages).toEqual("Filter By not valid");
  });

  test("bookService: calculates the page params", () => {
    let pageInfo = BookService.calculatePage(2);
    expect(pageInfo.startIndex).toBe(80);
    expect(pageInfo.endIndex).toBe(119);
    pageInfo = BookService.calculatePage();
    expect(pageInfo.startIndex).toBe(undefined);
    expect(pageInfo.endIndex).toBe(undefined);
    expect(pageInfo).toEqual({});
  });
});

describe("get books with api params", () => {
  test("bookService: get books with params", async () => {
    const mockFn = jest.fn(() => {
      var p = new Promise((resolve, reject) => {
        resolve({
          json: () => {
            return new Promise((resolve, reject) => {
              resolve({});
            });
          }
        });
      });
      return p;
    });

    global.fetch = mockFn;
    expect(
      BookService.getBooksWithParams("a book query", 2, "newest", "full")
    ).resolves.toEqual({});

    expect(mockFn.mock.calls[0][0]).toBe(
      "https://www.googleapis.com/books/v1/volumes?maxResults=40&q=a%20book%20query&startIndex=80&endIndex=119&orderBy=newest&filterBy=full"
    );

    expect(
      BookService.getBooksWithParams(
        "a book query",
        2,
        "none existing order",
        "full"
      )
    ).rejects.toEqual("Order By not valid");
    expect(
      BookService.getBooksWithParams(
        "a book query",
        2,
        "newest",
        "non existing filter"
      )
    ).rejects.toEqual("Filter By not valid");
  });
});
