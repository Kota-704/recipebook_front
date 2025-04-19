"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Recipe = {
  id: string;
  user: string;
  group: string;
  title: string;
  content: string;
  image_url: string;
};

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/recipes/`)
      .then((res) => {
        console.log("成功:", res.data);
        setRecipes(res.data);
      })
      .catch((err) => {
        console.error("失敗:", err.message, err.response?.data || err);
      });
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">レシピ一覧</h1>
      {recipes.map((recipe) => (
        <div key={recipe.id} className="mb-4 border p-4 rounded-lg">
          <h2 className="text-xl font-semibold">{recipe.title}</h2>
          <p>{recipe.content}</p>
          <Image
            src={recipe.image_url}
            alt={recipe.title}
            width={600}
            height={400}
            className="mt-2 w-full max-w-md object-cover"
          />
        </div>
      ))}
      <Button className="mt-6">もっと読む</Button>
    </main>
  );
}
