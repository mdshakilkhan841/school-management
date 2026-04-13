"use server";

import prisma from "@/lib/prisma";
import { AssignmentSchema } from "@/lib/formValidationSchemas";
import { CurrentState, actionSuccess, handleActionError } from "./action-response";

export const createAssignment = async (
    currentState: CurrentState,
    data: AssignmentSchema,
) => {
    try {
        await prisma.assignment.create({
            data: {
                title: data.title,
                startDate: data.startDate,
                dueDate: data.dueDate,
                lessonId: data.lessonId,
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};

export const updateAssignment = async (
    currentState: CurrentState,
    data: AssignmentSchema,
) => {
    try {
        await prisma.assignment.update({
            where: {
                id: data.id,
            },
            data: {
                title: data.title,
                startDate: data.startDate,
                dueDate: data.dueDate,
                lessonId: data.lessonId,
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};

export const deleteAssignment = async (
    currentState: CurrentState,
    data: FormData,
) => {
    const id = data.get("id") as string;
    try {
        await prisma.assignment.delete({
            where: {
                id: parseInt(id),
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};
