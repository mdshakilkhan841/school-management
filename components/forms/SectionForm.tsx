"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import {
  sectionSchema,
  SectionSchema,
} from "@/lib/formValidationSchemas";
import {
  createSection,
  updateSection,
} from "@/lib/actions";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SectionForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SectionSchema>({
    resolver: zodResolver(sectionSchema),
    defaultValues: data
  });

  const [isPending, setIsPending] = useState(false);
  const [state, setState] = useState({ success: false, error: false });
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    setIsPending(true);
    setState({ success: false, error: false });

    try {
        const action = type === "create" ? createSection : updateSection;
        const result = await action({ success: false, error: false }, data);

        if (result.success) {
            toast(`Section has been ${type === "create" ? "created" : "updated"}!`);
            setOpen(false);
            router.refresh();
        } else {
            setState({ success: false, error: true });
        }
    } catch (err) {
        setState({ success: false, error: true });
    } finally {
        setIsPending(false);
    }
  });

  const { teachers, classes } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new section" : "Update the section"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Section name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Capacity"
          name="capacity"
          defaultValue={data?.capacity}
          register={register}
          error={errors?.capacity}
        />
        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Supervisor</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full outline-none"
            {...register("supervisorId")}
            defaultValue={data?.supervisorId}
          >
            <option value="">Select Teacher</option>
            {teachers.map(
              (teacher: { id: string; name: string; surname: string }) => (
                <option
                  value={teacher.id}
                  key={teacher.id}
                >
                  {teacher.name + " " + teacher.surname}
                </option>
              )
            )}
          </select>
          {errors.supervisorId?.message && (
            <p className="text-xs text-red-400">
              {errors.supervisorId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Class (Level)</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full outline-none"
            {...register("classId")}
            defaultValue={data?.classId}
          >
            {classes.map((c: { id: number; level: number }) => (
              <option
                value={c.id}
                key={c.id}
              >
                Level {c.level}
              </option>
            ))}
          </select>
          {errors.classId?.message && (
            <p className="text-xs text-red-400">
              {errors.classId.message.toString()}
            </p>
          )}
        </div>
      </div>
      {state.error && (
        <span className="text-red-500 text-xs">Something went wrong!</span>
      )}
      <button disabled={isPending} className="bg-blue-400 text-white p-2 rounded-md disabled:bg-opacity-50 font-medium">
        {isPending ? "Processing..." : (type === "create" ? "Create Section" : "Update Section")}
      </button>
    </form>
  );
};

export default SectionForm;
