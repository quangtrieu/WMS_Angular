export class AutoCompleteUtils {
    pageSize = 30;

    loadMore(autoComplete, scroll) {
        var panel = autoComplete.find(".ui-autocomplete-panel");
        panel.off("scroll");
        panel.on("scroll", () => {
            if (panel.scrollTop() + panel.innerHeight() >= panel[0].scrollHeight - 10) {
                var currentPage = this.getCurrentPage(autoComplete);
                var pageCount = this.getPageCount(autoComplete);

                if (pageCount == currentPage) return;
                this.setCurrentPage(autoComplete, currentPage + 1);
                scroll();
            }
        });
    }

    setCurrentPage(autoComplete, currentPage) {
        autoComplete.attr('data-current-page', currentPage);
    }

    setPageCount(autoComplete, count) {
        var pageCount = parseInt((count / this.pageSize).toString(), 10) + (count % this.pageSize == 0 ? 0 : 1);
        $('p-autoComplete').attr('data-page-count', pageCount);
        autoComplete.attr('data-page-count', pageCount);
    }

    getCurrentPage(autoComplete) {
        var currentPage = autoComplete.attr('data-current-page');
        if (currentPage == null) {
            currentPage = 1;
        }
        return parseInt(currentPage, 10);
    }

    getPageCount(autoComplete) {
        var pageCount = autoComplete.attr('data-page-count');
        if (pageCount == null) {
            pageCount = "1";
        }
        return pageCount;
    }
}