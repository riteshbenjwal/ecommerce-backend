class WhereClause {
  constructor(base, bigQuery) {
    this.base = base;
    this.bigQuery = bigQuery;
  }
  search() {
    const searchword = this.bigQuery.search
      ? {
          name: {
            $regex: this.bigQuery.search,
            $options: "i",
          },
        }
      : {};

    this.base = this.base.find({
      ...searchword,
    });
    return this;
  }

  pager(resultperPage) {
    let currentPage = 1;
    if (this.bigQuery.page) {
      currentPage = this.bigQuery.page;
    }

    const skipVal = (currentPage - 1) * resultperPage;

    this.base = this.base.limit(resultperPage).skip(skipVal);

    return this;
  }
}
