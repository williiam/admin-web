import * as React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import SendIcon from "@mui/icons-material/Send";
import NewSpecModal from "./NewSpecModal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import Divider from "@mui/material/Divider";
import InputAdornment from '@mui/material/InputAdornment';
const steps = ["基本資訊", "規格設定", "銷售資訊"];
const brands = [
  { label: "統一", year: 1994 },
  { label: "味丹", year: 1972 },
  { label: "義美", year: 1974 },
  { label: "光泉", year: 2008 },
  { label: "味全", year: 1957 },
  { label: "桂格", year: 1993 },
  { label: "桂冠", year: 1993 },
];
export default function Form2({
  product,
  setProduct,
  activeStep,
  handleBack,
  handleNext,
}) {
  const [mode, setMode] = React.useState("NO_SPEC");
  const [open, setOpen] = React.useState(false);

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  function checkFiled() {
    //若有欄位尚未填寫 則跳出通知
  }

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

  const addNewOption = (event) => {
    setMode(event.target.value);
  };

  return (
    <div styles={{ width: "100%" }}>
      <form
        autoComplete="off"
        styles={{ width: "100%" }}
        onSubmit={(e) => {
          e.preventDefault();
          console.log("product :", product);
          checkFiled();
          handleNext();
    window.scrollTo(0, 0);

        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div>
              <ToggleButtonGroup
                color="primary"
                value={mode}
                exclusive
                onChange={handleModeChange}
              >
                <ToggleButton value="NO_SPEC">不設定規格</ToggleButton>
                <ToggleButton value="SPEC">設定規格</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </Grid>
          <Grid item xs={12}>
            {mode == "SPEC" ? (
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={() => setOpen(true)}
              >
                新增規格
              </Button>
            ) : (
              <></>
            )}
          </Grid>
          <Grid item xs={12}>
            {mode == "NO_SPEC" ? (
              <>
                <Typography variant="h6" styles={{ textAlign: "left" }}>
                  商品設定
                </Typography>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  價錢
                </FormLabel>
                <TextField
                  name="introduction"
                  variant="outlined"
                  // label="商品價錢"
                  fullWidth
                  value={product.price}
                  required
                  type="number"
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">NT$</InputAdornment>,
                  }}
                />
                <FormLabel id="demo-controlled-radio-buttons-group" styles={{ marginBottom: "10px" }}>
                  數量
                </FormLabel>
                <Divider />
                <TextField
                  name="introduction"
                  variant="outlined"
                  // label="商品數量"
                  fullWidth
                  type="number"
                  value={product.qty}
                  required
                  onChange={(e) =>
                    setProduct({ ...product, qty: e.target.value })
                  }
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  styles={{ marginTop: "5px" }}
                />
              </>
            ) : (
              <>
                <Grid ontainer spacing={1}>
                  <Grid item xs={12}></Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" styles={{ textAlign: "left" }}>
                      規格表
                    </Typography>
                  </Grid>
                </Grid>
              </>
            )}
            <NewSpecModal open={open} setOpen={setOpen} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" styles={{ textAlign: "left" }}>
              商品屬性
            </Typography>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    品牌(選填)
                  </FormLabel>
                  <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      variant="outlined"
                    >
                      {/* <InputLabel htmlFor="outlined-adornment-password">
                        品牌
                      </InputLabel> */}
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={brands}
                        inputValue={product.brand}
                        onInputChange={(e,newInputValue) => setProduct({ ...product, brand:newInputValue})}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField {...params} label="品牌" />
                        )}
                      />
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
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
            <Button type="submit">
              {activeStep === steps.length - 1 ? "完成並下架" : ""}
            </Button>
            <Button type="submit">
              {activeStep === steps.length - 1 ? "完成並上架" : "下一步"}
            </Button>
          </Box>
        </React.Fragment>
      </form>
    </div>
  );
}
