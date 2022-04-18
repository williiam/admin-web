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
import InputAdornment from "@mui/material/InputAdornment";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
const steps = ["基本資訊", "規格設定", "銷售資訊"];
const brands = [
  { label: "", value: "", year: 1994 },
  { label: "統一", value: "1", year: 1994 },
  { label: "味丹", value: "2", year: 1972 },
  { label: "義美", value: "3", year: 1974 },
  { label: "光泉", value: "4", year: 2008 },
  { label: "味全", value: "5", year: 1957 },
  { label: "桂格", value: "6", year: 1993 },
  { label: "桂冠", value: "7", year: 1993 },
];
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "種類名稱",
    flex:1,
    // width: 150,
    editable: true,
  },
  {
    field: "price",
    headerName: "定價",
    flex:1,
    // width: 150,
    editable: true,
  },
  {
    field: "qty",
    headerName: "數量",
    type: "number",
    flex:1,
    // width: 110,
    editable: true,
  },
  {
    field: "img_url",
    headerName: "照片",
    type: "number",
    flex:1,
    // width: 110,
    editable: true,
  },
  {
    field: "edit",
    headerName: "編輯",
    type: "number",
    flex:1,
    // width: 110,
    editable: true,
    renderCell: (params) => (
      <strong>
      <IconButton aria-label="delete">
        <CreateIcon />
      </IconButton>
      </strong>
    ),
  },
  {
    field: "delete",
    headerName: "刪除",
    type: "number",
    flex:1,
    // width: 110,
    editable: true,
    renderCell: (params) => (
      <strong>
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
      </strong>
    ),
  }
];

export default function Form2({
  product,
  setProduct,
  activeStep,
  handleBack,
  handleNext,
}) {
  const [mode, setMode] = React.useState(product.has_variant==true?"SPEC":"NO_SPEC");
  const [open, setOpen] = React.useState(false);

  const [values, setValues] = React.useState({
    Qty: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  function checkFieled() {
    //若有欄位尚未填寫 則跳出通知
  }

  const handleModeChange = (event) => {
    let has_variant = event.target.value === "SPEC";
    if (has_variant) {
      setProduct({ ...product, has_variant: has_variant });
    } else {
      setProduct({ ...product, has_variant: has_variant });
    }
    setMode(event.target.value);
  };

  const addNewOption = (event) => {
    setMode(event.target.value);
  };

  return (
    <div styles={{ width: "100%" }}>
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div>
              <ToggleButtonGroup
                color="primary"
                value={product.has_variant==true?"SPEC":"NO_SPEC"}
                exclusive
                onChange={()=>{}}
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
                startIcon={<AddIcon />}
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
                <Grid container spacing={0}>
                  <Grid item xs={4}>
                    <FormLabel id="demo-controlled-radio-buttons-group">
                      定價
                    </FormLabel>
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                      <FormControl
                        sx={{ m: 1, width: "25ch" }}
                        variant="outlined"
                      >
                        <TextField
                          name="introduction"
                          variant="outlined"
                          // label="商品價錢"
                          fullWidth
                          value={product.price}
                          required
                          type="number"
                          sx={{ width: 300 }}
                          onChange={(e) =>
                            setProduct({
                              ...product,
                              price: parseInt(e.target.value),
                            })
                          }
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                NT$
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    <FormLabel
                      id="demo-controlled-radio-buttons-group"
                      styles={{ marginBottom: "10px" }}
                    >
                      數量
                    </FormLabel>
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                      <FormControl
                        sx={{ m: 1, width: "25ch" }}
                        variant="outlined"
                      >
                        <TextField
                          name="introduction"
                          variant="outlined"
                          // label="商品數量"
                          // fullWidth
                          sx={{ width: 300 }}
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
                          // styles={{ marginTop: "5px" }}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Grid ontainer spacing={1}>
                  <Grid item xs={12}></Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" styles={{ textAlign: "left" }}>
                      規格表
                    </Typography>
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
                      <DataGrid
                        getRowId={(row) => row.id}
                        rows={product.variant}
                        columns={columns}
                        pageSize={10}
                        maxColumns={7}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                      />
                    </div>
                    </div>
                    </div>
                  </Grid>
                </Grid>
              </>
            )}
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
                        id=""
                        options={brands}
                        value={getBrandLabel(product.brand)}
                        onChange={(e, newInputValue) => {
                          console.log("newInputValue :", newInputValue);
                          console.log({ e });
                          setProduct({
                            ...product,
                            brand: newInputValue.value,
                          });
                        }}
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
      </>
      <Divider />
      <NewSpecModal
        product={product}
        setProduct={setProduct}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}

function getBrandId(label) {
  console.log(
    "brands.find(item => item.label === label)?.value :",
    brands.find((item) => item.label === label)?.value
  );
  return brands.find((item) => item.label === label)?.value;
}
function getBrandLabel(value) {
  console.log(
    "brands.find(item => item.value === value)?.value :",
    brands.find((item) => item.value === value)?.value
  );
  return brands.find((item) => item.value === value)?.label;
}
