import * as yup from 'yup';

// Authentication schemas
export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export const signupSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
});

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

export const updatePasswordSchema = yup.object({
  passwordCurrent: yup
    .string()
    .required('Current password is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

// Profile schema
export const profileSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
});

// Bike schema (admin)
export const bikeSchema = yup.object({
  name: yup
    .string()
    .max(40, 'Name must be at most 40 characters')
    .required('Bike name is required'),
  engineCC: yup
    .number()
    .positive('Engine CC must be positive')
    .required('Engine CC is required'),
  weight: yup
    .number()
    .positive('Weight must be positive')
    .required('Weight is required'),
  price: yup
    .number()
    .positive('Price must be positive')
    .required('Price is required'),
  priceDiscount: yup
    .number()
    .min(0, 'Discount cannot be negative')
    .test('discount-less-than-price', 'Discount must be less than price', function(value) {
      return !value || value < this.parent.price;
    }),
  summary: yup
    .string()
    .required('Summary is required'),
  description: yup
    .string()
    .required('Description is required'),
  ratingsAverage: yup
    .number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
});

// Booking schema
export const bookingSchema = yup.object({
  bike: yup
    .string()
    .required('Please select a bike'),
  pickupLocation: yup
    .string()
    .required('Pickup location is required'),
  dropLocation: yup
    .string()
    .required('Drop location is required'),
  startDate: yup
    .date()
    .min(new Date(), 'Start date cannot be in the past')
    .required('Start date is required'),
  endDate: yup
    .date()
    .min(yup.ref('startDate'), 'End date must be after start date')
    .required('End date is required'),
});

// User preferences schema
export const preferencesSchema = yup.object({
  price: yup.object({
    min: yup.number().min(0, 'Minimum price cannot be negative'),
    max: yup.number().positive('Maximum price must be positive'),
  }),
  engineCC: yup.object({
    min: yup.number().min(0, 'Minimum engine CC cannot be negative'),
    max: yup.number().positive('Maximum engine CC must be positive'),
  }),
  weight: yup.object({
    min: yup.number().min(0, 'Minimum weight cannot be negative'),
    max: yup.number().positive('Maximum weight must be positive'),
  }),
});