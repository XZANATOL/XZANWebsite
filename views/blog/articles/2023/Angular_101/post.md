## Introduction

In the modern development, web applications have multiple architectures that provide solutions for balancing performance between data communication between a server & a client, and the user experience. Angular is one technology that thrives into this solution. It helps teams to start small and supports them as the application grows to expand it in a maintainable manner.

[Angular](https://angular.io/) is an open-source, Google maintained, JavaScript framework written in TypeScript. Its primary purpose is to develop single-page applications, but can serve to develop multi-page applications too, thanks to its routing flexibility. As a framework, Angular has clear advantages while also providing a standard structure for developers to work with. we'll break down it's elements as we go along this blog.

I'm going to write about some basic concepts that you should know about before beginning with your first Angular app. It should help you get a general overview about what you're editing, navigating, and the dev-slang used to describe these concepts.

## Why I Chose Angular?

Starting Feb-2023, I wanted to learn new concepts that provides a steep learning curve, and I haven't got into frontend frameworks yet. Comparing technology trends like React, Svelte, Angular, ..and so on. I saw many going into React for its battery extensions, and multiple CLI tools that shortcut many concepts like the [create-react-app](https://create-react-app.dev/) tool. I wanted to know what happens under the hood of these tools, and learn something that doesn't have multiple Youtube tutorials. So Angular was my way to go.

I spent a complete month reading through the documentations, and learning about [RxJS](https://rxjs.dev/), before I was able to develop comfortably inside the framework. I built 2 projects:

1) The tutorial mentioned in the docs with some customized changes. [Project Link](https://github.com/XZANATOL/ProjectSpace/tree/master/Practices/2023_Angular-Docs-Tutorial)

2) A side project which is an application organizer platform for better tracking job applications when job hunting. [Project Link](https://github.com/XZANATOL/ProjectSpace/tree/master/Practices/2023_JobScout)

## `ng` - The Angular CLI

Angular files has some static lines of codes that defines a certain concept in the frameworks structure, It's good to learn about them at first but later on, it'll be quite boring having to copy/paste the same lines across multiple files. That's why Angular CLI exists, It helps you writing these lines without having to memorize or debug them everytime you create a new file for some purpose inside the framework.

Angular CLI is aliased with `ng`. The tool helps you initialize, develop, scaffold, and maintain Angular applications directly from your command shell. You can learn more by reading till the *Basic workflow* section in this docs [page](https://angular.io/cli).

## Project File Structure

I bet you'll get overwhelmed with the status of your newly initiated project if you ran `ng new <my-project>`. Well, that's a common reaction when someone learns about a new framework, but it can be break down.

You're workspace should have a similar skeleton of this:

| File | Description |
| ---- | ----------- |
|.editorconfig|Configuration for code editors.|
|.gitignore|Specifies intentionally untracked files that Git should ignore.|
|README.md|Introductory documentation for the root application.|
|angular.json|CLI configuration defaults for all projects in the workspace, including configuration options for build, serve, and test tools that the CLI uses, such as Karma, and Protractor.|
|package.json|Configures npm package dependencies that are available to all projects in the workspace.|
|package-lock.json|Provides version information for all packages installed into `node_modules` by the npm client.|
|src/|Source files for the root-level application project. (your application)|
|node_modules/|Provides npm packages to the entire workspace.|
|tsconfig.json|The base TypeScript configuration for projects in the workspace.|

<br>
Diving into the `src/` folder, you'll find the following

|File|Description|
|----|-----------|
|app/|Contains the component files in which your application logic and data are defined. (we'll talk about that)|
|assets/|Contains image and other asset files to be copied as-is when you build your application.|
|favicon.ico|An icon to use for this application in the bookmark bar.|
|index.html|The main HTML page that is served when someone visits your site.|
|main.ts|The main entry point for your application.|
|styles.css|Lists CSS files that supply styles for a project. The extension reflects the style preprocessor you have configured for the project.|

<br>
Indepth details can be found on this docs [page](https://angular.io/guide/file-structure).

## How Angular Works: Developer Terms

You have two main components that manage logic in a structured manner, disregarding scientific terminologies. First part is responsible for obtaining data from an API, let the data be an authentication session, a query to obtain a list of data, whatever it be. This is called a `Service`, and it often uses [RxJS](https://angular.io/guide/rx-library) to handle asyncrohnous requests and real time connections via subscriptions.

The second part is what a user sees, the webpage. A `component` defines the User Interface that the user interacts with. This  is the major part of Angular where a component is furthur configured with a route, integerations with the used service(s), and in some cases it'll be bundled inside a module which can be used in some multiple cases like lazy-loading. Let's break this more.

## Component

As mentioned above, A `component` defines the User Interface that the user interacts with. New components can be generated using `ng generate component <name>`. It mainly consists of 4 files:

| File | Description |
| ---- | ----------- |
|app.component.ts|Defines the logic for the application's root component, named AppComponent.|
|app.component.html|Defines the HTML template associated with AppComponent.|
|app.component.css|Defines the base CSS stylesheet for AppComponent.|
|app.component.spec.ts|Defines a unit test for AppComponent|

<br>
You can thing of a component like a smart HTML `div` tag. It contains its own CSS, routing configurations, and data communication with the framework. A component can be nested, allowing it to render sub-components.

Everything considering generating a new component to explaining the lines of codes in each file can be found on this docs [page](https://angular.io/guide/component-overview).

## Module

A file that provides a bootstrap mechanism to manage components. Any Angular project must have one of these in the root directory `src/app` this is called a `Root Module`. The file maintains declared components, any external libraries to be used inside the app, like the built-in Angular http client, any defined routes (you can also find routes in a separate routing file beside the module file). Under any module lies one or more components.

It can also be furthur extended to be required by other modules which is called a `Feature Module`. These exists for the purpose of organizing code. More about that can be found on this docs [page](https://angular.io/guide/feature-modules#how-to-make-a-feature-module).

## Routing

A set of paths that describes what component should be rendered when an URL is provided. This can be found either in a Module file, or a seperate routing file. It provides configuration like guards or checks to be made before rendering a component. This comes in handy for authentication, and validating URL params. More about this can be found on this docs [page](https://angular.io/guide/routing-overview).

## Data Binding

This is the method used by Angular to communicate data between a compnent template (HTML file) and the framework logic. These in other terms are variables defined in a component .ts file and used in its template via template directives.

## Directives

Angular syntax that is used inside templates to render dynamic data. This can be loops `*ngFor`, conditional `*ngIf`, or variables `{{var-name}}`. More about Template Syntax, Data-Bindings, and Directives can be found on this docs [page](https://angular.io/guide/architecture-components#template-syntax).

## Dependency Injection

This can be the one advanced term that may take time to wrap your head around. This is usually used between services to include other services by providing these services as paramters, thus improving code re-usability and testing. This docs [page](https://angular.io/guide/architecture-services) should explain it in more in-depth details.

The idea involves the term `Inversion of Control` where you build a function ( let's call it func_A ) that takes a parameter as another function ( let's call it func_B ). In the body of func_A, func_B is called where the control is then moved to func_B doing its bussiness logic, then return the control to func_A after it finishes.

## Last Words

Lots of terms intoduced and more to explore if you decided to dive deeper into the documentation. For my case, I tried the project based learning by following along the tutorial listed on their documentation [here](https://angular.io/tutorial/tour-of-heroes), and it gave great results, the tutorial worked it's way with trying different methods to build an application. It helps you build code first to understand the fundamentals and slowly refactor it to include best practices.

This should be everything to mention to give you a good boost. Things will become more clear when you begin writing code yourself, and good luck with learning it. :)