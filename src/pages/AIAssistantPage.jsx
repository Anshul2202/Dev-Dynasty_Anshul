import { useState } from 'react';
import api, { getApiErrorMessage } from '../lib/api';
import LoadingSpinner from '../components/LoadingSpinner';

const starterMessages = [
  {
    id: 1,
    role: 'assistant',
    content:
      'Hello, I am the LexNode AI Assistant. Ask me to explain clauses, refine contract language, or help prepare document inputs.',
  },
];

function AIAssistantPage() {
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async (event) => {
    event.preventDefault();
    const trimmed = input.trim();

    if (!trimmed) {
      setError('Enter a message before sending.');
      return;
    }

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: trimmed,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setError('');
    setIsSending(true);

    try {
      const response = await api.post('/chat', {
        message: trimmed,
        history: nextMessages,
      });

      const assistantReply =
        response.data?.reply || response.data?.message || response.data?.content || '';

      if (!assistantReply) {
        throw new Error('The API response did not include an assistant reply.');
      }

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: assistantReply,
        },
      ]);
    } catch (submissionError) {
      setError(getApiErrorMessage(submissionError, 'Unable to contact the AI assistant right now.'));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="section-title">LexNode AI Assistant</h1>
        <p className="mt-4 text-base leading-7 text-slate-500">
          Chat with LexNode for drafting support, clause clarification, and AI-assisted legal workflow help.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-5xl shell-card overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <p className="text-sm font-medium text-slate-700">Secure assistant workspace</p>
          <p className="mt-1 text-sm text-slate-500">
            Keep prompts concise for faster results and better legal document guidance.
          </p>
        </div>

        <div className="flex min-h-[520px] flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto bg-white px-6 py-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={[
                    'max-w-[85%] rounded-3xl px-5 py-4 text-sm leading-7 shadow-sm',
                    message.role === 'user'
                      ? 'rounded-br-md bg-brand-500 text-white'
                      : 'rounded-bl-md bg-slate-100 text-slate-700',
                  ].join(' ')}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isSending ? <LoadingSpinner label="LexNode is thinking..." /> : null}
          </div>

          <div className="border-t border-slate-200 bg-white px-6 py-5">
            {error ? (
              <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <form onSubmit={handleSend} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="field-input flex-1"
                placeholder="Ask about a clause, agreement term, or document revision..."
              />
              <button type="submit" className="primary-btn sm:min-w-[120px]" disabled={isSending}>
                {isSending ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIAssistantPage;
