import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  components: {
    Button: {
      baseStyle: {},
    },
  },
  colors: {
    brand: {
      blue: '#26547C',
      pink: '#EF476F',
      yellow: '#FFD166',
      green: '#06D6A0',
      white: '#FCFCFC',
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
});

export default theme;
