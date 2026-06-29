import { z } from "zod";

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Имя повинно мати не меньш 2-х символів" }),
  lastName: z
    .string()
    .min(2, { message: "Призвіще повинно иати не меньш 2-х символів" }),
  email: z.string().email({ message: "Введіть корректну пошту" }),
  phone: z.string().min(10, { message: "Введіть корректну номер телефону" }),
  address: z.string().min(5, { message: "Введіть корректну адресу" }),
  comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
