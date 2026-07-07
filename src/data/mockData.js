// Mock data standing in for a backend feed. Shapes are deliberately close
// to what a real grievance-management system (e.g. an eGov/PGRS-style tool)
// would return, so the UI decisions generalise past this fake dataset.

export const actionItems = [
  {
    id: 'GRV-24913',
    ward: 7,
    category: { en: 'Water Supply', hi: 'जल आपूर्ति' },
    context: {
      en: 'No water for 3 days, 40+ households, Shastri Nagar lane 4',
      hi: '3 दिनों से पानी नहीं, 40+ घर, शास्त्री नगर गली 4',
    },
    slaHoursRemaining: -6, // negative = overdue
  },
  {
    id: 'GRV-24907',
    ward: 12,
    category: { en: 'Road Damage', hi: 'सड़क क्षति' },
    context: {
      en: 'Pothole cluster near school gate, two-wheeler accidents reported',
      hi: 'स्कूल गेट के पास गड्ढे, दुपहिया वाहन दुर्घटनाएँ दर्ज',
    },
    slaHoursRemaining: 2,
  },
  {
    id: 'GRV-24902',
    ward: 3,
    category: { en: 'Sanitation', hi: 'स्वच्छता' },
    context: {
      en: 'Garbage not collected for 5 days, market area overflow',
      hi: '5 दिनों से कचरा नहीं उठा, बाज़ार क्षेत्र में जमाव',
    },
    slaHoursRemaining: -18,
  },
  {
    id: 'GRV-24888',
    ward: 21,
    category: { en: 'Streetlight', hi: 'स्ट्रीट लाइट' },
    context: {
      en: '9 consecutive streetlights out along canal road, safety concern',
      hi: 'नहर रोड पर लगातार 9 स्ट्रीट लाइट बंद, सुरक्षा चिंता',
    },
    slaHoursRemaining: 14,
  },
  {
    id: 'GRV-24876',
    ward: 7,
    category: { en: 'Drainage', hi: 'जल निकासी' },
    context: {
      en: 'Blocked storm drain, waterlogging risk before forecast rain',
      hi: 'अवरुद्ध नाला, बारिश से पहले जलभराव का खतरा',
    },
    slaHoursRemaining: 5,
  },
]

export const anomalies = [
  {
    id: 'ANOM-118',
    severity: 'high',
    text: {
      en: 'Ward 7 complaint volume up 340% vs 4-week average in the last hour',
      hi: 'वार्ड 7 में शिकायतें पिछले 1 घंटे में औसत से 340% अधिक',
    },
  },
  {
    id: 'ANOM-117',
    severity: 'medium',
    text: {
      en: '14 duplicate submissions detected from the same device fingerprint',
      hi: 'एक ही डिवाइस से 14 डुप्लीकेट शिकायतें दर्ज',
    },
  },
  {
    id: 'ANOM-115',
    severity: 'low',
    text: {
      en: 'Voice-note transcriptions failing intermittently on Ward 12 intake',
      hi: 'वार्ड 12 इनटेक पर वॉइस-नोट ट्रांसक्रिप्शन रुक-रुक कर विफल',
    },
  },
]
