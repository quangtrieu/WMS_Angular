
SearchViewModel = {
     currentPage: String,
     pageSize: Number,
     searchModel: Object
}

var SearchViewModel = function (currentPage, pageSize, searchModel) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.searchModel = searchModel;
}

module.exports = SearchViewModel;