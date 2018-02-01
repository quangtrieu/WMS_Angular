import { ItemEnum } from "./itemEnum";

export const JPCBStatusEnum = {
    PLANNED: 1,
    INPROGRESS: 2,
    COMPLETED: 3,
    INVOICED: 4,
    Items: [
        new ItemEnum({ id: 1, code: 'PLANNED', description: 'PLANNED' }),
        new ItemEnum({ id: 2, code: 'INPROGRESS', description: 'INPROGRESS' }),
        new ItemEnum({ id: 3, code: 'COMPLETED', description: 'COMPLETED' }),
        new ItemEnum({ id: 4, code: 'INVOICED', description: 'INVOICED' })
    ]
}