import {
    ListSubheader, List, ListItem, ListItemIcon, ListItemText,
    Collapse, makeStyles
} from "@material-ui/core";
import AlbumIcon from '@material-ui/icons/Album';
import FolderIcon from '@material-ui/icons/Folder';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import AddIcon from '@material-ui/icons/Add';
import useRootContext from '../store/useRootContext';
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%'
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    listItem: {
        borderRadius: 40,
        margin: theme.spacing(1)
    },
    selected: {
        background: "#add8e647",
    }
}));

const SideMenu = () => {
    const { catalogContext, layoutContext } = useRootContext();
    const classes = useStyles();

    const handleSelection = ({ id }) => {
        layoutContext.dispatch({
            type: "setSideMenuSelection",
            id
        });
    }

    const handleShelvesExpandClick = () => {
        layoutContext.dispatch({
            type: "setShelvesMenuExpanded",
            shelvesMenuExpanded: !layoutContext.shelvesMenuExpanded
        })
    };

    const handleAddNewShelfClick = () => {
        layoutContext.dispatch({
            type: "setAddShelfModalOpen",
            addShelfModalOpen: true
        });
    }

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Catalog
                </ListSubheader>
            }
        >
            <ListItem 
                button
                className={clsx(!layoutContext.sideMenuSelection && classes.selected, classes.listItem)} 
                onClick={handleSelection}
            >
                <ListItemIcon>
                    <AlbumIcon />
                </ListItemIcon>
                <ListItemText primary="Records"/>
            </ListItem>
            <ListItem button onClick={handleShelvesExpandClick} className={clsx(classes.listItem)}>
                <ListItemIcon>
                    <PermMediaIcon />
                </ListItemIcon>
                <ListItemText primary="Shelves" />
                {layoutContext.shelvesMenuExpanded ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={layoutContext.shelvesMenuExpanded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        Object.values(catalogContext.shelves).map(shelf => (
                                <ListItem 
                                    button 
                                    className={clsx(layoutContext.sideMenuSelection === shelf.id && classes.selected, classes.nested, classes.listItem)}
                                    key={shelf.id} 
                                    onClick={() => handleSelection(shelf)}
                                >
                                    <ListItemIcon>
                                        <FolderIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={shelf.name} />
                                </ListItem>
                            )
                        )
                    }
                    <ListItem 
                        button
                        className={clsx(classes.nested, classes.listItem)}
                        key="add"
                        onClick={handleAddNewShelfClick}
                    >
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="New Shelf" />
                    </ListItem>
                </List>
            </Collapse>
        </List>
    )

}

export default SideMenu;