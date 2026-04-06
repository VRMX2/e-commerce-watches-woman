import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, Smartphone, MapPin, User, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <div className="container">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>لوحة التحكم (Admin)</h1>
            <p style={{ color: 'var(--text-muted)' }}>إدارة الطلبيات الواردة للمتجر</p>
          </div>
          <button onClick={fetchOrders} className="btn-premium" style={{ padding: '0.5rem 1rem', fontSize: '1rem', borderRadius: '8px' }}>
            تحديث
          </button>
        </header>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>جاري التحميل...</div>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>لا توجد طلبيات بعد.</div>
          ) : (
            <div className="admin-table-container">
              <table className="admin-table" dir="rtl">
                <thead>
                  <tr>
                    <th><User size={16} style={{ display: 'inline', marginRight: '0.5rem', marginInlineEnd: '0.5rem' }}/> الاسم</th>
                    <th><Smartphone size={16} style={{ display: 'inline', marginInlineEnd: '0.5rem' }}/> الهاتف</th>
                    <th><MapPin size={16} style={{ display: 'inline', marginInlineEnd: '0.5rem' }}/> العنوان</th>
                    <th><Package size={16} style={{ display: 'inline', marginInlineEnd: '0.5rem' }}/> الموديل</th>
                    <th><Clock size={16} style={{ display: 'inline', marginInlineEnd: '0.5rem' }}/> التاريخ</th>
                    <th>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td><strong style={{ color: 'white' }}>{order.fullName}</strong></td>
                      <td dir="ltr" style={{ textAlign: 'right' }}>{order.phone}</td>
                      <td>{order.wilaya} - {order.baladiya}</td>
                      <td><span style={{ color: 'var(--primary)' }}>{order.modelId.replace('_', ' ').toUpperCase()}</span></td>
                      <td>{new Date(order.createdAt).toLocaleDateString('ar-DZ')}</td>
                      <td>
                        <span className={`status-badge status-${order.status || 'pending'}`}>
                          {order.status === 'pending' ? 'أضيف للتو' : order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
