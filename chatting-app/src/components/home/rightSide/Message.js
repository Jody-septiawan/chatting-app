import { useEffect, useRef } from 'react';
import { GrFormClose } from 'react-icons/gr';

export default function Message({ contact, loadMessage, messages }) {
  const divRef = useRef(null);

  useEffect(() => {
    loadMessage();
    divRef?.current?.scrollIntoView({
      behavior: 'smooth',
      top: divRef?.current?.scrollHeight,
    });
  }, [contact, messages]);

  return (
    <div
      className="px-4 py-3 bg-red-3 overflow-auto	"
      style={{ height: '86vh' }}
    >
      {messages.length != 0 ? (
        <>
          {messages.map((data, idx) => (
            <div key={idx}>
              {contact.id == data.senderUser.id ? (
                <div
                  className="bg-slate-200	rounded p-2 mb-2"
                  style={{ maxWidth: '400px' }}
                >
                  <p>{data.message}</p>
                  <div className="mt-2 text-xs text-neutral-700 text-right">
                    {convertTime(data.createdAt)}
                  </div>
                </div>
              ) : (
                <div
                  className="bg-slate-200	rounded p-2 mb-2 ml-auto"
                  style={{ maxWidth: '400px' }}
                >
                  <p>{data.message}</p>
                  <div className="mt-1 text-xs text-neutral-700 text-right">
                    {convertTime(data.createdAt)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      ) : (
        <div className="text-center text-gray-700 italic">
          Send First Message
        </div>
      )}
      <div ref={divRef} />
    </div>
  );
}

const convertTime = (value) => {
  let time = new Date(value);
  time = `${time.getHours()}:${time.getMinutes()}`;
  return time;
};
