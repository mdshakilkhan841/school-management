"use server";

import prisma from "@/lib/prisma";
import { LessonSchema } from "@/lib/formValidationSchemas";
import { CurrentState, actionSuccess, handleActionError } from "./action-response";

export const createLesson = async (
    currentState: CurrentState,
    data: LessonSchema,
) => {
    try {
        await prisma.lesson.create({
            data: {
                name: data.name,
                day: data.day,
                startTime: data.startTime,
                endTime: data.endTime,
                subjectId: data.subjectId,
                sectionId: data.sectionId,
                teacherId: data.teacherId,
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};

export const updateLesson = async (
    currentState: CurrentState,
    data: LessonSchema,
) => {
    try {
        await prisma.lesson.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                day: data.day,
                startTime: data.startTime,
                endTime: data.endTime,
                subjectId: data.subjectId,
                sectionId: data.sectionId,
                teacherId: data.teacherId,
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};

export const deleteLesson = async (
    currentState: CurrentState,
    data: FormData,
) => {
    const id = data.get("id") as string;
    try {
        await prisma.lesson.delete({
            where: {
                id: parseInt(id),
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};
