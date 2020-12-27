export interface initialProps {
   users: UsersProps
   products: ProductsProps
}


export interface UsersProps {
   icon?: string,
   role: string,
   uid: string,
   username: string,
   isSignIn: boolean
};

export interface ProductsProps {
   list?: []
}