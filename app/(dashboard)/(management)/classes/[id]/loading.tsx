const ClassDetailLoading = () => {
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
                {/* Action Placeholder removed */}
            </div>

            {/* ─── STAT CARDS SKELETON ─── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { color: "var(--theme-secondary)", delay: "0ms" },
                    { color: "var(--theme-primary)", delay: "100ms" },
                    { color: "var(--theme-accent)", delay: "200ms" },
                    { color: "var(--theme-success)", delay: "300ms" },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="rounded-xl p-4 flex items-center gap-4 animate-pulse border"
                        style={{
                            backgroundColor: "var(--theme-surface)",
                            borderColor: "var(--theme-border)",
                            animationDelay: item.delay,
                        }}
                    >
                        {/* Colorful Icon Block */}
                        <div
                            className="w-12 h-12 rounded-lg"
                            style={{
                                backgroundColor: item.color,
                                opacity: 0.15,
                            }}
                        />
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
                    {/* LEFT CONTENT */}
                    <div className="flex-1 flex flex-col gap-6">
                        {/* About Card Skeleton */}
                        <div
                            className="p-8 rounded-md border animate-pulse"
                            style={{
                                backgroundColor: "var(--theme-surface)",
                                borderColor: "var(--theme-border)",
                            }}
                        >
                            <div className="h-6 w-48 rounded mb-6" style={{ backgroundColor: "var(--theme-border)" }} />
                            <div className="flex flex-col gap-3 mb-8">
                                <div className="h-4 w-full rounded" style={{ backgroundColor: "var(--theme-border)", opacity: 0.6 }} />
                                <div className="h-4 w-11/12 rounded" style={{ backgroundColor: "var(--theme-border)", opacity: 0.5 }} />
                                <div className="h-4 w-4/5 rounded" style={{ backgroundColor: "var(--theme-border)", opacity: 0.4 }} />
                            </div>
                            <div className="grid grid-cols-2 gap-8 pt-8 border-t" style={{ borderColor: "var(--theme-border)" }}>
                                <div><div className="h-3 w-20 rounded mb-2" style={{ backgroundColor: "var(--theme-border)", opacity: 0.4 }} /><div className="h-6 w-24 rounded" style={{ backgroundColor: "var(--theme-primary-light)", opacity: 0.3 }} /></div>
                                <div><div className="h-3 w-20 rounded mb-2" style={{ backgroundColor: "var(--theme-border)", opacity: 0.4 }} /><div className="h-6 w-24 rounded" style={{ backgroundColor: "var(--theme-border)", opacity: 0.6 }} /></div>
                            </div>
                        </div>

                        {/* Recent Activity Skeleton */}
                        <div
                            className="p-8 rounded-md border animate-pulse"
                            style={{
                                backgroundColor: "var(--theme-surface)",
                                borderColor: "var(--theme-border)",
                            }}
                        >
                            <div className="h-5 w-40 rounded mb-8" style={{ backgroundColor: "var(--theme-border)" }} />
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex gap-4 mb-6 last:mb-0">
                                    <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: "var(--theme-secondary)", opacity: 0.6 }} />
                                    <div className="flex flex-col gap-2 w-full">
                                        <div className="h-4 w-3/4 rounded" style={{ backgroundColor: "var(--theme-border)" }} />
                                        <div className="h-3 w-1/4 rounded" style={{ backgroundColor: "var(--theme-border)", opacity: 0.5 }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT CONTENT: Head Teacher Skeleton */}
                    <div className="w-full lg:w-1/3">
                        <div
                            className="p-8 rounded-xl border flex flex-col gap-8 animate-pulse"
                            style={{
                                backgroundColor: "var(--theme-surface)",
                                borderColor: "var(--theme-border)",
                            }}
                        >
                            {/* Header row in card */}
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl" style={{ backgroundColor: "var(--theme-primary-light)", opacity: 0.4 }} />
                                <div className="flex flex-col gap-2">
                                    <div className="h-2 w-16 rounded" style={{ backgroundColor: "var(--theme-border)", opacity: 0.6 }} />
                                    <div className="h-4 w-24 rounded" style={{ backgroundColor: "var(--theme-border)" }} />
                                </div>
                            </div>

                            {/* Body text in card */}
                            <div className="flex flex-col gap-2">
                                <div className="h-3 w-full rounded" style={{ backgroundColor: "var(--theme-border)", opacity: 0.5 }} />
                                <div className="h-3 w-4/5 rounded" style={{ backgroundColor: "var(--theme-border)", opacity: 0.4 }} />
                            </div>

                            {/* Status badge in card */}
                            <div className="p-4 rounded-xl border" style={{ backgroundColor: "var(--theme-surface-alt)", borderColor: "var(--theme-border)" }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full" style={{ backgroundColor: "var(--theme-accent)", opacity: 0.2 }} />
                                    <div className="flex flex-col gap-2">
                                        <div className="h-3 w-20 rounded" style={{ backgroundColor: "var(--theme-border)" }} />
                                        <div className="h-2 w-24 rounded" style={{ backgroundColor: "var(--theme-border)", opacity: 0.5 }} />
                                    </div>
                                </div>
                            </div>

                            {/* Button placeholder */}
                            <div className="w-full h-11 rounded-xl" style={{ backgroundColor: "var(--theme-primary-light)", opacity: 0.3 }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassDetailLoading;
