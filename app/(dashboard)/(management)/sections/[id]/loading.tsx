const SectionDetailLoading = () => {
    return (
        <div className="flex-1 p-4 flex flex-col gap-6">
            {/* ─── HEADER SKELETON ─── */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Back Button */}
                    <div
                        className="w-10 h-10 rounded-md animate-pulse border"
                        style={{
                            borderColor: "var(--theme-border)",
                            backgroundColor: "var(--theme-surface-alt)",
                        }}
                    />
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            {/* Title */}
                            <div
                                className="h-7 w-40 rounded animate-pulse"
                                style={{ backgroundColor: "var(--theme-border)" }}
                            />
                            {/* Badge */}
                            <div
                                className="h-5 w-16 rounded-md animate-pulse"
                                style={{
                                    backgroundColor: "var(--theme-primary-light)",
                                    opacity: 0.5,
                                }}
                            />
                        </div>
                        {/* Subtitle */}
                        <div
                            className="h-3 w-56 rounded animate-pulse"
                            style={{
                                backgroundColor: "var(--theme-border)",
                                opacity: 0.7,
                            }}
                        />
                    </div>
                </div>
                {/* Delete Button Placeholder */}
                <div
                    className="h-8 w-8 rounded-full animate-pulse"
                    style={{
                        backgroundColor: "var(--theme-border)",
                        opacity: 0.4,
                    }}
                />
            </div>

            {/* ─── STAT CARDS SKELETON ─── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="rounded-xl p-4 flex items-center gap-4 animate-pulse border"
                        style={{
                            backgroundColor: "var(--theme-surface)",
                            borderColor: "var(--theme-border)",
                            animationDelay: `${i * 100}ms`,
                            animationDuration: "1.5s",
                        }}
                    >
                        {/* Icon Block */}
                        <div
                            className="w-12 h-12 rounded-md"
                            style={{
                                backgroundColor: "var(--theme-border)",
                                opacity: 0.5,
                            }}
                        />
                        {/* Text Block */}
                        <div className="flex flex-col gap-2">
                            <div
                                className="h-2 w-20 rounded"
                                style={{
                                    backgroundColor: "var(--theme-border)",
                                    opacity: 0.8,
                                }}
                            />
                            <div
                                className="h-4 w-24 rounded mt-1"
                                style={{
                                    backgroundColor: "var(--theme-border)",
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* ─── TABS SKELETON ─── */}
            <div
                className="flex items-center gap-8 px-2"
                style={{ borderBottom: "1px solid var(--theme-border)" }}
            >
                {[16, 18, 20, 17].map((w, i) => (
                    <div key={i} className="pb-3 flex flex-col items-center">
                        <div
                            className="rounded animate-pulse"
                            style={{
                                height: "14px",
                                width: `${w * 4}px`,
                                backgroundColor: "var(--theme-border)",
                                opacity: i === 0 ? 1 : 0.5,
                            }}
                        />
                        {i === 0 && (
                            <div
                                className="mt-2 rounded-full"
                                style={{
                                    height: "2px",
                                    width: `${w * 4}px`,
                                    backgroundColor: "var(--theme-primary)",
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* ─── OVERVIEW TAB CONTENT SKELETON ─── */}
            <div className="flex-1">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* LEFT: Room Card Skeleton */}
                    <div className="flex-1 flex flex-col gap-6">
                        <div
                            className="p-8 rounded-md border animate-pulse"
                            style={{
                                backgroundColor: "var(--theme-surface)",
                                borderColor: "var(--theme-border)",
                            }}
                        >
                            {/* Room Card Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div
                                    className="h-5 w-32 rounded"
                                    style={{ backgroundColor: "var(--theme-border)" }}
                                />
                                <div
                                    className="w-10 h-10 rounded-md border"
                                    style={{
                                        backgroundColor: "var(--theme-surface-alt)",
                                        borderColor: "var(--theme-border)",
                                    }}
                                />
                            </div>
                            {/* Room Card Body */}
                            <div className="flex flex-col gap-2 mb-8 max-w-[280px]">
                                <div
                                    className="h-3 w-full rounded"
                                    style={{
                                        backgroundColor: "var(--theme-border)",
                                        opacity: 0.6,
                                    }}
                                />
                                <div
                                    className="h-3 w-4/5 rounded"
                                    style={{
                                        backgroundColor: "var(--theme-border)",
                                        opacity: 0.5,
                                    }}
                                />
                                <div
                                    className="h-3 w-3/5 rounded"
                                    style={{
                                        backgroundColor: "var(--theme-border)",
                                        opacity: 0.4,
                                    }}
                                />
                            </div>
                            {/* Room Card Button */}
                            <div
                                className="h-9 w-32 rounded-md"
                                style={{
                                    backgroundColor: "var(--theme-border)",
                                    opacity: 0.7,
                                }}
                            />
                        </div>
                    </div>

                    {/* RIGHT: Teacher Card Skeleton */}
                    <div className="w-full lg:w-1/3">
                        <div
                            className="p-6 rounded-xl border flex flex-col gap-6 animate-pulse"
                            style={{
                                backgroundColor: "var(--theme-surface)",
                                borderColor: "var(--theme-border)",
                                animationDelay: "200ms",
                                animationDuration: "1.5s",
                            }}
                        >
                            {/* Teacher Icon + Assign Button */}
                            <div className="flex items-center justify-between">
                                <div
                                    className="w-12 h-12 rounded-lg"
                                    style={{
                                        backgroundColor: "var(--theme-border)",
                                        opacity: 0.5,
                                    }}
                                />
                                <div
                                    className="h-7 w-28 rounded-md"
                                    style={{
                                        backgroundColor: "var(--theme-primary-light)",
                                        opacity: 0.4,
                                    }}
                                />
                            </div>

                            {/* Teacher Label */}
                            <div className="flex flex-col gap-1">
                                <div
                                    className="h-2 w-24 rounded"
                                    style={{
                                        backgroundColor: "var(--theme-border)",
                                        opacity: 0.7,
                                    }}
                                />

                                {/* Teacher Avatar + Name */}
                                <div className="mt-4 flex flex-col gap-4">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="w-16 h-16 rounded-full"
                                            style={{
                                                backgroundColor: "var(--theme-border)",
                                                opacity: 0.4,
                                            }}
                                        />
                                        <div className="flex flex-col gap-2">
                                            <div
                                                className="h-5 w-28 rounded"
                                                style={{
                                                    backgroundColor: "var(--theme-border)",
                                                }}
                                            />
                                            <div
                                                className="h-3 w-16 rounded"
                                                style={{
                                                    backgroundColor: "var(--theme-border)",
                                                    opacity: 0.5,
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* View Profile Button */}
                                    <div
                                        className="w-full h-8 rounded-md"
                                        style={{
                                            backgroundColor: "var(--theme-surface-alt)",
                                            border: "1px solid var(--theme-border)",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SectionDetailLoading;
