import { Routes, Route } from 'react-router-dom'
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import Home from './pages/home'
import { ProductList } from './pages/products'
import { CategoryList } from './pages/categories'
import { DefaultLayout } from './components/layout/DefaultLayout'
import './App.css'
import { theme as styledTheme } from './styles/theme'

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#0047AB',
    },
    secondary: {
      main: '#11114E',
    },
    background: {
      default: '#050516',
      paper: '#ffff',
    },
  },
})

function App() {
  return (
    <MUIThemeProvider theme={muiTheme}>
      <StyledThemeProvider theme={styledTheme}>
        <Routes>
          <Route path="/" element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          } />
          <Route path="/products" element={
            <DefaultLayout>
              <ProductList />
            </DefaultLayout>
          } />
          <Route path="/categories" element={
            <DefaultLayout>
              <CategoryList />
            </DefaultLayout>
          } />
        </Routes>
      </StyledThemeProvider>
    </MUIThemeProvider>
  )
}

export default App
