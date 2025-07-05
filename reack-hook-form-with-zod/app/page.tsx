"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormFields, schema } from "@/lib/schemas/form";

const Home = () => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: {errors, isSubmitting, isValid},
  } = useForm<FormFields>({
    defaultValues: {
      email: "abc@email.com",
      gender: "male",
      profession: "full stack developer",
      password: "123456",
      languages: ["cpp", "python"],
      pictures: [],
      resume: undefined,
    },
    resolver: zodResolver(schema),
  });

  const submitForm: SubmitHandler<FormFields> = async (data: FormFields) => {
    await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    console.log(data);
  }

  return (
    <div className="text-white border-2 border-rose-500 rounded-md p-4">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(submitForm)}>

        <label className="font-semibold text-white underline cursor-pointer" htmlFor="email">Enter your email:</label>
        <input 
        type="text" {...register("email")} 
        className="text-white rounded-md px-2 font-semibold bg-[#1f1f1f] outline-0" placeholder="Enter email here..." name="email" id="email"/>
        {errors.email && (
          <div className="text-red-600 font-semibold">{errors.email.message}</div>
        )}

        <label className="font-semibold text-white underline cursor-pointer" htmlFor="password">Enter your password:</label>
        <input 
        type="password" {...register("password")}
        className="text-white rounded-md px-2 font-semibold bg-[#1f1f1f] outline-0" placeholder="Enter pasword here..." id="password"/>
        {errors.password && (
          <div className="text-red-600 font-semibold">{errors.password.message}</div>
        )}

        <label className="font-semibold text-white underline cursor-pointer" htmlFor="profession">Choose your profession:</label>
        <select className="outline-white outline-2 text-white rounded-md font-semibold text-sm" id="profession" 
        {...register("profession")}>
          <option className="bg-[#1f1f1f] font-semibold text-sm" value="">Select...</option>
          <option className="bg-[#1f1f1f] font-semibold text-sm" value="frontend developer">Frontend developer</option>
          <option className="bg-[#1f1f1f] font-semibold text-sm" value="backend developer">Backend developer</option>
          <option className="bg-[#1f1f1f] font-semibold text-sm" value="full stack developer">Full stack developer</option>
        </select>
        {errors.profession && (
          <div className="text-red-600 font-semibold">{errors.profession.message}</div>
        )}

        <p className="font-semibold text-white underline cursor-pointer" >Choose your gender: </p>
        <div className="text-sm font-semibold flex gap-2">
          <input type="radio" id="male" value={"male"} className="cursor-pointer" 
          {...register("gender")}/>
          <label htmlFor="male" className="cursor-pointer">Male</label>
          <input type="radio" id="female" value={"female"} className="cursor-pointer"
          {...register("gender")}/>
          <label htmlFor="female" className="cursor-pointer">Female</label>
          <input type="radio" id="other" value={"other"} className="cursor-pointer"
          {...register("gender")}/>
          <label htmlFor="other" className="cursor-pointer">Other</label>
        </div>

        <p className="font-semibold text-white underline cursor-pointer" >Choose your Languages: </p>
        <div className="flex gap-2 font-semibold">
          <input id="java" type="checkbox" className="cursor-pointer"
          {...register("languages")} value={"java"}/>
          <label htmlFor="java" className="cursor-pointer">Java</label>

          <input id="cpp" type="checkbox" className="cursor-pointer"
          {...register("languages")} value={"cpp"}/>
          <label htmlFor="cpp" className="cursor-pointer">Cpp</label>

          <input id="python" type="checkbox" className="cursor-pointer"
          {...register("languages")} value={"python"}/>
          <label htmlFor="python" className="cursor-pointer">Python</label>
        </div>
        {errors.languages && (
          <div className="text-red-600 font-semibold">{errors.languages.message}</div>
        )}

        <label htmlFor="resume" className="font-semibold text-white underline cursor-pointer" >Upload your resume: </label>
        <input type="file" id="resume" className="outline-2 px-2 rounded-md text-sm font-semibold" onChange={async (event) => {
          const file = event.target.files?.[0];
          if(file){
            setValue("resume",  file);
            await trigger("resume");
          };
        }}/>
        {errors.resume && (
          <div className="text-red-600 font-semibold">{errors.resume.message}</div>
        )}

        <label htmlFor="pictures" className="font-semibold text-white underline cursor-pointer" >Upload your pictures: </label>
        <input type="file" id="pictures" className="outline-2 px-2 rounded-md text-sm font-semibold" onChange={async (event) => {
          setValue("pictures", Array.from(event.target.files || []))
          await trigger("pictures");
        }} multiple/>
        {errors.pictures && (
          <div className="text-red-600 font-semibold">{errors.pictures.message}</div>
        )}

        <button className={`text-white font-semibold rounded-md px-4 self-center 
          ${isSubmitting || !isValid ? "cursor-not-allowed bg-rose-950" : "cursor-pointer bg-rose-700"}`
        } disabled={isSubmitting}>{isSubmitting ? "Loading..." : "Submit"}</button>

      </form>
    </div>
  );
}

export default Home;