import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AppContext/AppContext';
import { collection, doc, query, where, getDocs, onSnapshot, setDoc, updateDoc, arrayUnion, addDoc, getDoc} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Link, useParams } from 'react-router-dom';



const Chat = () => {
  const { user, userData } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchMessages = async () => {
      const q = query(
        collection(db, 'messages'),
        where('users', '==', [user.uid, id].sort().join('|'))
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        await setDoc(collection(db, 'messages'), {
          users: [user.uid, id].sort().join('|'),
          messages: [],
        });
      } else {
        const conversationDoc = querySnapshot.docs[0];
        onSnapshot(doc(db, 'messages', conversationDoc.id), (doc) => {
          setMessages(doc.data().messages);
        });
      }
    };
    fetchMessages();
  }, [user.uid, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const q = query(collection(db, 'messages'), where('users', '==', [user?.uid, id].sort().join('|')));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      const conversationDocRef = await addDoc(collection(db, 'messages'), {
        users: [user?.uid, id].sort().join('|'),
        messages: [
          {
            text: newMessage,
            sender: user?.uid,
            receiver: id,
            createdAt: new Date(),
          },
        ],
      });
      setMessages([
        {
          text: newMessage,
          sender: user?.uid,
          receiver: id,
          createdAt: new Date(),
        },
      ]);
    } else {
      const conversationDoc = querySnapshot.docs[0];
      const conversationDocId = conversationDoc.id;
      await updateDoc(doc(db, `messages/${conversationDocId}`), {
        messages: arrayUnion({
          text: newMessage,
          sender: user?.uid,
          receiver: id,
          createdAt: new Date(),
        }),
      });
    }

    setNewMessage('');
  };


  return (
    <div className="flex flex-col h-screen">
      <h2 className="text-xl font-bold py-4">{`Chat with ${id}`}</h2>
        <Link to="/" className="bg-gray-300 px-4 py-2 rounded-lg mb-4">
            Go back to Home Page
        </Link>
      <ul className="flex-1 overflow-y-scroll">
        {messages.map((message, index) => (
          <li
            key={index}
            className={`${
              message.sender === user.uid ? 'justify-end' : 'justify-start'
            } flex mb-2`}
          >
            <div
              className={`${
                message.sender === user.uid ? 'bg-blue-600' : 'bg-green-300'
              } px-4 py-2 rounded-2xl max-w-xs`}
            >
              <p className="text-sm text-white">{message.text}</p>
              <span className="text-xs text-gray-200">
                {new Date(message.createdAt?.toDate()).toLocaleTimeString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <form className="py-2" onSubmit={handleSubmit}>
      <div className="flex items-center border-t-2 border-gray-300 px-4">
      <input
        className="flex-1 mr-2 py-2 px-4 border-2 border-gray-300 rounded-full"
        type="text"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white rounded-full py-2 px-4 font-bold"
        type="submit"
        disabled={!newMessage}
      >
        Send
      </button>
    </div>
  </form>
</div>
);
};

export default Chat;






       
