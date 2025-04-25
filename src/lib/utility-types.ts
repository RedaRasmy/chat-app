type WithId = {
    id : string | number
}

export type Entities<T extends WithId> = Record<T["id"], T>

export type Ids<T extends WithId> = T["id"][]

export type EntitiyState<T extends WithId> = {
    entities: Entities<T>
    ids: Ids<T>
}

export type Update<T extends WithId> = {
    id: T["id"]
    changes: Partial<T>
}

export type Prettify<T> = {
    [K in keyof T]: T[K]
} & {}
