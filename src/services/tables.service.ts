import Table from "../classes/table.class";
import { tables } from "../data/tables.data";
import ITable from "../interfaces/table.interface";

export default class TablesService {
    private static _tables: Record<number, Table> = {};

    static {
        console.log('initilizing tables..');

        tables.forEach(table => {
            this._tables[table.number] = new Table(table.number);
        })
    }

    public static retrive() : ITable[] {
        const tables: ITable[] = [];
        for(const key in this._tables) {
            tables.push(this._tables[key].asJson());
        }
        return tables;
    }

    public static pickTable(no: number) : Table {
        this._tables[no].isOccupied = !this._tables[no].isOccupied;

        return this._tables[no];
    }
}