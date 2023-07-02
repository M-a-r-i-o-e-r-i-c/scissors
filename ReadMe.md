# Sissors - URL Shortener Web App Documentation

## Introduction
Scissors is a powerful URL shortener web application built with React, TypeScript, Material UI, Firebase, and deployed with Vercel. It provides users with a seamless experience for shortening URLs, managing their shortened links, and customizing their domain. Scissors is designed with a focus on user experience, incorporating features such as form validation, error handling, progress notifications, and semantic HTML for improved SEO.

## Features

### Sign Up
The home page of Scissors allows users to sign up using their email or Gmail account. The sign-up process is secure and user-friendly, ensuring a smooth onboarding experience.

### Dashboard
Upon successful login, users are directed to the dashboard component, which serves as the default route. The dashboard provides a comprehensive interface for managing shortened URLs. Users can shorten a URL by entering the name and the long URL. Additionally, Scissors offers an optional custom domain feature, allowing users to customize the shortened URL code. When using a custom domain, Scissors checks the user's input in the Firestore database for its existence. If the custom domain is available, it is created; otherwise, the user is notified.

### Form Validation and Error Handling
Scissors implements robust form validation to ensure that user inputs are accurate and complete. Proper error handling is implemented throughout the application to provide clear and concise feedback to users, helping them understand any issues and take appropriate action.

### Semantic HTML and SEO
Scissors is built with semantic HTML, which enhances the application's search engine optimization (SEO) capabilities. By using semantic HTML tags, Scissors improves its visibility in search engine results, making it easier for users to discover and access shortened URLs.

### Progress Notifications
During data fetching from the store or asynchronous processes, Scissors provides progress notifications to keep users informed about background operations. These notifications ensure that users are aware of ongoing processes and maintain a smooth user experience.

### Shortened URL Management
For each shortened URL, Scissors offers various management options. Users can copy the shortened URL, delete it if no longer needed, and generate a QR code for easy sharing and scanning.

### Link Redirect and Click Tracking
When a user visits a shortened URL, Scissors redirects them using the LinkRedirect component. This component captures the source of the user and increments the totalClicks count, providing valuable insights into link engagement and usage.

### Markdown Editor
Scissors also includes a Markdown Editor route where users can write markdown content and download it. This feature caters to users who require a simple and intuitive interface for creating and exporting markdown files.

### Logout
The navbar component of Scissors includes a logout button, allowing users to securely log out of their accounts when needed.

## NotFound Page
Scissors incorporates a NotFound page to catch routes that do not exist, providing users with a 404 error page that maintains the application's professional and consistent user interface.

## Conclusion
Scissors is a feature-rich URL shortener web application that prioritizes user experience and functionality. With its seamless sign-up process, intuitive dashboard, form validation, error handling, semantic HTML, progress notifications, shortened URL management, link redirect and click tracking, markdown editor, and logout functionality, Scissors offers users a comprehensive and professional solution for managing and customizing their URLs.