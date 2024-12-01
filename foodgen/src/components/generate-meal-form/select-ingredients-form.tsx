"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";

// Define a TypeScript interface for form values
interface FormValues {
  name: string;
  email: string;
}

// Define the validation schema with Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

export const SelectIngredientsForm: React.FC = () => {
  // Initialize React Hook Form with type-safe form values
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  // Define the type-safe submit handler
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-w-[600px] flex-col gap-4 rounded-lg bg-white p-8"
    >
      <h2 className="text-xl font-bold text-black">Select ingredients</h2>
      {/* Name Field */}
      <TextField
        {...register("name")}
        label="Name"
        variant="outlined"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
        style={{ marginBottom: "16px" }}
      />
      {/* Email Field */}
      <TextField
        {...register("email")}
        label="Email"
        variant="outlined"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        style={{ marginBottom: "16px" }}
      />
      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default SelectIngredientsForm;
