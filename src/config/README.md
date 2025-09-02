# Backend Configuration

## How to Update Your Backend URL

To connect your frontend to your backend, you need to update the `BASE_URL` in `src/config/backend.js`.

### Step 1: Open the Configuration File
Open `src/config/backend.js` and find this line:

```javascript
BASE_URL: 'http://localhost:3000', // Change this to your backend URL
```

### Step 2: Update the URL
Replace `http://localhost:3000` with your actual backend URL:

**Examples:**
- **Local development**: `http://localhost:3000`
- **Custom port**: `http://localhost:5000`
- **Production**: `https://yourdomain.com`
- **IP address**: `http://192.168.1.100:3000`

### Step 3: Save and Test
After updating the URL, save the file and test your signup forms.

## Current API Endpoints

Your frontend is now configured to use these endpoints:

- **Consumer Registration**: `POST /api/auth/register` (with `role: "consumer"`)
- **Company Registration**: `POST /api/auth/register` (with `role: "company"`)

## Data Structure

### Consumer Signup Data
```json
{
  "role": "consumer",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "secret123",
  "firstName": "John",
  "lastName": "Doe",
  "address": "123 Street",
  "city": "Mumbai",
  "state": "MH",
  "pincode": "400001",
  "aadhaarNumber": "1234-5678-9012"
}
```

### Company Signup Data
```json
{
  "role": "company",
  "email": "info@abc.com",
  "phone": "9876543210",
  "password": "secret123",
  "companyName": "ABC Pvt Ltd",
  "ownerName": "Mr. Sharma",
  "companyAddress": "456 Industrial Area",
  "city": "Delhi",
  "state": "DL",
  "pincode": "110001",
  "panNumber": "ABCDE1234F",
  "gstinNumber": "29ABCDE1234F2Z5",
  "businessType": "Manufacturing",
  "businessDescription": "We manufacture..."
}
```

## Testing

1. Start your backend server
2. Update the `BASE_URL` in the config file
3. Test consumer signup
4. Test company signup
5. Check your backend logs to see the incoming data
