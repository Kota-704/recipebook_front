"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateRecipePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/recipes/create/`, {
        title,
        content,
        image_url: imageUrl,
      });

      router.push("/recipes");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">レシピを作成</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>料理名</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border px-3 py-1 w-full"
          />
        </div>
        <div>
          <label>作り方</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border px-3 py-1 w-full"
          />
        </div>
        <div>
          <label>画像URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border px-3 py-1 w-full"
          />
        </div>
        <div className="flex gap-3 justify-end">
          <Link href="/recipes">
            <Button>キャンセル</Button>
          </Link>
          <Button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            投稿する
          </Button>
        </div>
      </form>
    </main>
  );
}
