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
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Cascader from "./Cascader";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Slider from "@mui/material/Slider";
import { makeStyles, createStyles } from "@material-ui/styles";
import moment from "moment";
import * as api from "../../utils/api";
const steps = ["????????????", "????????????", "????????????"];
const defaultProduct = {
  name: "",
  description: "",
  brand: "",
  category: "",
  sub_category: "",
  img_file_name: "",
  img_file: "",
  price: "",
  qty: "",
  has_variant: false,
  shipping_method: "PICK_UP_AND_PAY",
  notice: "",
  sale_status: "ACTIVE",
  selling_mode: "GROUP_BUY",
  group_buy_end_date: (()=>{return moment(new Date()).format("YYYY-MM-DD")})(),
  group_buy_upper_qty: "",
  group_buy_lower_qty: "",
  variant: [],
  promotion: [],
};

const marks = [
  {
    value: 0,
    label: "0??C",
  },
  {
    value: 0.1,
    label: "??????",
  },
  {
    value: 0.2,
    label: "??????",
  },
  {
    value: 0.3,
    label: "??????",
  },
  {
    value: 0.4,
    label: "??????",
  },
  {
    value: 0.5,
    label: "??????",
  },
  {
    value: 0.6,
    label: "??????",
  },
  {
    value: 0.7,
    label: "??????",
  },
  {
    value: 0.8,
    label: "??????",
  },
  {
    value: 0.9,
    label: "??????",
  },
  {
    value: 1,
    label: "??????",
  },
];

const useStyles = makeStyles((theme) =>
  createStyles({
    slider: {
      color: `${theme.palette.primary.dark} !important`,
      // backgroundColor: `${theme.palette.background.default} !important`,
      cursor: "pointer",
      fontSize: "1.2em",
      width: "100%",
      minWidth: "600px",
    },
    label: {
      marginLeft: "13px",
    },
    colorLabel: {
      // marginLeft: "3px",
      color: `${theme.palette.primary.dark} !important`,
      fontSize: "1.2em",
      fontWeight: "550",
    },
  })
);

export default function Form3({
  product,
  setProduct,
  activeStep,
  handleBack,
  handleNext,
}) {
  const classes = useStyles();
  const [mode, setMode] = React.useState("GROUP_BUY");
  const [values, setValues] = React.useState({
    Qty: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [open, setOpen] = React.useState(false);
  const [openMask, setOpenMask] = React.useState(false);
  const handleMaskClose = () => {
    setOpenMask(false);
  };
  const handleMaskToggle = () => {
    setOpen(!open);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleValueChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleChange = (event) => {
    setMode(event.target.value);
  };
  const handleModeChange = (e) => {

    (e) => setProduct({ ...product, selling_mode: e.target.value });
  };

  const handleCheckbox = (event) => {
    //setSelectedValue(event.target.value);
    setFilter({ ...filter, [event.target.name]: event.target.checked });
  };

  function checkFiled() {
    //???????????????????????? ???????????????
  }

  function showError() {
    alert("??????????????????");
  }

  async function handleSubmmit(e) {
    e.preventDefault();
    console.log("product :", product);
    checkFiled();
    const productData = cleanData(product);
    setOpen(false);
    setOpenMask(true);
    console.log('productData :', productData);
    const response = await api.createProduct(productData);
    console.log("response :", response);
    window.scrollTo(0, 0);
    setOpenMask(false);

    //???????????????
    // clear();
    if (response.status == 200 && response.data) {
      handleNext();
    } else {
      showError();
    }
  }

  function cleanData(product) {

    //mongo db???user ID?????????
    const user = JSON.parse(localStorage.getItem("profile"));
    
    const result = {
      ...product,
      price: parseInt(product.price),
      qty: parseInt(product.qty),
      category: parseInt(product.category),
      sub_category: parseInt(product.sub_category),
      brand: parseInt(product.brand),
      seller: parseInt(user.result.id),
      group_buy_discount: parseFloat(product.group_buy_discount),
      group_buy_price: parseInt(parseInt(product.price)*parseFloat(product.group_buy_discount)),
      group_buy_upper_qty: parseInt(product.group_buy_upper_qty),
      group_buy_lower_qty: parseInt(product.group_buy_lower_qty),
    };
    return result;
  }

  function clear() {
    setProduct(defaultProduct);
  }

  function valuetext(value) {
    return `??????:${value}`;
  }

  return (
    <>
      <form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          checkFiled();
          setOpen(true);
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={0}>
              <Grid item xs={4}>
                <Typography variant="h6" styles={{ textAlign: "left" }}>
                  ????????????
                </Typography>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={product.selling_mode}
                    onChange={ (e) => setProduct({ ...product, selling_mode: e.target.value })}
                  >
                    <FormControlLabel
                      value="GROUP_BUY"
                      control={<Radio />}
                      label="??????"
                    />
                    <FormControlLabel
                      value="SINGLE_SELL"
                      control={<Radio />}
                      label="??????"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6" styles={{ textAlign: "left" }}>
                  ??????????????????
                </Typography>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={product.paymentMethod}
                    onChange={(e) =>
                      setProduct({ ...product, paymentMethod: e.target.value })
                    }
                  >
                    <FormControlLabel
                      value="PICK_UP_AND_PAY"
                      control={<Radio />}
                      label="??????????????????"
                    />
                    {/* <FormControlLabel
                value="male"
                control={<Radio />}
                label="linepay?????????"
                disabled
              /> */}
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6" styles={{ textAlign: "left" }}>
                  ??????????????????
                </Typography>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={product.shipping_method}
                    onChange={(e) =>
                      setProduct({ ...product, shipping_method: e.target.value })
                    }
                  >
                    <FormControlLabel
                      value="PICK_UP_AND_PAY"
                      control={<Radio />}
                      label="??????????????????"
                    />
                    {/* <FormControlLabel
                value="male"
                control={<Radio />}
                label="linepay?????????"
                disabled
              /> */}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            {product.selling_mode == "GROUP_BUY" ? (
              <>
                <Typography variant="h6" styles={{ textAlign: "left" }}>
                  ????????????
                </Typography>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <FormLabel id="demo-controlled-radio-buttons-group">
                      <Typography variant="h6" className={classes.label}>
                        ????????????:{" "}
                        <span className={classes.colorLabel}>{`${
                          product.group_buy_discount == 1
                            ? "??????"
                            : product.group_buy_discount
                        }`}</span>
                      </Typography>
                      <Typography variant="h6" className={classes.label}>
                        ?????????:{" "}
                        <span className={classes.colorLabel}>{`NT???${parseInt(
                          product.price * product.group_buy_discount
                        )}`}</span>
                      </Typography>
                      <Typography variant="h6" styles={{ textAlign: "left" }}>
                        ???
                        {`??????: NT???${product.price}????? ?????????: ${
                          product.group_buy_discount
                        }??????`}<span className={classes.colorLabel}> {`NT???${parseInt(
                          product.price * product.group_buy_discount
                        )}`}</span>
                      </Typography>
                    </FormLabel>
                    <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                      <FormControl
                        sx={{ m: 1, width: "25ch" }}
                        variant="outlined"
                      >
                        <Slider
                          aria-label="??????"
                          className={classes.slider}
                          value={product.group_buy_discount}
                          onChange={(e, value) => {
                            console.log("value :", value);
                            setProduct({
                              ...product,
                              group_buy_discount: value,
                              group_buy_price: parseInt(Math.ceil(product.price * value)),
                            });
                          }}
                          getAriaValueText={valuetext}
                          valueLabelDisplay="auto"
                          step={0.05}
                          marks={marks}
                          min={0.1}
                          max={1}
                          styles={{ width: "600px" }}
                        />
                        {/* <InputLabel htmlFor="outlined-adornment-password">
                      ??????
                    </InputLabel> */}
                        {/* <OutlinedInput
                      id="outlined-adornment-password"
                      type="number"
                      value={product.group_buy_discount}
                      required
                      onChange={(e) => setProduct({ ...product, group_buy_discount: e.target.value ,group_buy_price:parseInt(product.price*product.group_buy_discount) })}
                      label="??????"
                    /> */}
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={3} sx={{ marginTop: "15px" }}>
                    <FormLabel id="demo-controlled-radio-buttons-group">
                      ????????????
                    </FormLabel>
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                      <FormControl
                        sx={{ m: 1, width: "25ch" }}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          ??????
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type="number"
                          value={product.group_buy_lower_qty}
                          required
                          onChange={(e) =>
                            setProduct({
                              ...product,
                              group_buy_lower_qty: e.target.value,
                            })
                          }
                          label="??????"
                        />
                      </FormControl>
                      {/* <FormControl
                        sx={{ m: 1, width: "25ch" }}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          ??????
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type="number"
                          value={product.group_buy_upper_qty}
                          required
                          onChange={(e) =>
                            setProduct({
                              ...product,
                              group_buy_upper_qty: e.target.value,
                            })
                          }
                          label="??????"
                        />
                      </FormControl> */}
                    </Box>
                  </Grid>
                  <Grid item xs={3} sx={{ marginTop: "15px" }}>
                    <FormLabel id="demo-controlled-radio-buttons-group">
                      ??????????????????
                    </FormLabel>
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                      <FormControl
                        sx={{ m: 1, width: "25ch" }}
                        variant="outlined"
                      >
                        <TextField
                          id="datetime-local"
                          // label="????????????"
                          type="date"
                          required
                          // defaultValue="date"
                          value={product.group_buy_end_date}
                          onChange={(e) =>
                            setProduct({
                              ...product,
                              group_buy_end_date: e.target.value,
                            })
                          }
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" styles={{ textAlign: "left" }}>
                    ??????????????????
                  </Typography>
                  <TextField
                    name="description"
                    variant="outlined"
                    label="????????????"
                    fullWidth
                    multiline
                    rows={2}
                    value={product.notice}
                    onChange={(e) =>
                      setProduct({ ...product, notice: e.target.value })
                    }
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <Typography variant="h6" styles={{ textAlign: "left" }}>
                    ??????????????????
                  </Typography>
                  <TextField
                    name="description"
                    variant="outlined"
                    label="????????????"
                    fullWidth
                    multiline
                    rows={2}
                    value={product.notice}
                    onChange={(e) =>
                      setProduct({ ...product, notice: e.target.value })
                    }
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              ?????????
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {/* {isStepOptional(activeStep) && (
                      <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                        ??????
                      </Button>
                    )} */}

            {activeStep === steps.length - 1 ? (
              <Button type="submit">??????????????? </Button>
            ) : (
              ""
            )}
            {/* {activeStep === steps.length - 1 ? ( <Button type="submit"  onClick={(e) => { setProduct({ ...product, sale_status: "ACTIVE" }); setOpen(true) }} >??????????????? </Button>) : <Button type="submit">????????? </Button>} */}
          </Box>
        </React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`???????????????${
              product.sale_status == "ACTIVE" ? "??????" : "??????"
            }???????`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {product.sale_status == "ACTIVE"
                ? "????????????????????????????????????????????????"
                : "??????????????????????????????????????????????????????"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>??????</Button>
            <Button onClick={handleSubmmit} autoFocus>
              ??????
            </Button>
          </DialogActions>
        </Dialog>
      </form>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openMask}
        onClick={handleMaskClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
