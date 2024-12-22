import styles from "./Home.module.css";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthUserContext';
import UserListComponent from "@/components/userlist.component"
import { Grid2, Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";

const Dashboard = () => {
  const authUser: any = useAuth();
  const { loading, signOut } = useAuth();
  const router = useRouter();

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
                    startIcon={<AddIcon />}
                    onClick={() => {
                      router.push("/createuser")
                    }}
                >
                    Create New User
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
                    <UserListComponent />
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

export default Dashboard;