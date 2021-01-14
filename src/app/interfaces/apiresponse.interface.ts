export interface Item{
    id: string;
    name: string;
    typeLine: string;
}

export interface Stash{
    id: string;
    league: string;
    accountName: string;
    items: Item[]
}

export interface APIResponse {
    next_change_id: string;
    stashes: Stash[]
}
