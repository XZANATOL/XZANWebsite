When building a web apps, we often tend to make client to server requests as efficient as possible by only sending minimal information required to do some task. In a lot of cases this works as we program the load to be on the server, where data processing takes place, rather than than client, where only data parsing and rendering takes place. While developing, we always see requests pop up in the command console almost instantaneous, and we follow on with our workflow as usual.

That was a smooth story, but what happens when we deal with file transfers? Take for example a file upload say 1GB size. If I'm to look in the console, I can't view this request only after the file is finished uploading, and looking at system monitor, network resources consumption can be noticed, The server is receiving a request, so why doesn't it print it to `stdout` right away?

I noticed the behavior when I was working on a side project: [XDrive](https://github.com/XZANATOL/XZerver). It's a file sharing app built on a customized Flask server. *(you can find more about it in the attached GitHub link)* After implementing the code, It was time to test. Only to notice this lag of viewing the request log when sending files that are relatively medium in size, and the lag increases with increasing the file size. The log gets print only after the upload is finished. Another test and looking at the resource monitor I can find that my adaptor is transmitting/receiving data. Soo my code is working, why it's lagging?

### What's a Request?

We typically know about HTTP/s requests that are TCP connections that make a handshake and so on. Now, after the connection is established, how is a request interpreted by the server?

A request is divided into 3 main parts:

1) **Request Line:** This defines the request method, URI, and protocol to be used. Examples:
   `GET /api/authors HTTP/1.1` , `POST /test.html HTTP/1.1`

2) **Request Headers**: Some metadata that are set to provide information about the request behavior. Here things like session cookies, host & referrer sites are added. Examples: `Cache-Control: no-cache`

3) **Request Body:** Free place where you can virtually append any additional data that will be sent to a server. Let it be a file, a JSON, or a simple text. Note that some methods doesn't have a body like GET & DELETE methods.

### Server in Receiving Mode

Let's say we have a server and client sending a request. This request should first be transferred completely to the server before the server attempts to parse it, we will come to why in a few moments. In the receiving process the server opens the transfer channel using the request line, then validates the headers as they are received one by one, then the body if there's one. the received data should be stored somewhere until all of the data be available. You may have guessed it, It's the temp folder.

So during any upload process, received data is saved in a temp file till the upload process finalizes, for how long? till the view script accompanied by the route you're uploading to is finished, then the server deletes file. It's up to you whether you want to move the file somewhere else.

To the part of why doesn't the server deal with the file on the fly instead of saving it in a temp file? Take a case where you cancel the upload, or the upload failed of a connection cut? If the server was to print the request log once it starts receiving and this happens, it will log the same request twice but with different status codes, which will be a pain for someone looking at the logs or testing his code. This answers the lagging part. 

Now this raises a question. What If I'm uploading a file larger than the free space available for the temp folder? this can lead to a security risk. Well, there is a security procedure for this. Limit the max file size that can be accepted by the server. The `Content-Length` header defines the number of data bytes in a request body, and is sent by with any request that uses the body space. Server uses it for integrity, and it can be used for validation. So, It's a wise decision to define this check in your web app if you're working with file uploads.

### What about the Temp Folder?

A solution one can consider is increasing the Temp folder space, or change it to a different storage volume. and It's a good idea when working with file sharing web apps. On how we can do this, there are multiple approaches:

* Change the systems default temp directory, which is as easy as changing the system's environment variables.
* Use a web server that can act as a reverse proxy or HTTP cache such as Nginx.
* Use containerization, which is one use case of utilizing Docker.

### Conclusion

The scenario began with `What's going on in the background to cause this lag?`, and continued researching with answers to knowing more about transfer protocols, security, and finally finding a reason to explore deeper into Docker.

One last thing I wanted to note. What if I wanted to utilize buffering and deal with a file data on the fly instead of waiting it to be fully uploaded? well this can be achieved by tackling with another header called `Transfer-Encoding`, by setting its [value](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Transfer-Encoding) to `chunked`. This allows the data stream to be divided into a series of non-overlapping "chunks". The chunks are sent out and received independently of one another, where we can process with it on the fly, reducing the overall time required for the file transfer and processing. But this requires more configuration for both the server & client to code, which is not a use case in my project scope.

That was fun! :D