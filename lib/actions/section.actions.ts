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
        await prisma.section.create({
            data,
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
        await prisma.section.update({
            where: {
                id: data.id,
            },
            data,
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
