import { z } from "zod";

const resumeSchema = z.instanceof(File, {message: "Resume is required."}).refine((file) => (file.size <= 5*1024*1024), "Max file size is 5mb.").refine((file) => (["image/jpg", "image/jpeg", "image/png", "application/pdf"].includes(file.type)), "Only .jpg, .png, and .pdf files are allowed");

const picturesSchema = z.instanceof(File).refine((file) => (file.size <= 10*1024*1024), "Max files size is 10mb.");

export const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(8),
  profession: z.string().min(5, "Please select your profession."),
  gender: z.string().min(4),
  languages: z.array(z.string()).nonempty("Please select atleast one language."),
  resume: resumeSchema,
  pictures: z.array(picturesSchema).min(2, "Please select atleast two pictures.").refine((files) => files.every(file => ["image/jpg", "image/jpeg", "image/png"].includes(file.type)), {message: "All pictures must be .jpg or .png"}),
});

// no need after zod
// type FormFields = {
//   email: string,
//   password: string,
// }

export type FormFields = z.infer<typeof schema>;