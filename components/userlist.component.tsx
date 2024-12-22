import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsersList } from "@/store/actions";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import LoaderComponen from "@/components/loader.component";
import apiInstance from "@/utils/apiInstance";
import { Link, Grid2, Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions } from '@mui/material';
import { useRouter } from "next/router";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const UserListComponent: React.FC = () => {
    const router = useRouter();
    const userLisstData = useSelector((state: any) => state?.users?.usersData);
    const dispatch = useDispatch();
    const paginationModel = { page: 0, pageSize: 10 };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'displayName', headerName: 'Display Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'phoneNumber', headerName: 'Mobile Phone', width: 130 },
        { field: 'emailVerified', headerName: 'Verified Email', width: 130 },
        { field: 'disabled', headerName: 'Status Acccount', width: 130 },
    ];

    const fetchUserList = async () => {
        apiInstance.get("adminusers/web").then((response) => {
            dispatch(getUsersList(response.data.data))
        }).catch((err: any) => {
        })
    }
    const deleteUser = async (uid: string) => {
        apiInstance.delete(`adminusers/web/${uid}`).then((response) => {
            fetchUserList()
        }).catch((err: any) => {
        })
    }
    useEffect(() => {
        fetchUserList()
    },[])

    return (
        <>
            <Grid2 size={12} style={{}}>
                <h3>User List:</h3>
            </Grid2>
            <Grid2 container spacing={1}>
                {
                    (!userLisstData && userLisstData == undefined) ? 
                            <>
                                <LoaderComponen/>
                            </>
                        :
                            
                            userLisstData.map((user: any) => {
                                return (
                                    <>  
                                        <Grid2 size={12}>
                                            <Card sx={{  marginBottom: "20px" }}>
                                                <CardActionArea>
                                                    <CardContent>
                                                        <Grid2 size={12}>
                                                            <Typography gutterBottom variant="body2" component="div">
                                                                { user.displayName }
                                                            </Typography>
                                                        </Grid2>
                                                        <Grid2 container spacing={1}>
                                                            <Grid2 size={3}>
                                                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>User ID:</Typography>
                                                            </Grid2>
                                                            <Grid2 size={8}>
                                                                <Typography variant="caption" sx={{ color: 'text.secondary' }}><strong>{user.uid}</strong></Typography>
                                                            </Grid2>
                                                        </Grid2>
                                                        <Grid2 container spacing={1}>
                                                            <Grid2 size={3}>
                                                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Email:</Typography>
                                                            </Grid2>
                                                            <Grid2 size={8}>
                                                                <Typography variant="caption" sx={{ color: 'text.secondary' }}><strong>{user.email}</strong></Typography>
                                                            </Grid2>
                                                        </Grid2>
                                                        <Grid2 container spacing={1}>
                                                            <Grid2 size={3}>
                                                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Phone:</Typography>
                                                            </Grid2>
                                                            <Grid2 size={8}>
                                                                <Typography variant="caption" sx={{ color: 'text.secondary' }}><strong>{user.phoneNumber}</strong></Typography>
                                                            </Grid2>
                                                        </Grid2>
                                                        <Grid2 container spacing={1}>
                                                            <Grid2 size={3}>
                                                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Verified:</Typography>
                                                            </Grid2>
                                                            <Grid2 size={8}>
                                                                <Typography variant="caption" sx={{ color: 'text.secondary' }}><strong>{user.emailVerified ? "Verified" : "Not Verified"}</strong></Typography>
                                                            </Grid2>
                                                        </Grid2>
                                                        <Grid2 container spacing={1}>
                                                            <Grid2 size={3}>
                                                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Status:</Typography>
                                                            </Grid2>
                                                            <Grid2 size={8}>
                                                                <Typography variant="caption" sx={{ color: 'text.secondary' }}><strong>{user.disabled ? "Active" : "Deactive"}</strong></Typography>
                                                            </Grid2>
                                                        </Grid2>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Button
                                                        variant="outlined"
                                                        startIcon={<EditIcon />}
                                                        onClick={() => {
                                                            router.push(`/user/${user.uid}`)
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        startIcon={<DeleteIcon />}
                                                        onClick={() => {
                                                            deleteUser(user.uid)
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid2>
                                        
                                    </>
                                )
                            })  
                }
            </Grid2>
        </>
    )
}

export default UserListComponent;