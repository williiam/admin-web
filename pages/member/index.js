import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Products from "../../shared/components/getProduct/products";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { pink } from "@mui/material/colors";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Cascader from "../../shared/components/getProduct/Cascader";
import {categories} from "../../shared/constants/product.js";
import { DataGrid } from '@mui/x-data-grid';
import * as api from "../../shared/utils/api";
import { useRouter } from "next/router";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  backgroundColor: "#F7F8FC",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};

function a11yProps(index, tab) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
    value: tab,
  };
}


const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const defaultFilter = {
  sale_status: "",
  show_sold_out: false,
  show_deleted: false,
};

export default function Product(props) {
  const [value, setValue] = React.useState("one");
  const [products, setProducts] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState(defaultFilter);
  const router = useRouter();

  const { status, data, error, isFetching, refetch } = useQuery(
    "products",
    async () => {
      const user = JSON.parse(localStorage.getItem("profile"));
      const { data } = await api.fetchAllProduct({
        seller: parseInt(user.result.id),
      });
      return data.data;
    }
  );

  React.useEffect(async () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    const response = await api.fetchAllProduct({
      seller: parseInt(user.result.id),
    });
    console.log("response :", response);
    if (response.data.status == 401) {
      //token??????
      alert("??????????????????,???????????????");
      router.push("/");
      return;
    }
    if (response.data.status === 404) {
      alert("?????????????????????");
    }
    setProducts(response.data.data);
    return () => {};
  }, []);

  const handleTabChange = (event, newValue) => {
    console.log("newValue :", newValue);
    setValue(newValue);
    changeFilterByTab(newValue);
  };

  const changeFilterByTab = (tab) => {
    if (tab == "ALL") {
      setFilter(defaultFilter);
    } else if (tab == "ACTIVE") {
      setFilter({ ...defaultFilter, sale_status: "ACTIVE" });
    } else if (tab == "SOLD_OUT") {
      setFilter({ ...defaultFilter, show_sold_out: true });
    } else if (tab == "DELETED") {
      setFilter({ ...defaultFilter, show_deleted: true });
    } else if (tab == "INACTIVE") {
      setFilter({ ...defaultFilter, sale_status: "INACTIVE" });
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleTabChange}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="??????"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="??????"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleTabChange}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="????????????"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="?????????"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleTabChange}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="??????"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="??????"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <div>
                  {/* <FormControlLabel
                    control={<Checkbox {...label} defaultChecked />}
                    label="??????"
                  />
                  */}

                  <FormControlLabel
                    control={
                      <Checkbox {...label} defaultChecked color="secondary" />
                    }
                    label="????????????"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox {...label} defaultChecked color="success" />
                    }
                    label="????????????"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...label}
                        defaultChecked
                        sx={{
                          color: pink[800],
                          "&.Mui-checked": {
                            color: pink[600],
                          },
                        }}
                      />
                    }
                    label="????????????"
                  /> 
                  <FormControlLabel
                    control={<Checkbox {...label} defaultChecked />}
                    label="??????????????????"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox {...label} defaultChecked color="default" />
                    }
                    label="????????????????????????"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-search"
                  label="????????????"
                  type="search"
                />
              </Grid>
              <Grid item xs={4}>
                <div>
                  <Cascader
                    options={categories}
                    placeholder="?????????????????????"
                    setDepartment={() => {}}
                    product={value}
                    setProduct={setValue}
                  />
                </div>
              </Grid>
              <Grid item xs={2}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    ????????????
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={10}
                    onChange={handleTabChange}
                    label="????????????"
                  >
                    <MenuItem value={10}>????????????</MenuItem>
                    <MenuItem value={20}>????????????</MenuItem>
                    <MenuItem value={30}>??????</MenuItem>
                    <MenuItem value={30}>??????</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="??????" {...a11yProps(0, "ALL")} />
              <Tab label="?????????" {...a11yProps(1, "ACTIVE")} />
              <Tab label="??????(?????????)" {...a11yProps(2, "SOLD_OUT")} />
              <Tab label="?????????" {...a11yProps(3, "DELETED")} />
              <Tab label="?????????" {...a11yProps(4, "INACTIVE")} />
            </Tabs>
          </AppBar>
          <Grid item xs={12}>
            <Item>
              {isFetching ? (
                <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                  <LinearProgress color="secondary" />
                  <LinearProgress color="success" />
                  <LinearProgress color="inherit" />
                </Stack>
              ) : (
                <div style={{ height: 400, width: '100%' }}>
                    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableSelectionOnClick
                />
                </div>
                </div>
                </div>
              </div>
              )}
            </Item>
          </Grid>
        </Grid>
      </Grid>

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
