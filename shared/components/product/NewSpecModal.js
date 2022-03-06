import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
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
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Modal from "@mui/material/Modal";
import NewSpecModal from "./NewSpecModal";
import FileBase from "react-file-base64";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, setOpen }) {
  const [value, setValue] = React.useState("female");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleValueChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" styles={{ textAlign: "left" }}>
            新增規格
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormLabel id="demo-controlled-radio-buttons-group">
                規格名稱
              </FormLabel>
              <div>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    輸入規格名稱, 例如:白色
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "text"}
                    value={values.password}
                    onChange={handleValueChange("password")}
                    // endAdornment={
                    //   <InputAdornment position="end">
                    //     <IconButton
                    //       aria-label="toggle password visibility"
                    //       onClick={handleClickShowPassword}
                    //       onMouseDown={handleMouseDownPassword}
                    //       edge="end"
                    //     >
                    //       {values.showPassword ? (
                    //         <VisibilityOff />
                    //       ) : (
                    //         <Visibility />
                    //       )}
                    //     </IconButton>
                    //   </InputAdornment>
                    // }
                    label="數量"
                  />
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={12}>
              <FormLabel id="demo-controlled-radio-buttons-group">
                規格資訊
              </FormLabel>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <div>
                  <TextField
                    label="價格"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "25ch" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">NT$</InputAdornment>
                      ),
                    }}
                  />
                  <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      數量
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showPassword ? "text" : "text"}
                      value={values.password}
                      onChange={handleValueChange("password")}
                      // endAdornment={
                      //   <InputAdornment position="end">
                      //     <IconButton
                      //       aria-label="toggle password visibility"
                      //       onClick={handleClickShowPassword}
                      //       onMouseDown={handleMouseDownPassword}
                      //       edge="end"
                      //     >
                      //       {values.showPassword ? (
                      //         <VisibilityOff />
                      //       ) : (
                      //         <Visibility />
                      //       )}
                      //     </IconButton>
                      //   </InputAdornment>
                      // }
                      label="數量"
                    />
                  </FormControl>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <FormLabel id="demo-controlled-radio-buttons-group">
                規格圖片
              </FormLabel>
              <div>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={(e) => {
                    console.log(e);
                    // const base64 = e.base64;
                    // let {check_result,message}=check_file(e);
                    // if(!check_result){
                    //   alert(message);
                    //   return;
                    // }
                    // setResourceData({ ...resourceData });
                    // setResourceData({
                    //   ...resourceData,
                    //   file_name: e.file.name,
                    //   file: base64,
                    // });
                    // console.log(resourceData);
                  }}
                />
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12}>
          <Button
            variant="contained"
            // endIcon={<SendIcon />}
            onClick={() => setOpen(false)}
          >
            取消
          </Button>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={() => setOpen(false)}
          >
            新增規格
          </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
