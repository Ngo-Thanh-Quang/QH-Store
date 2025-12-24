import { Request, Response } from 'express';
import { adminDb as db } from '../firebase';

// 1. Định nghĩa lại các Interface chuẩn xác
interface OrderItem {
  name: string;
  quantity: number;
  total_price: number;
}

interface TopOrder {
  order_id: string;
  total_amount: number;
  items: OrderItem[];
}

interface SimplifiedOrder {
  order_id: string;
  total_amount: number;
  item_count: number;
}

export const getWeeklyRevenue = async (req: Request, res: Response) => {
  try {
    const dateQuery = req.query.date as string;
    if (!dateQuery) return res.status(400).json({ error: "date query is required" });

    const parts = dateQuery.split("-");
    const baseDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    const dayOfWeek = baseDate.getDay();
    const diff = baseDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const startOfWeek = new Date(baseDate);
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // 2. Query Firestore
    const snapshot = await db.collection("orders")
      .where("created_at", ">=", startOfWeek)
      .where("created_at", "<=", endOfWeek)
      .get();

    let totalRevenue = 0;
    // Khởi tạo an toàn
    let topOrder: TopOrder = { order_id: "N/A", total_amount: 0, items: [] };
    const productMap = new Map<string, { name: string; quantity: number }>();
    const allOrders: SimplifiedOrder[] = []; // Để return mảng orders cho n8n

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      const amount = Number(data.total_amount || 0);
      const rawItems = Array.isArray(data.items) ? data.items : [];

      totalRevenue += amount;

      // Lưu vào danh sách đơn hàng tổng quát
      allOrders.push({
        order_id: data.order_id || doc.id,
        total_amount: amount,
        item_count: rawItems.length
      });

      // 3. Tìm Top Order (Xử lý sâu vào item.product.quantity)
      if (amount > topOrder.total_amount) {
        topOrder = {
          order_id: data.order_id || doc.id,
          total_amount: amount,
          items: rawItems.map((item: any) => {
            const p = item.product || {};
            return {
              name: p.name || item.name || "Sản phẩm không tên",
              quantity: Number(p.quantity || item.quantity || 0),
              total_price: Number(p.total_price || item.total_price || 0)
            };
          })
        };
      }

      // 4. Cộng dồn Top Product
      rawItems.forEach((item: any) => {
        const p = item.product || {};
        const id = p.id || "N/A";
        const qty = Number(p.quantity || item.quantity || 0);
        const name = p.name || item.name || "Không rõ";

        const existing = productMap.get(id);
        if (existing) {
          existing.quantity += qty;
        } else {
          productMap.set(id, { name, quantity: qty });
        }
      });
    });

    // 5. Xác định Top Product
    let topProduct = { product_id: "N/A", name: "Không có", quantity: 0 };
    if (productMap.size > 0) {
      const sorted = Array.from(productMap.entries()).sort((a, b) => b[1].quantity - a[1].quantity);
      topProduct = { product_id: sorted[0][0], name: sorted[0][1].name, quantity: sorted[0][1].quantity };
    }

    return res.json({
      success: true,
      total_orders: snapshot.size,
      total_revenue: totalRevenue,
      topOrder,
      topProduct,
      orders: allOrders, // Trả về mảng để render bảng
      week_start: startOfWeek,
      week_end: endOfWeek
    });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};