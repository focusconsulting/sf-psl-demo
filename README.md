# Focus Consulting SF PSL Demo

This repository contains sample code demonstrating how the open source Kimai tracking solution could be integrated with a custom mobile application to meet the
requirements of the San Fransisco Paid Sick Leave program.

## Running the demo

In order to start the demo code, run the following in this directory:

```sh
chmod +x start-demo.sh
./start-demo.sh
```

When the application has started successfully, you will see:

```sh
Compiled successfully!

You can now view sf-psl-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.100:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
Files successfully emitted, waiting for typecheck results...
Issues checking in progress...
No issues found.
```

The UI is optimized for use on a mobile device. The easiest way to simulate a mobile device is to the mobile simulation tools found in most browsers. The following instructions assume the Chrome browser:

- Open a new tab
- Bring up the developer tools with `⌥+⌘+I`
- Bring up the mobile devices with `⇧+⌘+M`
- Select the `iPhone 14 Pro Max`
