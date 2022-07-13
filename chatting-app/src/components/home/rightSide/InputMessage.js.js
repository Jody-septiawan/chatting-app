import { useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';

export default function InputMessage({ contact, onSendMessage, isTyping }) {
  const [form, setForm] = useState({
    message: '',
  });

  const onChange = (e) => {
    setForm({
      ...form,
      message: e.target.value,
    });
  };

  return (
    <div className="text-white bg-red-2 py-2 px-4" style={{ height: '6vh' }}>
      <form
        onSubmit={(e) => {
          onSendMessage(e, form);
          setForm({
            message: '',
          });
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          className="w-full h-full rounded focus:outline-none text-black px-2 bg-red-3 border border-red-900 placeholder:italic placeholder:text-rose-400"
          style={{ flexBasis: '95%' }}
          value={form.message}
          onChange={onChange}
          onFocus={() => isTyping(true)}
          onBlur={() => isTyping(false)}
          placeholder="Write message ..."
        />
        <button
          className="bg-red-4 hover:bg-red-900 py-1 rounded flex justify-center items-center"
          style={{ flexBasis: '5%' }}
        >
          <RiSendPlaneFill />
        </button>
      </form>
    </div>
  );
}
