import { AppBar, Grid, Typography, Button, makeStyles } from '@material-ui/core';
import useRootContext from '../store/useRootContext';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    },
    userMenuButtonItem: {
        textAlign: "right"
    },
    userMenuButton: {
        fontSize: 10
    }
}));


const AppBarBanner = ({ title }) => {

    const { layoutContext } = useRootContext();

    const classes = useStyles();

    const handleClick = () => {
        layoutContext.dispatch(({
            type: "setChangeUserModalOpen",
            changeUserModalOpen: true
        }))
    }

    return (
        <AppBar
            position="static"
            className={classes.root}
        >
            <Grid container align="flex-end">
                <Grid item xs={10}>
                    <Typography variant="h5">{title}</Typography>
                </Grid>
                <Grid item xs={2}
                    className={classes.userMenuButtonItem}>
                    <Button
                        variant="contained"
                        className={classes.userMenuButton}
                        onClick={handleClick}
                    >
                        Change User
                    </Button>
                </Grid>
            </Grid>
        </AppBar>
    )
};

export default AppBarBanner;