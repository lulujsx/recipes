import React, { useState} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'
import Icon from './icon'
import { useNavigate } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'
const initialState={firstName:"", lastName:"", email:"", password:"", confirmPassword:""}

const Auth = () => {
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = (e) => {
       e.preventDefault()
      if(isSignup){
        dispatch(signup(formData,navigate))
      }else{
        dispatch(signin(formData,navigate))
      }
    }
    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
    }
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
          dispatch({ type: 'AUTH', data: { result, token } })
          navigate("/")
        } catch (error) {
          console.log(error)
        }

    }
    
      const googleError = (error) => {  
          console.log(error)
      }

    return (
        <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Registrarse' : 'Iniciar sesión' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="Nombre" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Apellido" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Correo electrónico" handleChange={handleChange} type="email" />
            <Input name="password" label="Contraseña" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repetir contraseña" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Registrarse' : 'Iniciar sesión' }
          </Button>
          <GoogleLogin
            clientId="807285105310-qnbla34n87h6d7upfirs6vnkads3el05.apps.googleusercontent.com"
            render={renderProps => (
                <Button 
                    className={classes.googleButton} 
                    fullWidth 
                    variant="contained" 
                    color="secondary" 
                    onClick={renderProps.onClick} 
                    disabled={renderProps.disabled} 
                    startIcon={<Icon/>}
                >Iniciar sesión con Google</Button>
                )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
            />
          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
            </Paper>
        </Container>
    );
};

export default Auth;