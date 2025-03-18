import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      ...defaultTheme,
      transitionProperty: {
        height: 'height',
        'font-weight': 'font-weight',
      },
      width: {
        fixed: '1151px',
        '5/100': '5%',
        '10/100': '10%',
        '15/100': '15%',
        '20/100': '20%',
        '25/100': '25%',
        '30/100': '30%',
        '35/100': '35%',
        '40/100': '40%',
        '45/100': '45%',
        '50/100': '50%',
        '55/100': '55%',
        '60/100': '60%',
        '65/100': '65%',
        '70/100': '70%',
        '75/100': '75%',
        '80/100': '80%',
        '85/100': '85%',
        '90/100': '90%',
        '95/100': '95%',
      },
      borderWidth: {
        5: '5px',
        10: '10px',
      },
    },
  },
  plugins: [],
};
