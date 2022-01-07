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

  filter(){
    const copyQ = {...this.bigQuery}

    delete copyQ["search"];
    delete copyQ["page"];
    delete copyQ["limit"];

    //convert bigquery inty a string => copyQ
    let stringOfCopyQ  = JSON.stringify(copyQ);
    stringOfCopyQ = stringOfCopyQ.replace(/\b(gt || lte || gte || lt)\b/g, m=> `$${m}`);

   const jsonofCopyQ = JSON.parse(stringOfCopyQ);

   this.base = this.base.find(jsonofCopyQ);
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



module.exports = WhereClause;