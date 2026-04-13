"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { ClassSchema } from "@/lib/formValidationSchemas";
import { CurrentState, actionSuccess, actionError, handleActionError } from "./action-response";

export const createClass = async (
    currentState: CurrentState,
    data: ClassSchema,
) => {
    try {
        await prisma.class.create({
            data: {
                level: data.level,
                name: data.name,
                stage: data.stage,
                description: data.description,
                capacity: data.capacity,
                bellSchedule: data.bellSchedule,
                sections: {
                    create: data.sections?.map((section) => ({
                        name: section.name,
                        capacity: section.capacity,
                    })),
                },
            },
        });

        revalidatePath("/classes");
        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};

export const updateClass = async (
    currentState: CurrentState,
    data: ClassSchema,
) => {
    try {
        if (!data.id) return actionError("Class ID is required for updating.");

        const result = await prisma.$transaction(async (tx) => {
            // 1. Update the Class main fields
            const updatedClass = await tx.class.update({
                where: { id: data.id },
                data: {
                    level: data.level,
                    name: data.name,
                    stage: data.stage,
                    description: data.description,
                    capacity: data.capacity,
                    bellSchedule: data.bellSchedule,
                },
            });

            // 2. Handle Sections Synchronization
            if (data.sections) {
                // Get existing section names to avoid duplicates if necessary,
                // but here we likely want to replace the sections configuration
                // with exactly what was in the form.

                // Simple approach: Delete old sections and create new ones.
                // DANGER: Only do this if they don't have students/lessons.
                // For now, let's just create ones that don't exist by name.

                const currentSections = await tx.section.findMany({
                    where: { classId: data.id },
                });

                const incomingSectionNames = data.sections.map((s) => s.name);

                // Sections to remove:
                const toRemove = currentSections.filter(
                    (s) => !incomingSectionNames.includes(s.name),
                );
                if (toRemove.length > 0) {
                    // ONLY remove sections that are NOT in use (no students, no lessons)
                    // to avoid foreign key violations.
                    for (const s of toRemove) {
                        const inUse =
                            (await tx.student.count({
                                where: { sectionId: s.id },
                            })) > 0 ||
                            (await tx.lesson.count({
                                where: { sectionId: s.id },
                            })) > 0;

                        if (!inUse) {
                            await tx.section.delete({ where: { id: s.id } });
                        }
                    }
                }

                // Sections to add or update:
                for (const s of data.sections) {
                    const existing = currentSections.find(
                        (cs) => cs.name === s.name,
                    );
                    if (existing) {
                        await tx.section.update({
                            where: { id: existing.id },
                            data: { capacity: s.capacity },
                        });
                    } else {
                        await tx.section.create({
                            data: {
                                name: s.name,
                                capacity: s.capacity,
                                classId: data.id!,
                            },
                        });
                    }
                }
            }

            return updatedClass;
        });

        revalidatePath("/classes");
        revalidatePath("/");
        return actionSuccess();
    } catch (err: unknown) {
        return handleActionError(err);
    }
};

export const deleteClass = async (
    currentState: CurrentState,
    data: FormData,
) => {
    const id = data.get("id") as string;
    try {
        await prisma.class.delete({
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
