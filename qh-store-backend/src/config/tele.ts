import "dotenv/config";

interface TelegramConfig {
  baseUrl: string;
  defaultChatId?: string;
  botToken?: string;
}

const telegramConfig: TelegramConfig = {
  baseUrl: "https://api.telegram.org",
  defaultChatId: process.env.TELEGRAM_CHAT_ID,
  botToken: process.env.TELEGRAM_TOKEN,
};

export default telegramConfig;
