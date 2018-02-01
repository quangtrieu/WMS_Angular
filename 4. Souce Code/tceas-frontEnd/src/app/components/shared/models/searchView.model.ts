import { SortColumn } from "./sortColumn.model";

export class SearchViewModel {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    data: Object;
    sortColumn: SortColumn;
    orderColumn: string;
}