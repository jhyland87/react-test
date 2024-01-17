export const name_validation = {
  name: 'name',
  label: 'name',
  type: 'text',
  id: 'name',
  placeholder: 'Full Name',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}



//  one of blue, red, green, yellow, purple, black, orange 
export const color_validation = {
  name: 'color',
  //type: 'select',
  label: 'favorite color',
  id: 'color',
  placeholder: 'Blue/red/green/yellow/purple/black/orange',
  validation: {
    pattern: {
      value: /^(blue|red|green|yellow|purple|black|orange)$/i,
      message: 'Must be one of: blue, red, green, yellow, purple, black or orange',
    },  
  },
  options: [
    { value: 'blue', label: 'Blue', name: 'tester' },
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'purple', label: 'Purple' },
    { value: 'black', label: 'Black' },
    { value: 'orange', label: 'Orange' }
  ]
}

export const password_validation = {
  name: 'password',
  label: 'password',
  type: 'password',
  id: 'password',
  placeholder: 'Super secret password',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    minLength: {
      value: 6,
      message: 'min 6 characters',
    },
    maxLength: {
      value: 32,
      message: 'max 32 characters',
    },
     pattern: {
      value: /(?=(.*\d){2})(?=(.*[A-Z]){2})(?=(.*[^0-9a-zA-Z])+)/,
      message: 'Must contain 2 upper case, 2 numeric, and 1 special character',
    },  
  },
}

export const password2_validation = {
  ...password_validation,
  name: 'password2',
  label: 'verify password',
  id: 'password2',
  placeholder: 'Verify super secret password'
}

export const phone_validation = {
  name: 'phone',
  label: 'phone number',
  type: 'text',
  id: 'phone',
  placeholder: '(000) 000-0000',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    pattern: {
      value:
        /^(\+[0-9])?\s?\(?[0-9]{3}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{4}$/,
      message: 'Invalid format (at least 10 numbers)',
    },
  },
}

export const email_validation = {
  autoFocus: true,
  name: 'email',
  label: 'email address',
  type: 'email',
  id: 'email',
  placeholder: 'user@domain.com',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Invalid E-mail format',
    },
  },
}

export const login_email_validation = {
  name: 'email',
  label: 'email address',
  type: 'email',
  id: 'email',
  placeholder: 'user@domain.com',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
  },
}

export const login_password_validation = {
  name: 'password',
  label: 'password',
  type: 'password',
  id: 'password',
  placeholder: '*****',
  validation: {
    required: {
      value: true,
      message: 'required',
    }
  }
}
