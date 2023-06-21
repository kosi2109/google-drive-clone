# Google Drive Clone

The Google Drive Clone project aims to develop a web application that replicates the core functionalities of Google Drive. The application will be built using Next.js for the frontend and Laravel with the repository pattern for the backend.


## Key Features of SnapChatChat:

- User Registration and Authentication: The application will allow users to register, log in securely, and manage their account information. User authentication will be implemented using OAuth, leveraging third-party providers for a secure login process.

- Frontend Authentication: NextAuth, a widely-used authentication library for Next.js, will be implemented to handle frontend authentication. This will include features such as secure login, registration, and session management.

- File Management: Users will be able to upload, organize, and manage their files within the application. The file management system will include features such as creating folders, renaming files, moving files between folders, and deleting files.

- Trash Functionality: The application will incorporate a trash feature where deleted files will be moved to a designated "trash" folder instead of being permanently deleted. Users can choose to restore files from the trash or permanently delete them.

- Recursive File Deletion: Users will have the option to delete files recursively, meaning that when a folder is deleted, all the files and subfolders within it will also be deleted. This feature allows for efficient file organization and cleanup.

- State Management: The application's state management will be handled using Redux Toolkit, enabling efficient handling of application-wide states, such as user authentication status, file/folder data, and trash status.

- Server State Management: SWR (Stale-While-Revalidate) will be implemented for server state management, providing optimized data fetching and caching. This ensures a fast and responsive user experience while minimizing unnecessary API requests.


## Screenshots

![Auth](https://res.cloudinary.com/kosi1999/image/upload/v1679834770/drive-clone/Screenshot_100_i6pmjd.png)
![Home Page](https://res.cloudinary.com/kosi1999/image/upload/v1679834776/drive-clone/Screenshot_101_rxy9x8.png)
![Home Page 2](https://res.cloudinary.com/kosi1999/image/upload/v1679834786/drive-clone/Screenshot_102_zt3ibg.png)

[Demo Video](https://drive.google.com/file/d/1vTq3QbkyvWycUHV9J-gcoMwfnAl3LSDp/view?usp=sharing)

## Authors

- [@sithuhtet](https://www.github.com/kosi2109)
