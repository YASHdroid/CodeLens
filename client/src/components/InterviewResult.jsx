function InterviewResult({ interview }) {
  return (
    <div className="mt-10 space-y-8">

      {/* Summary */}
      <section className="rounded-2xl border border-[#2A2A2A] bg-[#171717] p-6">

        <h2 className="mb-3 text-2xl font-semibold text-white">
          📖 Summary
        </h2>

        <p className="leading-8 text-zinc-300">
          {interview.summary}
        </p>

      </section>

      {/* Questions */}

      <section className="space-y-6">

        {interview.questions.map((item, index) => (

          <div
            key={index}
            className="rounded-2xl border border-[#2A2A2A] bg-[#171717] p-6"
          >

            {/* Heading */}

            <div className="mb-5 flex items-center justify-between">

              <h2 className="text-xl font-semibold text-white">
                🎯 Question {index + 1}
              </h2>

            </div>

            {/* Question */}

            <div className="mb-6">

              <h3 className="mb-2 text-lg font-semibold text-violet-400">
                Question
              </h3>

              <p className="leading-7 text-zinc-300">
                {item.question}
              </p>

            </div>

            {/* Answer */}

            <div className="mb-6">

              <h3 className="mb-2 text-lg font-semibold text-green-400">
                Answer
              </h3>

              <p className="whitespace-pre-wrap leading-7 text-zinc-300">
                {item.answer}
              </p>

            </div>

            {/* Example */}

            <div>

              <h3 className="mb-3 text-lg font-semibold text-yellow-400">
                Example Code
              </h3>

              <pre className="overflow-x-auto rounded-xl bg-[#0F0F0F] p-5 text-sm text-green-400">
                <code>
                  {item.exampleCode}
                </code>
              </pre>

            </div>

          </div>

        ))}

      </section>

    </div>
  );
}

export default InterviewResult;