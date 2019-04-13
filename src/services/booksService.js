const baseUrl = "https://www.googleapis.com/books/v1/volumes";
// list of valie orderBy values
const orderByValues = ["newest", "relevance"];
// list of valie filter values
const filterValues = [
  "ebooks",
  "free-ebooks",
  "full",
  "paid-ebooks",
  "partial"
];

// number of records to get by page
const pageSize = 40;

class BookService {
  /**
   * helper function to build url params (fetch doesn't have one)
   * @param {String} url: base url
   * @param {Object} parameters: object which attributes will be encoded in url
   * @returns {String} encoded url
   */
  static buildUrl(url, parameters) {
    let qsArray = [];
    for (const key in parameters) {
      if (parameters.hasOwnProperty(key)) {
        const value = parameters[key];
        if (value !== undefined) {
          qsArray.push(
            encodeURIComponent(key) + "=" + encodeURIComponent(value)
          );
        }
      }
    }

    url = url + (qsArray.length ? "?" + qsArray.join("&") : "");

    return url;
  }

  /**
   * Validate parameters (checkes that orderBy and filterBy are valid values)
   * @param {String} orderBy
   * @param {String} filterBy
   * @returns {Object} validation results
   */
  static areParamsValid(orderBy, filterBy) {
    let errors = [];
    if (orderBy && orderByValues.indexOf(orderBy) === -1) {
      errors.push("Order By not valid");
    }
    if (filterBy && filterValues.indexOf(filterBy) === -1) {
      errors.push("Filter By not valid");
    }

    return {
      isValid: errors.length === 0,
      errors,
      errorMessages: errors.join(", ")
    };
  }
  /**
   * calculate information
   * @param {Number} page: index of the page
   * @returns {Object} pageInfo: start and end index to query
   */
  static calculatePage(page) {
    if (page === undefined) {
      return {};
    }
    const startIndex = page * pageSize;
    const endIndex = (page + 1) * pageSize - 1;
    return { startIndex, endIndex };
  }

  // https://developers.google.com/books/docs/v1/reference/volumes/list?apix_params=%7B%22maxResults%22%3A40%2C%22orderBy%22%3A%22newest%22%2C%22startIndex%22%3A4%7D#try-it
  /**
   * Process and validate params then call _getBooks to get books form google api
   * @param {String} queryString: Search Terms
   * @param {Number} page: Pagination page index
   * @param {String} orderBy: orderBy param
   * @param {String} filterBy: filterBy param
   */
  static getBooksWithParams(queryString, page, orderBy, filterBy) {
    return new Promise((resolve, reject) => {
      const validation = this.areParamsValid(orderBy, filterBy);
      if (validation.isValid) {
        let pageInfo = this.calculatePage(page);
        return this._getBooks({
          q: queryString,
          ...pageInfo,
          orderBy,
          filterBy
        }).then(resp => {
          // there must be a way to simply return ?
          resolve(resp);
        });
      } else {
        reject(validation.errorMessages);
      }
    });
  }

  // https://developers.google.com/books/docs/v1/reference/volumes/list#try-it
  /**
   * Actual query function
   * @param {params} params
   */
  static _getBooks(params) {
    return fetch(
      this.buildUrl(baseUrl, Object.assign({ maxResults: 40 }, params))
    ).then(function(response) {
      return response.json();
    });
  }
}

export { BookService, orderByValues, filterValues, pageSize };
