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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import * as api  from '../../utils/api'
const steps = ["基本資訊", "規格設定", "銷售資訊"];
const defaultProduct = {
  name: "",
  description: "",
  brand: "",
  category: "",
  subCategory: "",
  brand: "",
  img_file_name: "",
  img_file: "",
  price: "",
  qty: "",
  hasVariant: false,
  shippingMethod: "PICK_UP_AND_PAY",
  notice: "",
  saleStatus:"ACTIVE",
  sellingMode: "GROUP_BUY",
  groupBuyEndDate: (()=>{let dt = new Date();
    return dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();})(),
  groupBuyUpperAmount:"",
  groupBuyLowerAmount:"",
  variant: [],
  promotion: [],
};

export default function Form3({
  product,
  setProduct,
  activeStep,
  handleBack,
  handleNext,
}) {
  const [value, setValue] = React.useState("default");
  const [mode, setMode] = React.useState("GROUP_BUY");
  const [values, setValues] = React.useState({
    amount: "",
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
    (e) => setProduct({ ...product, mode: e.target.value })
  };

  const handleCheckbox = (event) => {
    //setSelectedValue(event.target.value);
    setFilter({ ...filter, [event.target.name]: event.target.checked });
  };

  function checkFiled() {
    //若有欄位尚未填寫 則跳出通知
  }

  async function handleSubmmit(e) {
    e.preventDefault();
    console.log("product :", product);
    checkFiled();
    setOpen(false);
    setOpenMask(true);
    const data = await api.createProduct(product);
    console.log('data :', data);
    window.scrollTo(0, 0);
    setOpenMask(false);

    clear();
    handleNext();
  }

  function clear(){
    setProduct(defaultProduct)
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
            <Grid item xs={6}>
              <Typography variant="h6" styles={{ textAlign: "left" }}>
                販售方式
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={product.sellingMode}
                  onChange={handleModeChange}
                >
                  <FormControlLabel
                    value="GROUP_BUY"
                    control={<Radio />}
                    label="團購"
                  />
                  <FormControlLabel
                    value="SINGLE_SELL"
                    control={<Radio />}
                    label="單賣"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" styles={{ textAlign: "left" }}>
                買家取貨方式
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={product.shippingMethod}
                  onChange={(e) => setProduct({ ...product, shippingMethod: e.target.value })}
                >
                  <FormControlLabel
                    value="PICK_UP_AND_PAY"
                    control={<Radio />}
                    label="到合作社取貨付款"
                  />
                  {/* <FormControlLabel
                value="male"
                control={<Radio />}
                label="linepay後郵寄"
                disabled
              /> */}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {mode == "GROUP_BUY" ? (
            <>
              <Typography variant="h6" styles={{ textAlign: "left" }}>
                團購設定
              </Typography>
              <Grid item xs={12}>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  團購數量
                </FormLabel>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      下限
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type="number"
                      value={product.groupBuyLowerAmount}
                      required
                      onChange={(e) => setProduct({ ...product, groupBuyLowerAmount: e.target.value })}
                      label="下限"
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      上限
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type="number"
                      value={product.groupBuyUpperAmount}
                      required
                      onChange={(e) => setProduct({ ...product, groupBuyUpperAmount: e.target.value })}
                      label="上限"
                    />
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  團購結束日期
                </FormLabel>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  <TextField
                    id="datetime-local"
                    // label="結束日期"
                    type="date"
                    // defaultValue="date"
                    value={product.groupBuyEndDate}
                    onChange={(e) => setProduct({ ...product, groupBuyEndDate: e.target.value})}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" styles={{ textAlign: "left" }}>
                  團購注意事項
                </Typography>
                <TextField
                  name="description"
                  variant="outlined"
                  label="注意事項"
                  fullWidth
                  multiline
                  rows={2}
                  value={product.notice}
                  onChange={
                    (e) => setProduct({ ...product, notice: e.target.value })
                  }
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" styles={{ textAlign: "left" }}>
                  單賣注意事項
                </Typography>
                <TextField
                  name="description"
                  variant="outlined"
                  label="注意事項"
                  fullWidth
                  multiline
                  rows={2}
                  value={product.notice}
                  onChange={
                    (e) => setProduct({ ...product, notice: e.target.value })
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
            上ㄧ步
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {/* {isStepOptional(activeStep) && (
                      <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                        跳過
                      </Button>
                    )} */}

         
            {activeStep === steps.length - 1 ? ( <Button type="submit">完成並上架 </Button>) : ""}
            {/* {activeStep === steps.length - 1 ? ( <Button type="submit"  onClick={(e) => { setProduct({ ...product, saleStatus: "ACTIVE" }); setOpen(true) }} >完成並上架 </Button>) : <Button type="submit">下一步 </Button>} */}
        </Box>
      </React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`確認要新增${product.saleStatus=="ACTIVE"? "上架":"下架"}商品?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {product.saleStatus=="ACTIVE"?
          "上架後，您可以在商品列表中將商品下架"
          :
          "下架後，您可以在商品列表中將商品上架"
          }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSubmmit} autoFocus>
            確定
          </Button>
        </DialogActions>
      </Dialog>
    </form>
          <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openMask}
          onClick={handleMaskClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
    </>
  );
}
