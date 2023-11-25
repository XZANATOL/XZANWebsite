### Introduction

My interest in programming has always been favored more towards the backend part of a software and explore what happens in the background. I Also enjoy frontend programming but only when I need it. Thus, I began with the backend track first and was quickly introduced to template engines and their use cases in server-side rendering (SSR).

If you don't know what a template engine is, let's just say it's a syntax that is written in your HTML files and it's job is to wrap dynamic data from the backend and with your frontend before sending the files down to the browser. This provides many advantages like:
- Browser doesn't have to wait for a JS file to download in order to make the required AJAX calls and obtain the data to display.
- Such efficiency makes it better for the SEO of the website.
- Page is loaded much faster since it's rendered on the server.

There are many template engines out there, some of them are:
- **Jinja:** Used in Python commonly with Django & Flask.
- **EJS:** Used in Node commonly with Express.
- Others like **Blade**, **Jade**, **Mustache**, ..and more.

At this point I thought that I needn't to learn a frontend framework as what I knew about it at the time is that it's used for SSR. Well, I'm already using it with template engines and wasn't sure if I were missing something.

### FrontEnd Frameworks

Let's quickly pass by its definition. A FrontEnd framework is a pre-written package that offers you flexibility and ease to design a User Interface (UI). Some of the widely known ones are: Angular, React, Vue, and Svelte.

Great! their existence is to solve the issue of user interactivity with real-time changing data. To clarify more, let's take a super creative To-Do list app as an example. Viewing from template engine prespective: When you add a new task to the list, you have to refresh the whole page and re-load all the resources just to get the new task displayed on the list. Yes, you can mitigate this and use AJAX calls in your JS to avoid refreshing, but in corespond, you will have to code the same functionality just to retrive the new list from the server. Here we are only talking about a To-Do list. Imagine doing the same for any other functionalities you wanted to add later! Well, here is the problem, you'll find yourself coding the same functionality multiple times just to do one small thing at a time. Such tedious work.

Here what FrontEnd frameworks solve. It mantains connectivity between the frontend app and the real-time changing backend data. Of course, each framework has it's own mechanism in mantaining this connection, but the core idea of all of them is the same. Back to the super To-Do list, when we add a new task, we don't have to reload the whole page again as the framework makes it easy for us to just add it directly to both the current page and to the backend server.

Great, This is one step ahead. While researching, I found that some frameworks like React has a CDN. Like I can add it directly to my HTML file using \<script\> tag. Then why it exists as a standalone framework in Node!? This leads us to the next section.

### FrontEnd Framework Designs

First, I will breifly cover the CDN thing that some frameworks have untill now. These are the ones which you can include directly in your HTML with the \<script\> tag. These provides you with access to the library but it needs to be downloaded first from the server. So, you don't have the Server-Side Rendering functionality here. Making these libraries as standalone framework gives you access to SSR functionality.

Ok, making them as a standalone framework provides SSR functionality, but not the to the backend logic. That's why different stacks like MEAN, and MERN exists. NodeJS & Express provides the backend logic via APIs. MongoDB provides the database storage. Finally, the used framework provides the realtime dynamic Frontend. Be flexible from here, You can change the backend to Python and use Flask, or to Ruby and use Ruby-on-Rails, and so on.

This is also good but It requires 2 seperate apps to be deployed. Another method to deploy Frontend frameworks is by letting the browser directly access the Backend server, and depending on the endpoint being accessed, the server responds whether with the API to fetched data, or the Frontend files, in which you will use the CDNs. That's another use case for CDNs!

### Conclusion

Also Frontend frameworks provide awesome solutions when it comes to UI design, but they hide many over-engineered parts, and If you're a curious one, It's going to take you to many questions that You'll try to answer before beginning to learn one.

Now that I've understood why these technologies exist, I will take a step into learning Angular which is developed by Google and find a project idea to build. :)