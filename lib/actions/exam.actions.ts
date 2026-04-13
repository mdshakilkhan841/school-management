"use server";

import prisma from "@/lib/prisma";
import { ExamSchema } from "@/lib/formValidationSchemas";
import { CurrentState, actionSuccess, handleActionError } from "./action-response";

export const createExam = async (
    currentState: CurrentState,
    data: ExamSchema,
) => {
    try {
        await prisma.exam.create({
            data: {
                title: data.title,
                startTime: data.startTime,
                endTime: data.endTime,
                lessonId: data.lessonId,
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};

export const updateExam = async (
    currentState: CurrentState,
    data: ExamSchema,
) => {
    try {
        await prisma.exam.update({
            where: {
                id: data.id,
            },
            data: {
                title: data.title,
                startTime: data.startTime,
                endTime: data.endTime,
                lessonId: data.lessonId,
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};

export const deleteExam = async (
    currentState: CurrentState,
    data: FormData,
) => {
    const id = data.get("id") as string;
    try {
        await prisma.exam.delete({
            where: {
                id: parseInt(id),
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};
