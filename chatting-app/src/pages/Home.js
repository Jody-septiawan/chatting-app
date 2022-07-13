import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { io } from 'socket.io-client';

import LeftSide from '../components/home/sides/LeftSide';
import RightSide from '../components/home/sides/RightSide';

let socket;

export default function Home() {
  const navigate = useNavigate();

  const [contact, setContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!localStorage.token) {
      return navigate('/auth');
    }

    socket = io('http://localhost:5000', {
      auth: {
        token: localStorage.getItem('token'),
      },
    });

    socket.on('new message', async () => {
      loadMessage();
    });

    socket.on('typing', async (payload) => {
      if (payload.userId == contact.id) {
        setContact({
          ...contact,
          isTyping: payload.status,
        });
      }
    });

    loadContact();

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const loadContact = () => {
    socket.emit('load contact');
    socket.on('contact', async (data) => {
      setContacts(data);
    });
  };

  const loadMessage = () => {
    socket.emit('load message', contact.id);
    socket.on('messages', async (payload) => {
      setMessages(payload.data);
      setContact({
        ...contact,
        isOnline: payload.isOnline,
      });
    });
  };

  const onSendMessage = (e, value) => {
    e.preventDefault();

    const payload = {
      ...value,
      receiver: contact.id,
    };

    socket.emit('send message', payload);
  };

  const isTyping = (value) => {
    const payload = {
      status: value,
      receiver: contact.id,
    };

    socket.emit('typing', payload);
  };

  return (
    <div className="grid grid-cols-12 h-screen">
      <LeftSide contact={contact} contacts={contacts} setContact={setContact} />
      <RightSide
        contact={contact}
        setContact={setContact}
        onSendMessage={onSendMessage}
        loadMessage={loadMessage}
        messages={messages}
        isTyping={isTyping}
      />
    </div>
  );
}
