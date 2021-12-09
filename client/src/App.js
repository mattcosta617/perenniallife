import React from 'react';
import { Container } from '@material-ui/core';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const App = () => {
    return (
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <Container max-width="lg">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='/auth' element={<Auth />} />
                </Routes>
            </Container>
        </ThemeProvider>
    </BrowserRouter>
    );
}

export default App;