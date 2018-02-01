import { ItemEnum } from "./itemEnum";

export const JobFulfilmentStatusEnum = {
    NEW: 1,
    PARTILLY: 2,
    FULL: 3,
    DONE: 4,
    Items: [
        new ItemEnum({ id: 1, code: 'new', description: 'NEW' }),
        new ItemEnum({ id: 2, code: 'partilly', description: 'PARTILLY' }),
        new ItemEnum({ id: 3, code: 'full', description: 'FULL' }),
        new ItemEnum({ id: 4, code: 'done', description: 'DONE' })
    ]
}