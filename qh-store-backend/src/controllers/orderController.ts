import { Request, Response } from 'express';
import { adminDb as db } from '../firebase'; 
import admin from "firebase-admin";


interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderRequestBody {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  total_amount: number;
  status: string;
  items: OrderItem[];
  created_at: string;
}

// CREATE ORDER
export const createOrder = async (req: Request<{}, {}, OrderRequestBody>, res: Response) => {
  try {
    const { 
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      total_amount,
      status,
      items,
      created_at 
    } = req.body;

    if (!customer_name || !customer_email || !customer_phone || !shipping_address || !total_amount || !status || !items || !created_at) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const createdDate = new Date(created_at);

    const docRef = await db.collection("orders").add({
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      total_amount,
      status,
      items,
      created_at: admin.firestore.Timestamp.fromDate(createdDate),
    });

    return res.json({
      success: true,
      message: "Order created successfully",
      order_id: docRef.id,
      customer_name,
      customer_phone,
      shipping_address,
      total_amount,
      createdDate
    });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

