/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserratThin: 'Montserrat-Thin',
        montserratLight: 'Montserrat-Light',
        montserratRegular: 'Montserrat-Regular',
        montserratMedium: 'Montserrat-Medium',
        montserratSemiBold: 'Montserrat-SemiBold',
        montserratBold: 'Montserrat-Bold',
        montserratExtraBold: 'Montserrat-ExtraBold',
        montserratBlack: 'Montserrat-Black',
      }
    },
  },
  plugins: [],
}

