import logo from "../../assets/libromagic.svg"
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppBar, Button, Typography, Toolbar, Avatar } from '@material-ui/core'
import useStyles from './styles'
import { useState, useEffect } from "react"

const Navbar = () => {
    const classes = useStyles()
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        navigate('/')
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Recetas</Typography>
                <img className={classes.image} src={logo} alt="recipes logo" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name.charAt(0)} src={user.result.imageUrl}>
                            {user.result.name}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Cerrar sesión</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Iniciar sesión</Button>
                )} 
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;

