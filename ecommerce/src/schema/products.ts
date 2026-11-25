import z from "zod";

export const productSchema = z.object({
    name: z.string().min(5),
    description: z.string().min(10).optional(),
    price: z.number().positive().min(1),
    stock: z.number()
    // rating: z.number().positive().max(5)
})

export const createProductSchema = z.array(productSchema)