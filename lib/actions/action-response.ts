import { Prisma } from "@prisma/client";

// ─── Types ───────────────────────────────────────────────────
export type ActionResponse = {
    success: boolean;
    error: boolean;
    message?: string;
};

// Alias for backwards compatibility (forms use this as the state type)
export type CurrentState = ActionResponse;

// ─── Success Helper ──────────────────────────────────────────
export function actionSuccess(message?: string): ActionResponse {
    return { success: true, error: false, message };
}

// ─── Error Helper ────────────────────────────────────────────
export function actionError(
    message: string = "An unexpected error occurred.",
): ActionResponse {
    return { success: false, error: true, message };
}

// ─── Centralized Error Handler ───────────────────────────────
// Replaces the 12-line try/catch block that was duplicated 36 times!
export function handleActionError(err: unknown): ActionResponse {
    console.error(err);

    // Handle Prisma-specific errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const prismaError = err as Prisma.PrismaClientKnownRequestError;
        switch (prismaError.code) {
            case "P2003":
                return actionError(
                    "Cannot delete this item as it is still in use by other records.",
                );
            case "P2002":
                return actionError("A record with this value already exists.");
            case "P2025":
                return actionError("Record not found.");
        }
    }

    // Handle generic errors (including foreign key messages from non-Prisma sources)
    if (err instanceof Error) {
        if (err.message.includes("foreign key constraint")) {
            return actionError(
                "Cannot delete this item as it is still in use by other records.",
            );
        }
        return actionError(err.message);
    }

    return actionError();
}
