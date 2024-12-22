import styles from "../Home.module.css";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthUserContext';
import { useParams } from "next/navigation";
import UserListComponent from "@/components/userlist.component"
import { Button, Alert, Grid2, TextField, Box, Container, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff} from '@mui/icons-material';
import AddIcon from "@mui/icons-material/Add";
import apiInstance from "@/utils/apiInstance";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const EditUser = () => {
  const router = useRouter();
  const params = useParams();
  const authUser: any = useAuth();
  const { loading, signOut } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setError("")
    const payload = {
      email: email,
      phone: phoneNumber,
      displayName: displayName,
    }
    apiInstance.put(`adminusers/web/${params.id}`, payload).then((response) => {
      router.push("/dashboard")
    }).catch((err: any) => {
      setError(err);
    });
  };

  const getUserDetail = async (uid: any) => {
    await apiInstance.get(`/adminusers/web/${uid}`).then((response) => {
      setDisplayName(response.data.data.displayName)
      setEmail(response.data.data.email)
      setPhoneNumber(response.data.data.phoneNumber)
    }).catch((err: any) => {
      setError(err);
    });
  };

  useEffect(() => {
    if (!authUser.authUser)
    {
      router.push('/')
    }
    getUserDetail(params.id);
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
                          <h2 style={{textAlign: "center", marginBottom: "10px"}}>Edit User</h2>
                        </Grid2>
                        <Grid2 size={12}>
                          <form onSubmit={onSubmit}>
                            <Grid2 size={12}>
                              { error && <Alert color="error">{error}</Alert>}
                            </Grid2>
                            <Grid2 size={12}>
                              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                                <TextField
                                  type="text" 
                                  id="displayName"
                                  defaultValue={displayName} 
                                  onChange={(event) => setDisplayName(event.target.value)}
                                  name="displayName"
                                  placeholder="Display Name"
                                />
                              </FormControl>
                            </Grid2>
                            <Grid2 size={12}>
                              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                                <TextField
                                  type="text" 
                                  id="phoneNumber"
                                  defaultValue={phoneNumber} 
                                  onChange={(event) => setPhoneNumber(event.target.value)}
                                  name="phoneNumber"
                                  placeholder="Mobile Phone"
                                />
                              </FormControl>
                            </Grid2>
                            <Grid2 size={12}>
                              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                                <TextField
                                  type="email" 
                                  id="loginEmail"
                                  defaultValue={email} 
                                  onChange={(event) => setEmail(event.target.value)}
                                  name="email"
                                  placeholder="Email"
                                />
                              </FormControl>
                            </Grid2>
                            <Grid2 size={12} style={{ padding: '0 10px', marginTop: "20px"}}>
                              <Button type="submit" variant="contained">Save</Button>
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

export default EditUser;