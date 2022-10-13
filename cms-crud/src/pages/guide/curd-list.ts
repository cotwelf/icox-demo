import { FaasParams } from "icox";
import { defineListPage } from "@icox/cms";
import { page_raw, _sleep } from './crud-raw'

export default defineListPage({
    source: getCurdTableset,
    pool: { flavors: [ page_raw ] },
    initdeps: ['type'],
    action: [
        '@upload',
        '@batch',
    ],
    filter: [
        'biz', 
        'type',
        'title',
        "@submit", 
        "@reset",
    ],
    table: [
        '@selection',
        'title',
        'flag',
        'ctime',
        'label',
        '@operation',
    ],
})

async function getCurdTableset(faas: FaasParams) {
    await _sleep()
    const list = [
        { id: 1, title: '111', type: 3, flag: 1, ctime: 1661167950 },
        { id: 2, title: '2222', type: 3, flag: 1, ctime: 1661167950 },
        { id: 3, title: '3333', type: 2, flag: 0, ctime: 1661167950 },
    ] as any[]
    return { list, pager: { total: 3, pn: 1, ps: 10 } }
}