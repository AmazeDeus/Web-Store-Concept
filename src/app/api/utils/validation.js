import validator from "validator";
import { z } from "zod";

const imageExtensions = ["png", "jpg", "jpeg", "gif", "bmp", "webp", "svg"];

const FinnishAddressSchema = z
  .object({
    streetName: z
      .string()
      .refine((value) => value === "" || !validator.isEmpty(value), {
        message: "Street name is required",
      })
      .refine((value) => value === "" || validator.isAlpha(value, "fi-FI"), {
        message: "Please enter a valid street name",
      })
      .optional(),
    houseNumber: z
      .string()
      .refine((value) => value === "" || !validator.isEmpty(value), {
        message: "House number is required",
      })
      .refine((value) => value === "" || validator.isAlphanumeric(value), {
        message: "Please enter a valid house number",
      })
      .optional(),
    stairwell: z
      .string()
      .refine((value) => value === "" || validator.isAlpha(value), {
        message: "Stairwell must be a letter",
      })
      .optional(),
    apartment: z
      .string()
      .refine((value) => value === "" || !validator.isEmpty(value), {
        message: "Apartment number cannot be empty",
      })
      .refine(
        (value) =>
          value === "" || validator.isNumeric(value, { no_symbols: true }),
        {
          message: "Apartment number must be a number",
        }
      )
      .optional(),
  })
  .refine(
    (data) => {
      // If stairwell is defined, apartmentNumber must also be defined
      if (data.stairwell && !data.apartment) {
        return false;
      }
      return true;
    },
    {
      message: "If stairwell is defined, apartment number must also be defined",
    }
  );

/* 
name?: string;
  image?: string;
  phone?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  admin: boolean;
  email: string;
*/
// Full User validation
const userSchema = z.object({
  name: z
    .string()
    .refine((value) => !validator.isEmpty(value), {
      message: "Name can not be empty",
    })
    .optional(),
  email: z
    .string()
    .refine((value) => !validator.isEmpty(value))
    .refine((value) => validator.isEmail(value), {
      message: "Invalid email format",
    }),
  phone: z
    .string()
    .refine((value) => value === "" || value.length >= 8, {
      message: "Phone number must be at least 8 digits long",
    })
    .refine(
      (value) => value === "" || validator.isMobilePhone(value, "fi-FI"),
      {
        message: "Must be a finnish phone number",
      }
    )
    .optional(),
  streetAddress: FinnishAddressSchema,
  postalCode: z
    .string()
    .refine(
      (value) => value === "" || (value.length === 5 && /^\d{5}$/.test(value)),
      {
        message: "Please enter a valid finnish postal code",
      }
    )
    .optional(),
  city: z
    .string()
    .refine((value) => value === "" || !validator.isEmpty(value), {
      message: "City can not be empty string",
    })
    .refine((value) => value === "" || validator.isAlpha(value, "fi-FI"), {
      message: "Please enter a valid city",
    })
    .optional(),
  image: z
    .string()
    .refine((value) => value === "" || validator.isURL(value), {
      message: "Invalid image URL or an empty string",
    })
    .refine(
      (value) => {
        if (value === "") return true;
        const extension = value.split(".").pop()?.toLowerCase();
        return imageExtensions.includes(extension);
      },
      {
        message: "Invalid image URL",
      }
    )
    .optional(),
});

// For login/register validation
const simpleUserSchema = z.object({
  email: z
    .string()
    .refine((value) => !validator.isEmpty(value), {
      message: "Email can not be empty",
    })
    .refine((value) => validator.isEmail(value), {
      message: "Please input a valid email",
    }),
  password: z
    .string()
    .refine((value) => value.length >= 8, {
      message: "Password must be at least 8 characters long",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /\d/.test(value), {
      message: "Password must contain at least one number",
    }),
});

// MenuItem validation
const menuItemSchema = z.object({
  image: z
    .string()
    .url({ message: "Invalid URL" })
    .refine(
      (value) => value.length > 0 && /\.(jpe?g|png|gif|bmp|webp)$/i.test(value),
      { message: "URL does not lead to an image or is empty" }
    )
    .optional(),
  name: z.string().min(1, { message: "Name is required" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .optional(),
  basePrice: z
    .number()
    .min(0, { message: "Base price must be a non-negative number" }),
  sizes: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Size name is required" }),
        price: z
          .number()
          .min(0, { message: "Size price must be a non-negative number" }),
      })
    )
    .optional(),
  extraIngredientPrices: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, { message: "Extra ingredient name is required" }),
        price: z.number().min(0, {
          message: "Extra ingredient price must be a non-negative number",
        }),
      })
    )
    .optional(),
  category: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, {
      message: "Category must be a valid MongoDB ObjectId",
    })
    .refine((value) => value !== "", {
      message: "Category can not be an empty string",
    })
    .optional(),
});

// MenuItem validation
const todaysCounterSchema = z.object({
  image: z
    .string()
    .url({ message: "Invalid URL" })
    .refine(
      (value) =>
        !validator.isEmpty(value) && /\.(jpe?g|png|gif|bmp|webp)$/i.test(value),
      { message: "URL does not lead to an image or is empty" }
    )
    .optional(),
});

export { userSchema, simpleUserSchema, menuItemSchema, todaysCounterSchema };
