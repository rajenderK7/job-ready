# Job Ready

This is my (Rajender Katkuri) submission to OneShot.ai's take home assessment.

**Aim**: An interactive portal where job seekers can book 1-1 mock interviews for _1 hour_ or _30 mins_ with working professionals.

**Note**: Please als check your spam section for the OTP. It might take a minute or so (instant most of time though)

**Live at**: https://job-ready-dtjqflxb2-rajenderk7.vercel.app/

**IMPORTANT**: Do not reload the login page, do not enter the links manually as it is a Single Page App and also Vercel's support for SPA (including the react-router-dom) is still risky.

**NOTE**: While visiting the website, if reloading the page while on login page gives any error please close the tab and follow the link again to re-open. This issue is due to `react-router-dom` and vercel's inability to catch such routes during startup. PS: Working on this issue.

## Tech stack

### Framework:

1. React JS
2. Node JS
3. Express JS
4. MongoDB

### Programming Language & Build tool:

- Typescript
- Vite

### Additional libraries used:

1. Mongoose - A Node. js-based ODM/ORM library for MongoDB
2. Atom - State management library
3. TailwindCSS - A utility-first CSS framework for CSS in JSX
4. React Hot Toast - A React library to show toast messages
5. NodeMailer - A Node.js-based mail sending library

### Deployment services:

1. Backend hosted on [Render](http://render.com/ "Render")
2. Frontend hosted on [Vercel](http://vercel.com "Vercel")

### Application

#### Features

- **Login**: Users can login to the application using email and OTP verification.
- **Date Selection**: Once logged in users can choose any future date to have their interview scheduled.
- **Interviewer Selection**: All the available interviewers on the selected date are shown to the user. User can select their interviewer of choice based on their profile.
- **Slot booking**: After choosing an interviewer, users are navigated to the slot booking page where the user can choose any available slot for a default duration of _1 hour_ or choose _30 minutes_ on demand.
- **Confirmation**: Once the user is satisified with the selection and timing, they can proceed to confirm the interview.
- **My interviews page**: All the interviews booked by the user are displayed here.
- **Cancellation (Withdraw interview)**: The users can cancel(withdraw) any future interviews.
