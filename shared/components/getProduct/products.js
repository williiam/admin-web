import React from 'react';
import Grid from "@mui/material/Grid";
import Product from "./product"

export default function Products({ products,filter,refetch}) {
  const user = JSON.parse(localStorage.getItem("profile"));

  let filteredProducts =  productFilter(products,filter);
  
  React.useEffect(() => {    
    filteredProducts = productFilter(products,filter);
    return () => {

    }
  }, [])

  if (!products.length) return 'No products';

  return (
      <Grid container spacing={2}>
        {filteredProducts?.map((product) => (
          <Grid  item xs={12} sm={6} md={4} lg={3}>
            <Product product={product}/>
          </Grid>
        ))}
      </Grid>
  );
};


//input: 一個卡片陣列
//output: 過濾過的卡片陣列
const productFilter = (products,filter) => {
  const { sale_status,show_sold_out,show_deleted } = filter;
//   const { mon ,tue ,wed ,thi ,fri ,morning ,noon ,afternoon ,night  } = filters;

  if (sale_status) {
    products = products.filter(product => product.sale_status==sale_status);
  }
  
  if(show_sold_out) {
    products = products.filter(product => product.qty==0);
  }

  if(show_deleted) {
    products = products.filter(product => product.delete_status==true);
  }

//   if (searchTerm2) {
//     collections = collections.filter(collection => collection.instructorZH_TW.toLowerCase().includes(searchTerm2.toLowerCase()));
//   }
  
//   if(subType!==''){
//     collections = collections.filter(course => course.subType === subType);
//   }

//   let session_date_string="";
//   let session_date_mode=false;

//   if(mon===true){
//     session_date_string+="一";
//     session_date_mode=true;
//   }
//   if(tue===true){
//     session_date_string+="二";
//     session_date_mode=true;
//   }
//   if(wed===true){
//     session_date_string+="三";
//     session_date_mode=true;
//   }
//   if(thi===true){
//     session_date_string+="四";
//     session_date_mode=true;
//   }
//   if(fri===true){
//     session_date_string+="五";
//     session_date_mode=true;
//   }

//   if(session_date_mode){
//     collections = collections.filter(course => (match(course.sessionZH_TW,session_date_string)!==0));
//   }

//   let session_time_string="";
//   let session_time_mode=false;

//   if(morning===true){
//     session_time_string+="1234";
//     session_time_mode=true;
//   }
//   if(noon===true){
//     session_time_string+="CD56";
//     session_time_mode=true;
//   }
//   if(afternoon===true){
//     session_time_string+="D5678E";
//     session_time_mode=true;
//   }
//   if(night===true){
//     session_time_string+="78EFG";
//     session_time_mode=true;
//   }

//   if(session_time_mode){
//     collections = collections.filter(course => (match(course.sessionZH_TW,session_time_string)!==0));
//   }

//   if (orderMode!="") {
    
//     if(orderMode=="DEFAULT"){
//       // collections = collections.filter(card => moment(card.updatedAt).isAfter(moment().subtract(3, 'days')));
//     }
//     else if(orderMode=="RATE"){
//       collections = collections.sort((course1,course2) => {return(course2.avg_rate-course1.avg_rate)});
//     }
//     else if(orderMode=="SWEET"){
//       collections = collections.sort((course1,course2) => {return(course2.avg_sweet-course1.avg_sweet)});
//     }
//     else if(orderMode=="LOADING"){
//       collections = collections.sort((course1,course2) => {return(course2.avg_loading-course1.avg_loading)});    
//     }
//     else if(orderMode=="NUM_OF_FEEDBACK"){
//       collections = collections.sort((course1,course2) => {return(course2.num_of_feedback-course1.num_of_feedback)});
//     }
//     else if(orderMode=="NUM_OF_LIKE"){
//       collections = collections.sort((course1,course2) => {return(course2.num_of_like-course1.num_of_like)});
//     }
//     else if(orderMode=="LATEST"){
      
//       collections = collections.sort((a,b)=> new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
//     }
    
//   }

  return products;
}

function match(s1,s2){
  var s1Array = s1.split("");
  var s2Array = s2.split("");
  var count = 0;
  let index = 0;
  
  s1Array.filter(s1 => {
      index = s2Array.findIndex(s2 => s2 == s1);
      if(index >= 0){
          count++;
          s2Array.splice(index, 1);
      }
  });
  return count;
}
