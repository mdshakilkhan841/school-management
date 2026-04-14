const ClassesLoading = () => {
    return (
        <div className="flex-1 m-4 flex flex-col gap-4">
            {/* ─── STAT CARDS SKELETON ─── */}
            <div className="flex gap-4 justify-between flex-wrap">
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="rounded-2xl p-4 flex-1 min-w-[130px] animate-pulse"
                        style={{ backgroundColor: "var(--theme-surface)" }}
                    >
                        <div className="flex justify-between items-center">
                            <div
                                className="h-5 w-14 rounded-full"
                                style={{
                                    backgroundColor: "var(--theme-border)",
                                }}
                            />
                            <div
                                className="h-5 w-5 rounded"
                                style={{
                                    backgroundColor: "var(--theme-border)",
                                }}
                            />
                        </div>
                        <div
                            className="h-8 w-16 rounded mt-4 mb-4"
                            style={{
                                backgroundColor: "var(--theme-border)",
                            }}
                        />
                        <div
                            className="h-4 w-20 rounded"
                            style={{
                                backgroundColor: "var(--theme-border)",
                                opacity: 0.6,
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* ─── TABLE SECTION SKELETON ─── */}
            <div
                className="p-4 rounded-md flex-1"
                style={{ backgroundColor: "var(--theme-surface)" }}
            >
                {/* TOP BAR: Title + Search + Actions */}
                <div className="flex items-center justify-between mb-4">
                    <div
                        className="h-6 w-48 rounded animate-pulse"
                        style={{ backgroundColor: "var(--theme-border)" }}
                    />
                    <div className="flex items-center gap-4">
                        <div
                            className="h-8 w-48 rounded-full animate-pulse"
                            style={{ backgroundColor: "var(--theme-border)" }}
                        />
                        <div className="flex items-center gap-2">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="h-8 w-8 rounded-full animate-pulse"
                                    style={{
                                        backgroundColor:
                                            "var(--theme-border)",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* TABLE HEADER */}
                <div
                    className="flex items-center gap-4 px-4 py-3 animate-pulse"
                    style={{
                        borderBottom: "1px solid var(--theme-border)",
                    }}
                >
                    <div
                        className="h-3 w-24 rounded"
                        style={{ backgroundColor: "var(--theme-border)" }}
                    />
                    <div
                        className="h-3 w-16 rounded hidden md:block"
                        style={{ backgroundColor: "var(--theme-border)" }}
                    />
                    <div
                        className="h-3 w-20 rounded hidden md:block ml-auto"
                        style={{ backgroundColor: "var(--theme-border)" }}
                    />
                    <div
                        className="h-3 w-16 rounded hidden md:block"
                        style={{ backgroundColor: "var(--theme-border)" }}
                    />
                    <div
                        className="h-3 w-16 rounded hidden md:block"
                        style={{ backgroundColor: "var(--theme-border)" }}
                    />
                    <div
                        className="h-3 w-14 rounded hidden lg:block"
                        style={{ backgroundColor: "var(--theme-border)" }}
                    />
                    <div
                        className="h-3 w-16 rounded"
                        style={{ backgroundColor: "var(--theme-border)" }}
                    />
                </div>

                {/* TABLE ROWS */}
                {[...Array(7)].map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 px-4 py-4 animate-pulse"
                        style={{
                            borderBottom: "1px solid var(--theme-border)",
                            animationDelay: `${index * 100}ms`,
                            animationDuration: "1.5s",
                        }}
                    >
                        {/* Chevron + Name */}
                        <div className="flex items-center gap-3 w-24">
                            <div
                                className="h-3 w-3 rounded-sm"
                                style={{
                                    backgroundColor: "var(--theme-border)",
                                }}
                            />
                            <div
                                className="h-4 w-16 rounded"
                                style={{
                                    backgroundColor: "var(--theme-border)",
                                }}
                            />
                        </div>
                        {/* Section badges */}
                        <div className="hidden md:flex gap-1 w-16">
                            <div
                                className="h-5 w-7 rounded-sm"
                                style={{
                                    backgroundColor: "var(--theme-primary-light)",
                                    opacity: 0.5,
                                }}
                            />
                            {index % 2 === 0 && (
                                <div
                                    className="h-5 w-7 rounded-sm"
                                    style={{
                                        backgroundColor:
                                            "var(--theme-accent)",
                                        opacity: 0.3,
                                    }}
                                />
                            )}
                        </div>
                        {/* Schedule */}
                        <div
                            className="h-3 w-20 rounded hidden md:block ml-auto"
                            style={{
                                backgroundColor: "var(--theme-border)",
                                opacity: 0.7,
                            }}
                        />
                        {/* Students */}
                        <div
                            className="h-4 w-8 rounded hidden md:block"
                            style={{
                                backgroundColor: "var(--theme-border)",
                            }}
                        />
                        {/* Capacity */}
                        <div
                            className="h-4 w-8 rounded hidden md:block"
                            style={{
                                backgroundColor: "var(--theme-border)",
                            }}
                        />
                        {/* Stage */}
                        <div
                            className="h-3 w-8 rounded hidden lg:block"
                            style={{
                                backgroundColor: "var(--theme-border)",
                                opacity: 0.7,
                            }}
                        />
                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <div
                                className="h-7 w-7 rounded-full"
                                style={{
                                    backgroundColor: "var(--theme-primary-light)",
                                    opacity: 0.4,
                                }}
                            />
                            <div
                                className="h-7 w-7 rounded-full"
                                style={{
                                    backgroundColor: "var(--theme-border)",
                                    opacity: 0.5,
                                }}
                            />
                            <div
                                className="h-7 w-7 rounded-full"
                                style={{
                                    backgroundColor: "var(--theme-border)",
                                    opacity: 0.3,
                                }}
                            />
                        </div>
                    </div>
                ))}

                {/* PAGINATION SKELETON */}
                <div className="flex items-center justify-between px-4 py-4 animate-pulse">
                    <div
                        className="h-8 w-14 rounded"
                        style={{
                            backgroundColor: "var(--theme-border)",
                            opacity: 0.5,
                        }}
                    />
                    <div className="flex items-center gap-2">
                        <div
                            className="h-8 w-8 rounded"
                            style={{
                                backgroundColor: "var(--theme-primary-light)",
                                opacity: 0.5,
                            }}
                        />
                    </div>
                    <div
                        className="h-8 w-14 rounded"
                        style={{
                            backgroundColor: "var(--theme-border)",
                            opacity: 0.5,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ClassesLoading;
