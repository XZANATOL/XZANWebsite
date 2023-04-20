### Introduction
When a talk mentions web application or any software that deals with networking, we often come across this word. For some who are fairly junior in development, this term doesn't get a clarified meaning till they have to develop a somekind of a complex workflow that deals with structured data wrangling (processing), even tho they deal with it from the beginning of their exposure to backend development but in an automated way.

This DevLog will focus on disucssing the term in a more broader way and discuss some common & uncommon techniques used to achieve the purpose. Python is going to be the language of our discussion to faciliate the reading if we have to write code.

### What's Serialization?
In simple words, Serialization is the process of converting structured data into a format that can be shared, stored somewhere else where is can be reconstructed (deserialized) later. The structured data can vary from simple arrays & dictionaries to more complex structures as HTML. Serialization serves many causes, from storing data into files or databases, to streaming it to other applications over networks.

Impressed? If you've dealt with APIs before, you surely will relate this to the moment you send or recieve a JSON. In fact, JSON is one of the common protocols used in this purpose, and it's on our list of discusssion.

### JSON: JavaScript Object Notation
By far, JSON is the most widely used data-interchange format in applications, it's lightweight, easy to read by humans, and for machines to generate & parse. It uses:

* A collection of name/value pairs. In various languages, this is defined as an object, record, struct, dictionary, hash table, keyed list, or associative array.
* An ordered list of values. In most languages, this is realized as an array, vector, list, or sequence.

Take the following schema as an example.

```
{
	"name": "Hello World App",
	"email": "abdelrahmanbedox@gmail.com",
	"author": "XZANATOL",
	"scripts": {
		"start": "python script.py"
	},
	"contributors": [
		"Ahmed", "Tarek", "Amr"
	]
}
```

It can also include more complex structures such as nested dictionaries, or arrays. Python utilizes this serializer using `json` built-in module.

This serializer is commonly used in APIs, HTTP(s) requests, ...etc.

### XML: Extensible Markup Language
This is a more complex serialization method that follows a structure similar to that's of HTML. Whereas HTML tells a browser application how a document should look, XML describes what’s in the document. XML also allows you to create your own tags where you label the meaning or use of data, then embed the data between those tags.

Take the following schema as an example.

```
<?xml version="1.0" encoding="UTF-8" ?>
<rss>
	<posts>
		<item>
			<title>Hello World</title>
			<body>This is a post test.</body>
		</item>
		<item>
			<title>GoodBye World</title>
			<body>Another post test.</body>
		</item>
	</posts>
</rss>
```

Such flexibility has many benefits. It lets you transfer data between databases and websites without losing the descriptive information. It lets you automatically customize the presentation of data rather than display the same page to all comers. but hard times come with this serializer.

Without a standardized syntax betwenn a server & a client, one end may create unique tags that are unrecognizable to the other, thus causing errors or even crashing the other end.

XML can be found with in RSS feeds, Metadata apps, and e-business apps. Python also has `xml` built-in module.

### YAML: Yet Another Markup Language
Yet another serializer but this one has a minimal syntax. It's mainly used for configuration files like Docker, GitHub Actions, ...etc. It follows the same idea as JSON and utilizes Python intendation for nesting. For key/value pairs, it's represented as `<key>:` followed by the `<value>`. If there is a list, you'll find the elements having a dash `-` before it.

Take the following schema as an example.

```
on:
	push:
		branches:
			- master
jobs:
	build:
		runs-on: ubuntu-latest
		steps:
			- uses: actions/checkout@v1
			- name: Install Python
			- run: apt install python3
```

It may be hard to read at first, but should be easy when you practice its usage. Python doesn't have YAML as a built-in module, but its available to install via PIP `pip install yaml`.

### Binary Serialization
Till now, we only mentioned text serializing, where we convert data into the common text based formats. Uncommon serializers on the other hand targets effieciency over readibility. One example is the Binary Serialization, where the data is actually converted into binary format of one's and zero's.

Take for an example a message `msg:Hello` if we to estimate the transmission size of this message is would be 58 bytes (calculated using `sys.getsizeof()` in Python `sys` module). In the binary serializer this should be something similar to `b'0x01Hello\0'` where `0x01` is a control byte standing for a `msg` & `\0` stands for End of String. Estimating this using the same method gives 43 bytes. This gives a huge improvment over the long run of bigger messages.

Take a number 255 as another example. In text serializers this gives 52 bytes, whereas in binary serializers this is reduced to 37 bytes `b'0xFF'`. Let's write this in code.

```
import pickle # Python native binary serializer
import json
from sys import getsizeof

x = { 'XZAN': 33, 'Amr': 55, 'Fares': 69 }
json_s = json.dumps(x)
bina_s = pickle.dumps(x)

print(json_s) # '{"XZAN": 33, "Amr": 55, "Fares": 69}'
print(bina_s)
"""
b'\x80\x04\x95 \x00\x00\x00\x00\x00\x00\x00}\x94(\x8c\x04XZAN\x94K!\x8c\x03Amr\x94K7\x8c\x05Fares\x94KEu.'
"""

print(getsizeof(json_s)) # 85
print(getsizeof(bina_s)) # 76
```

Binary Serialization is mainly used when performance matters more than readibility. This includes applications like Geographic Information Systems (GIS). on the other hand this serializer introduces a set of vulnerabilities that should be accounted for.

* **Deserialization vulnerabilities:** These vulnerabilities occur when untrusted data is deserialized, allowing an attacker to execute arbitrary code on the target system or to modify the application's data. This can occur when an application fails to properly validate or sanitize the data before deserializing it, allowing an attacker to supply a malicious payload that exploits a vulnerability in the deserialization process.
* **Denial of service attacks:** These vulnerabilities can occur when an attacker supplies a specially crafted payload that causes the deserialization process to consume excessive amounts of memory or CPU resources, leading to a denial of service or system crash.

Also this can be easily patched by deserializing a batch and validate it to a schema or checking a threshold lenght.

### ProtoBuf: Protocol Buffers
A Google maintained binary serializer that is language-neutral, platform-neutral extensible mechanism for serializing structured data. It's similar to JSON except it's smaller and faster. Google developed this to solve problems of transmitting packets of typed, structured data that are up to a few megabytes in size for inter-server communications as well as for archival storage of data on disk.

The format is defined in `.proto` files, which serve as a contract between both ends, giving you a way to validate the message between both ends. Take the following schema of a `.proto` mentioned on Google [documentation](https://protobuf.dev/).

```
message Person {
	optional string name = 1;
	optional int32 id = 2;
	optional string email = 3;
}
```

Although it's 2.3~2.7 times faster than JSON according to multiple online benchmarks. It's worth mentioning that The protocol doesn't have a wide community unlike JSON & XML. So, you'll have to tinker abit with the documentation to work around some errors.

### MessagePack
The last one on our discussion list. It has the same tagline as ProtoBuf but It crashes the speed by an average of x1.8 times according to the benchmarks mentioned on this [blog](https://medium.com/@hugovs/the-need-for-speed-experimenting-with-message-serialization-93d7562b16e4). It's also used by Redis, FluentId, Pinterest, and even for embedded systems such as Arduino.

A serialized example is presented on their [website](https://msgpack.org/index.html) (Try! tab)

```
data: {"compact":true,"schema":0}

serialized data: 82 a7 63 6f 6d 70 61 63 74 c3 a6 73 63 68 65 6d 61 00
```

It's so easy to get started with, and get used to it in a short time.

### TL;DR
I'm glad that we took some time exploring these technologies, yet we didn't cover all of them. Here are some other serializers we didn't cover:

* BSON
* FlatBuffers
* Apache Avro
* Some compression mechanisms are also used for this purpose such as GZip, and _Snappy_ (fromerly Zippy) but this introduces CPU utilisation to decompress the data.

**Which one is better?** That's a wrong question to ask in technology generally. Each has it's own purpose and it's up to you to choose the best fit for whatever you're trying to do. **JSON** is a perfect balance between readability and small sized payloads for APIs. although if you happened to face large sized payloads you either have to introduce pagination to your code to not refactor it, or refactor it for another solution. **XML** is better for more bussiness focused applications. **ProtoBuf** is better for it's validations and efficency.
