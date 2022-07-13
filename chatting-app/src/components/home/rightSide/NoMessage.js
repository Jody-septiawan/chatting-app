export default function NoMessage() {
  return (
    <div className="bg-red-3 h-screen flex items-center justify-center">
      <div>
        <img
          src="./no-message.svg"
          alt="no message"
          style={{ width: '600px' }}
        />
        <div className="text-center mt-6">No Message Selected</div>
      </div>
    </div>
  );
}
