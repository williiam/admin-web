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
import FileBase from "react-file-base64";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

const categories = [
  {
    value: "零食",
    label: "零食",
    children: [
      {
        value: "泡麵",
        label: "泡麵",
      },
      {
        value: "餅乾",
        label: "餅乾",
      },
      {
        value: "洋芋片",
        label: "洋芋片",
      },
    ],
  },
  {
    value: "飲品",
    label: "飲品",
    children: [
      {
        value: "水",
        label: "水",
      },
      {
        value: "碳酸飲料",
        label: "碳酸飲料",
      },
      {
        value: "果汁",
        label: "果汁",
      },
    ],
  },
];

const steps = ["基本資訊", "規格設定", "銷售資訊"];

const check_file = (e) => {
  let check_result = true;
  let message;
  const valid_type = [
    "png",
    "jpg",
    "jpeg",
    "pdf",
    "xlsx",
    "docx",
    "pptx",
    "xls",
    "doc",
    "ppt",
    "txt",
  ];
  const fileSize = e.size / 1024 / 1024; // in MiB
  if (fileSize > 20) {
    check_result = false;
    message = "File size exceeds 20 MiB";
    // $(file).val(''); //for clearing with Jquery
  }

  const file_type = e.type.split("/")[1];

  if (!valid_type.includes(file_type)) {
    check_result = false;
    message =
      '檔案格式不符合規定，以下為合格的檔案格式："png","jpg","jpeg","pdf","xlsx","docx","pptx","txt"';
  }

  return { check_result, message };
};

export default function Form1({
  product,
  setProduct,
  formEl1,
  activeStep,
  handleBack,
  handleNext,
}) {
  const breadcrumbs = [
    <Typography key="3" color="text.primary" underline="hover">
      {product.category}
    </Typography>,
    <Typography key="4" color="text.primary">
      {product.subCategory}
    </Typography>,
  ];

  function checkFiled() {
    //若有欄位尚未填寫 則跳出通知
  }

  return (
    <form
      autoComplete="off"
      ref={formEl1}
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
          <Typography variant="h6" styles={{ textAlign: "left" }}>
            商品名稱
          </Typography>
          <TextField
            name="introduction"
            variant="outlined"
            // label="商品名稱"
            fullWidth
            value={product.name}
            required
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={0}>
            <Typography variant="h6" styles={{ textAlign: "left" }}>
              商品類別
            </Typography>
            {/* <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              {breadcrumbs}
            </Breadcrumbs> */}
            <div>
              <Cascader
                options={categories}
                placeholder="Please select"
                setDepartment={() => {}}
                product={product}
                setProduct={setProduct}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={0}>
            <Typography variant="h6" styles={{ textAlign: "left" }}>
              商品圖片
            </Typography>
            <div>
              <FileBase
                type="file"
                multiple={false}
                required
                onDone={(e) => {
                  console.log(e);
                  const base64 = e.base64;
                  let { check_result, message } = check_file(e);
                  if (!check_result) {
                    alert(message);
                    return;
                  }
                  setProduct({
                    ...product,
                    img_file_name: e.file.name,
                    img_file: base64,
                  });
                }}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={0}>
            <Typography variant="h6" styles={{ textAlign: "left" }}>
              商品描述
            </Typography>
            <TextField
              name="description"
              variant="outlined"
              label="商品描述"
              fullWidth
              multiline
              rows={2}
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
            />
          </Paper>
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

          <Button type="submit">
            {activeStep === steps.length - 1 ? "完成並下架" : ""}
          </Button>
          <Button type="submit">
            {activeStep === steps.length - 1 ? "完成並上架" : "下一步"}
          </Button>
        </Box>
      </React.Fragment>
    </form>
  );
}
