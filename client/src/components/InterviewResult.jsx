function InterviewResult({ result }) {
  const data = result.interview || result;

  return (
    <div className="space-y-8">

      {/* Header */}

      <section className="rounded-2xl border border-[#2A2A2A] bg-[#171717] p-6">

        <h2 className="mb-3 text-2xl font-semibold text-white">
          🎯 Interview Preparation
        </h2>

        <p className="leading-7 text-zinc-300">
          {data.summary}
        </p>

      </section>

      {/* Questions */}

      {data.questions.map((item, index) => (

        <section
          key={index}
          className="rounded-2xl border border-[#2A2A2A] bg-[#171717] p-6"
        >

          <div className="mb-5 flex items-center justify-between">

            <span className="rounded-full bg-[#6943DE]/20 px-4 py-1 text-sm font-medium text-[#B69BFF]">
              Question {index + 1}
            </span>

          </div>

          <h3 className="mb-5 text-xl font-semibold text-white">
            {item.question}
          </h3>

          <div className="rounded-xl border border-[#303030] bg-[#1E1E1E] p-5">

            <h4 className="mb-3 text-lg font-semibold text-green-400">
              Answer
            </h4>

            <p className="whitespace-pre-wrap leading-8 text-zinc-300">
              {item.answer}
            </p>

          </div>

          {item.exampleCode && (

            <div className="mt-5">

              <h4 className="mb-3 text-lg font-semibold text-violet-300">
                Example
              </h4>

              <pre className="overflow-x-auto rounded-xl bg-[#101010] p-5 text-sm text-green-400">
                <code>{item.exampleCode}</code>
              </pre>

            </div>

          )}

        </section>

      ))}

    </div>
  );
}

export default InterviewResult;