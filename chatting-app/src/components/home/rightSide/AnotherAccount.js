import { GoPrimitiveDot } from 'react-icons/go';
import { GrFormClose } from 'react-icons/gr';

export default function AnotherAccount({ contact, setContact }) {
  return (
    <div
      className="text-white flex items-center bg-red-2 px-4"
      style={{ height: '8vh' }}
    >
      <div style={{ flexBasis: '5.5%' }}>
        <img
          src={contact.image ? contact.image : './profile-1.png'}
          alt="image-avatar"
          className="rounded-full border-4 bg-yellow-500"
          style={{ width: '50px', height: '50px' }}
        />
      </div>
      <div className="flex items-center" style={{ flexBasis: '83%' }}>
        <div>
          <div>
            {contact.firstName} {contact.lastName}
          </div>
          <div className="text-sm flex items-center"></div>
          {contact?.isTyping ? (
            <div className="text-sm" style={{ marginTop: '-5px' }}>
              Typing ...
            </div>
          ) : contact?.isOnline ? (
            <div className="text-sm flex items-center">
              <GoPrimitiveDot className="text-green-500 " /> Online
            </div>
          ) : (
            <div className="text-sm flex items-center">
              <GoPrimitiveDot className="text-red-700 " /> Offline
            </div>
          )}
        </div>
      </div>
      <div
        className="flex justify-end items-center text-white"
        style={{ flexBasis: '11.5%' }}
      >
        <GrFormClose
          size={30}
          className="cursor-pointer"
          onClick={() => setContact(null)}
        />
      </div>
    </div>
  );
}
