import { z } from "zod"

const accepted_types = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Required" })
    .max(50, { message: "Too long" }),
  selectedCategory: z.string(),
  description: z
    .string()
    .min(1, { message: "Required" })
    .max(50, { message: "Too long" }),
  cover: z
    .any()
    .refine((files) => files?.length == 1, { message: "Required" })
    .refine((files) => accepted_types.includes(files?.[0]?.type), {
      message: ".jpg, .jpeg, .png and .webp files are accepted."
    }),
  images: z
    .any()
    .refine((files) => files?.length >= 2, { message: "Select more file" }),
  orientation: z.string(),
  rowOne: z
    .string()
    .min(1, { message: "Required" })
    .max(50, { message: "Too long" }),
  rowTwo: z
    .string()
    .min(1, { message: "Required" })
    .max(50, { message: "Too long" }),
  rowThree: z
    .string()
    .min(1, { message: "Required" })
    .max(50, { message: "Too long" }),
  rowFour: z
    .string()
    .min(1, { message: "Required" })
    .max(50, { message: "Too long" }),
  rowFive: z
    .string()
    .min(1, { message: "Required" })
    .max(50, { message: "Too long" }),
  extraRowOne: z.string().max(50, { message: "Too long" }),
  extraRowTwo: z.string().max(50, { message: "Too long" }),
  extraRowThree: z.string().max(50, { message: "Too long" }),
  extraRowFour: z.string().max(50, { message: "Too long" }),
  extraRowFive: z.string().max(50, { message: "Too long" })
})
