import { createTheme } from '@mui/material';

const theme = createTheme();

export const lightTheme = createTheme(theme, {
  ...theme,
  palette: {
    type: 'light',
    primary: {
      main: '#7188B4',
      dark: '#7188B4',
      light: '#7188B4'
    },
    antiPrimary: {
      main: '#F0F0F0',
      dark: '#F0F0F0',
      light: '#F0F0F0',
      contrastText: '#7188B4'
    },
    secondary: {
      main: '#CEC3B3',
      light: '#CEC3B3',
      dark: '#CEC3B3',
      contrastText: '#4F4F4F'
    },
    /** 必修 */
    tertiary: {
      main: '#DAC09A',
      light: '#DAC09A',
      dark: '#DAC09A',
      contrastText: '#4F4F4F'
    },
    /** 群修 */
    background: {
      default: '#F0F0F0',
      paper: '#F0F0F0',
      white: '#FFFFFF',
      sendButton: '#E7E7E7',
    },
    /** 所有其他的背景顏色 */
    success: {
      main: '#6E9B6D',
      light: '#6E9B6D',
      dark: '#6E9B6D'
    },
    error: {
      main: '#CE5E5E',
      light: '#CE5E5E',
      dark: '#CE5E5E'
    },
    text: {
      primary: '#2D2D2D',
      disabled: '#B9B9B9',
      secondary: '#7188B4',
      hint: '#4F4F4F',
      tableTitle: '#B9B9B9'
    },
    uninteract: {
      main: '#E0E0E0',
      light: '#E0E0E0',
      dark: '#E0E0E0',
      contrastText: '#4F4F4F'
    },
    /** 不可互動 */
    info: {
      main: '#E0E0E0',
      light: '#E0E0E0',
      dark: '#E0E0E0',
      contrastText: '#4F4F4F'
    },
    disabled: {
      main: '#B9B9B9'
    },
    warning: {
      main: '#DAC09A',
      light: '#DAC09A',
      dark: '#DAC09A',
      contrastText: '#2D2D2D'
    }
  },
  typography: {
    fontFamily: `'Noto Sans TC', sans-serif`,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.8rem',
      fontFamily: `'Noto Sans TC', sans-serif`,
      fontWeight: 'bold',
      whiteSpace: 'nowrap', // this css make no line break.
    },
    /**
     * Frame Title, Header Title, Hedaer List Item
     */
    h3: {
      fontSize: '2rem', 
      fontWeight: 500,
    },
    /**
     * 課程清單 課程名稱
     */
    h4: {
      fontWeight: 500,
      fontSize: '1.1rem', 
      // whiteSpace: 'nowrap',
    },
    /**
     * 登記課表 課程方塊 課程名稱
     */
    subtitle1: {
      fontWeight: 300,
      fontSize: '1.2rem', 
    },
    /**
     * 課程清單 其他項目
     */
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 300,
    },
    /**
     * 登記課表 課程方塊 老師名稱
     */
    h5: {
      fontSize: '1.5rem',
      fontWeight: 400,
      whiteSpace: 'nowrap',
    },
    /**
     * 表格標題
     */
    subtitle3: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: '0%',
      fontFamily: `'Noto Sans TC', sans-serif`
    },
    /**
     * 搜尋標題
     */
    subtitle4: {
      fontSize: '0.8rem',
      fontWeight: 500,
      lineHeight: '0%',
      fontFamily: `'Noto Sans TC', sans-serif`
    },
    /**
     * 搜尋結果內容
     */
    subtitle5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: '0%',
      fontFamily: `'Noto Sans TC', sans-serif`
    },
    /**
     * 搜尋結果內容
     */
    body: {
      fontSize: '0.8rem',
      whiteSpace: 'nowrap',
    },
    rowFont: {
      fontSize: ['1.025rem', '!important'],
      // fontWeight: [300, '!important'],
      fontFamily: [`'Noto Sans TC', sans-serif`, '!important'],
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'Noto Sans TC', sans-serif;
      }`
    },
    MuiAppBar: {
      backgroundColor: 'transparent',
      fontFamily: `'Noto Sans TC', sans-serif`,
      maxHeight: '64px',
      minHeight: '64px',
    },
    MuiTypography: {
      fontFamily: `'Noto Sans TC', sans-serif`,
      defaultProps: {
        fontFamily: `'Noto Sans TC', sans-serif`
      }
    },
    MuiIcon: {
      styleOverrides: {
        root: {
        },
      }
    },
    MuiSvgIcon: {
      fontSize: 36,
      styleOverrides: {
        root: {
        },
      }
    },
    Home: {
      minWidth: 1170,
    },
    
  },
  props: {
    MuiAppBar: {
      backgroundColor: 'transparent',
      fontFamily: `'Noto Sans TC', sans-serif`,
      maxHeight: '64px',
      minHeight: '64px',
    },
  },
  shadows: {
    ...theme.shadows,
    frameInner: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
    frame: "-10px -11px 16px 1px rgba(252, 252, 252, 0.7), 9px 14px 24px -10px rgba(0, 0, 0, 0.25)",
    none: 'none !important',
    input: "inset 2px 2px 8px rgba(0, 0, 0, 0.25)",
    modal: "4px 8px 24px -10px rgba(0, 0, 0, 0.25)",
    row: "0px 4px 28px -7px rgba(0, 0, 0, 0.25)"
  },
  borderRadius: {
    modal: theme.spacing(4)
  },
  scrollbar: {
    main: {
      "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
        // backgroundColor: theme.palette.background.default,
        // boxShadow: theme.shadows.frameInner,
        backgroundColor: '#F0F0F0',
        boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",

        borderRadius: theme.spacing(1.5),
        width: theme.spacing(1.5),

      },
      "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
        borderRadius: theme.spacing(2),
        // backgroundColor: theme.palette.disabled.main,
        background: '#B9B9B9',
        minHeight: 24
      },
      "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
        // backgroundColor: theme.palette.background.default,
        backgroundColor: '#F0F0F0'
      },
      "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
        // backgroundColor: theme.palette.background.default,
        backgroundColor: '#F0F0F0'
      },
      "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
        // backgroundColor: theme.palette.primary.main,
        backgroundColor: '#7188B4'
      },
      "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
        // backgroundColor: theme.palette.background.default,
        backgroundColor: '#F0F0F0'
      },
      scrollBehavior: "smooth"
    },
    hidden: {
      "-ms-overflow-style": 'none',
      "scrollbar-width": 'none',
      "&::-webkit-scrollbar": {
        display: 'none'
      }
    }
  }
});

