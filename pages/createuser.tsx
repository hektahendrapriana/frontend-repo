import styles from "./Home.module.css";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthUserContext';
import UserListComponent from "@/components/userlist.component"
import { Button, Alert, Grid2, TextField, Box, Container, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff} from '@mui/icons-material';
import apiInstance from "@/utils/apiInstance";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const CreateUser = () => {
  const router = useRouter();
  const authUser: any = useAuth();
  const { loading, signOut } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  const [error, setError] = useState("");
  const { createUserWithEmailAndPassword } = useAuth();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordTwo = () => setShowPasswordTwo((show) => !show);

  const onSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setError("")
    if(passwordOne === passwordTwo)
    {
      const payload = {
        email: email,
        password: passwordTwo,
        phone: phoneNumber,
        displayName: displayName,
      }
      apiInstance.post("register", payload).then((response) => {
        router.push("/dashboard")
      }).catch((err: any) => {
        setError(err);
      });
    }
    else
    {
      setError("Password do not match")
    }
  };

  useEffect(() => {
    if (!authUser.authUser)
      router.push('/')
  }, [authUser])

  return (
    <div className={styles.page}>
      <header className={styles.header} style={{width: "100%", fontSize: 14}}>
        <Grid2 container style={{width: "100%", fontSize: 14}}>
          { 
            authUser && 
            <Grid2 container size={12} spacing={0}>
              <Grid2 size={6}>
                <strong>{ !authUser.authUser ? "" : authUser?.authUser?.email}</strong>
              </Grid2> 
              <Grid2 size={6} style={{textAlign: "right"}}>
                <Button type="button" onClick={signOut}>Sign out</Button>
              </Grid2> 
              <Grid2 size={12}>
                <hr className={styles.line} />
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIosIcon />}
                    onClick={() => {
                      router.push("/dashboard")
                    }}
                >
                    Back
                </Button>
              </Grid2>
            </Grid2>
          }
        </Grid2> 
      </header>
      <main className={styles.main}>
        {
          loading ?
            <Grid2 container style={{width: "100%"}}>Loading....</Grid2> :
            <>
              <Grid2 container style={{width: "100%", fontSize: 14}}>
                { 
                  authUser && 
                  <Grid2 size={12}>
                    <Box sx={{ flexGrow: 1, border: "1px solid #ededed", boxShadow: "10px 10px 20px 0px rgba(237,237,222,0.75)", padding: "20px", borderRadius: "10px" }}>
                      <Grid2 container style={{ padding: '10px', paddingRight: "40px"}}>
                        <Grid2 size={12}>
                          <h2 style={{textAlign: "center"}}>Register</h2>
                        </Grid2>
                        <Grid2 size={12}>
                          <form onSubmit={onSubmit}>
                            <Grid2 size={12}>
                              { error && <Alert color="error">{error}</Alert>}
                            </Grid2>
                            <Grid2 size={12}>
                              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="displayName">Display Name</InputLabel>
                                <OutlinedInput
                                  type="text" 
                                  id="displayName"
                                  defaultValue={displayName} 
                                  onChange={(event) => setDisplayName(event.target.value)}
                                  name="displayName"
                                  label="Display Name"
                                />
                              </FormControl>
                            </Grid2>
                            <Grid2 size={12}>
                              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="phoneNumber">Mobilephone</InputLabel>
                                <OutlinedInput
                                  type="text" 
                                  id="phoneNumber"
                                  defaultValue={phoneNumber} 
                                  onChange={(event) => setPhoneNumber(event.target.value)}
                                  name="phoneNumber"
                                  label="Mobilephone"
                                />
                              </FormControl>
                            </Grid2>
                            <Grid2 size={12}>
                              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
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
                              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="signUpPassword">Password</InputLabel>
                                <OutlinedInput
                                  id="signUpPassword"
                                  defaultValue={passwordOne} 
                                  onChange={(event) => setPasswordOne(event.target.value)}
                                  type={showPassword ? 'text' : 'password'}
                                  name="passwordOne"
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
                            <Grid2 size={12}>
                              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="signUpPassword2">Confirm Password</InputLabel>
                                <OutlinedInput
                                  id="signUpPassword2"
                                  defaultValue={passwordTwo} 
                                  onChange={(event) => setPasswordTwo(event.target.value)}
                                  type={showPasswordTwo ? 'text' : 'password'}
                                  name="password"
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label={
                                          showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPasswordTwo}
                                        edge="end"
                                      >
                                        {showPasswordTwo ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                  label="Confirm Password"
                                />
                              </FormControl>
                            </Grid2>
                            <Grid2 size={12} style={{ padding: '0 10px', marginTop: "20px"}}>
                              <Button type="submit" variant="contained">Create</Button>
                            </Grid2>
                          </form>
                        </Grid2>
                      </Grid2>
                    </Box>
                  </Grid2> 
                }
              </Grid2>
            </>
        }
      </main>
      <footer className={styles.footer}></footer>
    </div>
  )
}

export default CreateUser;