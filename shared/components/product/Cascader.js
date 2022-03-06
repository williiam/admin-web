// Material Components
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button, Box, Menu, MenuItem, Typography } from '@mui/material';
// Main Components

// Styles
import { makeStyles, createStyles } from '@material-ui/styles';
// Hooks and Function
import { useState, Fragment } from 'react';
import { useEffect } from 'react';


const useStyles = makeStyles(theme => createStyles({
  menuButton: {
    color: `${theme.palette.primary.main} !important`,
    backgroundColor: `${theme.palette.background.default} !important`,
    cursor: 'pointer',
  },
  dropdownContainer: {
    '& .MuiButton-root': {
      marginRight: '1vw'
    },
    display: 'flex',
    alignItems: 'center'
  },
  menu: {
    '& .MuiMenuItem-root': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '1.1rem',
      fontWeight: 500,
      fontFamily: `'Noto Sans TC', sans-serif`,
      padding: '1px 10px'
    }
  }
}));

const Cascader = ({ options, placeholder, setDepartment, product, setProduct }) => {
  const classes = useStyles();
  const labels = options;

  const [optionIndex, setOptionIndex] = useState();
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);

  const handleChange = (event, newValue) => setValue(newValue);
  const handleChange2 = (event, newValue) => setValue2(newValue);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [subItems, setSubItems] = useState([]);
  const [text, setText] = useState('');

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorE2);

  const handleClick = (event) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index, subItems) => {
    handleChange(null, index);
    setAnchorE2(event.currentTarget);
    setSubItems(subItems);
    setOptionIndex(index)
  };

  const handleMenuItemClick2 = (event, index) => {
    setAnchorEl(null);
    handleChange2(null, index);
    setAnchorE2(null);
    setText(`${labels[value]?.value} / ${subItems[index]?.value}`);
    setDepartment(subItems[index].value);
    console.log('optionIndex :', optionIndex);
    console.log('options[optionIndex].value :', options[optionIndex].value);
    setProduct({ ...product, category: options[optionIndex].value,subCategory: subItems[index].value })
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorE2(null);
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        className={classes.menuButton}
      >
        {
          subItems.length === 0 ? placeholder : text
        }
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className={ classes.menu }
        required
      >
        {labels.map((tabLabel, i) => (
          <MenuItem
            key={tabLabel.label}
            selected={i === value}
            onClick={(event) => handleMenuItemClick(event, i, tabLabel.children)}
            className={ classes.menu }
          >
            {tabLabel.value}
            <ChevronRightIcon fontSize="small"/>
          </MenuItem>
        ))}
      </Menu>
      <Menu
        anchorEl={anchorE2}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open2}
        onClose={handleClose}
        className={ classes.menu }
      >
        {subItems.map((tabLabel, i) => (
          <MenuItem
            key={tabLabel.label}
            selected={i === value2}
            onClick={(event) => handleMenuItemClick2(event, i)}
          >
            {tabLabel.value}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  )
};

export default Cascader;