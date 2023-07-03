# Student Book

Welcome to Student Book, a web application that provides various features for students to interact, share posts, manage their reminders, and stay organized. This README.md file will guide you through the project and explain its functionalities.

# [Live Demo](https://school-book.vercel.app/)
## URL : https://school-book.vercel.app/

## Table of Contents

- [Student Book](#student-book)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Usage](#usage)

## Technologies Used

The project is built using the following technologies:

- React
- Ant Design (antd)
- Redux Toolkit
- React Router
- Tailwind CSS
- Vite
- Hooks
- ESLint


## Features

- Authentication Module:
  - Register Student (name, password, college, dob, field, linkedin, mobile, email, profile)
  - Login Student (name, password)
  - My Profile (can see all details and update it)

Post Module:
  - Each student can make a post (image/video, description, title, likes, comments)
  - Posts can be liked (not by the creator of it)
  - Can add comments to a post
  - Students can repost other's posts
  - List Post (with lazy loading)
  - User can save/unsave a post
  - List saved posts

Reminder/Task Module:
  - Make a calendar view like Google Calendar (can use an npm package to achieve that)
  - By clicking on a particular date, students can create a reminder/task (e.g., assignment submission due date, exam date)
  - Create Reminder/Task (name, start date, end date, description)
  - Edit Reminder/Task
  - List logged users' reminders/tasks in a calendar date-wise (like Google Calendar)
  - View Reminder/Task


## Installation

To install and run the Student Book project on your local machine, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/student-book.git`
2. Navigate to the project directory: `cd student-book`
3. Install the dependencies: `npm install`

## Usage

1. Start the development server: `npm run dev`



