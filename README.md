# Developer Jutra Webinars

Welcome to the Developer Jutra Webinars repository. This repository contains various projects and examples used in the Developer Jutra webinars series. Each project is designed to help you learn and practice different aspects of software development, from backend to frontend, containerization, and more.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [bonusy/structurizr](#bonusystructurizr)
- [webinar-01-nauka](#webinar-01-nauka)
- [webinar-02-mcp](#webinar-02-mcp)
- [webinar-03-containerization](#webinar-03-containerization)
- [webinar-04-fullstack](#webinar-04-fullstack)
- [contributions](#contributions)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Docker](https://docs.docker.com/get-docker/) (v20+ recommended)
- You have installed [Docker Compose](https://docs.docker.com/compose/) (v2+ recommended)
- You have a Bash or compatible shell

## Installation

To install the projects in this repository, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/developer-jutra/dj-webinars.git
   cd dj-webinars
   ```

2. Navigate to the project directory you want to work on:
   ```sh
   cd <project-directory>
   ```

3. Follow the specific installation instructions provided in the project's README file.

## Usage

To use the projects in this repository, follow these steps:

1. Start the Docker containers:
   ```sh
   docker compose up -d --build
   ```

2. Access the services as described in the project's README file.

3. Stop the Docker containers:
   ```sh
   docker compose down -v
   ```

## Contributing

Contributions are always welcome! To contribute, follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Create a new Pull Request

Please make sure to update tests as appropriate.

## bonusy/structurizr

This folder contains examples and configurations for running Structurizr, a tool for visualizing, documenting, and exploring software architecture. The examples are based on the official Structurizr examples repository and include various architecture models and diagrams. Refer to the `README.md` for more information.

## webinar-01-nauka

This folder contains materials and resources for the first webinar, which focuses on learning new technologies and tools. It includes research documents, mind maps, and tooling recommendations for learning React, SQL, and other technologies from a backend developer's perspective. Refer to the `webinar-01-nauka/PRACA-DOMOWA.md` for the task description.

## webinar-02-mcp

This folder contains projects and examples related to the Model Context Protocol (MCP). It includes the MCP Docker Tools project, which provides tools for interacting with Docker Hub, and the MCP Playground project, which is used for testing and debugging MCP servers. Refer to the `README.md` for more information.

## webinar-03-containerization

This folder contains projects and examples related to containerization using Docker. It includes a Node.js, PostgreSQL, and Redis stack with Docker Compose, as well as a PostgreSQL and PGAdmin setup for managing databases. Refer to the `README.md` for more information.

## webinar-04-fullstack

This folder contains full-stack projects and examples. It includes the Deliveroo project, which is a full-stack application using Angular, Node.js, PostgreSQL, and Redis, and the Deliveroo4j project, which is a Spring Boot application for managing vehicles. Refer to the `README.md` for more information.

## contributions

This folder contains contributions from participants, such as implementations of MCP servers, mind maps, and other resources. Participants can fork the repository, add their contributions in a new folder, and create a pull request to share their work. Refer to the `README.md` for more information.
