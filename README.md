# LetsGo Frontend

A React-based frontend application for the LetsGo platform with integrated Joi validation.

## Validation System

This project uses Joi for form validation to ensure data integrity between frontend and backend.

### Validation Schemas

#### Consumer Validation
- **firstName**: String, 2-30 characters, required
- **lastName**: String, 2-30 characters, required
- **email**: Valid email format, required
- **phone**: 10-digit phone number, required
- **password**: Minimum 8 characters, must contain number and special character (!@#$%^&*), required
- **address**: String, required
- **city**: String, required
- **state**: String, required
- **pincode**: 6-digit pincode, required
- **aadhaarNumber**: 12-digit Aadhaar number, required

#### Company Validation
- **companyName**: String, minimum 2 characters, required
- **ownerName**: String, required
- **email**: Valid email format, required
- **phone**: 10-digit phone number, required
- **password**: Minimum 8 characters, must contain number and special character (!@#$%^&*), required
- **companyAddress**: String, required
- **city**: String, required
- **state**: String, required
- **pincode**: 6-digit pincode, required
- **panNumber**: PAN format (ABCDE1234F), required
- **gstin**: 15-character GSTIN, required
- **businessType**: String, required
- **businessDescription**: String, maximum 500 characters, required

### Usage

#### Import Validation Schemas
```javascript
import { consumerValidation, companyValidation, validateForm, validateField } from '../utils/validation';
```

#### Validate Entire Form
```javascript
const validation = validateForm(consumerValidation, formData);
if (!validation.isValid) {
  setErrors(validation.errors);
  return;
}
```

#### Validate Individual Field
```javascript
const fieldError = validateField(consumerValidation, 'email', emailValue);
if (fieldError) {
  setErrors(prev => ({ ...prev, email: fieldError }));
}
```

### Features

- **Real-time Validation**: Fields are validated on blur
- **Form-level Validation**: Complete form validation before submission
- **Error Handling**: User-friendly error messages
- **Backend Compatibility**: Validation rules match backend Joi schemas exactly
- **Responsive Design**: Mobile-friendly forms with proper spacing

### API Integration

The forms are designed to work seamlessly with your backend API endpoints:

- Consumer Signup: `POST /api/consumer/signup`
- Company Signup: `POST /api/company/signup`

### Installation

```bash
npm install
npm install joi
```

### Running the Application

```bash
npm run dev
```

### Validation Rules

All validation rules are defined in `src/utils/validation.js` and match your backend Joi schemas exactly. This ensures:

1. **Data Consistency**: Frontend and backend validation rules are identical
2. **User Experience**: Users get immediate feedback on invalid input
3. **Security**: Prevents invalid data from reaching your backend
4. **Maintainability**: Single source of truth for validation rules

### Error Messages

The validation system provides clear, actionable error messages for users:

- Field-specific errors appear below each input
- Form-level errors appear at the top of the form
- Errors are cleared when users start typing in the field
- All required fields are clearly marked with asterisks (*)
