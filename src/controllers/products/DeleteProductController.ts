import { Request, Response } from 'express';
import { DeleteProductService } from '../../services/products/DeleteProductService'

class DeleteProductController {

    async handle( req: Request, res: Response ){
        const id = req.query.id;
        
        const deleteProduct = new DeleteProductService();

        const product = await deleteProduct.execute({ id })

        res.json(product);        
    }
}

export { DeleteProductController }
