import { FormData, FormErrors } from '../types';

export const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.companyName.trim()) {
    errors.companyName = 'Company name is required';
  }

  if (!formData.companyAddress.trim()) {
    errors.companyAddress = 'Company address is required';
  }

  if (!formData.declarantName.trim()) {
    errors.declarantName = 'Declarant name is required';
  }

  if (!formData.capacity) {
    errors.capacity = 'Capacity selection is required';
  }

  if (!formData.firmName.trim()) {
    errors.firmName = 'Firm/Company name is required';
  }

  if (!formData.firmAddress.trim()) {
    errors.firmAddress = 'Firm/Company address is required';
  }

  if (!formData.panNumber.trim()) {
    errors.panNumber = 'PAN number is required';
  } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber.toUpperCase())) {
    errors.panNumber = 'Invalid PAN format (e.g., ABCDE1234F)';
  }

  if (!formData.place.trim()) {
    errors.place = 'Place is required';
  }

  return errors;
};