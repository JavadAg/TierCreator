import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../utils/client"

interface Category {
  name: string
  image: string
  slug: string
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[] | null>()

  const getCategories = async () => {
    let { data: categories, error } = await supabase
      .from("categories")
      .select("*")
    setCategories(categories)
  }

  useEffect(() => {
    getCategories()
  }, [])

  console.log(categories)

  return (
    <div className="space-y-5">
      <span className="font-bold text-4xl">TierMaker Template Categories</span>
      <p>
        There are over 1 million tier list templates on TierMaker. Browse the
        categories on this page or use our search box to find the perfect tier
        list template for anything. If the perfect template doesn't yet exist,
        you can create your own template.
      </p>
      <div className="flex flex-wrap">
        {categories?.map((category, index) => (
          <Link
            key={category.slug}
            to={`/categories/${category.slug}`}
            className="flex justify-center items-center m-1 flex-col"
          >
            <img
              className="object-cover w-36 h-36"
              key={index}
              src={category.image}
            />
            <span className="bg-black text-white w-36 text-center">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories
