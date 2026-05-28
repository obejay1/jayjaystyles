import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_5zc6oqj';
const TEMPLATE_ID = 'template_kjdtr1e';
const PUBLIC_KEY = 's6dC8KFr7mb-jFanf';

export async function sendBookingConfirmation(booking: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  servicePrice: number;
  date: string;
  time: string;
}) {
  try {
    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        customerName: booking.customerName,
        customerEmail: booking.customerEmail,
        customerPhone: booking.customerPhone,
        serviceName: booking.serviceName,
        servicePrice: booking.servicePrice,
        date: booking.date,
        time: booking.time,
      },
      PUBLIC_KEY
    );
    
    console.log('Email sent!', result.text);
    return true;
  } catch (error) {
    console.error('Email failed:', error);
    return false;
  }
}