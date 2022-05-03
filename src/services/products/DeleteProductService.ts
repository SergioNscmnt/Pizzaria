import prismaClient from "../../prisma";

interface ProductRequest{
    id: string;
}

class DeleteProductService {
    async execute({ id }){

        const product = await prismaClient.product.delete({ 
            where:{
                id: id
            }
         });
        
         return product;
    }
}

export { DeleteProductService }
