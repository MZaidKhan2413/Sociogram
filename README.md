# Sociogram

Sociogram is a full-stack social media application that allows users to share photos with each other. The project is built using Node.js, Express.js, MongoDB, EJS, and integrates Cloudinary for image storage. The application also utilizes the Passport library for user authentication. Future updates will include chatting and video sharing features.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Demo

You can check out the live version of Sociogram [here](https://sociogram-n99s.onrender.com/).

## Features

- User authentication with Passport.js
- Photo upload and storage with Cloudinary
- User profiles
- Timeline to view posts
- Like and comment on photos
- Responsive design
- Future features: chatting and video sharing

## Installation

To get a local copy up and running, follow these steps:

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node package manager)
- MongoDB

### Clone the repository

```bash
git clone https://github.com/MZaidKhan2413/Sociogram.git
cd sociogram
```

### Install dependencies

```bash
npm install
```

### Set up environment variables

Create a `.env` file in the root directory and add the following:

```env
PORT=3000
MONGO_URI=your_mongo_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SESSION_SECRET=your_session_secret
```

### Run the application

```bash
npm start
```

Your application should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

Once the application is running, you can register a new account, log in, and start sharing photos. You can view other users' photos, like, and comment on them. Keep an eye out for future updates that will include chatting and video sharing capabilities.

## License

Distributed under the MIT License. See `LICENSE` for more information.
