"use server";

import prisma from "@/lib/prisma";
import { AnnouncementSchema } from "@/lib/formValidationSchemas";
import { CurrentState, actionSuccess, handleActionError } from "./action-response";

export const createAnnouncement = async (
    currentState: CurrentState,
    data: AnnouncementSchema,
) => {
    try {
        await prisma.announcement.create({
            data: {
                title: data.title,
                description: data.description,
                date: data.date,
                sectionId: data.sectionId || null,
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};

export const updateAnnouncement = async (
    currentState: CurrentState,
    data: AnnouncementSchema,
) => {
    try {
        await prisma.announcement.update({
            where: {
                id: data.id,
            },
            data: {
                title: data.title,
                description: data.description,
                date: data.date,
                sectionId: data.sectionId || null,
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};

export const deleteAnnouncement = async (
    currentState: CurrentState,
    data: FormData,
) => {
    const id = data.get("id") as string;
    try {
        await prisma.announcement.delete({
            where: {
                id: parseInt(id),
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};
