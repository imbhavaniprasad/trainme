// import React from 'react'
// const ChatWindow = () => {
//     const handleKeyDown = (event) => {
//         if (event.key === 'Enter') {
//           handleSubmit();
//         }
//       };
//   return (
//     <section className="main">
//     {!topicTitle && <h1> Revise</h1>}
//       <ul className="feed">
//         {getHistoryChats.map((chat,index)=>{
//           return <li key={index}>
//             <p className="role">{chat.isUser ? "User" : "Bot"}</p>
//             <p>{chat.text}</p>
//           </li>
//         })}
//       </ul>
//       <div className="bottom-section">
//         <div className="input-container">
//           <input onKeyDown={handleKeyDown} value={value} onChange={(e)=>setValue(e.target.value)}/>
//           <div id="submit" onClick={handleSubmit}>➢</div>
//         </div>
//         <p className="info">
//           Chaptgot
//           oroknkkbkkkbkbkbkbkbkjbhgdkssslslslsslslllllllllllllllllllllllllllllll
//         </p>
//       </div>
//     </section>
//   )
// }

// export default ChatWindow