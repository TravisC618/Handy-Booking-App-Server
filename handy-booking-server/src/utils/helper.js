const formatResponse = (res, statusCode = 200, message, data) => {
  const firstNum = parseInt(statusCode / 100);

  res.status(statusCode).send({
    status: firstNum === 2 ? "success" : "error",
    message,
    data
  });
};

function convertQuery(query, total) {
  const pagination = convertPagination(query, total); // {page, pageSize, pages}
  const priceRange = convertPriceRange(query);
  const sort = convertSortQuery(query.sort);
  const search = query.q; // q=[keyword]
  return { pagination, priceRange, search, sort };
}

/**
 * sort by specified field
 *    e.g. return {minPrice: 1,postDate: -1}
 * @param {*} query
 */
function convertSortQuery(query) {
  const sort = {};
  if (query) {
    const keys = query.split(",");
    keys.forEach(key => {
      if (key.includes("-")) {
        sort[key.replace("-", "")] = -1;
      } else {
        sort[key] = 1;
      }
    });
  }
  return sort;
}

/**
 * return minPrice & maxPrice
 * @param {*} query
 */
function convertPriceRange(query) {
  let { minPrice, maxPrice } = query;
  minPrice = parseInt(query.minPrice) || 5;
  maxPrice = parseInt(query.maxPrice) || 9999;

  // trick or treat
  if (minPrice < 5) {
    minPrice = 5;
  }
  if (maxPrice > 9999) {
    maxPrice = 9999;
  }

  return { minPrice, maxPrice };
}

/**
 * return page: current page num
 *        pageSize: item num of each page
 *        pages: total num of pages would generate after pagination
 * @param {*} query
 * @param {*} count num of doc that matched
 */
function convertPagination(query, count) {
  // no document match
  if (count === 0) {
    return { page: 1, pageSize: 10, pages: 1 };
  }

  // get query
  let { page, pageSize } = query;
  page = parseInt(query.page) || 1;
  pageSize = parseInt(query.pageSize) || 10;

  // trick or treat
  if (page < 1) {
    page = 1;
  }
  // total pages after pagination
  const pages = Math.ceil(count / pageSize);
  // trick or treat
  if (page > pages) {
    page = pages;
  }

  return { page, pageSize, pages };
}

// TODO handle search query
const searchQueryCount = function(model, key) {
  // sum
  const aggregate = [];
  return 0;
};

// TODO handle search helper function (最后应该放在services class里)
const countAllwithSearch = async function(model, search) {
  let count;
  if (search) {
    // 暂无处理search key
    count = searchQueryCount(model, search);
  } else {
    count = await model.find().countDocuments();
  }
  return count;
};

/**
 * // TODO 最后应该放在services class里
 * @param {*} pagination
 * @param {*} priceRange
 * @param {*} search
 * @param {*} sort
 */
const getAll = function(model, pagination, priceRange, search, sort) {
  const { page, pageSize } = pagination;
  const { minPrice, maxPrice } = priceRange;
  let query;

  // TODO if search key exists, ...
  if (search) {
    return;
  } else {
    query = model.find({ budget: { $gte: minPrice, $lte: maxPrice } });
    query = query.sort(sort);
    query = query.skip((page - 1) * pageSize).limit(pageSize);
  }
  return query;
};

module.exports = { formatResponse, convertQuery, countAllwithSearch, getAll };
