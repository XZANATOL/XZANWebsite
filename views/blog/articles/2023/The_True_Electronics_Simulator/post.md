### Introduction

One thing that always bothered me whenever I tried to build an electronic circuit was the time consumed because of manual testing. From the pain of switching my multimeter cables from one component to another to check the cables, the 'not being sure' of what behavior should this capacitor do under some condition.. to the patience of having to recompile Arduino code for every minor change to check. Working in a circuit that contained multiple of such parameters, debugging was more of 'GET ME OUT' process rather than a fun process. of course not to mention exploring new parts I've no knowledge about yet. Problem escalated from time to money and more research one has to do to get a reliable answer.

A simulator should be the solution, but which one can handle a microcontroller code with semi-complex circuits? Well, This's the talk of this devlog. I recently tried a couple that claimed the title such as:

* [TinkerCad](https://www.tinkercad.com/)
* [CRUMB Circuit Simulator](https://www.crumbsim.com/)
* [Proteus](https://www.labcenter.com/)

One really stood out was Proteus. compared to others It had many up-points. To mention some
s
* The most compatible with different components
* Different easy-to-access tools for multiple debugging approaches.
* Versatile with what you can do with your design after finishing the schematic.
* Can also support Raspberry Pi designs and IoT ideas.
* Moderate community support, and encourages creativity.

For me I was surprised to know that Proteus can even simulate anything other than basic circuits. I was using it from my first year in college in 2019. Only recently I knew it has such simulation power. Then I decided to dive deeper into it and share an intro about its tools.

### Proteus

[Proteus](https://www.labcenter.com/) is mainly known among beginners in Electrical engineering. It's a program used to draw electronic circuits schematics, simulate it, then transform them to a PCB designs. Little to know about its hidden potentials, Proteus has the capability to also simulate microcontrollers, use low code, and even make IoT interfaces to control your simulated environment. Take it a step further, You can directly upload your code from it and control your microcontroller from that same IoT interface but from your phone via their [app](https://play.google.com/store/apps/details?id=com.labcenter.iotbuilder&hl=en&gl=US). It's a complete design suite made for hobbyists and saves so much time having to bridge together exports between different applications.

From the development perspective, It has expandable library and package managers to import - or even create - your own parts. This is applicable from the schematics, PCB designs, to Its 3D visualizer. Only downside one can struggle with at the beginning is it's interface is not that user-friendly, but once you get your hands dirty things become a toy to tinker with.

Well I mentioned a couple of tools that may be overwhelming. Now, to talk about them one by one.

### Schematic Capture

Let's begin with the basics. The first thing you see on the create project wizard is the schematic layout. This is mainly to place components as blocks on a digital user-friendly interface where it can be labelled or connected with other components. Here you don't bother yourself with wire routing for a PCB or putting a block vertically or horizontally. It's mainly made to visualize the workflow of your design and simulate it.

The choices you get on the create project wizard are some templates in case you wanted to print the design. Tab is labelled `Schematic Capture` in your tab list.

Another feature this window gives you is the ability to make devices. If you are creating let's say an IC that contains an AND & OR gates. after drawing the schematic, you can group select the design > right click > choose `make a device`. This is an extremely powerful tool if you want to make abstractions, or make experimenting blocks without building a completely separate circuit. It's a time savior.

### PCB Layout

Second option to configure is the PCB layout. This is the window where you bring the schematic to life on a PCB design. Components you placed in the schematic are automatically available in this window. Here is the place where you configure routing, components position and rotations. In the create project wizard, you will find some options related to microcontrollers. This in case you want your PCB to have an embedded one. This raises another question, what if the component doesn't have the required PCB design?

Well, like the schematic, you can make your own, or if you're lucky find one ready on the internet. Draw your design and assign it to the corresponding component. You can even make multiple PCB designs for the same component in case you have different models/versions of it.

### Firmware

Now for the fun stuff. Third window is the one that's often skipped when creating a new project, but it's also where the true potential of Proteus lies. Firmware refers to a microcontroller component. Here, Proteus places a preconfigured schematic board of your microcontroller of choice let it be an Arduino UNO board. It configures it with labelled Analog and Digital references instead of using pin numbers on board in addition to linking it with the names of communications such as UART & SPI. From here you have access to other development boards ranging from PIC to R.PI (ARM)

You may notice another option of a flowchart project. Either choices makes the same as discussed above, only difference in the interface of the Proteus Visual Designer. When you create a firmware you have an option to use low code interface or just code yourself. So this generally depends on what you're trying to do. You can even convert your low code into a source code and continue programming for more flexibility, but not the opposite!

A quick walkthrough on the interface. Create a project & access the Visual Designer panel, on the left you can find your microcontroller data such as source code and It's peripherals such as CPU functions e.g. pinMode for Arduino, and communication peripherals e.g. SPI, I2C, timers. You can add / remove / enable-disable them. Another cool thing you can do is to add your IoT control interface. On the left panel, right click on development board folder (the most top folder in the panel) and click `Add IoT Control`. From here another window on the right will pop-up where you can put your controls. You can make a joystick for example, or a keypad for your corresponding project as a means of control, and integrate this with your source code.

Another cool thing? If you finished coding, you can directly upload your code to your physical board, just connect it and configure some parameters. And as mentioned above you can reuse the same IoT interface you built from your phone via their [app](https://play.google.com/store/apps/details?id=com.labcenter.iotbuilder&hl=en&gl=US) for further testing.

### Conclusion

You basically have an all-in-one full development kit for electronics under your hands, just some first time configurations need to be made and you're set to go. I've only talked about Arduino because that's what I'm experimenting with right now, but - as mentioned - there are options for other development board, especially Raspberry Pi boards. You can learn more about them on [LabCenter Electronics](https://www.youtube.com/@LabcenterElectronicsLtd/videos) YouTube channel.

With more in-depth configurations you can make, making design rules are very simple and versatile to export your project from one stage to another. It's a cool toolkit to add to your set, and for a hobbyist, I doubt it won't be a cool experience just tinkering with it.