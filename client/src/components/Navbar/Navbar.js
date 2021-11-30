import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Typography, Toolbar, Button } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import Memories from '../../images/memories.PNG';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

function Navbar() {
    const classes = useStyles();
        const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const logout = () => {
       dispatch({ type: 'LOGOUT' });

        navigate('/');
        setUser(null);
    };

        useEffect(() => {
            const token = user?.token;

            if(token) {
                const decodedToken = decode(token);

                if(decodedToken.exp * 1000 < new Date().getTime()) logout();
            }

            setUser(JSON.parse(localStorage.getItem('profile')));
        }, [location, user?.token]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Perrenial Life</Typography>
                <img className={classes.image} src={Memories} alt="memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>

                )}
            </Toolbar>
        </AppBar>
    );
}


export default Navbar;