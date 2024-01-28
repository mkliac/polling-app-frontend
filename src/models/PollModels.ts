export interface SavePollRequest {
    title: string,
    description: string,
    items: string[],
    isPrivate: boolean,
    closedDate: Date,
    isAnonymous: boolean
}

export interface AddPollItemsRequest {
    texts: string[]
}

export interface DeletePollItemsRequest {
    ids: string[]
}

