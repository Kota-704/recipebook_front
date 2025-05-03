"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Recipe = {
  id: string;
  title: string;
  content: string;
  image_url: string;
};

export default function EditRecipePage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}/`)
        .then((res) => {
          setRecipe(res.data);
          setTitle(res.data.title);
          setContent(res.data.content);
          setImageUrl(res.data.image_url);
        })
        .catch((err) => {
          console.error("取得失敗:", err);
        });
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}/update/`,
        {
          title,
          content,
          image_url: imageUrl,
        }
      );
      router.push("/recipes");
    } catch (err) {
      console.error("更新失敗:", err);
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">レシピ編集</h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="作り方"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full h-40"
        />
        <input
          type="text"
          placeholder="画像URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border p-2 w-full"
        />
        <div className="flex gap-3 justify-end">
          <Link href="/recipes">
            <Button>キャンセル</Button>
          </Link>
          <Button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-500 text-white"
          >
            保存
          </Button>
        </div>
      </div>
    </main>
  );
}
