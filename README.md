# Urban Routes Test Automation Project

## Description
This project focuses on automating the end-to-end testing of the Urban Routes web application. The goal is to ensure that key functionalities such as ordering a taxi, entering addresses, filling in phone numbers, and interacting with various UI elements work as expected.

## Technologies and Techniques Used
- **WebdriverIO**: For writing and running automated tests.
- **Mocha**: As the test framework.
- **Javascript**: Programming language.
- **GIT**: Local machine repository with git bash.
- **Github**: Public visual repository.
- **Node.js**: As the runtime environment.

## Project Structure
- **hm08-qa-us**: Main project-8 folder that hold all files.
- **test\specs**: Main folder that holds the automation testing file: createAnOrder.e2e.js
- **gitignore**: Git ignore file, ignore certain files.
- **package.json**: Project dependencies and scripts.
- **README.md**: Project documentation.
- **wdio.conf.js**: WebdriverIO configuration file.

## Instructions to Run the Tests

### Prerequisites
- Ensure that Node.js and npm (Node Package Manager) are installed on your machine.

### Setup using git bash commands
1. **Clone the repository**: git clone https://github.com/maor87/hm08-qa-us.git
2. **Enter Directory**: cd hm08-qa-us
3. **Install dependencies**: npm install
4. **Run all tests**: npm run wdio
