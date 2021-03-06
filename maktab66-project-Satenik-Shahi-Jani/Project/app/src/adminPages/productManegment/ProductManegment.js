import React, { useState, useMemo, useEffect } from "react";
// import AdminPageLayout from "../../layouts/AdminPageLayout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Pagination } from "@mui/material";
import { api } from "../../api/api";
import { useFetch } from "../../hooks/useFetch";
import ProductAdd from "./ProductAdd";
import ProductDelete from "./ProductDelete";




function ProductManegment() {
  const limit = useMemo(() => 9, []);
  const [activePage, setActivePage] = useState(1);
  const [getData, setGetData] = useState([]);


  const { data } = useFetch(`/products?_page=${activePage}&_limit=${limit}}`);
  useEffect(() => {
    setGetData(data?.data);
  }, [data]);

  async function deleteItemHandeler(item) {
    console.log(item);
    const response = await api.get(`/products/${item.id}`);
    const deleted = await api.delete(`/products/${item.id}`).then((res) => {
      if (res.status === 200) {
        setGetData(getData.filter((i) => i.id !== item.id));
      }
    });
  }
  const handleProductEdit = (responseData) => {
    const filterData = getData.map((item) => {
      if (item.id === responseData.id) {
        return responseData;
      } else {
        return item;
      }
    });
    setGetData(filterData);
    // console.log("hiii");
  };
  return (
    <Container sx={{ mt: "5%", minHeight: "100vh" }}>
      <Box dir="rtl" sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>کالا ها</div>
        <ProductAdd
          title=" افزودن کالا"
          buttonColor="success"
          buttonVarient="contained"
          ModalWidth={"65%"}
        />
      </Box>

      <TableContainer component={Paper} dir="rtl">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">تصویر</TableCell>
              <TableCell align="left">نام کالا</TableCell>
              <TableCell align="left">دسته بندی</TableCell>
              <TableCell align="center">تغییرات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getData?.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ width: "20%" }} align="left">
                  <img
                    alt="img"
                    width={"50%"}
                    src={`http://localhost:3002/files/${item.thumbnail}`}
                  />
                </TableCell>
                <TableCell align="left">{item.name}</TableCell>
                <TableCell align="left">{item.categoryName}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <ProductAdd
                      title="ویرایش"
                      buttonColor="success"
                      buttonVarient="contained"
                      ModalWidth={"65%"}
                      product={item}
                      setActivePage={setActivePage}
                      activePage={activePage}
                      handleProductEdit={handleProductEdit}
                    />
                    <ProductDelete
                      title="حذف"
                      buttonColor="error"
                      buttonVarient="outlined"
                      ModalWidth={"50%"}
                      deleteMethod={() => deleteItemHandeler(item)}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          my: "5%",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Pagination
          sx={{ mx: "auto", alignItems: "center", width: "content" }}
          variant="outlined"
          color="secondary"
          defaultPage={1}
          page={activePage}
          count={Math.ceil(+data?.headers["x-total-count"] / limit)}
          onChange={(_, page) => setActivePage(page)}
        />
      </Box>
    </Container>
  );
}

export default ProductManegment;
