const Loading = () => {
  return (
    <div className="flex-1 m-4 p-4 rounded-md animate-pulse" style={{ backgroundColor: "var(--theme-surface)" }}>
      <div className="flex items-center justify-between mb-4">
          <div
              className="h-6 w-48 rounded"
              style={{ backgroundColor: "var(--theme-border)" }}
          />
          <div className="flex items-center gap-4">
              <div
                  className="h-8 w-48 rounded-full hidden md:block"
                  style={{ backgroundColor: "var(--theme-border)" }}
              />
          </div>
      </div>
      
      <div className="flex space-x-4 mb-6 py-2" style={{ borderBottom: "1px solid var(--theme-border)" }}>
        <div className="h-4 w-1/6 rounded" style={{ backgroundColor: "var(--theme-border)" }}></div>
        <div className="h-4 w-2/6 rounded" style={{ backgroundColor: "var(--theme-border)" }}></div>
        <div className="h-4 w-1/6 rounded" style={{ backgroundColor: "var(--theme-border)" }}></div>
        <div className="h-4 w-1/6 rounded" style={{ backgroundColor: "var(--theme-border)" }}></div>
      </div>
      <div className="">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between mb-4 py-2 mt-4"
          >
            <div className="h-8 rounded w-1/6 mr-2" style={{ backgroundColor: "var(--theme-border)" }}></div>
            <div className="h-8 rounded w-2/6 mr-2" style={{ backgroundColor: "var(--theme-border)", opacity: 0.6 }}></div>
            <div className="h-8 rounded w-1/6 mr-2" style={{ backgroundColor: "var(--theme-border)", opacity: 0.8 }}></div>
            <div className="h-8 rounded w-1/6" style={{ backgroundColor: "var(--theme-border)", opacity: 0.5 }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
