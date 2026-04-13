"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { SectionSchema } from "@/lib/formValidationSchemas";
import { CurrentState, actionSuccess, handleActionError } from "./action-response";

export const createSection = async (
    currentState: CurrentState,
    data: SectionSchema,
) => {
    try {
        // Sanitize supervisorId: form sends "" or literal "null" when no supervisor selected
        const supervisorValue =
            data.supervisorId && data.supervisorId.trim() !== "" && data.supervisorId !== "null"
                ? data.supervisorId
                : null;

        await prisma.section.create({
            data: {
                name: data.name,
                capacity: data.capacity,
                classId: data.classId,
                supervisorId: supervisorValue,
            },
        });

        revalidatePath("/classes");
        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};

export const updateSection = async (
    currentState: CurrentState,
    data: SectionSchema,
) => {
    try {
        // Sanitize supervisorId: form sends "" or literal "null" when no supervisor selected
        const supervisorValue =
            data.supervisorId && data.supervisorId.trim() !== "" && data.supervisorId !== "null"
                ? data.supervisorId
                : null;

        await prisma.section.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                capacity: data.capacity,
                classId: data.classId,
                supervisorId: supervisorValue,
            },
        });

        revalidatePath("/classes");
        revalidatePath("/");
        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};

export const deleteSection = async (
    currentState: CurrentState,
    data: FormData,
) => {
    const id = data.get("id") as string;
    try {
        await prisma.section.delete({
            where: {
                id: parseInt(id),
            },
        });

        revalidatePath("/classes");
        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};
