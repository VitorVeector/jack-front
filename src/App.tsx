import { CssBaseline } from '@mui/material';
import { BoxContainer, Container, GlobalStyle, theme } from './globalStyle';
import { Home } from './pages/Home';
import { ThemeProvider } from '@mui/material/styles'
import { Main } from './pages/Main';
import { Register } from './pages/Register/indext';
import { Login } from './pages/Login';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyle />
            <div className="App">
                <Container>
                    <BoxContainer>
                        {/* <Home /> */}
                        {/* <Main/> */}
                        {/* <Register/> */}
                        <Login />
                    </BoxContainer>
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default App;
