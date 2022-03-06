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
import Form1 from "../../shared/components/product/Form1";
import Form2 from "../../shared/components/product/Form2";
import Form3 from "../../shared/components/product/Form3";
import Alert from '@mui/material/Alert';
const steps = ["基本資訊", "規格設定", "銷售資訊"];

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

// const todayDate=

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

//載入Default前 可先找local storage是否已有上次編輯到一半的資料

export default function NewProduct(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [product, setProduct] = React.useState(defaultProduct);
  const formEl1 = React.useRef();

  const performSubmit =() => {
    //Currently not calling the submit on the form
    formEl1.current && formEl1.current.submit();
    console.log('formEl1.current :', formEl1.current);
  }

  const isStepOptional = (step) => {
    return step === 4;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (user?.result?.name) {
  //     checkRequiredField2();
  //     const data = await api.createFeedBack(feedBackData);
  //     setResponse(data);
  //     window.scrollTo(0, 0);
  //     setOpen(true);
  //     history.push(`/course/${feedBackData?.course}`);
  //     clear();
  //   }
  // };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function dropdownRender(menus) {
    return <Box>{menus}</Box>;
  }

  function handleAreaClick(e, label, option) {
    e.stopPropagation();
    console.log("clicked", label, option);
  }

  const getformContent = () => {
    if (activeStep == 0) {
      return <Form1 product={product} setProduct={setProduct} formEl1={formEl1} activeStep={activeStep} handleBack={handleBack} handleNext={handleNext}/>;
    }
    if (activeStep == 1) {
      return <Form2 product={product} setProduct={setProduct} activeStep={activeStep} handleBack={handleBack} handleNext={handleNext}/>;
    }
    if (activeStep == 2) {
      return <Form3 product={product} setProduct={setProduct} activeStep={activeStep} handleBack={handleBack} handleNext={handleNext}/>;
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            <Typography variant="h6" styles={{ textAlign: "left" ,lineHeight:"18px",fontSize:"18px"}}>
              新增產品
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography variant="caption">選填</Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                <Alert severity="success">新增產品成功！</Alert>
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>再新增一個產品</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  Step {activeStep + 1} {steps[activeStep]}
                </Typography>
                <Box >
                  {getformContent()}
                </Box>
                {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    上ㄧ步
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                      跳過
                    </Button>
                  )} 

                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "完成並下架" : ""}
                  </Button>
                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "完成並上架" : "下一步"}
                  </Button> 
                </Box> */}
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* <SpeedDial
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
      </SpeedDial> */}
    </Box>
  );
}
