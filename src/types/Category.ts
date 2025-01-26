interface Owner {
    id: number
    name: string
    email: string
    password: string
}

export interface Category {
    id: number
    title: string
    description: string
    createdAt: string
    updatedAt: string
    owner: Owner | null
} 