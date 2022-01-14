import { INews } from "./news";

export interface IPagination {
    limit: number;
    offset: number;
    count: number;
    total: number;
    data: INews[];
}