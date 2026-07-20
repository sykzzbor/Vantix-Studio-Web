export const SITE_URL = "https://www.vantixdigitalweb.com.ar";

export const APP_URL = "https://proyecto-vantix-app.vercel.app";
export const APP_LOGIN_URL = `${APP_URL}/login`;
export const APP_REGISTER_URL = `${APP_URL}/registro`;

export const WHATSAPP_NUMBER = "543525617652";

export function whatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const DEMO_WHATSAPP_MESSAGE =
  "Hola, quiero agendar una demostración de VantixApp.";

export const CONTACT_EMAIL = "vantixdigitalweb@gmail.com";
export const INSTAGRAM_URL = "https://www.instagram.com/vantixdesign.studio/";
