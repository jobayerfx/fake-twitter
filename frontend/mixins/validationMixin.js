/* eslint-disable no-useless-escape */
// export default {
//   data() {
//     return {
//       validationRules: {
//         name: [
//           (v) => !!v || 'Name is required',
//           (v) => (v && v.length <= 30) || 'Name must be less than 30 characters'
//         ],

//         firstName: [
//           (v) => !!v || 'First Name is required',
//           (v) =>
//             (v && v.length >= 3) ||
//             'First Name must be greater than 3 characters',
//           (v) =>
//             (v && v.length <= 30) ||
//             'First Name must be less than 30 characters'
//         ],

//         lastName: [
//           (v) => !!v || 'Last Name is required',
//           (v) =>
//             (v && v.length >= 3) ||
//             'Last Name must be greater than 3 characters',
//           (v) =>
//             (v && v.length <= 30) || 'Last Name must be less than 30 characters'
//         ],

//         description: [(v) => !!v || 'Description is required'],

//         email: [
//           (v) => !!v || 'Email is required',
//           (v) => /.+@.+/.test(v) || 'Email must be valid'
//         ],
//         password: [
//           (v) => !!v || 'Password is required',
//           // eslint-disable-next-line no-mixed-operators
//           (v) =>
//             (v && v.length >= 8) || 'Password length must be minimum 8 letters'
//         ],

//         updatePassword: [
//           (v) =>
//             (v && v.length >= 8) || 'Password length must be minimum 8 letters'
//         ],

//         confirmPassword: [
//           (v) => this.password === v || "Password doesn't match",
//           (v) => !!v || 'Confirmation Password is required'
//         ],
//         phone: [
//           (v) => !!v || 'Phone is Required',
//           (v) =>
//             /\+?(88)?0?1[3456789][0-9]{8}\b/.test(v) || 'Number must be valid'
//         ],

//         time: [(v) => !!v || 'Time is required'],

//         date: [(v) => !!v || 'Date is required'],

//         message: [(v) => !!v || 'Message is required'],

//         title: [(v) => !!v || 'Title is required'],

//         comments: [(v) => !!v || ' Comments is required'],

//         number: [(v) => !!v || ' Number is required'],

//         userName: [(v) => !!v || 'User Name is required'],

//         required: [(v) => !!v || 'This field is Required'],

//         mustImput: [(v) => !!v || 'This field is required'],

//         image: [
//           (value) => !!value || 'Image is required!',
//           (value) =>
//             !value ||
//             value.size < 500000 ||
//             'Image size should be less than 500KB!'
//         ]
//       }
//     }
//   }
// }
