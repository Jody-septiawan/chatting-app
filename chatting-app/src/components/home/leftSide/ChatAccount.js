export default function ChatAccount({ contactActive, contact, setContact }) {
  return (
    <div
      onClick={() => setContact(contact)}
      className={`text-white grid grid-cols-12 gap-2 hover:bg-red-900 ${
        contactActive?.id == contact?.id && 'bg-red-900'
      } cursor-pointer rounded-md p-1 mb-2`}
    >
      <div className="col-span-2">
        <img
          src={contact.image ? contact.image : './profile-1.png'}
          alt="image-avatar"
          className="rounded-full border-2 bg-yellow-500"
          style={{ width: '50px', height: '50px' }}
        />
      </div>
      <div className=" col-span-10 flex items-center">
        <div>
          <div>
            {contact.firstName} {contact.lastName}
          </div>
        </div>
      </div>
    </div>
  );
}
