# Nimble Challenge

[**Live Demo**](https://nimblee.vercel.app/)

## Overview

This project is a technical solution for the **Nimble Challenge**. It consists of a robust React-based frontend application designed to streamline candidate filtering through a specialized Azure API integration. The application allows users to retrieve candidate profile data, browse available job vacancies, and submit applications with built-in validation and real-time feedback.

## Key Features

-   **Asynchronous API Consumption**: Seamless integration with Azure REST API endpoints using modern `fetch` and `async/await` patterns.
-   **State & Error Management**: Robust handling of loading states and descriptive error messaging to ensure a smooth user experience.
-   **Component-Based Architecture**: Modular design following industry standards for reusability and maintainability.
-   **Input Validation**: Integrated logic to validate GitHub Repository URLs before submission, preventing data inconsistency.
-   **Global Feedback System**: Custom Toast notification system for non-blocking success and error communication.

## Tech Stack

| Tool            | Purpose                      |
| :-------------- | :--------------------------- |
| **React 19**    | UI Library                   |
| **Vite**        | Build tool and dev server    |
| **JavaScript**  | ES6+ Scripting logic         |
| **CSS3**        | Custom styling and variables |
| **Context API** | Global state management      |

## Project Architecture

The application follows a clean-code separation of concerns:

-   **Services Layer (`/services`)**: All business logic regarding API communication is isolated in the `services` directory. This ensures that UI components remain agnostic of API implementation details.
-   **Context API (`/context`)**: Used for global notification handling (Toasts), avoiding prop-drilling and centralizing feedback logic.
-   **Environment Configuration**: The application leverages environment variables for the `BASE_URL`, allowing for easy transition between development, staging, and production environments.

## Installation & Usage

Follow these steps to set up the project locally:

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd nimble-challenge
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up environment variables**:
    Follow the [Environment Variables](#environment-variables) section below.

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

## Environment Variables

The application requires specific environment variables to communicate with the backend. 

1.  Create a `.env` file in the root directory.
2.  Copy the contents from `.env.example`.
3.  Provide the necessary values:

```env
VITE_API_BASE_URL=https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net
```

---
*Developed with a commitment to technical excellence and professional standards.*
