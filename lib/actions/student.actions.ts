"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { StudentSchema } from "@/lib/formValidationSchemas";
import { CurrentState, actionSuccess, actionError, handleActionError } from "./action-response";

export const createStudent = async (
    currentState: CurrentState,
    data: StudentSchema,
) => {
    try {
        const sectionItem = await prisma.section.findUnique({
            where: { id: data.sectionId },
            include: { _count: { select: { students: true } } },
        });

        if (
            sectionItem &&
            sectionItem.capacity === sectionItem._count.students
        ) {
            return actionError("This section is already full.");
        }

        const { user } = await auth.api.createUser({
            body: {
                email: data.email || `${data.username}@system.local`,
                password: data.password || "password123",
                name: `${data.name} ${data.surname}`,
                role: "student",
            },
        });

        if (!user) {
            return actionError("Failed to create authentication user.");
        }

        await prisma.student.create({
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
                classId: data.classId,
                sectionId: data.sectionId,
                parentId: data.parentId,
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};

export const updateStudent = async (
    currentState: CurrentState,
    data: StudentSchema,
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

        await prisma.student.update({
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
                classId: data.classId,
                sectionId: data.sectionId,
                parentId: data.parentId,
            },
        });
        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};

export const deleteStudent = async (
    currentState: CurrentState,
    data: FormData,
) => {
    const id = data.get("id") as string;
    try {
        await prisma.user.delete({ where: { id: id } });
        await prisma.student.delete({
            where: {
                id: id,
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};
