#!/usr/bin/env node
import { Command } from "commander";
import makeComponent from "./commands/makeComponent.js";
import makePage from "./commands/makePage.js";
import makeContext from "./commands/makeContext.js";
import makeUtil from "./commands/makeUtil.js";
const program = new Command();

console.log("Starting maker CLI...");

program
    .name('maker')
    .description("CLI for Next.js projects")
    .version('1.0.0');

program.command("make:page <name>")
    .description("Create a new Next.js page")
    .option('--client', 'Include "use client" directive')
    .option('--css', 'Generate a CSS file for the page')
    .option("--scss", 'Generate a SCSS file for the page')
    .action((name, options) => {
        if (!name && (options.css || options.client || options.scss)) {
            console.error("Error: You must specify a page name when using --css or --scss.");
            process.exit(1);
        }
        makePage(name, options.client, options.css, options.scss);
    });

program.command("make:component <name>")
    .description("Create a new React component")
    .option('--css', 'Generate a CSS file for the page')
    .option("--scss", 'Generate a SCSS file for the page')
    .action( (name, options) => {
        if (!name && (options.css || options.scss)) {
            console.error("Error: You must specify a component name when using --css or --scss.");
            process.exit(1);
        }
        makeComponent(name, options.css, options.scss);
    })

program.command("make:context <name>")
    .description("Create a new React context")
    .action( (name) => {
        if (!name) {
            console.error("Error: You must specify a context name.");
            process.exit(1);
        }
        makeContext(name);
    })

program.command("make:util <name>")
    .description("Create a new util function")
    .option("--async", "Generate an async util function")
    .action( (name, options) => {
        if (!name && (options.async)) {
            console.error("Error: You must specify a util function name.");
            process.exit(1);
        }
        makeUtil(name, options.async);
    })

program.parse(process.argv);