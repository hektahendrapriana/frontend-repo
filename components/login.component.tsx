import { useState } from 'react';
import { useRouter } from 'next/router';
import { Link, Button, Alert, Grid2, TextField, Box, Container, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { useAuth } from '@/context/AuthUserContext';
import { Visibility, VisibilityOff} from '@mui/icons-material';
// import { postApi } from '@/apis/api';
import apiInstance from '@/utils/apiInstance';

export default function LoginComponent(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();
  

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const onSubmit = async (event: { preventDefault: () => void; }) => {
    setError(null)
    const payload = {
      email: email,
      password: password
    }
    
    signInWithEmailAndPassword(email, password)
    .then((authUser: any) => {
      apiInstance.post("signin", payload).then((response) => {
        const userData  = response?.data.data;
        localStorage.setItem("accessToken", userData.token)
        router.push('/dashboard');
      }).catch((err: any) => {
        setError(err);
      });
    })
    .catch(error => {
      setError(error.message)
    });
    event.preventDefault();
  };


  return (
    <Box sx={{ flexGrow: 1, border: "1px solid #ededed", boxShadow: "10px 10px 20px 0px rgba(237,237,222,0.75)", padding: "20px", borderRadius: "10px" }}>
      <Grid2 container style={{ padding: '10px', paddingRight: "40px"}}>
        <Grid2 size={12}>
          <h2 style={{textAlign: "center"}}>Login</h2>
        </Grid2>
        <Grid2 size={12}>
          <form onSubmit={onSubmit} method='post'>
            <Grid2 size={12}>
              { error && <Alert color="error">{error}</Alert>}
            </Grid2>
            <Grid2 size={12}>
              <FormControl fullWidth sx={{ m: 2 }} variant="outlined">
                <InputLabel htmlFor="loginEmail">Email</InputLabel>
                <OutlinedInput
                  type="email" 
                  id="loginEmail"
                  defaultValue={email} 
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  label="Email"
                />
              </FormControl>
            </Grid2>
            <Grid2 size={12}>
              <FormControl fullWidth sx={{ m: 2 }} variant="outlined">
                <InputLabel htmlFor="loginPassword">Password</InputLabel>
                <OutlinedInput
                  id="loginPassword"
                  defaultValue={password} 
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? 'hide the password' : 'display the password'
                        }
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid2>
            <Grid2 size={12} style={{ padding: '0 20px', marginTop: "10px"}}>
              <Button type="submit" variant="contained">Login</Button>
            </Grid2>
            <Grid2 size={12} style={{ padding: '20px'}}>
              No account? 
              <Link 
                component="button" 
                variant="body2" 
                onClick={() => {
                  router.push("/register")
                }}
              >Register</Link>
            </Grid2>
          </form>
        </Grid2>
      </Grid2>
    </Box>
  )
}