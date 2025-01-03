"use client";

import { useState } from "react";
import { Box, Typography, Chip, CircularProgress } from "@mui/material";
import ArticleList from "../components/articleComponents/ArticleList";
import ArticleAPI from "../api/articleAPI";

function Page() {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const { articles, isLoading, error } = ArticleAPI();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", pt: 20 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ pt: 12, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const categories = [
    "全部",
    ...new Set(
      articles
        .filter((article) => article?.attributes?.category)
        .map((article) => article.attributes.category)
    ),
  ];

  const filteredArticles =
    selectedCategory === "全部"
      ? articles
      : articles.filter(
          (article) => article?.attributes?.category === selectedCategory
        );

  return (
    <Box
      sx={{
        pt: 12,
        px: { xs: 2, sm: 6 },
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* 標題區域 */}
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            color: "text.primary",
            fontWeight: "bold",
            mb: 2,
            fontFamily: "Orbitron",
            letterSpacing: "0.1em",
          }}
        >
          Articles
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Buliding... 🚀
        </Typography>
      </Box>

      {/* 分類標籤 */}
      <Box sx={{ mb: 4, display: "flex", gap: 1, flexWrap: "wrap" }}>
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => setSelectedCategory(category)}
            color={selectedCategory === category ? "primary" : "default"}
            sx={{ borderRadius: "8px", "&:hover": { opacity: 0.8 } }}
          />
        ))}
      </Box>

      {/* 文章列表 */}
      <Box
        sx={{
          mb: 8,
        }}
      >
        <ArticleList articles={filteredArticles} />
      </Box>
    </Box>
  );
}

export default Page;
