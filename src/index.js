// src/index.js
const { program } = require("commander");
// Example command to initialize a new project
const { exec } = require("child_process");

program
  .version("0.1.0")
  .description("CLI to initialize SvelteKit projects with custom setups");

const path = require("path");

program
  .command("save-component <component-path>")
  .description("Save a new component to the GitHub repository")
  .action((componentPath) => {
    const componentFileName = path.basename(componentPath);
    const gitCommands = `
      git add ${componentPath};
      git commit -m "Adding new component: ${componentFileName}";
      git push;
    `;

    console.log("Saving component to GitHub...");
    exec(
      `cd path/to/your/local/repo && ${gitCommands}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Stderr: ${stderr}`);
          return;
        }
        console.log(stdout);
        console.log("Component saved to GitHub successfully.");
      }
    );
  });

program
  .command("init <project-name>")
  .description("Initialize a new SvelteKit project")
  .action((projectName) => {
    console.log(`Initializing a new project: ${projectName}`);
    const createSvelte = `npx create-svelte ${projectName}`;
    exec(createSvelte, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(stdout);
      console.log(`${projectName} has been created successfully!`);
      // Further setup like adding Prisma or configuring Tailwind
    });
  });

// Adding more commands to src/index.js

// Command to add a predefined component from your GitHub repository
program
  .command("add-component <component-name>")
  .description("Add a reusable component to your project")
  .action((componentName) => {
    console.log(`Adding component: ${componentName}`);
    // Logic to fetch and add the component
  });

// Another example for setting up authentication
program
  .command("setup-auth")
  .description("Setup authentication system")
  .action(() => {
    console.log("Setting up authentication...");
    // Authentication setup logic
  });

program.parse(process.argv);
