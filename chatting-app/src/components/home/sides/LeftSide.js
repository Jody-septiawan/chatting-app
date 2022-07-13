import MyAccount from '../leftSide/MyAccount';
import ChatAccount from '../leftSide/ChatAccount';

export default function LeftSide({
  contact: contactActive,
  contacts,
  setContact,
}) {
  return (
    <div className="p-2 px-4 bg-red-1 col-span-3">
      <MyAccount />
      <div className="font-extralight text-white mb-2 mt-4">Chats</div>
      {contacts.map((contact, idx) => (
        <ChatAccount
          contactActive={contactActive}
          contact={contact}
          key={idx}
          setContact={setContact}
        />
      ))}
    </div>
  );
}
