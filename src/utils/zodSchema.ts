import { string, z } from "zod"

const accepted_types = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Required" })
    .max(50, { message: "Too long" }),
  category_id: z.string(),
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
  rows: z.array(
    z.object({
      label: z
        .string()
        .min(1, { message: "Required" })
        .max(30, { message: "Too long" })
    })
  )
})

export const tierschema = z.object({
  name: z
    .string()
    .min(1, { message: "Required" })
    .max(50, { message: "Too long" }),

  description: z
    .string()
    .min(1, { message: "Required" })
    .max(50, { message: "Too long" })
})
