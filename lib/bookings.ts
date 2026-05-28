export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export async function getBookings(): Promise<Booking[]> {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('jj-bookings');
  return data ? JSON.parse(data) : [];
}

export async function saveBooking(booking: Omit<Booking, 'id'>): Promise<Booking> {
  const all = await getBookings();
  const newBooking = { ...booking, id: Date.now().toString() };
  all.push(newBooking);
  localStorage.setItem('jj-bookings', JSON.stringify(all));
  return newBooking;
}

export async function removeBooking(id: string) {
  const all = await getBookings();
  const filtered = all.filter(b => b.id !== id);
  localStorage.setItem('jj-bookings', JSON.stringify(filtered));
}

export async function updateBookingStatus(id: string, status: string) {
  const all = await getBookings();
  const updated = all.map(b => b.id === id ? { ...b, status } : b);
  localStorage.setItem('jj-bookings', JSON.stringify(updated));
}