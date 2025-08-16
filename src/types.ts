export interface FormData {
  companyName: string;
  companyAddress: string;
  declarantName: string;
  capacity: 'Proprietor' | 'Partner' | 'Director' | '';
  firmName: string;
  firmAddress: string;
  panNumber: string;
  financialYear: string;
  place: string;
  date: string;
}

export interface FormErrors {
  companyName?: string;
  companyAddress?: string;
  declarantName?: string;
  capacity?: string;
  firmName?: string;
  firmAddress?: string;
  panNumber?: string;
  place?: string;
}