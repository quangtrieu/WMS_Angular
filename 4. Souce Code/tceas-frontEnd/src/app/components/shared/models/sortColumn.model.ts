export class SortColumn {
    public columnName: String;
    public isAsc: Boolean = true;
    public classActive: String = 'sorting';
    
    constructor(private _columnName: String,
        private _isAsc: Boolean) {
        this.columnName = _columnName;
        this.isAsc = _isAsc;
    }
}