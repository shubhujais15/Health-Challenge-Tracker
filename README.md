# Health Challenge Tracker

The Health Challenge Tracker is a web application designed to assist users in monitoring their workout activities. It enables users to add workout details, view their data in a structured table, and visualize progress through interactive charts.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Hosted Web App](#hosted-web-app)
- [Contributors](#contributors)
- [License](#license)

## Features

- **Add Workouts**: Users can input their name, workout type, and duration.
- **View Workouts**: Display workout data in a comprehensive table format.
- **Progress Visualization**: Monitor workout progress through bar charts.
- **Responsive Design**: Optimized for various devices to ensure accessibility.

## Installation

To set up the Health Challenge Tracker locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/shubhujais15/Health-Challenge-Tracker.git
   cd Health-Challenge-Tracker
   ```

2. **Install Dependencies**:

   Ensure you have [Node.js](https://nodejs.org/) (v14.x or higher) and [Angular CLI](https://angular.io/cli) (v14.x or higher) installed. Then, run:

   ```bash
   npm install
   ```

3. **Run the Application**:

   Start the development server with:

   ```bash
   ng serve
   ```

   Access the application at `http://localhost:4200/`.

## Usage

1. **Adding a Workout**:

   - Navigate to the "Add Workout" section.
   - Enter your name, select the workout type, and specify the duration.
   - Submit the form to record your workout.

2. **Viewing Workouts**:

   - Go to the "Workout List" page.
   - Browse through the table to see all recorded workouts.

3. **Visualizing Progress**:

   - Access the "Progress" page to view your workout history represented in bar charts.

## Dependencies

- **Angular**: Framework for building the web application.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **ngx-pagination**: Library for adding pagination features.
- **ng2-charts**: Integration of Chart.js for data visualization.

## Configuration

- **Angular Configuration**: Modify `angular.json` for build and development settings.
- **Tailwind CSS**: Customize styles in `tailwind.config.js`.

## Hosted Web App

You can view the live version of the Health Challenge Tracker by visiting the following link:

- **[Health Challenge Tracker](https://health-challenge-tracker-three.vercel.app/)**

