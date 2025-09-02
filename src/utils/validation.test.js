import { consumerValidation, companyValidation, validateForm, validateField } from './validation';

// Test consumer validation
console.log('=== Consumer Validation Tests ===');

const validConsumerData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '1234567890',
  password: 'Password123!',
  address: '123 Main Street',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400001',
  aadhaarNumber: '123456789012'
};

const invalidConsumerData = {
  firstName: 'J', // Too short
  lastName: 'Doe',
  email: 'invalid-email',
  phone: '123', // Too short
  password: 'weak', // Too weak
  address: '123 Main Street',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '123', // Too short
  aadhaarNumber: '123' // Too short
};

console.log('Valid consumer data:', validateForm(consumerValidation, validConsumerData));
console.log('Invalid consumer data:', validateForm(consumerValidation, invalidConsumerData));

// Test company validation
console.log('\n=== Company Validation Tests ===');

const validCompanyData = {
  companyName: 'Tech Solutions Ltd',
  ownerName: 'Jane Smith',
  email: 'jane@techsolutions.com',
  phone: '9876543210',
  password: 'SecurePass456!',
  companyAddress: '456 Business Park',
  city: 'Delhi',
  state: 'Delhi',
  pincode: '110001',
  panNumber: 'ABCDE1234F',
  gstin: '07ABCDE1234F1Z5',
  businessType: 'Technology',
  businessDescription: 'We provide innovative technology solutions for businesses.'
};

const invalidCompanyData = {
  companyName: 'A', // Too short
  ownerName: 'Jane Smith',
  email: 'invalid-email',
  phone: '123', // Too short
  password: 'weak', // Too weak
  companyAddress: '456 Business Park',
  city: 'Delhi',
  state: 'Delhi',
  pincode: '123', // Too short
  panNumber: 'INVALID', // Wrong format
  gstin: 'INVALID', // Wrong format
  businessType: '', // Empty
  businessDescription: 'Short' // Too short
};

console.log('Valid company data:', validateForm(companyValidation, validCompanyData));
console.log('Invalid company data:', validateForm(companyValidation, invalidCompanyData));

// Test individual field validation
console.log('\n=== Field Validation Tests ===');

console.log('Email validation:', validateField(consumerValidation, 'email', 'test@example.com'));
console.log('Invalid email validation:', validateField(consumerValidation, 'email', 'invalid-email'));
console.log('Phone validation:', validateField(consumerValidation, 'phone', '1234567890'));
console.log('Invalid phone validation:', validateField(consumerValidation, 'phone', '123'));

export { validConsumerData, validCompanyData };
