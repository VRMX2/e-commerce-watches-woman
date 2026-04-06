import React, { useState } from 'react';
import axios from 'axios';
import { ShoppingBag, CheckCircle, ChevronDown, Check } from 'lucide-react';

const wilayas = [
  "1 - Adrar", "2 - Chlef", "3 - Laghouat", "4 - Oum El Bouaghi", "5 - Batna",
  "6 - Béjaïa", "7 - Biskra", "8 - Béchar", "9 - Blida", "10 - Bouira",
  "11 - Tamanrasset", "12 - Tébessa", "13 - Tlemcen", "14 - Tiaret", "15 - Tizi Ouzou",
  "16 - Alger", "17 - Djelfa", "18 - Jijel", "19 - Sétif", "20 - Saïda",
  "21 - Skikda", "22 - Sidi Bel Abbès", "23 - Annaba", "24 - Guelma", "25 - Constantine",
  "26 - Médéa", "27 - Mostaganem", "28 - M'Sila", "29 - Mascara", "30 - Ouargla",
  "31 - Oran", "32 - El Bayadh", "33 - Illizi", "34 - Bordj Bou Arréridj", "35 - Boumerdès",
  "36 - El Tarf", "37 - Tindouf", "38 - Tissemsilt", "39 - El Oued", "40 - Khenchela",
  "41 - Souk Ahras", "42 - Tipaza", "43 - Mila", "44 - Aïn Defla", "45 - Naâma",
  "46 - Aïn Témoucheent", "47 - Ghardaïa", "48 - Relizane", "49 - Timimoun", "50 - Bordj Badji Mokhtar",
  "51 - Ouled Djellal", "52 - Béni Abbès", "53 - In Salah", "54 - In Guezzam", "55 - Touggourt",
  "56 - Djanet", "57 - El M'Ghair", "58 - El Meniaa"
];

const models = [
  { id: 'model_1', name: 'أطقم ساعات و أساور نسائية - الموديل 1', price: '4500 DA', image: '/images/media__1775475665797.jpg' },
  { id: 'model_2', name: 'أطقم ساعات و أساور نسائية - الموديل 2', price: '4500 DA', image: '/images/media__1775475665834.jpg' },
  { id: 'model_3', name: 'أطقم ساعات و أساور نسائية - الموديل 3', price: '4500 DA', image: '/images/media__1775475665883.jpg' },
  { id: 'model_4', name: 'أطقم ساعات و أساور نسائية - الموديل 4', price: '4500 DA', image: '/images/media__1775475665910.jpg' },
];

export default function LandingPage() {
  const [selectedModel, setSelectedModel] = useState(models[0].id);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    wilaya: wilayas[15], // Default Oran/Alger etc
    baladiya: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:5000/api/orders', {
        ...formData,
        modelId: selectedModel
      });
      setIsSuccess(true);
      setFormData({ fullName: '', phone: '', wilaya: wilayas[15], baladiya: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Failed to submit order', error);
      alert('حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ paddingBottom: '5rem' }}>
      {/* Hero Section */}
      <header style={{ 
        minHeight: '60vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center',
        background: 'radial-gradient(circle at center, #1a1a1a 0%, #000 100%)',
        borderBottom: '1px solid var(--border-color)',
        padding: '2rem'
      }}>
        <div className="container animate-fade-in">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>أناقة لا مثيل لها</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem auto', direction: 'rtl' }}>
          تألقي بأجمل أطقم الساعات والأساور النسائية. تصاميم عصرية تناسب كل الأذواق، اختاري الموديل الذي يعبر عنك الآن. الدفع عند الاستلام.
          </p>
          <a href="#order-section" className="btn-premium" style={{ display: 'inline-block', direction: 'rtl' }}>
             اطلب الان <ShoppingBag size={20} />
          </a>
        </div>
      </header>

      {/* Models Section */}
      <section className="container" style={{ padding: '4rem 1rem' }} id="model-section">
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>اختاري الموديل الخاص بك</h2>
        <div className="model-grid">
          {models.map((model, index) => (
            <div 
              key={model.id} 
              className={`model-card animate-fade-in delay-${index * 100} ${selectedModel === model.id ? 'selected' : ''}`}
              onClick={() => {
                setSelectedModel(model.id);
                document.getElementById('order-section').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <img src={model.image} alt={model.name} />
              <div className="model-overlay">
                <h3 className="model-title">{model.name}</h3>
                <div className="model-price">{model.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order-section" className="container animate-fade-in" style={{ padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }} className="glass-card">
          <div style={{ padding: '2rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2rem', color: 'var(--primary)' }}>معلومات التوصيل</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem', direction: 'rtl' }}>أدخلي معلوماتك وسيتم التواصل معك لتأكيد الطلب</p>
            
            {isSuccess ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <CheckCircle size={64} color="var(--primary)" style={{ margin: '0 auto 1.5rem auto' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>تم تقديم طلبك بنجاح!</h3>
                <p style={{ color: 'var(--text-muted)' }}>سنتصل بك قريباً لتأكيد الطلب لتوصيله.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rtl-form">
                <div className="form-group">
                  <label className="form-label" htmlFor="fullName">الاسم الكامل</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    className="form-control" 
                    placeholder="مريم بن..." 
                    required 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">رقم الهاتف</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="form-control" 
                    placeholder="05..." 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                
                <div className="form-group" style={{ position: 'relative' }}>
                  <label className="form-label" htmlFor="wilaya">الولاية</label>
                  <select 
                    id="wilaya" 
                    className="form-control" 
                    required
                    value={formData.wilaya}
                    onChange={(e) => setFormData({...formData, wilaya: e.target.value})}
                    style={{ appearance: 'none' }}
                  >
                    {wilayas.map(w => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                  <ChevronDown size={20} style={{ position: 'absolute', left: '1rem', top: '2.5rem', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="baladiya">البلدية</label>
                  <input 
                    type="text" 
                    id="baladiya" 
                    className="form-control" 
                    placeholder="أدخل البلدية" 
                    required 
                    value={formData.baladiya}
                    onChange={(e) => setFormData({...formData, baladiya: e.target.value})}
                  />
                </div>

                <div className="form-group" style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(203, 162, 88, 0.1)', borderRadius: '12px', border: '1px solid rgba(203, 162, 88, 0.3)' }}>
                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                     <span style={{ fontWeight: 'bold' }}>الموديل المختار:</span>
                     <span>{models.find(m => m.id === selectedModel)?.name}</span>
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                     <span>المجموع:</span>
                     <span>4500 DA</span>
                   </div>
                </div>
                
                <button 
                  type="submit" 
                  className="btn-premium" 
                  style={{ width: '100%', marginTop: '1rem' }} 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'جاري الإرسال...' : 'اطلب الان'}
                </button>
                <div style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  الدفع عند الاستلام <Check size={16} style={{ display: 'inline', verticalAlign: 'middle', color: 'var(--primary)' }} />
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
