import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { ref, onValue, remove } from "firebase/database";

const ContactAdminPanel = () => {
  const [messages, setMessages] = useState([]);
  console.log("data",messages)

  useEffect(() => {
    const messagesRef = ref(db, "contactMessages");

    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const list = Object.keys(data).map((id) => ({
          id,
          ...data[id],
        }));
        setMessages(list.reverse());
      } else {
        setMessages([]);
      }
    });
  }, []);

  // Delete message
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this message?");
    if (!confirmDelete) return;

    remove(ref(db, `contactMessages/${id}`));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">
          Admin Panel – Contact Messages
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Message</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {messages.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No messages found
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-gray-50">
                    <td className="p-3 border">{msg.name}</td>
                    <td className="p-3 border">{msg.email}</td>
                    <td className="p-3 border max-w-xs truncate">
                      {msg.message}
                    </td>
                    <td className="p-3 border">
                      {new Date(msg.createdAt).toLocaleString()}
                    </td>
                    <td className="p-3 border text-center">
                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactAdminPanel;
