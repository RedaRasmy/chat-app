import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export type Entities<T extends {id:string|number}> = Record<T['id'],T>

export type Ids<T extends {id:string|number}> = T['id'][]

export type EntitiyState<T extends {id:string|number}> = {
    entities : Entities<T>
    ids : Ids<T>
}

export type Update<T extends {id:string|number}> = {
    id : T['id']
    changes : Partial<T>
}

export type Prettify<T> = {
  [K in keyof T] : T[K]
} & {}