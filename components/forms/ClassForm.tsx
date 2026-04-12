"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import InputField from "./InputField";
import { classSchema, ClassSchema } from "@/lib/formValidationSchemas";
import { createClass, updateClass } from "@/lib/actions";
import {
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ClassForm = ({
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
        control,
        watch,
        formState: { errors },
    } = useForm<ClassSchema>({
        resolver: zodResolver(classSchema),
        defaultValues: {
            sections:
                data?.sections?.map((c: any) => ({
                    name: c.name,
                    capacity: c.capacity,
                })) || [],
            ...data,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "sections",
    });

    const [sectionName, setSectionName] = useState("");
    const [sectionCapacity, setSectionCapacity] = useState(40);

    const [isPending, setIsPending] = useState(false);
    const [state, setState] = useState({ success: false, error: false });
    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        setIsPending(true);
        setState({ success: false, error: false });
        
        try {
            const action = type === "create" ? createClass : updateClass;
            const result = await action({ success: false, error: false }, data);
            
            if (result.success) {
                toast(`Academic Class has been ${type === "create" ? "created" : "updated"}!`);
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

    useEffect(() => {
        // Keeping this for any legacy state needs, but logic moved to onSubmit
    }, [state, router, type, setOpen]);

    const handleAddSection = () => {
        if (sectionName.trim()) {
            append({ name: sectionName.trim(), capacity: sectionCapacity });
            setSectionName("");
            setSectionCapacity(40);
        }
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create"
                    ? "Create a new academic class"
                    : "Update the academic class"}
            </h1>

            <div className="flex justify-between flex-wrap gap-x-4 gap-y-4">
                <div className="flex flex-col gap-1 w-full md:w-[48%]">
                    <label className="text-xs text-gray-500">Class Name</label>
                    <input
                        {...register("name")}
                        defaultValue={data?.name}
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full outline-none focus:ring-blue-400"
                        placeholder="e.g. Grade 10"
                    />
                    {errors.name?.message && (
                        <p className="text-[10px] text-red-500 m-0 leading-tight">
                            {errors.name.message.toString()}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-1 w-full md:w-[48%]">
                    <label className="text-xs text-gray-500">Stage</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full outline-none focus:ring-blue-400"
                        {...register("stage")}
                        defaultValue={data?.stage || "PRIMARY"}
                    >
                        <option value="PRE_PRIMARY">Pre-Primary</option>
                        <option value="PRIMARY">Primary</option>
                        <option value="MIDDLE">Middle</option>
                        <option value="HIGH">High</option>
                        <option value="SENIOR_SECONDARY">
                            Senior Secondary
                        </option>
                    </select>
                </div>

                <div className="flex flex-col gap-1 w-full md:w-[31%]">
                    <label className="text-xs text-gray-500">
                        Bell Schedule
                    </label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full outline-none focus:ring-blue-400"
                        {...register("bellSchedule")}
                        defaultValue={data?.bellSchedule}
                    >
                        <option value="">No Schedule</option>
                        <option value="PRIMARY">Primary Schedule</option>
                        <option value="SECONDARY">Secondary Schedule</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1 w-full md:w-[31%]">
                    <label className="text-xs text-gray-500">
                        Level (Numeric)
                    </label>
                    <input
                        type="number"
                        {...register("level")}
                        defaultValue={data?.level}
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full outline-none focus:ring-blue-400"
                    />
                    {errors.level?.message && (
                        <p className="text-[10px] text-red-500 m-0 leading-tight">
                            {errors.level.message.toString()}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-1 w-full md:w-[31%]">
                    <label className="text-xs text-gray-500">
                        Total Capacity (Optional)
                    </label>
                    <input
                        type="number"
                        {...register("capacity")}
                        defaultValue={data?.capacity}
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full outline-none focus:ring-blue-400"
                    />
                </div>

                <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs text-gray-500">Description</label>
                    <textarea
                        {...register("description")}
                        defaultValue={data?.description}
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full outline-none focus:ring-blue-400 min-h-[60px]"
                        placeholder="Enter class description..."
                    />
                </div>
            </div>

            <div className="flex flex-col gap-3 mt-2">
                <span className="text-xs text-gray-400 font-medium">
                    Sections Configuration
                </span>
                <div className="flex gap-4 items-end flex-wrap">
                    <div className="flex flex-col gap-1 grow min-w-[200px]">
                        <label className="text-xs text-gray-500">
                            Section Name
                        </label>
                        <input
                            type="text"
                            value={sectionName}
                            onChange={(e) =>
                                setSectionName(e.target.value.toUpperCase())
                            }
                            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm outline-none focus:ring-blue-400"
                            placeholder="E.G. A, B"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-28">
                        <label className="text-xs text-gray-500">
                            Capacity
                        </label>
                        <input
                            type="number"
                            value={sectionCapacity}
                            onChange={(e) =>
                                setSectionCapacity(parseInt(e.target.value))
                            }
                            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm outline-none focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleAddSection}
                        className="bg-gray-200 text-gray-800 p-2 rounded-md text-sm font-medium h-[38px]"
                    >
                        Add Section
                    </button>
                </div>

                <div className="flex flex-wrap gap-2">
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="bg-slate-100 p-2 rounded-md flex items-center gap-2 text-sm"
                        >
                            <span className="text-gray-700">
                                {watch(`sections.${index}.name`)}
                            </span>
                            <span className="text-gray-400">
                                ({watch(`sections.${index}.capacity`)})
                            </span>
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-500 ml-1"
                            >
                                ✕
                            </button>
                            <input
                                {...register(`sections.${index}.capacity`)}
                                hidden
                            />
                            <input
                                {...register(`sections.${index}.name`)}
                                hidden
                            />
                        </div>
                    ))}
                </div>
            </div>

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

            {state.error && (
                <p className="text-red-500 text-xs text-center">
                    Something went wrong! Level/Name must be unique.
                </p>
            )}
            <button
                type="submit"
                disabled={isPending}
                className="bg-blue-400 text-white p-3 rounded-md mt-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isPending
                    ? "Processing..."
                    : type === "create"
                      ? "Create Academic Class"
                      : "Update Academic Class"}
            </button>
        </form>
    );
};

export default ClassForm;
