// import React, { useState } from 'react'
// import emailjs from '@emailjs/browser';

// function EmailForm() {

//     const[name, setName] = useState('');
//     const[email, setEmail] = useState('');
//     const[message, setMessage] = useState('');

//     const handleSubmit = (e) =>{
//         e.preventDefault ();

//         const serviceId = 'service_1btra68';
//         const templateId = 'template_ae2dx9s';
//         const publickey = 'xK81ouvVmz6d5x6vp';

//         const templateParams = {
//             from_name: name,
//             from_email : email,
//             to_name: 'Services',
//             message: message,
//         };
//         emailjs.send(serviceId, templateId, templateParams, publickey)
//         .then((response) => {
//             console.log('Email sent successfully !', response);
//             setName('');
//             setEmail('');
//             setMessage('');
//         })

//         .catch((error) =>{
//             console.error('Error sending email:', error);
//         })
//     }

//   return (
//     <div>

//         <form onSubmit={handleSubmit} className='emailForm'>
//         <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} id="name" />
//         <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} id="" />
//         <textarea cols='30' rows='10' name="" id=""></textarea>
//             <button>send email</button>
//         </form>

//     </div>
//   )
// }

// export default EmailForm
