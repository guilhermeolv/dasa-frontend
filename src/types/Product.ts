interface Owner {
    id: number
    name: string
    email: string
    password: string
}

interface Category {
    id: number
    title: string
    description: string
    createdAt: string
    updatedAt: string
}


export interface Product {
    id: number
    title: string
    description: string
    price: number
    createdAt: string
    updatedAt: string
    owner: Owner | null
    category: Category | null
}