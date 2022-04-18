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
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Form1 from "../../../shared/components/editProduct/Form1";
import Form2 from "../../../shared/components/editProduct/Form2";
import Form3 from "../../../shared/components/editProduct/Form3";
import { makeStyles, createStyles } from "@material-ui/styles";

import Alert from "@mui/material/Alert";
import * as api from "../../../shared/utils/api";

const steps = ["基本資訊", "規格設定", "銷售資訊"];

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


const useStyles = makeStyles((theme) =>
  createStyles({
    menuButton: {
      color: `${theme.palette.primary.dark} !important`,
      backgroundColor: `${theme.palette.background.default} !important`,
      cursor: "pointer",
      fontSize: "1.3em",
    },
    dropdownContainer: {
      "& .MuiButton-root": {
        marginRight: "1vw",
      },
      display: "flex",
      alignItems: "center",
    },
    menu: {
      "& .MuiMenuItem-root": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "1.3rem",
        fontWeight: 500,
        fontFamily: `'Noto Sans TC', sans-serif`,
        padding: "1px 10px",
      },
    },
    media: {
      height: 0,
      paddingTop: "56.25%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backgroundBlendMode: "darken",
    },
    border: {
      border: "solid",
    },
    fullHeightCard: {
      height: "100%",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderRadius: "15px",
      height: "100%",
      position: "relative",
    },
    overlay: {
      position: "absolute",
      top: "20px",
      left: "20px",
      color: "white",
    },
    overlay2: {
      position: "absolute",
      top: "20px",
      right: "20px",
      color: "white",
    },
    grid: {
      display: "flex",
    },
    details: {
      display: "flex",
      justifyContent: "space-between",
      margin: "20px",
    },
    title: {
      padding: "0 16px",
    },
    cardActions: {
      padding: "0 0px 8px 0px",
      display: "flex",
      justifyContent: "space-around",
      marginTop: "10px",
    },
    cardAction: {
      //   display: "block",
      textAlign: "initial",
    },
    navButton: {
      marginLeft: 0,
      marginRight: 0,
    },
    navButton: {
      marginLeft: 0,
      marginRight: 0,
    },
    priceTextCrossed: {
      color: "#ee4d2d;",
      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
      fontWeight: "400",
      fontSize: "0.9rem",
      lineHeight: "1.4375em",
      letterSpacing: "0.00938em",
      textDecoration: "line-through",
    },
    titleText: {
      color: "#375389;",
      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
      fontWeight: "600",
      fontSize: "1rem",
      lineHeight: "1.4375em",
      letterSpacing: "0.00938em",
      marginTop: "5px",
    },
    priceText: {
      color: "#ee4d2d;",
      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
      fontWeight: "400",
      fontSize: "1rem",
      lineHeight: "1.4375em",
      letterSpacing: "0.00938em",
    },
    infoText: {
      color: "#8c8c8c;",
      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
      fontWeight: "400",
      fontSize: "1rem",
      lineHeight: "1.4375em",
      letterSpacing: "0.00938em",
    },
    smallDetailText: {
      color: "rgba(0, 0, 0, 0.6)",
      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
      fontWeight: "400",
      fontSize: "0.7rem",
      lineHeight: "1.4375em",
      letterSpacing: "0.00938em",
    },
    detailText: {
      color: "rgba(0, 0, 0, 0.6)",
      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
      fontWeight: "400",
      fontSize: "1rem",
      lineHeight: "1.4375em",
      letterSpacing: "0.00938em",
    },
    iconButton: {
      color: "rgba(0, 0, 0, 0.54)",
    },
    deal: {
      border: "5px #FFAC55 solid",
    },
    notDeal: {
      color: "rgba(0, 0, 0, 0.54)",
    },
    shipButton: {
      backgroundColor: "#FFAC55",
    },
    divider:{
      margin: "20px auto"
    }
  })
);

// const todayDate=

const defaultProduct = {
  name: "",
  description: "",
  category: "",
  sub_category: "",
  brand: "0",
  img_file_name: "",
  img_file: "",
  price: "",
  qty: "",
  has_variant: false,
  paymentMethod: "PICK_UP_AND_PAY",
  shipping_method: "PICK_UP_AND_PAY",
  notice: "",
  sale_status: "ACTIVE",
  selling_mode: "GROUP_BUY",
  group_buy_end_date: (() => {
    let dt = new Date();
    return dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
  })(),
  group_buy_upper_qty: "",
  group_buy_lower_qty: "",
  groupBuyDiscount: 1,
  groupBuyPrice: "",
  variant: [],
  promotion: [],
};

//載入Default前 可先找local storage是否已有上次編輯到一半的資料

export default function EditProduct({ productData }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [product, setProduct] = React.useState(defaultProduct);
  const [openMask, setOpenMask] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    setProduct(productData);
    console.log("productData :", productData);
    return () => {};
  }, [productData]);

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleMaskClose = () => {
    setOpenMask(false);
  };
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

  async function handleSubmmit(e) {
    e.preventDefault();
    console.log("product :", product);
    checkFiled();
    const productData = cleanData(product);
    // setOpen(false);
    setOpenMask(true);
    console.log("productData :", productData);
    const response = await api.updateProduct(productData);
    console.log("response :", response);
    window.scrollTo(0, 0);
    setOpenMask(false);
  }

  function cleanData(product) {
    //mongo db的user ID有字串
    const user = JSON.parse(localStorage.getItem("profile"));

    const result = {
      ...product,
      price: parseInt(product.price),
      qty: parseInt(product.qty),
      category: parseInt(product.category),
      sub_category: parseInt(product.sub_category),
      brand: parseInt(product.brand),
      seller: parseInt(user.result.id),
      groupBuyDiscount: parseFloat(product.groupBuyDiscount),
      groupBuyPrice: parseInt(product.group_buy_upper_qty),
      group_buy_upper_qty: parseInt(product.group_buy_upper_qty),
      group_buy_lower_qty: parseInt(product.group_buy_lower_qty),
    };
    return result;
  }

  function checkFiled() {
  }

  function clear() {
    setProduct(defaultProduct);
  }

  function cleanData(product) {
    //mongo db的user ID有字串
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
      group_buy_price: parseInt(
        parseInt(product.price) * parseFloat(product.group_buy_discount)
      ),
      group_buy_upper_qty: parseInt(product.group_buy_upper_qty),
      group_buy_lower_qty: parseInt(product.group_buy_lower_qty),
    };
    return result;
  }

  return (
    <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <Typography
                variant="h6"
                styles={{
                  textAlign: "left",
                  lineHeight: "18px",
                  fontSize: "18px",
                }}
              >
                編輯商品
              </Typography>
            </Item>
          </Grid>
          <form
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              checkFiled();
              handleSubmmit(e);
            }}
          >
            <Grid item xs={12}>
              <Form1
                product={product}
                setProduct={setProduct}
                activeStep={activeStep}
                handleBack={handleBack}
                handleNext={handleNext}
              />
            </Grid>
            <Divider className={classes.divider}></Divider>
            <Grid item xs={12}>
              <Form2
                product={product}
                setProduct={setProduct}
                activeStep={activeStep}
                handleBack={handleBack}
                handleNext={handleNext}
              />
            </Grid>
            <Divider className={classes.divider}></Divider>
            <Grid item xs={12}>
              <Form3
                product={product}
                setProduct={setProduct}
                activeStep={activeStep}
                handleBack={handleBack}
                handleNext={handleNext}
              />
            </Grid>
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row-reverse", pt: 2 }}>
            <Button variant="contained" color="primary" type="submit">
              更新商品{" "}
            </Button>

            {/* {activeStep === steps.length - 1 ? ( <Button type="submit"  onClick={(e) => { setProduct({ ...product, sale_status: "ACTIVE" }); setOpen(true) }} >完成並上架 </Button>) : <Button type="submit">下一步 </Button>} */}
          </Box>
        </React.Fragment>
          </form>
        </Grid>
        <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openMask}
        onClick={handleMaskClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

export const getStaticProps = async (context) => {
  const response = await api.fetchProduct({
    product: parseInt(context.params.id),
  });

  const product = await response.data.data;

  return {
    props: {
      productData: product,
    },
  };
};

export const getStaticPaths = async () => {
  // const res = await fetch(`${server}/api/articles`)

  // const articles = await res.json()

  // const ids = articles.map((article) => article.id)
  // const paths = ids.map((id) => ({ params: { id: id.toString() } }))

  //先寫死
  const paths = [
    { params: { id: "1" } },
    { params: { id: "2" } },
    { params: { id: "3" } },
    { params: { id: "4" } },
    { params: { id: "5" } },
    { params: { id: "6" } },
    { params: { id: "7" } },
    { params: { id: "8" } },
    { params: { id: "9" } },
    { params: { id: "10" } },
    { params: { id: "11" } },
    { params: { id: "12" } },
    { params: { id: "13" } },
    { params: { id: "14" } },
    { params: { id: "15" } },
    { params: { id: "16" } },
  ];

  return {
    paths,
    fallback: false,
  };
};
