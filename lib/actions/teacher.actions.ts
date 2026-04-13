"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { TeacherSchema } from "@/lib/formValidationSchemas";
import { CurrentState, actionSuccess, actionError, handleActionError } from "./action-response";

export const createTeacher = async (
    currentState: CurrentState,
    data: TeacherSchema,
) => {
    try {
        const { user } = await auth.api.createUser({
            body: {
                email: data.email || `${data.username}@system.local`,
                password: data.password || "password123",
                name: `${data.name} ${data.surname}`,
                role: "teacher",
            },
        });

        if (!user) {
            return actionError("Failed to create authentication user.");
        }

        await prisma.teacher.create({
            data: {
                id: user.id,
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                sex: data.sex,
                birthday: data.birthday,
                subjects: {
                    connect: data.subjects?.map((subjectId: string) => ({
                        id: parseInt(subjectId),
                    })),
                },
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};

export const updateTeacher = async (
    currentState: CurrentState,
    data: TeacherSchema,
) => {
    if (!data.id) {
        return actionError("Identification is required for updating.");
    }
    try {
        await prisma.user.update({
            where: { id: data.id },
            data: {
                name: `${data.name} ${data.surname}`,
                email: data.email || `${data.username}@system.local`,
            },
        });

        await prisma.teacher.update({
            where: {
                id: data.id,
            },
            data: {
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                phone: data.phone || null,
                address: data.address,
                img: data.img || null,
                bloodType: data.bloodType,
                sex: data.sex,
                birthday: data.birthday,
                subjects: {
                    set: data.subjects?.map((subjectId: string) => ({
                        id: parseInt(subjectId),
                    })),
                },
            },
        });
        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};

export const deleteTeacher = async (
    currentState: CurrentState,
    data: FormData,
) => {
    const id = data.get("id") as string;
    try {
        await prisma.user.delete({ where: { id: id } });
        await prisma.teacher.delete({
            where: {
                id: id,
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};
