"use server";

import prisma from "@/lib/prisma";
import { ResultSchema } from "@/lib/formValidationSchemas";
import { CurrentState, actionSuccess, handleActionError } from "./action-response";

export const createResult = async (
    currentState: CurrentState,
    data: ResultSchema,
) => {
    try {
        await prisma.result.create({
            data: {
                score: data.score,
                examId: data.examId || null,
                assignmentId: data.assignmentId || null,
                studentId: data.studentId,
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};

export const updateResult = async (
    currentState: CurrentState,
    data: ResultSchema,
) => {
    try {
        await prisma.result.update({
            where: {
                id: data.id,
            },
            data: {
                score: data.score,
                examId: data.examId || null,
                assignmentId: data.assignmentId || null,
                studentId: data.studentId,
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};

export const deleteResult = async (
    currentState: CurrentState,
    data: FormData,
) => {
    const id = data.get("id") as string;
    try {
        await prisma.result.delete({
            where: {
                id: parseInt(id),
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};
