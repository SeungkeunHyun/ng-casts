export class EsResponse {
    took: number;
    timed_out: boolean;
    _shards: any;
    hits: Hits;
    aggregations?: any;
}

export interface Hits {
    total: number;
    max_score: number;
    hits: Hit[];
}

export interface Hit {
    _index: string;
    _type: string;
    _id: string;
    _score: number;
    _source: any;
}

