import AnotherAccount from '../rightSide/AnotherAccount';
import Message from '../rightSide/Message';
import InputMessage from '../rightSide/InputMessage.js';
import NoMessage from '../rightSide/NoMessage';

export default function RightSide({
  contact,
  setContact,
  onSendMessage,
  loadMessage,
  messages,
  isTyping,
}) {
  return (
    <div className="col-span-9">
      {contact ? (
        <>
          <AnotherAccount contact={contact} setContact={setContact} />
          <Message
            contact={contact}
            loadMessage={loadMessage}
            messages={messages}
          />
          <InputMessage
            contact={contact}
            onSendMessage={onSendMessage}
            isTyping={isTyping}
          />
        </>
      ) : (
        <NoMessage />
      )}
    </div>
  );
}
