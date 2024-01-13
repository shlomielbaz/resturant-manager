import ITable from "../interfaces/table.interface";

export default class Table {
    private _number: number;
    private _isOccupied: boolean;

    constructor(number: number) {
        this._number = number;
        this._isOccupied = false;
    }

    public get number() {
        return this._number;
    }

    public get isOccupied() {
        return this._isOccupied;
    }

    public set isOccupied(occupied: boolean) {
        this._isOccupied = occupied;
    }

    public asJson(): ITable {
        return {
            number: this._number,
            isOccupied: this._isOccupied
        };
    }
}