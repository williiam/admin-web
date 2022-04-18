import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { makeStyles, createStyles } from "@material-ui/styles";
import moment from "moment";
import Link from "next/link";
import * as api from "../../utils/api";

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
  })
);

//根據status有不同外觀
export default function Product({ product }) {
  const classes = useStyles();
  console.log("product :", product);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openSaleStatusChangeDialog, setOpenSaleStatusChangeDialog] = React.useState(false);

  // Access the client
  const queryClient = useQueryClient();

  // Queries
  //  const query = useQuery('products', getTodos)

  const deleteProduct = async () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    console.log('product :', product);
    const { data } = await api.deleteProduct({
      seller: parseInt(user.result.id),
      product_id:  parseInt(product.id),
    });
    return data.data;
  };

  const changeProductSaleStatus = async () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    const { data } = await api.changeProductSaleStatus({
      seller: parseInt(user.result.id),
      product: product.id,
      sale_status:product.sell_status == "ACTIVE"?"ACTIVE":"INACTIVE"
    });
    return data.data;
  };

  // Mutations
  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("products");
      handleCloseDeleteDialog();
    },
  });

  // Mutations
  const saleStatusMutation = useMutation(changeProductSaleStatus, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("products");
      handleCloseSaleStatusChangeDialog();
    },
  });


  const handleDeleteProduct = () => {
    deleteMutation.mutate();
  };

  const handleSaleStatusChange = () => {
    saleStatusMutation.mutate();
  };


  React.useEffect(() => {
    return () => {};
  }, []);

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleCloseSaleStatusChangeDialog = () => {
    setOpenSaleStatusChangeDialog(false);
  };


  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card
            sx={{ maxWidth: 345 }}
            className={product.id % 2 == 1 ? classes.deal : classes.notDeal}
            elevation={6}
          >
            <CardMedia
              component="img"
              height="140"
              // className={classes.media}
              image={product.img_url}
              alt={product.img_name}
            />
            <Box className={classes.titleText}>
              <Typography variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </Box>
            <CardContent className={classes.cardActions}>
              <Grid container spacing={1}>
                {product.selling_mode == "GROUP_BUY" ? (
                  <>
                    <Grid item xs={6}>
                      <Typography
                        className={classes.infoText}
                        variant="h6"
                        component="div"
                      >
                        團購價
                      </Typography>
                      <Typography
                        className={classes.priceText}
                        variant="h6"
                        component="div"
                      >
                        <span className={classes.priceTextCrossed}>
                          NT${product.price}
                        </span>{" "}
                        ${product.group_buy_price}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        className={classes.infoText}
                        variant="h6"
                        component="div"
                      >
                        剩餘數量
                      </Typography>
                      <Typography
                        className={classes.infoText}
                        variant="h6"
                        component="div"
                      >
                        {product.qty}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      {/* variants */}
                      <Typography
                        className={classes.infoText}
                        variant="h6"
                        component="div"
                      >
                        團購結束日期
                      </Typography>
                      <Typography
                        className={classes.detailText}
                        variant="h6"
                        component="div"
                      >
                        {moment(product.group_buy_end_date).format(
                          "YYYY/MM/DD"
                        )}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        className={classes.smallDetailText}
                        variant="h6"
                        component="div"
                      >
                        目前團購數/
                      </Typography>
                      <Typography
                        className={classes.smallDetailText}
                        variant="h6"
                        component="div"
                      >
                        團購數量下限
                      </Typography>
                      <Typography
                        className={classes.detailText}
                        variant="h6"
                        component="div"
                      >
                        {product.id % 2 == 1 ? "25" : "0"} /{" "}
                        {product.group_buy_lower_qty}
                      </Typography>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
              </Grid>
            </CardContent>
            {product.id % 2 == 1 ? (
              <Button
                variant="contained"
                size="small"
                className={classes.shipButton}
              >
                <Typography variant="h5" component="div">
                  <span>出貨</span>
                </Typography>
              </Button>
            ) : (
              <></>
            )}
            <CardActions className={classes.cardActions}>
              {/* //sql出來的id應該要是product id 被覆寫到了 */}
              <Link href={`product/${product.product}`}>
                <IconButton aria-label="delete">
                  <EditIcon />
                </IconButton>
              </Link>
              {product.sell_status == "ACTIVE" ? (
                <Button
                  onClick={() => setOpenSaleStatusChangeDialog(true)}
                  className={classes.iconButton}
                  startIcon={<ArrowUpwardIcon />}
                >
                  上架
                </Button>
              ) : (
                <Button
                  onClick={() => setOpenSaleStatusChangeDialog(true)}
                  className={classes.iconButton}
                  startIcon={<ArrowDownwardIcon />}
                >
                  下架
                </Button>
              )}
              <IconButton
                onClick={() => setOpenDeleteDialog(true)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`確認要刪除${product.name}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`${product.name}已售出數量：0`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>取消</Button>
          <Button onClick={handleDeleteProduct} autoFocus>
            確定
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openSaleStatusChangeDialog}
        onClose={handleCloseSaleStatusChangeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`確認要${product.sale_status == "ACTIVE" ?"下架":"上架"}${product.name}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`${product.name}已售出數量：0`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSaleStatusChangeDialog}>取消</Button>
          <Button onClick={handleSaleStatusChange} autoFocus>
            確定
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
