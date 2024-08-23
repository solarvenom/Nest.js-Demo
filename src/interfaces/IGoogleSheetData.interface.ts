export interface IGoogleSheetData {
    version: number,
    reqId: number,
    status: string,
    sig: number,
    table: {
        cols: { id: string, label: string, type: string }[],
        rows: { c: { v: string, f: string }[] }[]
    }
}