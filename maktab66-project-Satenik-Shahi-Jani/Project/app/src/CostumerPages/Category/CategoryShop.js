import React from "react";
import { useMemo,useState } from "react";
// import CostumerPageDrower from "../../layouts/CostumerPageDrower";
import { useFetch } from "../../hooks/useFetch";
import Cards from "../shared/Cards";
import { Container, CircularProgress, Box, CardMedia,Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function CategoryShop() {
  const params = useParams();
  const categoryNumber = params.categoryId;
  const categoryData = useFetch(`/category?id=${categoryNumber}`);
  const limit = useMemo(() => 9, []);
  const [activePage, setActivePage] = useState(1);

  const { data, loading } = useFetch(`products?_page=${activePage}&_limit=${limit}}&category=${categoryNumber}`);

  return (
    <Container sx={{ mt: "5%",minHeight: '95vh' }} >
      {categoryData.loading ? (
        <Box
          sx={{
            width: 1,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ my: "auto" }} />
        </Box>
      ) : (
        <Link to={`/category/${categoryData?.data.data[0].icon}`}>
          <Box dir="rtl" sx={{ display: "flex", alignItems: "center" }}>
            <CardMedia
              component="img"
              alt="img"
              height="140"
              image={`http://localhost:3002/files/${categoryData?.data.data[0].icon}`}
              sx={{ width: "8%", height: "8%", borderRadius: "30px", mx: "2%" }}
            />
            <Box
              // component={"h2"}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              {categoryData?.data.data[0].name}

            </Box>
          </Box>
        </Link>
      )}
      <Container
        sx={{
          mt: "5%",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {loading ? (
          <Box
         
            sx={{
              width: 1,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ my: "auto" }} />
          </Box>
        ) : (
          <Box  dir="rtl"             sx={{
            width: 1,
            mx: "auto",
            display: "flex",
            alignItems: "center",
            flexWrap:"wrap"
          }}>
            {data?.data.map((product) => (
              <Cards key={product.id} product={product} />
            ))}
          </Box>
        )}
      </Container>
      <Box
        sx={{
          my:"5%",
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
          count={Math.ceil(data?.headers["x-total-count"]/ limit)}
          onChange={(_, page) => setActivePage(page)}
        />
      </Box>
    </Container>
  );
}

export default CategoryShop;
