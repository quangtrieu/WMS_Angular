import { ItemEnum } from "./itemEnum";

export const JobTrackingStatusEnum = {
    NEW: 1,
    START: 2,
    PAUSE: 3,
    COMPLETE: 4,
    Items: [
        new ItemEnum({ id: 1, code: 'new', description: 'NEW' }),
        new ItemEnum({ id: 2, code: 'start', description: 'START' }),
        new ItemEnum({ id: 3, code: 'pause', description: 'PAUSE' }),
        new ItemEnum({ id: 4, code: 'complete', description: 'COMPLETE' })
    ]
}