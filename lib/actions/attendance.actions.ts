"use server";

import prisma from "@/lib/prisma";
import { AttendanceSchema } from "@/lib/formValidationSchemas";
import { CurrentState, actionSuccess, handleActionError } from "./action-response";

export const createAttendance = async (
    currentState: CurrentState,
    data: AttendanceSchema,
) => {
    try {
        await prisma.attendance.create({
            data: {
                date: data.date,
                present: data.present,
                studentId: data.studentId,
                lessonId: data.lessonId,
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};

export const updateAttendance = async (
    currentState: CurrentState,
    data: AttendanceSchema,
) => {
    try {
        await prisma.attendance.update({
            where: {
                id: data.id,
            },
            data: {
                date: data.date,
                present: data.present,
                studentId: data.studentId,
                lessonId: data.lessonId,
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};

export const deleteAttendance = async (
    currentState: CurrentState,
    data: FormData,
) => {
    const id = data.get("id") as string;
    try {
        await prisma.attendance.delete({
            where: {
                id: parseInt(id),
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};
