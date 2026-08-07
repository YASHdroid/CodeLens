function ReviewResult({ review }) {
  const data = review;

  return (
    <div className="space-y-8">

      <section className="rounded-2xl border border-[#2A2A2A] bg-[#171717] p-6">
        <h2 className="mb-3 text-xl font-semibold text-white">
          📝 Summary
        </h2>

        <p className="leading-7 text-zinc-300">
          {data.summary}
        </p>
      </section>

      <section className="rounded-2xl border border-[#2A2A2A] bg-[#171717] p-6">
        <h2 className="mb-6 text-xl font-semibold text-white">
          🐞 Bugs Found
        </h2>

        {data.bugs.length === 0 ? (
          <p className="text-green-400">
            ✅ No bugs found.
          </p>
        ) : (
          data.bugs.map((bug, index) => (
            <div
              key={index}
              className="mb-6 rounded-xl border border-[#303030] bg-[#1E1E1E] p-5"
            >
              <div className="mb-3 flex gap-2">
                <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-400">
                  {bug.severity}
                </span>

                <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs text-violet-300">
                  {bug.category}
                </span>
              </div>

              <h3 className="mb-2 text-lg font-semibold text-white">
                {bug.issue}
              </h3>

              <p className="mb-4 text-zinc-300">
                {bug.explanation}
              </p>

              <pre className="overflow-x-auto rounded-xl bg-[#101010] p-4 text-sm text-green-400">
                <code>{bug.correctCode}</code>
              </pre>
            </div>
          ))
        )}
      </section>

      <section className="rounded-2xl border border-[#2A2A2A] bg-[#171717] p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">
          💡 Suggestions
        </h2>

        <ul className="space-y-3">
          {data.suggestions.map((item, index) => (
            <li
              key={index}
              className="text-zinc-300"
            >
              • {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-[#2A2A2A] bg-[#171717] p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">
          🎯 Interview Questions
        </h2>

        <ol className="list-decimal space-y-3 pl-5 text-zinc-300">
          {data.interviewQuestions.map((question, index) => (
            <li key={index}>
              {question}
            </li>
          ))}
        </ol>
      </section>

    </div>
  );
}

export default ReviewResult;