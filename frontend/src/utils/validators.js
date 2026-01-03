export const validators = {
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || "Invalid email address";
  },

  password: (value) => {
    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }
    return true;
  },

  required: (value) => {
    return !!value || "This field is required";
  },

  minLength: (min) => (value) => {
    return value.length >= min || `Minimum length is ${min}`;
  },

  maxLength: (max) => (value) => {
    return value.length <= max || `Maximum length is ${max}`;
  },

  rating: (value) => {
    const num = parseFloat(value);
    return (num >= 0 && num <= 10) || "Rating must be between 0 and 10";
  },

  year: (value) => {
    const year = parseInt(value);
    const currentYear = new Date().getFullYear();
    return (year >= 1900 && year <= currentYear) || "Invalid year";
  },
};
