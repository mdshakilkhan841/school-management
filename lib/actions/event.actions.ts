"use server";

import prisma from "@/lib/prisma";
import { EventSchema } from "@/lib/formValidationSchemas";
import { CurrentState, actionSuccess, handleActionError } from "./action-response";

export const createEvent = async (
    currentState: CurrentState,
    data: EventSchema,
) => {
    try {
        await prisma.event.create({
            data: {
                title: data.title,
                description: data.description,
                startTime: data.startTime,
                endTime: data.endTime,
                sectionId: data.sectionId || null,
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};

export const updateEvent = async (
    currentState: CurrentState,
    data: EventSchema,
) => {
    try {
        await prisma.event.update({
            where: {
                id: data.id,
            },
            data: {
                title: data.title,
                description: data.description,
                startTime: data.startTime,
                endTime: data.endTime,
                sectionId: data.sectionId || null,
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};

export const deleteEvent = async (
    currentState: CurrentState,
    data: FormData,
) => {
    const id = data.get("id") as string;
    try {
        await prisma.event.delete({
            where: {
                id: parseInt(id),
            },
        });

        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};
