import { Request, Response } from 'express';
import { adminDb as db } from '../firebase';

interface ProductData {
  name: string;
  price: number | string;
  description: string;
  image: string;
  inventory_stock: number;
}

// update stock
export const updateStock = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const { quantity, stock } = req.body;
    
    if (quantity === undefined || stock === undefined) {
      return res.status(400).json({ error: "quantity and stock are required" });
    }

    const productRef = db.collection("products").doc(productId);
    const initialDocSnapshot = await productRef.get();
    
    if (!initialDocSnapshot.exists) {
      return res.status(404).json({ error: "Product not found" });
    }

    const initialProductData = initialDocSnapshot.data() as ProductData;
    const itemPrice = Number(initialProductData.price);
    const itemTotalPrice = quantity * itemPrice;

    await productRef.update({
      inventory_stock: stock - quantity
    });

    const updatedDocSnapshot = await productRef.get();
    const updatedProductData = updatedDocSnapshot.data() as ProductData;

    const updatedProduct = {
      id: updatedDocSnapshot.id,
      price: updatedProductData.price,
      description: updatedProductData.description,
      name: updatedProductData.name,
      image: updatedProductData.image,
      total_price: itemTotalPrice,
      quantity: quantity
    };

    return res.json({ product: updatedProduct });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// get product by id
export const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const docRef = db.collection("products").doc(productId);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      return res.status(404).json({ error: "Product not found" });
    }

    const productData = docSnapshot.data();
    return res.json({
      product: {
        id: docSnapshot.id,
        ...productData
      }
    });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};