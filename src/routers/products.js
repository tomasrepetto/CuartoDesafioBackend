import { Router } from 'express';
import ProductManager from '../productManager.js';

const router = Router();

router.get('/', (req, res) => {
    const {limit} = req.query;
    const p = new ProductManager();
    return res.json({ Discos: p.getProducts (limit)});
});

router.get('/:pid', (req, res) =>{
    const { pid } = req.params; 
    const p = new ProductManager();
    return res.json({ Discos: p.getProductsById (Number(pid))});
});

router.post('/', (req, res) =>{
    const p = new ProductManager();
    const result = p.addProduct({...req.body});
    return res.json({result});
});

router.put('/:pid', (req, res) => {
    const { pid } = req.params;
    const p = new ProductManager();
    const result = p.modificarProducts({ id: Number(pid), objetModif: req.body });
    return res.json({ result });
});

router.delete('/:pid', (req, res) =>{
    const {pid} = req.params;
    const p = new ProductManager();
    const result = p.deleteProductsById(Number(pid));
    return res.json({result});
});

export default router;