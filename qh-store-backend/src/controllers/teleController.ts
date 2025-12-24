import { Request, Response } from 'express';
import axios from 'axios';
import FormData from 'form-data';
import telegramConfig from '../config/tele';

export const sendMessage = async (req: Request, res: Response) => {
  const message = req.body?.message;
  const file = req.file; 

  if (!telegramConfig.botToken) {
    return res.status(500).json({
      ok: false,
      error: 'TELEGRAM_TOKEN chưa được cấu hình',
    });
  }

  if (!telegramConfig.defaultChatId) {
    return res.status(400).json({
      ok: false,
      error: 'CHAT_ID chưa được cấu hình',
    });
  }

  try {
    //send file
    if (file) {
      const form = new FormData();

      form.append('chat_id', telegramConfig.defaultChatId);

      form.append('document', file.buffer, {
        filename: file.originalname,  
        contentType: file.mimetype,    
      });

      const url = `${telegramConfig.baseUrl}/bot${telegramConfig.botToken}/sendDocument`;

      const telegramRes = await axios.post(url, form, {
        headers: form.getHeaders(),
      });

      return res.json({ ok: true, data: telegramRes.data });
    }

    if (!message) {
      return res.status(400).json({
        ok: false,
        error: 'Thiếu message hoặc file',
      });
    }

    const url = `${telegramConfig.baseUrl}/bot${telegramConfig.botToken}/sendMessage`;

    const telegramRes = await axios.post(url, {
      chat_id: telegramConfig.defaultChatId,
      text: message,
      parse_mode: 'HTML',
    });

    return res.json({ ok: true, data: telegramRes.data });

  } catch (err: any) {
    return res.status(500).json({
      ok: false,
      error: err.response?.data || err.message,
    });
  }
};
