# Todo List App

## Project Description

This To-Do List App is a simple and efficient task management tool built using React Native, TypeScript, and Expo. The app allows users to add, edit, delete, and mark tasks as completed. The app uses `AsyncStorage` for persistent local storage, ensuring that tasks are saved even when the app is closed and reopened. The UI is designed to be minimalistic, with a focus on user experience and simplicity.

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   npm install --global expo-cli
   ```

3. **Run the App:**
   ```bash
   npx expo start
   ```

4. **Testing on Physical Device:**
   - Install the Expo Go app on your Android or iOS device.
   - Scan the QR code generated in the terminal to launch the app on your device.

5. **Using Simulator**
   - Choose the desired simulator in the terminal (iOs / Android) 

## List of Implemented Features

- **Task Input:**
  - Add tasks using a simple input field and a button.
  - Clear input field after adding a task.

- **Task List Display:**
  - Display all tasks in a scrollable list view.
  - Sort tasks by creation date (newest first) or completion status.

- **Task Management:**
  - **Edit Tasks:**
    - Edit existing task descriptions.
    - Implement an "Edit" mode for each task with a save function.
  - **Delete Tasks:**
    - Delete tasks using an icon button.
    - Confirmation dialog to prevent accidental deletions.
  - **Mark Tasks as Completed:**
    - Checkbox to mark tasks as completed.
    - Visually distinguish completed tasks with a strikethrough and color change.

- **Persistent Storage:**
  - Use `AsyncStorage` to store tasks locally on the device.
  - Load tasks from storage when the app is opened.
  - Save tasks to storage when tasks are added, edited, or deleted.

- **Error Handling:**
  - Implement error messages for failed operations (e.g., unable to load or save tasks).
  - Handle edge cases gracefully (e.g., very long task descriptions, many tasks).

## Known Issues or Limitations

- **Performance with Large Numbers of Tasks:**
  - While the app is designed for everyday use, performance may degrade when handling a very large number of tasks due to the use of `FlatList` and `AsyncStorage`.
  
- **Error Handling:**
  - Although basic error handling is in place, more sophisticated handling and logging mechanisms could be implemented for a production environment.
 

## Demo
![image](https://github.com/user-attachments/assets/60574276-021d-4fa3-8dfb-7c4de524b0f4)
![image](https://github.com/user-attachments/assets/7f3784eb-809d-426a-a61f-6d976258aee7)


